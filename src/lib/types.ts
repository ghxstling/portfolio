type ProjectData = {
  id: number
  name: string
  html_url: string
  homepage: string
  pushed_at: string
}

type PresenceData = {
  userId: string
  status: string
  activity: {
    name: string
    type: number
    details: string | null
    state: string | null
    assets: {
      large_image: string | null
      large_text: string | null
      small_image: string | null
      small_text: string | null
    } | null
  }
}

export type { ProjectData, PresenceData }
