import { supabase } from "..";

export const register = ({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
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
    // Log the attempt (don't log actual password in production)
    console.log('Attempting login for email:', email);

    const response = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });

    // Log the full response for debugging
    console.log('Auth response:', {
      user: response.data.user,
      error: response.error,
      status: response.error?.status,
      message: response.error?.message
    });

    if (response.error) {
      throw response.error;
    }

    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  return supabase.auth.signOut();
};
