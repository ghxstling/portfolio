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
