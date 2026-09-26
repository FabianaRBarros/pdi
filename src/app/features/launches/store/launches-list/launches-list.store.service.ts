import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators'
import { LaunchAPI } from '../../models/launch.api.model'
import { LaunchFactory } from '../../models/launch.factory'
import { LaunchPartial } from '../../models/launch.model'

@Injectable()
export class LaunchesListStoreService {
  private localUrl = 'data/launches.json'

  readonly http = inject(HttpClient)

  getPastLaunches(): Observable<LaunchPartial[]> {
    return this.http.get<LaunchAPI[]>(this.localUrl).pipe(
      delay(300), // TODO: This should be removed when we have the actual request
      map((response) => response.map(launch => LaunchFactory.createLaunchPartialFromAPI(launch))),
    )
  }
}