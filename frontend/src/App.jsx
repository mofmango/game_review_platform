import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/Header";
import Game from "./pages/Game";
import Games from "./pages/Games";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useEffect } from "react";
import useAuthStore from "./stores/authStore";
import MyPage from "./pages/MyPage";

function App() {
  const { checkSession } = useAuthStore();

  useEffect(() => {
    checkSession(); // 앱 시작 시 세션 체크
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/games" element={<Games />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
