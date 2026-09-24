import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, Signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { debounceTime, distinctUntilChanged } from 'rxjs'
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component'
import { InputComponent } from '../../../../shared/components/input/input.component'
import { LoadingSkeletonComponent } from '../../../../shared/components/loading-skeleton/loading-skeleton.component'
import { Launch } from '../../models/launch.model'

import { LaunchSearchStore } from '../../store/launches-list/launches-list.store'
import { LaunchCardComponent } from '../launch-card/launch-card.component'

@Component({
  selector: 'app-launches-list',
  imports: [CommonModule, LaunchCardComponent, ReactiveFormsModule, InfiniteScrollDirective, InputComponent, LoadingSkeletonComponent, EmptyStateComponent],
  providers: [LaunchSearchStore],
  templateUrl: './launches-list.component.html',
  styleUrl: "./launches-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchesListComponent implements OnInit {
  readonly launchesStore = inject(LaunchSearchStore);

  filteredLaunches: Signal<Launch[]> = this.launchesStore.filteredLaunches;
  loading: Signal<boolean> = this.launchesStore.isLoading;
  error: Signal<Error | null> = this.launchesStore.error;
  searchForm = new FormGroup({
    term: new FormControl(''),
  })

  private destroyRef = inject(DestroyRef);
  protected loadingArray = Array(6);
  
  ngOnInit() {
    this.loadLaunches();
    this.listenForSearchTermChanges()
  }

  private loadLaunches() {
    this.launchesStore.loadLaunches();
  }

  private listenForSearchTermChanges() {
    this.searchForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(form => {
      this.launchesStore.searchLaunchByTerm(form.term ?? '')
    })
  }

  protected loadNextPage() {
    if (!this.launchesStore.filter().isLastPage) {
      this.launchesStore.getNextPage();
    }
  }
}