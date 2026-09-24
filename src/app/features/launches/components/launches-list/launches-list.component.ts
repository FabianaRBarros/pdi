import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, Signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { debounceTime, distinctUntilChanged } from 'rxjs'
import { InputComponent } from '../../../../shared/components/input/input.component'
import { Launch } from '../../models/launch.model'

import { LaunchSearchStore } from '../../store/launches-list/launches-list.store'
import { LaunchCardComponent } from '../launch-card/launch-card.component'

@Component({
  selector: 'app-launches-list',
  imports: [CommonModule, LaunchCardComponent, ReactiveFormsModule, InfiniteScrollDirective, InputComponent],
  providers: [LaunchSearchStore],
  templateUrl: './launches-list.component.html',
  styleUrl: "./launches-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchesListComponent implements OnInit {
  readonly launchesStore = inject(LaunchSearchStore);

  filteredLaunches: Signal<Launch[]> = this.launchesStore.filteredLaunches;
  searchForm = new FormGroup({
    term: new FormControl(''),
  })

  private destroyRef = inject(DestroyRef);
  
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