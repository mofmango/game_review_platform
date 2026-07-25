import React from "react";

export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <form
      className="w-auto mx-auto flex justify-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <input
        type="text"
        placeholder="게임을 검색하세요..."
        value={value}
        onChange={onChange}
        className="w-[90%] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-[#000] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        검색
      </button>
    </form>
  );
}
