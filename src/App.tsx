import "./App.css";
import { useEffect } from "react";
import { supabase } from "./supabase";
import { useSetAtom } from "jotai";
import { userAtom } from "./store/auth";
import AppRoutes from "./routes";

function App() {
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);
  return <AppRoutes />;
}

export default App;
