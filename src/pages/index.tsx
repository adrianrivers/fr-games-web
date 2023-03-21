import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { fetchTwitctCredentials } from '@/lib/twitchAuth'
import { fetchGameData, GameData } from '@/lib/fetchGames'

import Image from 'next/image'
import Link from 'next/link'
import Game from '@/components/Game'

export const getStaticProps: GetStaticProps<{
  games: GameData[]
}> = async () => {
  const clientId = process.env.CLIENT_ID ?? ''
  const clientSecret = process.env.CLIENT_SECRET ?? ''

  const twitch = await fetchTwitctCredentials(clientSecret, clientId)
  const games = await fetchGameData(twitch?.accessToken, clientId)

  return { props: { games } }
}

export default function Home({
  games,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const groups = games.reduce(
    (groups: Record<string, GameData[]>, game: GameData) => {
      const letter = game.name.charAt(0).toUpperCase()

      if (!groups[letter]) {
        groups[letter] = []
      }
      groups[letter].push(game)

      return groups
    },
    {}
  )

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetLetter = e.currentTarget.innerText
    const el = document.querySelector(`#group-${targetLetter}`)

    if (el) {
      const elPos = el.getBoundingClientRect().top + window.scrollY - 90
      window.scrollTo({ top: elPos, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Head>
        <title>French PS5 Games 🇫🇷</title>
        <meta name="description" content="French PS5 Games" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <div className="mx-auto fixed inset-x-0 flex items-center top-0 py-6 md:py-0 md:h-20 border-b border-b-[#0055A4]/20 bg-white">
        <div className="mx-auto">
          {Object.keys(groups).map((letter) => (
            <a
              key={letter}
              className={`inline-flex items-center justify-center h-8 w-8 mx-1 rounded-full relative group transition-colors ease-out duration-300 cursor-pointer hover:bg-fr-blue`}
              onClick={handleNavigation}
              href={letter}
            >
              <span className="text-xs group-hover:text-white duration-300 ease-in-out transition-all">
                {letter}
              </span>
            </a>
          ))}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 md:px-12 mt-40 md:mt-32 pb-14">
        <div>
          {Object.keys(groups).map((letter, i) => (
            <div key={letter} className="my-14">
              <h3 id={`group-${letter}`} className="text-xl font-bold mb-6">
                <span>
                  {letter}&nbsp; {i % 2 ? '🥐' : '🇫🇷'}
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 xxl:grid-cols-4 gap-6">
                {groups[letter].map((props, i) => (
                  <Game key={i} {...props} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-t-fr-red border-opacity-20 bg-opacity-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-7 flex justify-between items-center">
          <Link
            href="https://github.com/adrianrivers"
            prefetch={false}
            target="_blank"
          >
            <Image
              src="/github.png"
              alt="Github Logo"
              width={30}
              height={24}
              priority
            />
          </Link>

          <div>
            <p>
              This site uses{' '}
              <Link
                href="https://www.igdb.com/"
                prefetch={false}
                target="_blank"
                className="underline text-fr-blue decoration-fr-blue  underline-fr"
              >
                IGBD
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
