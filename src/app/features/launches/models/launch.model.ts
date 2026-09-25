export interface LaunchPartial {
  id: string,
  flightNumber: number,
  missionName: string,
  imageUrl: string | null,
  imageFallbackUrl: string,
  launchDate: Date,
  success: boolean,
}

export interface Launch extends LaunchPartial {
  details: string;
  rocket: {
    name: string;
    type: string;
    payloadType: string | null;
    payloadMassKg: number | null;
  };
  launchSite: {
    id: string;
    locationLong: string;
  };
  galleryImages: string[];
  links: {
    video: string | null;
    wikipedia: string | null;
    article: string | null;
    missionPatchSmall: string | null;
  };

}