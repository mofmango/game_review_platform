import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="flex flex-col justify-center items-center py-10 mt-8 rounded-2xl bg-gradient-to-r from-blue-100 via-purple-100 to-[#f3f7fa]">
      <h1 className="font-bold text-5xl/26">GameHub</h1>
      <h3 className="font-bold text-xl/8 text-center">
        GameHub는 전 세계 게이머들이 모여 <br />
        게임에 대한 솔직한 리뷰와 다양한 경험,
        <br />
        노하우를 자유롭게 공유하고 함께 성장하는
        <br />
        게임 커뮤니티 플랫폼입니다.
      </h3>
      <Link to="/games" className="px-8 py-3 mt-5 text-white bg-black block">
        여러 게임 리뷰 보러가기
      </Link>
    </div>
  );
}
