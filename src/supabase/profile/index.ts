import { supabase } from "..";
import { fillProfileInfoPayload } from "./index.types";

export const fillProfileInfo = (payload: fillProfileInfoPayload) => {
  return supabase
    .from("profiles")
    .upsert(payload as any)
    .throwOnError();
};

export const getProfileInfo = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as fillProfileInfoPayload;
};
