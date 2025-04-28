import { v4 as uuid } from 'uuid'
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

export const constructDiscordAuthUrl = () => {
  const scope = encodeURIComponent('email identify activities.read')
  const state = uuid()
  document.cookie = `auth_state=${state}; SameSite=Lax; Secure; HttpOnly`

  let authUrl: string
  let redirectUri: string
  if (!process.env.NODE_ENV) {
    redirectUri = encodeURIComponent('https://www.ghxstling.dev/api/discord/callback')
    authUrl = `https://discord.com/oauth2/authorize?client_id=1364032390825115750&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`
  } else {
    authUrl = `https://discord.com/oauth2/authorize?client_id=1364032390825115750&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fdiscord%2Fcallback&scope=identify+email+activities.read&state=${state}`
  }
  return authUrl
}
