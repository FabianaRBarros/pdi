import { resizeFlickrUrl } from '../../../shared/utils/flickr-image-resize.util'
import { LaunchAPI } from './launch.api.model'
import { Launch } from './launch.model'

export class LaunchFactory {
  static createLaunchFromAPI(launch: LaunchAPI): Launch {
    return {
      flightNumber: launch.flight_number,
      missionName: launch.mission_name,
      imageUrl: launch.links?.flickr_images.length > 0 ? resizeFlickrUrl(launch.links?.flickr_images[0]) : null,
      imageFallbackUrl: launch.links?.mission_patch_small,
      launchDate: new Date(launch.launch_date_utc),
      success: launch.launch_success,
    }
  }
}