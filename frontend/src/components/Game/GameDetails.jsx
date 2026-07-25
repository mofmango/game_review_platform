export default function GameDetails({ game }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <img
        src={game.game.imageUrl}
        alt={game.game.title}
        className="w-full h-72 object-cover"
      />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">{game.game.title}</h1>
        <div className="flex items-center gap-3 mb-4 text-gray-600">
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
            {game.game.genre.name}
          </span>
          <span className="text-sm">출시일: {game.game.releaseYear}</span>
        </div>
        <p className="mb-4 text-gray-800">{game.game.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-lg font-bold">★</span>
          <span className="text-lg font-semibold">{game.avgRating}</span>
          <span className="text-sm text-gray-500">/ 100</span>
        </div>
      </div>
    </div>
  );
}
