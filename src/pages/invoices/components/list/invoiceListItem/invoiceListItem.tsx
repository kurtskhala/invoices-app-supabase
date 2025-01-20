import { Badge } from "@/components/ui/badge";
import RightArrow from "@/assets/icon-arrow-right.svg";

import { InvoiceListItemProps } from "@/types/auth";

const InvoiceListItem: React.FC<InvoiceListItemProps> = ({ item, onClick }) => {
  if (!item) return null;

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(item.invoice_date);
  date.setDate(date.getDate() + item.payment_terms);

  const formattedDate = date.toLocaleDateString("en-GB", options);

  return (
    <div
      onClick={() => onClick()}
      className="sm:p-[30px] p-[10px] rounded-[8px] shadow-[0px_4px_6px_rgba(72,84,159,0.1)] flex justify-evenly items-center sm:gap-x-2 gap-x-10 cursor-pointer"
    >
      <p>
        <span className="text-muted-foreground">#</span>

        <span className="font-bold">{`${item.id}`}</span>
      </p>
      <p className="text-muted-foreground hidden sm:block">
        Due {formattedDate}
      </p>
      <p className="text-muted-foreground hidden sm:block">{item.client_name}</p>
      <p className="font-bold hidden sm:block">£ {item.total.toFixed(2)}</p>
      <Badge variant={item.status}>{item.status}</Badge>
      <img src={RightArrow} alt="left arrow" />
    </div>
  );
};

export default InvoiceListItem;
