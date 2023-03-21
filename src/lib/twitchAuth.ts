import { z } from 'zod'

const twitchAccessTokenSchema = z
  .object({
    access_token: z.string().min(1),
  })
  .transform((val) => ({
    accessToken: val.access_token,
  }))

type TwitchAccessToken = z.infer<typeof twitchAccessTokenSchema>

export const fetchTwitctCredentials = async (
  clientSecret: string,
  clientId: string
): Promise<TwitchAccessToken | undefined> => {
  const twitchAccessToken = process.env.TWITCH_ACCESS_TOKEN

  if (twitchAccessToken) {
    return { accessToken: twitchAccessToken }
  }

  try {
    const response = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      { method: 'POST' }
    )

    const data = await response.json()
    const parsed = await twitchAccessTokenSchema.spa(data)

    if (parsed.success) {
      process.env.TWITCH_ACCESS_TOKEN = parsed.data.accessToken
      return parsed.data
    }
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch Twitch credentials')
  }
}
