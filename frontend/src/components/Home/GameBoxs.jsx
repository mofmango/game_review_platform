import { Link } from "react-router-dom";
import GameBox from "../GameBox";

export default function GameBoxs({ games, title, linkTo = "/games" }) {
  return (
    <div className="w-full px-4 lg:px-12 mt-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <Link
          to={linkTo}
          className="px-5 py-2 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors"
        >
          더 보기
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.slice(0, 4).map((game, idx) => (
          <GameBox key={idx} game={game} />
        ))}
      </div>
    </div>
  );
}
