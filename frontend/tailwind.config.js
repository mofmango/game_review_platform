export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nanumneo: [
          '"NanumSquareNeo"',
          '"맑은고딕"',
          "MalgunGothic",
          "Helvetica",
          "sans-serif",
        ],
        nanumsquare: [
          '"NanumSquare"',
          '"나눔스퀘어"',
          '"맑은고딕"',
          "MalgunGothic",
          "Helvetica",
          "sans-serif",
        ],
        nanumgothic: [
          '"나눔고딕"',
          "NanumGothic",
          '"맑은고딕"',
          "MalgunGothic",
          "Helvetica",
          "sans-serif",
        ],
        malgun: ['"맑은고딕"', "MalgunGothic", "Helvetica", "sans-serif"],
        dotum: ['"돋움"', "Dotum", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
