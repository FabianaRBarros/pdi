import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators'
import { LaunchAPI } from '../../models/launch.api.model'
import { LaunchFactory } from '../../models/launch.factory'
import { Launch } from '../../models/launch.model'

@Injectable()
export class LaunchesListStoreService {
  private localUrl = 'launches.json';

  readonly http = inject(HttpClient)

  getPastLaunches(): Observable<Launch[]> {
    return this.http.get<LaunchAPI[]>(this.localUrl).pipe(
      delay(300),
      map((response) => response.map(launch => LaunchFactory.createLaunchFromAPI(launch))),
    );
  }
}