export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  clientName: string;
  items: InvoiceItem[];
  total: number;
  status: "draft" | "sent" | "paid";
}

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InvoiceUpdateData {
  id: string;
  status?: string;
  clientName?: string;
  clientEmail?: string;
  paymentDue?: string;
  description?: string;
  items?: {
    name: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  total?: number;
}
