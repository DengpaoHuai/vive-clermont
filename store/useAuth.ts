import { useEffect } from "react";
import { create } from "zustand";

type StoreType = {
  user: { email: string; name: string } | null;
  refreshSession: () => void;
  login: (user: { email: string; name: string }) => void;
};

const useAuth = create<StoreType>((set) => ({
  user: null,
  refreshSession: () => {
    //get cookie
    const userAuth = localStorage.getItem("user");
    if (userAuth) {
      set({ user: JSON.parse(userAuth) });
    }
  },
  login: (user: { email: string; name: string }) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
}));

export default useAuth;

export const useSession = () => {
  const { user, refreshSession } = useAuth((state) => state);

  useEffect(() => {
    refreshSession();
  }, []);

  return user;
};
