import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatIcon } from '@angular/material/icon'
import { MatFormField, MatInput, MatLabel } from '@angular/material/input'
import { InfiniteScrollDirective } from 'ngx-infinite-scroll'
import { debounceTime, distinctUntilChanged } from 'rxjs'

import { LaunchSearchStore } from '../../store/launches-list/launches-list.store'
import { LaunchCardComponent } from '../launch-card/launch-card.component'

@Component({
  selector: 'app-launches-list',
  imports: [CommonModule, LaunchCardComponent, ReactiveFormsModule, MatIcon, MatFormField, MatInput, MatLabel, InfiniteScrollDirective],
  providers: [LaunchSearchStore],
  templateUrl: './launches-list.component.html',
  styleUrl: "./launches-list.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchesListComponent implements OnInit {
  readonly launchesStore = inject(LaunchSearchStore);

  filteredLaunches = this.launchesStore.filteredLaunches;
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