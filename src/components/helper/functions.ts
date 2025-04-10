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
