export interface ProfileFormData {
  first_name_en: string;
  last_name_en: string;
  first_name_ka: string;
  last_name_ka: string;
}

export interface ProfileUpdateData extends ProfileFormData {
  id: string;
}
