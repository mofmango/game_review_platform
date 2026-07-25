import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "./../components/Games/Banner";
import Category from "./../components/Games/Category";
import GameList from "./../components/Games/GameList";
import SearchBar from "./../components/Games/SearchBar";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Games() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 쿼리스트링 파싱
  const sort = searchParams.get("sort") || "popular";
  const search = searchParams.get("search") || "";
  const genreId = searchParams.get("genreId") || null;
  const page = parseInt(searchParams.get("page") || "1");

  // 상태 관리
  const [searchInput, setSearchInput] = useState(search);
  const [genres, setGenres] = useState([]);
  const [showGenreMenu, setShowGenreMenu] = useState(sort === "genre");
  const [games, setGames] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 장르 목록 불러오기 (withCredentials 추가)
  useEffect(() => {
    axios
      .get("/api/projectB/game/genres", { withCredentials: true }) // 추가
      .then((response) => setGenres(response.data))
      .catch((err) => console.error("장르 목록 불러오기 실패:", err));
  }, []);

  // 게임 목록 불러오기 (withCredentials 추가)
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const params = {
          sort: sort === "genre" ? null : sort,
          keyword: search,
          genreId: sort === "genre" ? genreId : null,
          page: page - 1,
          size: 8,
        };

        const res = await axios.get("/api/projectB/game/list", {
          params,
          withCredentials: true, // 추가
        });

        setGames(res.data.games || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [sort, search, genreId, page]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage);
    navigate(`/games?${params.toString()}`);
  };

  // 검색 실행 시 (withCredentials 추가)
  const handleSearch = () => {
    const params = new URLSearchParams(location.search);
    if (searchInput) {
      params.set("search", searchInput);
    } else {
      params.delete("search");
    }
    if (!params.get("sort")) params.set("sort", sort);
    navigate(`/games?${params.toString()}`);
  };
  // 전체 장르 선택
  const handleAllGenre = () => {
    const params = new URLSearchParams(location.search);
    params.set("sort", "genre");
    params.delete("genreId"); // 장르 ID 제거
    if (search) params.set("search", search);
    navigate(`/games?${params.toString()}`);
  };

  // 특정 장르 선택
  const handleGenreClick = (genreId) => {
    const params = new URLSearchParams(location.search);
    params.set("sort", "genre");
    params.set("genreId", genreId);
    if (search) params.set("search", search);
    navigate(`/games?${params.toString()}`);
  };
  
  if (loading) return <LoadingSpinner />;
  if (error) return <div>에러 발생: {error.message}</div>;



  return (
    <div className="max-w-[1200px] mx-auto mt-12 px-4">
      <Banner />
      <SearchBar
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onSearch={handleSearch}
      />
      <div className="w-full flex flex-wrap gap-4 justify-center my-8">
        <Category
          text="인기순"
          to="/games?sort=popular"
          checked={sort === "popular"}
        />
        <Category
          text="최신순"
          to="/games?sort=recent"
          checked={sort === "recent"}
        />
        <Category
          text="장르별"
          to="/games?sort=genre"
          checked={sort === "genre"}
        />
      </div>
      {/* 장르별 메뉴 */}
      {showGenreMenu && (
        <div className="w-full flex flex-wrap mb-8">
          <button
            className={`w-[15%] text-center py-2 rounded-full text-sm font-medium transition-colors mx-auto
              ${
                !genreId
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            onClick={handleAllGenre}
          >
            전체
          </button>
          {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`w-[15%] text-centerpy-2 rounded-full text-sm font-medium transition-colors mx-auto
              ${
                genreId == genre.id
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {genre.name}
          </button>
          ))}
        </div>
      )}
      <GameList games={games} />

      <div className="mt-8 flex justify-center gap-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
        >
          이전
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-4 py-2 cursor-pointer ${
              page === idx + 1 ? "bg-blue-500 text-white " : "bg-gray-200"
            } rounded`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}
