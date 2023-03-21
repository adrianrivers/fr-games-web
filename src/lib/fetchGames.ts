import { z } from 'zod'

const gameSchema = z.object({
  cover: z
    .object({
      image_id: z.string(),
    })
    .transform((cover) => ({
      imageId: cover.image_id,
    })),
  genres: z.array(z.object({ name: z.string() })).optional(),
  name: z.string(),
  storyline: z.string().optional(),
})

export type GameData = z.infer<typeof gameSchema>

export const fetchGameData = async (
  accessToken: string | undefined,
  clientId: string
): Promise<GameData[]> => {
  const platformId = 167
  const language = 12 // French;
  const languageSupportType = 1 // Audio
  const pageSize = 500
  const currentTime = Math.floor(Date.now() / 1000)

  let data: GameData[] = []
  let page = 0
  let hasMoreResults = true

  if (!accessToken) return []

  while (hasMoreResults) {
    const response = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: `
      fields name, cover.image_id, genres.name, storyline;
      sort name asc;
      where release_dates.platform = (${platformId}) &
      (language_supports.language = ${language} & language_supports.language_support_type = ${languageSupportType}) &
      (release_dates.platform = ${platformId} & release_dates.date < ${currentTime});
      limit ${pageSize};
      offset ${page * pageSize};
    `,
    })

    const results = await response.json()

    if (results.length === 0) hasMoreResults = false

    data = data.concat(results)

    console.log(`🚧 Fetched page ${page + 1}`)

    page++

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  const games = z.array(gameSchema).parse(data)

  return games
}
