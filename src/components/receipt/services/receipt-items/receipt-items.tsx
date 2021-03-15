import { Item } from "../../../item-list/services/item-provider/item-provider.service";

type Props = {
  items: Item[];
};

export const ReceiptItems: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => {
        return (
          <div key={`item-${index}`} className="c-receipt__row">
            <div>{item.name}</div>
            <div>{item.price.toFixed(2)}</div>
          </div>
        );
      })}
    </>
  );
};
