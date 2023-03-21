import { z } from 'zod'

const twitchCredentialsSchema = z.object({
  access_token: z.string().min(1),
  expires_in: z.number().min(1),
  token_type: z.string().min(1),
})

type TwitchCredentials = z.infer<typeof twitchCredentialsSchema>

export const fetchTwitctCredentials = async (
  clientSecret: string,
  clientId: string
): Promise<TwitchCredentials | undefined> => {
  try {
    const response = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
      { method: 'POST' }
    )

    const data = await response.json()
    const parsed = await twitchCredentialsSchema.spa(data)

    if (parsed.success) return parsed.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch Twitch credentials')
  }
}
