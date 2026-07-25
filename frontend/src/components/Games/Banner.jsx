export default function Banner() {
  return (
    <div className="relative w-full h-60 my-8 rounded-3xl overflow-hidden shadow-lg">
      <img
        src="https://magazine.securities.miraeasset.com/contents/path/00291/images/img_01.png?a=a"
        alt="게임 배경"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        <h1 className="text-white text-4xl md:text-5xl font-black drop-shadow-lg tracking-tight mb-2">
          게임 모음
        </h1>
        <p className="text-white text-lg md:text-xl font-medium drop-shadow-sm text-center">
          다양한 게임을 인기순, 최신순, 장르별로 한눈에!
        </p>
      </div>
    </div>
  );
}
