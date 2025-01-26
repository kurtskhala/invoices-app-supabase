import { supabase } from "@/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import underscore from "underscore";
import { Invoice } from "@/types/auth";


export const useInvoices = ({ 
  searchText, 
  statusFilter 
}: { 
  searchText?: string, 
  statusFilter?: string 
}) => {
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [debouncedStatusFilter, setDebouncedStatusFilter] = useState(statusFilter);

  const debouncedSetSearch = useRef(
    underscore.debounce((text: string) => {
      setDebouncedSearchText(text);
    }, 1000)
  ).current;

  const debouncedSetStatus = useRef(
    underscore.debounce((status: string) => {
      setDebouncedStatusFilter(status);
    }, 300)
  ).current;

  useEffect(() => {
    debouncedSetSearch(searchText || "");
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [searchText, debouncedSetSearch]);

  useEffect(() => {
    debouncedSetStatus(statusFilter || "");
    return () => {
      debouncedSetStatus.cancel();
    };
  }, [statusFilter, debouncedSetStatus]);

  const fetchInvoices = async (): Promise<Invoice[]> => {
    let query = supabase
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false });

    if (debouncedSearchText && debouncedSearchText.length >= 3) {
      query = query.ilike("client_name", `%${debouncedSearchText}%`);
    }

    if (debouncedStatusFilter) {
      query = query.eq("status", debouncedStatusFilter);
    }

    const { data } = await query;

    return data as any;
  };

  return useQuery<Invoice[], Error>({
    queryKey: ["invoices", debouncedSearchText, debouncedStatusFilter],
    queryFn: fetchInvoices,
    enabled: (!debouncedSearchText || debouncedSearchText.length >= 3),
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
        .from("invoices")
        .update({ status })
        .eq("id", Number(id))
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["invoice", variables.id] });
    },
  });
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (invoiceId: string) => {
      const { error } = await supabase
        .from("invoices")
        .delete()
        .eq("id", Number(invoiceId));

      if (error) throw error;
      return invoiceId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
};
