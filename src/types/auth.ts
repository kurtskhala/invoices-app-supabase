export interface Invoice {
  _id: string;
  id: string;
  created_at: string;
  invoiceDate: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  client_name: string;
  clientEmail: string;
  status: "paid" | "pending" | "draft";
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  client_address: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  total: number;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface DeletePopUpProps {
  id?: string;
  createdId?: string;
}

export interface EditAddDialogProps {
  action: string;
  createdId?: string;
  id?: string;
}

export interface InvoiceListItemProps {
  item: Invoice;
  onClick: () => void;
}

export interface InvoiceFormProps {
  action: string;
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
  firstName: string;
  lastName: string;
}

export interface LoginResponse {
  user: any;
  session: any;
}

export type User = {
  id: string;
} | null;
