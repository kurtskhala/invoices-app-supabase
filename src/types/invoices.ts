export interface Invoice {
  id: number;
  invoice_number: string;
  invoice_date: Date;
  payment_terms: number;
  client_name_en: string;
  client_name_ka: string;
  client_address_en: string;
  client_address_ka: string;
  items: InvoiceItem[];
  total: number;
  status_en: "draft" | "pending" | "paid";
  status_ka: "სამუშაო" | "მიმდინარე" | "გადახდილი";
}

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface InvoiceUpdateData {
  id: string;
  status_en?: "draft" | "pending" | "paid";
  status_ka?: "სამუშაო" | "მიმდინარე" | "გადახდილი";
  clientName?: string;
  client_address_en?: string;
  client_address_ka?: string;
  client_name_en: string;
  client_name_ka: string;
  invoice_date: Date;
  payment_terms: number;
  items?: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  total?: number;
}
