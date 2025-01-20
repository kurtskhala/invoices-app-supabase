export interface ProfileFormData {
  firstName: string;
  lastName: string;
}

export interface ProfileUpdateData extends ProfileFormData {
  id: string;
}
