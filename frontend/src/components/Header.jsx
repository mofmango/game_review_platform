import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import Swal from "sweetalert2";

export default function Header() {
  const navigate = useNavigate();
  // const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire({
        title: "로그아웃",
        text: "로그아웃 되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
      navigate("/");
    } catch (err) {
      console.error("로그아웃 실패:", err);
      Swal.fire({
        title: "로그아웃 실패",
        text: err.message || "로그아웃 중 오류가 발생했습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <header className="h-20 flex items-center justify-between text-xl px-10 shadow-md bg-white">
      <h3 className="font-dotum">
        <Link to="/" className="font-bold font-dotum">
          GameHub
        </Link>
      </h3>
      <nav>
        {isAuthenticated ? (
          <>
            <Link to="/mypage" className="mr-5">
              마이페이지
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-blue-600 cursor-pointer"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-5">
              로그인
            </Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
}
