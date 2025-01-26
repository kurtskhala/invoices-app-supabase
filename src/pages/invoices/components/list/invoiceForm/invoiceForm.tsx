/* eslint-disable */
// @ts-nocheck
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/data-picker";
import deleteIcon from "@/assets/icon-delete.svg";
import { DrawerClose } from "@/components/ui/drawer";
import { v4 as uuidv4 } from "uuid";
import { InvoiceFormProps } from "@/types/auth";
import { invoiceSchema, type InvoiceFormData } from "@/schemas/invoice.schema";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateInvoice,
  useUpdateInvoice,
} from "@/hooks/invoices/useCreateInvoice";
import { useInvoice } from "@/hooks/invoices/useInvoices";
import { useTranslation } from "react-i18next";
/* eslint-disable */

const InvoiceForm: FC<InvoiceFormProps> = ({ action }) => {
  const navigate = useNavigate();
  const { mutate: createInvoice, isPending } = useCreateInvoice();
  const { mutate: updateInvoice } = useUpdateInvoice();
  const { lang, id } = useParams();
  const { data: invoice } = useInvoice(id as string);
  const { t } = useTranslation();

  const defaultValues =
    action === "Edit"
      ? {
          clientName: invoice?.client_name,
          clientAddress: invoice?.client_address,
          invoiceDate: invoice?.invoice_date && new Date(invoice.invoice_date),
          status: invoice?.status,
          paymentTerms: invoice?.payment_terms,
          items: invoice?.items,
        }
      : {
          clientName: "",
          clientAddress: "",
          invoiceDate: new Date(),
          status: "draft",
          paymentTerms: 30,
          items: [
            {
              id: uuidv4(),
              name: "",
              quantity: 0,
              price: 0,
            },
          ],
        };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
  });

  const onSubmit = async (data: InvoiceFormData) => {
    try {
      action === "Edit"
        ? await updateInvoice(
            { ...data, id },
            {
              onSuccess: () => {
                navigate(`/${lang}/invoices`);
              },
              onError: (error) => {
                console.error("Error updating invoice:", error);
              },
            },
          )
        : await createInvoice(data, {
            onSuccess: () => {
              navigate(`/${lang}/invoices`);
            },
            onError: (error) => {
              console.error("Error creating invoice:", error);
            },
          });
    } catch (error) {
      console.error("Error in submit handler:", error);
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const addItem = () => {
    append({
      id: uuidv4(),
      name: "",
      quantity: 0,
      price: 0,
    });
  };

  return (
    <Card className="md:w-full border-none bg-background p-0 shadow-none">
      <CardContent>
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          {/* Bill To Section */}
          <div className="space-y-4">
            <h3 className="text-md text-primary-purple font-bold">
              {t("invoices-page.form.bill_to")}
            </h3>
            <div className="grid gap-4">
              <Controller
                name="clientName"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      {t("invoices-page.form.client-name")}
                    </Label>
                    <Input
                      {...field}
                      className="text-foreground font-bold"
                      placeholder="Alex Grim"
                    />
                    {errors.clientName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.clientName.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="clientAddress"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      {t("invoices-page.form.street-address")}
                    </Label>
                    <Input
                      {...field}
                      className="text-foreground font-bold"
                      placeholder="84 Church Way"
                    />
                    {errors.clientAddress && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.clientAddress.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Invoice Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="invoiceDate"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <Label className="text-sm text-muted-foreground pb-1">
                      {t("invoices-page.form.invoice-date")}
                    </Label>
                    <DatePicker
                      handleDateChange={(date) => field.onChange(date)}
                    />
                    {errors.invoiceDate && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.invoiceDate.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="paymentTerms"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label className="text-sm text-muted-foreground">
                      {t("invoices-page.form.payment-terms")}
                    </Label>
                    <Input
                      {...field}
                      type="number"
                      className="text-foreground font-bold"
                      placeholder="Net 30 Days"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      value={field.value || ""}
                    />
                    {errors.paymentTerms && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.paymentTerms.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">
              {t("invoices-page.form.item-list")}
            </h3>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  className="grid grid-cols-12 gap-4 items-center"
                  key={field.id}
                >
                  <Controller
                    name={`items.${index}.name`}
                    control={control}
                    render={({ field }) => (
                      <div className="col-span-4">
                        <Label className="text-sm text-muted-foreground">
                          {t("invoices-page.form.item-name")}
                        </Label>
                        <Input
                          {...field}
                          className="text-foreground font-bold"
                          placeholder="Banner Design"
                        />
                        {errors.items?.[index]?.name && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.items[index]?.name?.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name={`items.${index}.quantity`}
                    control={control}
                    render={({ field }) => (
                      <div className="col-span-2">
                        <Label className="text-sm text-muted-foreground">
                          {t("invoices-page.form.quantity")}
                        </Label>
                        <Input
                          {...field}
                          type="number"
                          className="text-foreground font-bold"
                          placeholder="1"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          value={field.value || ""}
                        />
                        {errors.items?.[index]?.quantity && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.items[index]?.quantity?.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name={`items.${index}.price`}
                    control={control}
                    render={({ field }) => (
                      <div className="col-span-2">
                        <Label className="text-sm text-muted-foreground">
                          {t("invoices-page.form.price")}
                        </Label>
                        <Input
                          {...field}
                          type="number"
                          className="text-foreground font-bold"
                          placeholder="156.00"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          value={field.value || ""}
                        />
                        {errors.items?.[index]?.price && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.items[index]?.price?.message}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <div className="col-span-2">
                    <Label className="text-sm text-muted-foreground">
                      {t("invoices-page.form.total")}
                    </Label>
                    <Input
                      className="text-foreground font-bold"
                      disabled
                      value={(
                        watch(`items.${index}.quantity`) *
                        watch(`items.${index}.price`)
                      ).toFixed(2)}
                    />
                  </div>

                  <img
                    className={`col-span-2 pt-4 ${
                      fields.length > 1 ? "opacity-100" : "opacity-50"
                    }`}
                    src={deleteIcon}
                    alt="delete icon"
                    onClick={() => fields.length > 1 && remove(index)}
                  />
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full" onClick={addItem}>
              + {t("invoices-page.form.add-new-item")}
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            {action === "Edit" ? (
              <>
                <DrawerClose asChild>
                  <Button variant="destructive">
                    {t("invoices-page.form.cancel")}
                  </Button>
                </DrawerClose>
                <Button variant="custom">
                  {t("invoices-page.form.update")}
                </Button>
              </>
            ) : (
              <>
                <DrawerClose asChild>
                  <Button variant="destructive">
                    {t("invoices-page.form.discard")}
                  </Button>
                </DrawerClose>
                <Button
                  variant="secondary"
                  onClick={() =>
                    handleSubmit((data) =>
                      onSubmit({ ...data, status: "draft" }),
                    )()
                  }
                  disabled={isPending}
                >
                  {t("invoices-page.form.save-draft")}
                </Button>
                <Button
                  type="submit"
                  variant="custom"
                  onClick={() =>
                    handleSubmit((data) =>
                      onSubmit({ ...data, status: "pending" }),
                    )()
                  }
                  disabled={isPending}
                >
                  {t("invoices-page.form.save-send")}
                </Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
