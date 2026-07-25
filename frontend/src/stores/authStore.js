import axios from "axios";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email, passwd) => {
    try {
      const response = await axios.post(
        "/api/projectB/login",
        { email, passwd },
        { withCredentials: true } // ✅ 세션 쿠키 전송
      );
      const userData = response.data;

      const user = {
        ...userData,
        favoriteGenreId: userData.favoriteGenre?.id || null,
      };

      set({ user, isAuthenticated: true });
      return user;
    } catch (error) {
      const message = error.response?.data || error.message;
      throw new Error(message);
    }
  },

  logout: async () => {
    try {
      await axios.post(
        "/api/projectB/logout",
        {},
        { withCredentials: true } // ✅ 세션 쿠키 전송
      );
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      throw new Error("로그아웃 실패:" + error);
    }
  },

  checkSession: async () => {
    try {
      const response = await axios.get(
        "/api/projectB/reviews/check-session",
        { withCredentials: true } // ✅ 세션 쿠키 전송
      );
      if (response.data) {
        const user = {
          ...response.data,
          favoriteGenreId: response.data.favoriteGenre?.id || null,
        };
        set({ user, isAuthenticated: true });
        return user;
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false, error });
      return null;
    }
  },
}));

export default useAuthStore;
