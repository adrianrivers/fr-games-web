import type { Game } from '@/pages/index'

export default function Game({ name, genres }: Game) {
  return (
    <section className="p-10 border-fr-blue/20 border rounded-lg shadow-fr-blue flex flex-col justify-evenly">
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
  )
}
