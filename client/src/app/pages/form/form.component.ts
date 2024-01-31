import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IdeasService } from '../../services/ideas.service';

@Component({
  selector: 'neon-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private id: string = '';
  public loaded = false;
  public form: FormGroup = new FormGroup({
    postedBy: new FormControl('', [Validators.required]),
    summary: new FormControl('', [Validators.required]),
    assignees: new FormArray([new FormControl('', [Validators.required])]),
    workflow: new FormControl('', [Validators.required]),
  });

  get assignees(): FormArray {
    return this.form.get('assignees') as FormArray;
  }

  constructor(
    private readonly ideasService: IdeasService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    const values = {
      postedBy: 'Ramiro',
      summary: 'asd',
      workflow: 'asd',
      assignees: ['asd'],
    };
    this.id = this.route.snapshot.params['id'];
    if (!this.id) {
      this.loaded = true;
      this.form.setValue(values);
    } else {
      this.ideasService
        .getById(this.id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(({ id, createdAt, ratings, ...value }) => {
          this.form.setValue(value);
        });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  addAssignee(): void {
    this.assignees.push(new FormControl('', [Validators.required]));
  }

  deleteAssignee(index: number): void {
    if (this.assignees.length < 2) {
      return;
    }
    this.assignees.removeAt(index);
  }

  onSubmit() {
    if (this.id) {
      this.ideasService
        .updateById(this.id, this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => this.router.navigate(['/']));
    } else {
      this.ideasService
        .create(this.form.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => this.router.navigate(['/']));
    }
  }
}
