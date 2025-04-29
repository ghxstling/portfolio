import { HEADER_HEIGHT, HEADER_MARGIN } from '../Header'

export const handleScrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const rect = element.getBoundingClientRect()
    let yPos
    if (element.id === 'home') {
      yPos = 0
    } else {
      yPos = rect.top + window.scrollY - (HEADER_HEIGHT + HEADER_MARGIN) * 16
    }
    window.scrollTo({ top: yPos, behavior: 'smooth' })
  }
}

export const getApiUrl = (path: string) => {
  if (!import.meta.env.VITE_API_URL) {
    return path
  } else {
    return import.meta.env.VITE_API_URL + path
  }
}

export const parseImageUrl = (image?: string | null): string | null => {
  if (!image) return null
  if (image.startsWith('spotify:')) {
    return `https://i.scdn.co/image/${image.split(':')[1]}`
  } else if (image.startsWith('mp:external/')) {
    return `https://${image.split('/').slice(3).join('/')}`
  } else {
    return null
  }
}
