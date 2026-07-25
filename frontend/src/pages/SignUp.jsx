import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    passwd: "",
    address: "",
    phone: "",
    favoriteGenreId: null,
  });
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/projectB/game/genres")
      .then((response) => setGenres(response.data))
      .catch((err) => console.error("장르 목록 불러오기 실패:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.passwd) {
      setError("이름, 이메일, 비밀번호는 필수 입력입니다.");
      return;
    }
    try {
      await axios.post("/api/projectB/register", form);
      Swal.fire({
        title: "회원가입",
        text: "회원가입 되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
      });
      navigate("/login");
    } catch (err) {
      console.error("회원가입 실패:", err.response?.data);
      setError(
        err.response?.data?.message || "회원가입 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <div className="max-w-80 mx-auto w-full mt-10 flex flex-col justify-between items-center">
      <Link to="/" className="font-bold font-dotum text-5xl/26 text-center">
        GameHub
      </Link>
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="이름을 입력하세요"
        />
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
        <Input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="주소를 입력하세요"
        />
        <Input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="전화번호를 입력하세요"
        />
        <div className="w-full mb-4">
          <select
            name="favoriteGenreId"
            value={form.favoriteGenreId || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">선호 장르 선택</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 bg-black text-white font-semibold rounded hover:bg-[#333] cursor-pointer transition"
        >
          회원가입
        </button>
      </form>
      <div className="mt-4 text-gray-600 text-sm">
        이미 계정이 있으신가요?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          로그인
        </Link>
      </div>
    </div>
  );
}
