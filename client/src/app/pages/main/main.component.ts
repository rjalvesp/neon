import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IdeasService } from '../../services/ideas.service';
import { Idea } from '../../types/ideas.types';

@Component({
  selector: 'neon-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  public ideas: Idea[] = [];
  private offset = 0;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private readonly ideasService: IdeasService) {}

  ngOnInit(): void {
    this.fetchIdeas();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private fetchIdeas(offset: number = 0, limit: number = 10) {
    this.ideasService
      .getAll(offset, limit)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => {
        this.ideas = [...this.ideas, ...value];
        this.offset += this.ideas.length;
      });
  }

  private fetchIdea(id: string, replaceIndex: number) {
    this.ideasService
      .getById(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((value) => (this.ideas[replaceIndex] = value));
  }

  public onActionPerformed({
    id,
    action,
  }: {
    id: string;
    action: 'edit' | 'delete';
  }) {
    const index = this.ideas.findIndex(
      ({ id: collectionId }) => id === collectionId
    );
    if (index < 0) {
      return;
    }

    if (action === 'delete') {
      this.ideas = [
        ...this.ideas.slice(0, index),
        ...this.ideas.slice(index + 1),
      ];
    } else {
      this.fetchIdea(id, index);
    }
  }

  public onScroll() {
    this.fetchIdeas(this.offset);
  }
}
