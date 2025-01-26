import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import { InvoiceFormData } from "@/schemas/invoice.schema";

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InvoiceFormData) => {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;

      if (!userId) throw new Error("No authenticated user");

      const { data: invoice, error } = await supabase
        .from("invoices")
        .insert({
          client_name: data.clientName,
          client_address: data.clientAddress,
          invoice_date: data.invoiceDate,
          payment_terms: data.paymentTerms,
          items: data.items,
          total: data.items.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0,
          ),
          user_id: userId,
          status: data.status,
        })
        .select()
        .single();

      if (error) throw error;
      return invoice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
};

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InvoiceFormData) => {
      const { data: invoice, error } = await supabase
        .from("invoices")
        .update({
          client_name: data.clientName,
          client_address: data.clientAddress,
          invoice_date: data.invoiceDate,
          payment_terms: data.paymentTerms,
          items: data.items,
          total: data.items.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0,
          ),
          status: data.status,
        })
        .eq("id", Number(data.id))
        .single();

      if (error) throw error;
      return invoice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
};
