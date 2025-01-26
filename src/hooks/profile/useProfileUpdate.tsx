import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "@/types/mutationKeys.enum";
import { fillProfileInfo } from "@/supabase/profile";
import { ProfileUpdateData } from "@/types/profile";

export const useProfileUpdate = () => {
  return useMutation<void, Error, ProfileUpdateData>({
    mutationKey: [MutationKeys.FILL_PROFILE],
    mutationFn: async (profileData: ProfileUpdateData): Promise<void> => {
      const response = await fillProfileInfo(profileData);
      if (response.error) {
        throw new Error(response.error.message);
      }
    },
  });
};
