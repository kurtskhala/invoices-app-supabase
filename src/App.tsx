import "./App.css";
import { useEffect } from "react";
import { supabase } from "./supabase";
import { useSetAtom } from "jotai";
import { userAtom } from "./store/auth";
import AppRoutes from "./routes";

function App() {
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    // Initial session check
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Initial session error:', error);
          return;
        }
        console.log('Initial session:', session);
        setUser(session);
      } catch (err) {
        console.error('Failed to get initial session:', err);
      }
    };
  
    // Auth state listener
    const setupAuthListener = () => {
      try {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log('Auth event:', event);
            console.log('Session state:', session);
            setUser(session);
          }
        );
  
        return subscription;
      } catch (err) {
        console.error('Auth listener setup failed:', err);
        return null;
      }
    };
  
    // Initialize
    getInitialSession();
    const subscription = setupAuthListener();
  
    // Cleanup
    return () => {
      subscription?.unsubscribe();
    };
  }, [setUser]);
  return <AppRoutes />;
}

export default App;
