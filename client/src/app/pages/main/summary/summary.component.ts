import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Idea } from '../../../types/ideas.types';
import { Subject, take } from 'rxjs';
import { IdeasService } from '../../../services/ideas.service';

@Component({
  selector: 'neon-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnDestroy {
  @Input() idea: Idea | null = null;
  @Output() actionPerformed = new EventEmitter<{
    id: string;
    action: 'edit' | 'delete';
  }>();
  public rates = [1, 2, 3, 4, 5];
  public selectedRate: number = 0;
  public hoverIndex = -1;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public get score() {
    const ratings = this.idea!.ratings || [];
    if (!ratings.length) {
      return '---';
    }
    const sum = ratings.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    return parseFloat(`${sum / (ratings.length || 1)}`).toFixed(2);
  }

  constructor(private readonly ideasService: IdeasService) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  rateIdea(score: number) {
    this.ideasService
      .rateIdea(this.idea!.id, { score })
      .pipe(take(1))
      .subscribe(() => {
        this.selectedRate = score;
        this.actionPerformed.emit({ id: this.idea!.id, action: 'edit' });
      });
  }

  setHover(index: number) {
    this.hoverIndex = index;
  }

  resetHover() {
    this.hoverIndex = -1;
  }

  deleteIdea() {
    this.ideasService
      .deleteById(this.idea!.id)
      .pipe(take(1))
      .subscribe(() => {
        this.actionPerformed.emit({ id: this.idea!.id, action: 'delete' });
      });
  }
}
