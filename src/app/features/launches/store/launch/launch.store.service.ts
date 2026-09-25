import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators'
import { LaunchAPI } from '../../models/launch.api.model'

import { LaunchFactory } from '../../models/launch.factory'
import { Launch } from '../../models/launch.model'

@Injectable()
export class LaunchStoreService {
  private localUrl = 'launches.json'
  readonly http = inject(HttpClient)

  getLaunchById(id: string): Observable<Launch | null> {
    return this.http.get<LaunchAPI[]>(this.localUrl).pipe(
      delay(300), // TODO: This should be removed when we have the actual request
      map(launches => launches.find(l => l.flight_number.toString() === id)),
      map(launch => launch ? LaunchFactory.createLaunchFromAPI(launch) : null),
    )
  }
}