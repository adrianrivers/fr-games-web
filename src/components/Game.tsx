import { GameData } from '@/lib/fetchGames'
import Link from 'next/link'

export default function Game({ name, genres }: GameData) {
  return (
    <Link
      href={`https://www.google.com/search?q=${encodeURIComponent(
        name
      )} PS5 playstation francais`}
      prefetch={false}
      target="_blank"
      className="p-10 border-fr-blue border-opacity-25 border rounded-lg shadow-fr-blue hover:shadow-fr-red transition duration-300 ease-in-out hover:border-fr-red hover:border-opacity-25 visited:border-fr-red"
    >
      <section className="flex flex-col justify-evenly">
        <h5 className="font-semibold text-base mb-6 text-fr-blue">{name}</h5>

        <div>
          <h6 className="font-semibold text-gray-600 text-sm">Genres</h6>
          {genres?.length ? (
            <ul className="">
              {genres.map((genre, i) => (
                <li key={i} className="text-xs inline">
                  {genre.name}
                  {i < genres.length - 1 && ', '}
                </li>
              ))}
            </ul>
          ) : (
            <p>N/A</p>
          )}
        </div>
      </section>
    </Link>
  )
}
