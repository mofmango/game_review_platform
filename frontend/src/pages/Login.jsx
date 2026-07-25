import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import Swal from "sweetalert2";

export default function Login() {
  const [form, setForm] = useState({ email: "", passwd: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.passwd) {
      setError("이메일과 비밀번호를 모두 입력해 주세요.");
      return;
    }
    try {
      setLoading(true); // 로딩 시작
      await login(form.email, form.passwd);
      Swal.fire({
        title: "로그인",
        text: "로그인 되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
      navigate("/");
    } catch (err) {
      setError("아이디나 비밀번호가 잘못되었습니다.");
      console.error(err); // 에러 로그 출력
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="max-w-80 mx-auto w-full mt-20 flex flex-col justify-between items-center">
      <Link to="/" className="font-bold font-dotum text-5xl/26 text-center">
        GameHub
      </Link>
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
        />
        <Input
          type="password"
          name="passwd"
          value={form.passwd}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 bg-black text-white font-semibold rounded hover:bg-[#333] cursor-pointer transition flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : null}
          로그인
        </button>
      </form>
      <div className="mt-4 text-gray-600 text-sm">
        이미 계정이 없으신가요?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          회원가입
        </Link>
      </div>
    </div>
  );
}
