export default function ReviewForm({
  form,
  onSubmit,
  onCancel,
  onFormChange,
  isEditing,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 mb-8 border-b pb-6"
    >
      <div className="flex gap-4 items-center">
        <label className="font-semibold">평점</label>
        <input
          type="number"
          min="1"
          max="100"
          required
          name="rating"
          value={form.rating}
          onChange={onFormChange}
          className="w-20 p-2 border rounded"
          placeholder="1~100"
        />
        <label className="font-semibold ml-4">코멘트</label>
        <input
          type="text"
          required
          name="comment"
          value={form.comment}
          onChange={onFormChange}
          className="flex-1 p-2 border rounded"
          placeholder="리뷰를 입력하세요"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "수정" : "작성"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
}
