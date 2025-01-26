import { User } from "@supabase/supabase-js";

export interface Invoice {
  id: number;
  created_at: string;
  invoice_date: Date;
  payment_terms: number;
  client_name: string;
  status: "paid" | "pending" | "draft";
  client_address: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  total: number;
}

export interface SignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface DeletePopUpProps {
  id?: string;
  createdId?: string | number;
}

export interface EditAddDialogProps {
  action: string;
  createdId?: string | number;
  id?: string | number;
}

export interface InvoiceListItemProps {
  item: Invoice;
  onClick: () => void;
}

export interface InvoiceFormProps {
  action: string;
  defaultValues?: Invoice;
}

export interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends AuthCredentials {
  first_name_en: string;
  last_name_en: string;
  first_name_ka: string;
  last_name_ka: string;
}

export interface LoginResponse {
  user: User;
  session: {
    access_token: string;
  };
}
