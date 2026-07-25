import React from "react";

function LoadingSpinner() {
  return (
    <div className="h-100% flex flex-col items-center justify-center gap-2 py-8">
      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      <span className="text-gray-600">로딩 중...</span>
    </div>
  );
}

export default LoadingSpinner;
