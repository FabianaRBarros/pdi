export const IMAGE_PLACEHOLDER = '/assets/images/image-placeholder.png'

export function handleImageError(event: Event) {
  const element = event.target as HTMLImageElement
  element.src = IMAGE_PLACEHOLDER
}