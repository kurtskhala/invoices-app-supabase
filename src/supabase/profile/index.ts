import { supabase } from "..";
import { FillProfileInfoPayload } from "./index.types";

export const fillProfileInfo = (payload: FillProfileInfoPayload) => {
  return supabase.from("profiles").upsert(payload).throwOnError();
};

export const getProfileInfo = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as FillProfileInfoPayload;
};
