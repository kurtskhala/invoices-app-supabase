import { supabase } from "@/supabase";
import { updateInvoice } from "@/supabase/invoices";
import { InvoiceUpdateData } from "@/types/invoices";
import { MutationKeys } from "@/types/mutationKeys.enum";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useInvoices = () => {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useInvoice = (id: string) => {
  return useQuery({
    queryKey: ["invoice", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) throw error;
      return data as any;
    },
  });
};

export const useUpdateInvoiceStatus = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ id, status }: { id: string; status: string }) => {
        const { data, error } = await supabase
          .from('invoices')
          .update({ status })
          .eq('id', Number(id))
          .single();
  
        if (error) throw error;
        return data;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['invoice', variables.id] });
      },
    });
  };

export const useInvoiceUpdate = () => {
    const queryClient = useQueryClient();
  
    return useMutation<void, Error, InvoiceUpdateData>({
      mutationKey: [MutationKeys.UPDATE_INVOICE],
      mutationFn: async (invoiceData: InvoiceUpdateData): Promise<void> => {
        const response = await updateInvoice(invoiceData);
        if (response.error) {
          throw new Error(response.error.message);
        }
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['invoice', variables.id] });
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
      },
    });
  };
