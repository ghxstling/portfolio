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
      largeImage: string | null
      largeText: string | null
      smallImage: string | null
      smallText: string | null
    }
  }
}

export type { ProjectData, PresenceData }
