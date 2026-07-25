import GameBox from "./../GameBox";

export default function GameList({ games }) {
  return (
    <div className="w-full px-4 lg:px-12 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game, idx) => (
          <GameBox key={idx} game={game} />
        ))}
      </div>
    </div>
  );
}
