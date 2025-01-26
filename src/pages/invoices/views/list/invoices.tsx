import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import DownArrow from "@/assets/icon-arrow-down.svg";
import Empty from "@/assets/illustration-empty.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Invoice } from "@/types/auth";
import InvoiceListItem from "../../components/list/invoiceListItem";
import EditAddDialog from "../../components/list/editAddInvoice";
import { useInvoices } from "@/hooks/invoices/useInvoices";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import qs from "qs";
import { useTranslation } from "react-i18next";

const Invoices = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const params = useParams();
  const lang = params.lang as string;

  const parsedQueryParams = qs.parse(
    Array.from(searchParams.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join("&"),
  ) as any;
  const [statusFilter, setStatusFilter] = useState<string>(
    parsedQueryParams.statusFilter || "",
  );
  const { control, watch } = useForm<any>({
    defaultValues: parsedQueryParams,
  });

  const watchedSearchText = watch("searchText");
  const { data, error } = useInvoices({
    searchText: parsedQueryParams.searchText,
    statusFilter: parsedQueryParams.statusFilter,
  });

  useEffect(() => {
    const searchParamsString = qs.stringify(
      {
        searchText: watchedSearchText,
        statusFilter: statusFilter,
      },
      {
        skipNulls: true,
        filter: (_, value) => value || undefined,
      },
    );
    setSearchParams(searchParamsString);
  }, [watchedSearchText, setSearchParams, statusFilter]);

  const handleInvoiceClick = (invoice: Invoice) => {
    navigate(`/${lang}/invoices/${invoice.id}`, {
      state: { invoice },
    });
  };

  const handleFilter = (status: string) => {
    setStatusFilter(status);
  };

  if (error) return <div>Error loading invoices</div>;

  const count = data?.length;
  console.log(data);

  return (
    <div className="w-full flex flex-col min-h-[100%] items-center h-sm:gap-y-[64px]  gap-y-[15px] px-4">
      <div className="h-sm:mt-[77px] mt-[20px] lg:w-[780px] md:w-[560px] gap-x-[40px] h-[55px] flex justify-between">
        <div className="flex flex-col">
          <p className="text-3xl font-bold">{t("invoices-page.title")}</p>
          <p className="text-muted-foreground opacity-55">
            {count
              ? t("invoices-page.total-invoices", { count })
              : t("invoices-page.no-invoices")}
          </p>
        </div>
        <div>
          <Controller
            name="searchText"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <Input
                    name="client_name"
                    value={value}
                    onChange={onChange}
                    placeholder={t("invoices-page.search-placeholder")}
                  />
                </>
              );
            }}
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-x-[40px] justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <p className="font-bold flex items-center gap-x-2">
                {t("invoices-page.filter-status")}{" "}
                <img src={DownArrow} alt="down-arrow" />
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleFilter("")}>
                {t("invoices-page.clear-filter")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleFilter("paid")}>
                {t("invoices-page.status.paid")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilter("pending")}>
                {t("invoices-page.status.pending")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilter("draft")}>
                {t("invoices-page.status.draft")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <EditAddDialog
            action={t("invoices-page.new-invoice")}
          ></EditAddDialog>
        </div>
      </div>

      {data?.length ? (
        <div className="max-h-[60vh] custom-scrollbar overflow-auto lg:w-[780px] md:w-[560px] flex flex-col gap-y-4 mb-5">
          {data?.map((item) => (
            <InvoiceListItem
              item={item}
              key={item.id}
              onClick={() => handleInvoiceClick(item)}
            />
          ))}
        </div>
      ) : (
        <img src={Empty} alt="empty" />
      )}
    </div>
  );
};

export default Invoices;
