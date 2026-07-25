import { useParams } from "react-router-dom";
import axios from "axios";
import GameDetails from "../components/Game/GameDetails";
import ReviewForm from "../components/Game/ReviewForm";
import ReviewList from "../components/Game/ReviewList";
import LoadingSpinner from "./../components/LoadingSpinner";
import { useEffect, useState } from "react";
import useAuthStore from "./../stores/authStore";

export default function Game() {
  const { id } = useParams();
  const { user } = useAuthStore();

  const [form, setForm] = useState({ rating: "", comment: "" });
  const [editing, setEditing] = useState(null);
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 게임 정보와 리뷰 불러오기
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        // 게임 정보 불러오기
        const gameRes = await axios.get(`/api/projectB/game/detail/${id}`);
        setGame(gameRes.data);

        // 리뷰 불러오기
        const reviewsRes = await axios.get(
          `/api/projectB/reviews?gameId=${id}`
        );
        setReviews(reviewsRes.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGameData();
  }, [id]);

  // 리뷰 작성/수정 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.rating || !form.comment) return;

    try {
      const axiosConfig = { withCredentials: true };
      const payload = {
        rating: Number(form.rating),
        content: form.comment,
      };

      if (editing !== null) {
        const res = await axios.put(
          `/api/projectB/reviews/${editing}`,
          payload,
          axiosConfig
        );
        setReviews(reviews.map((r) => (r.id === editing ? res.data : r)));
      } else {
        const res = await axios.post(
          `/api/projectB/reviews`,
          { ...payload, gameId: Number(id) },
          axiosConfig
        );
        setReviews([...reviews, res.data]);
      }
      setForm({ rating: "", comment: "" });
      setEditing(null);
    } catch (err) {
      console.error("Error:", err.response?.data);
      alert(err.response?.data || "요청 실패");
    }
  };
  // 리뷰 삭제
  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`/api/projectB/reviews/${reviewId}`);
      setReviews(reviews.filter((r) => r.id !== reviewId));
      if (editing === reviewId) {
        setEditing(null);
        setForm({ rating: "", comment: "" });
      }
    } catch (err) {
      console.error("리뷰 삭제 실패:", err.response?.data);
      alert(err.response?.data || "삭제 실패");
    }
  };

  // 리뷰 수정 모드 진입
  const handleEdit = (review) => {
    setEditing(review.id);
    setForm({
      rating: review.rating.toString(),
      comment: review.content,
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!game) return null;

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <GameDetails game={game} />

      {/* 리뷰 섹션 */}
      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">리뷰</h2>
        <ReviewForm
          form={form}
          onSubmit={handleSubmit}
          onFormChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          onCancel={() => {
            setEditing(null);
            setForm({ rating: "", comment: "" });
          }}
          isEditing={editing !== null}
        />
        <ReviewList
          reviews={reviews}
          onEdit={handleEdit}
          onDelete={handleDelete}
          currentUserEmail={user?.email}
        />
      </div>
    </div>
  );
}
