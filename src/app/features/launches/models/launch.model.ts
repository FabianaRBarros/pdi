export interface Launch {
  flightNumber: number,
  missionName: string,
  imageUrl: string | null,
  imageFallbackUrl: string,
  launchDate: Date,
  success: boolean,
}