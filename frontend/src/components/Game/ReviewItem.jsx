export default function ReviewItem({
  review,
  onEdit,
  onDelete,
  currentUserEmail,
}) {
  const createdDate = new Date(review.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 rounded p-4 mb-3">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-blue-600">
            {review.user?.name || "익명"}
          </span>
          <span className="text-yellow-500 font-bold">
            ★ {review.rating}/100
          </span>
          <span className="text-xs text-gray-400">{createdDate}</span>
        </div>
        <div className="text-gray-800 break-words">{review.content}</div>
      </div>

      {review.user?.email === currentUserEmail && (
        <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-4">
          <button
            onClick={() => onEdit(review)}
            className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
          >
            수정
          </button>
          <button
            onClick={() => onDelete(review.id)}
            className="px-2 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
