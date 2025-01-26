import { supabase } from "..";

export const register = ({
  email,
  password,
  first_name_en,
  last_name_en,
  first_name_ka,
  last_name_ka,
}: {
  email: string;
  password: string;
  first_name_en: string;
  last_name_en: string;
  first_name_ka: string;
  last_name_ka: string;
}) => {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name_en: first_name_en,
        last_name_en: last_name_en,
        first_name_ka: first_name_ka,
        last_name_ka: last_name_ka,
      },
    },
  });
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (response.error) {
      throw response.error;
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = () => {
  return supabase.auth.signOut();
};
