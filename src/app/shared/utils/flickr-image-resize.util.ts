export function resizeFlickrUrl(url: string | null | undefined, sizeSuffix: string = 'm'): string | null {
  if (!url) {
    return null
  }

  return url.replace(/_[a-z]\.(jpg|jpeg)/i, `_${ sizeSuffix }.$1`)
}