import React, { useEffect, useState } from "react";
import Banner from "../components/Home/Banner";
import GameBoxs from "../components/Home/GameBoxs";
import useAuthStore from "../stores/authStore";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const { user, isAuthenticated } = useAuthStore();
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);
  const [latestGames, setLatestGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommended = async () => {
      if (isAuthenticated && user?.email) {
        try {
          const res = await axios.get("/api/projectB/", {
            params: { email: user.email },
          });
          setRecommendedGames(res.data.recommendedGames || []);
          console.log(res.data.recommendedGames);
        } catch (err) {
          setError("추천 게임을 불러오지 못했습니다: " + err.message);
        }
      }
    };

    const fetchPopular = async () => {
      try {
        const res = await axios.get("/api/projectB/game/list", {
          params: { sort: "popular", size: 4 },
        });
        setPopularGames(res.data.games || []);
      } catch (err) {
        setError("인기 게임을 불러오지 못했습니다: " + err.message);
      }
    };

    const fetchLatest = async () => {
      try {
        const res = await axios.get("/api/projectB/game/list", {
          params: { sort: "recent", size: 4 },
        });
        setLatestGames(res.data.games || []);
      } catch (err) {
        setError("최신 게임을 불러오지 못했습니다: " + err.message);
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      setError(""); // 에러 초기화
      await Promise.all([fetchRecommended(), fetchPopular(), fetchLatest()]);
      setLoading(false);
    };

    fetchAllData();
  }, [isAuthenticated, user]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div>
      <div className="max-w-full mx-10">
        <Banner />

        {isAuthenticated && (
          <GameBoxs
            games={recommendedGames}
            title="사용자 추천 게임"
            linkTo={`/games?sort=genre&genreId=` + user.favoriteGenre.id}
          />
        )}

        <GameBoxs
          games={popularGames}
          title="인기 게임"
          linkTo="/games?sort=popular"
        />

        <GameBoxs
          games={latestGames}
          title="최신 게임"
          linkTo="/games?sort=recent"
        />
      </div>
    </div>
  );
}
