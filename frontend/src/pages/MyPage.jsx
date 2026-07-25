import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function MyPage() {
  const [user, setUser] = useState(null);
  const [genres, setGenres] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState({
    passwd: "",
    favoriteGenreId: null,
  });

  const navigate = useNavigate();

  // 마이페이지 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자 정보 불러오기 (세션 기반 인증)
        const userRes = await axios.get("/api/projectB/mypage", {
          params: { page },
          withCredentials: true,
        });
        setUser(userRes.data.user);
        setGenres(userRes.data.genres);
        setReviews(userRes.data.reviews.content || []);
        setTotalPages(userRes.data.reviews.totalPages || 1);

        // 폼 초기값 설정
        if (userRes.data.user?.favoriteGenre?.id) {
          setForm({
            ...form,
            favoriteGenreId: userRes.data.user.favoriteGenre.id,
          });
        }
      } catch (err) {
        setError(err);
        if (err.response?.status === 401) {
          navigate("/projectB/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);


  // 폼 입력 핸들러
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (loading)
    return <div className="text-center py-10 text-lg">로딩 중...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-lg text-red-500">
        에러 발생: {error.message}
      </div>
    );
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">마이페이지</h2>

      {/* 프로필 정보 */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-white">
        <p className="mb-2">
          <span className="font-semibold">이메일:</span> {user.email}
        </p>
        <p className="mb-2">
          <span className="font-semibold">이름:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">선호 장르:</span>{" "}
          {user.favoriteGenre?.name || "없음"}
        </p>
      </div>

    

      {/* 작성한 리뷰 목록 */}
<div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
  <h3 className="text-xl font-semibold mb-6 text-gray-800">내가 작성한 리뷰</h3>
  {reviews.length === 0 ? (
    <div className="text-center py-8 bg-gray-50 rounded-lg">
      <p className="text-gray-500">아직 작성한 리뷰가 없습니다.</p>
      <Link 
        to="/games" 
        className="mt-4 inline-block text-blue-600 hover:text-blue-800 transition"
      >
        게임 탐색하러 가기 →
      </Link>
    </div>
  ) : (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div 
          key={review.id}
          className="group p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-semibold text-gray-900">
                  {review.game?.title}
                </h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  ★ {review.rating}점
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-3">
                {review.content}
              </p>
              <Link
                to={`/game/${review.game?.id}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition"
              >
                상세 페이지 보기
                <svg 
                  className="w-4 h-4 ml-1"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </Link>
            </div>
            <div className="ml-4 flex-shrink-0">
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* 페이지네이션 */}
  {totalPages > 1 && (
    <div className="mt-8 flex justify-center gap-1">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1.5 min-w-[36px] rounded-md text-sm font-medium transition-colors
            ${
              i === page 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )}
</div>

    </div>
  );
}
