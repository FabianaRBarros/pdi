import { resizeFlickrUrl } from '../../../shared/utils/flickr-image-resize.util'
import { LaunchAPI } from './launch.api.model'
import { Launch, LaunchPartial } from './launch.model'

export class LaunchFactory {
  static createLaunchPartialFromAPI(launch: LaunchAPI): LaunchPartial {
    return {
      id: launch.flight_number.toString(),
      flightNumber: launch.flight_number,
      missionName: launch.mission_name,
      imageUrl: launch.links?.flickr_images.length > 0 ? resizeFlickrUrl(launch.links?.flickr_images[0]) : null,
      imageFallbackUrl: launch.links?.mission_patch_small,
      launchDate: new Date(launch.launch_date_utc),
      success: launch.launch_success,
    }
  }

  static createLaunchFromAPI(launch: LaunchAPI): Launch {
    const primaryPayload = launch.rocket?.second_stage?.payloads?.[0] ?? null

    return {
      ...LaunchFactory.createLaunchPartialFromAPI(launch),
      details: launch.details || '',
      rocket: {
        name: launch.rocket?.rocket_name || 'Unknown Rocket',
        type: launch.rocket?.rocket_type || 'Unknown Type',
        payloadType: primaryPayload ? primaryPayload.payload_type : null,
        payloadMassKg: primaryPayload ? primaryPayload.payload_mass_kg : null,
      },
      launchSite: {
        id: launch.launch_site?.site_id || 'N/A',
        locationLong: launch.launch_site?.site_name_long || 'Unknown Location',
      },
      galleryImages: launch.links?.flickr_images ?
        launch.links.flickr_images.map(image => resizeFlickrUrl(image)).filter(image => image !== null)
        :
        [],
      links: {
        video: launch.links?.video_link || null,
        wikipedia: launch.links?.wikipedia || null,
        article: launch.links?.article_link || null,
        missionPatchSmall: launch.links?.mission_patch_small || null,
      },
    }
  }
}