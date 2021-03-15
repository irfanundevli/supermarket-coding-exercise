import { GroupedItem } from "../../state/shopping-basket.state";

type Props = {
  item: GroupedItem;
  handleRemoveItem: (item: GroupedItem) => void;
};

export const ShoppingBasketGroupItem: React.FC<Props> = ({
  item,
  handleRemoveItem,
}) => {
  return (
    <div className="c-shopping-basket__item">
      <img
        className="c-shopping-basket__item-image"
        src={item.imageUrl}
        alt={item.name}
      />
      <div>
        <div>{item.name}</div>
        <div className="c-shopping-basket__item-desc">
          <div>Qty: {item.quantity}</div>
          <div className="c-shopping-basket__seperator">{"|"}</div>
          <a
            href="/"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              handleRemoveItem(item);
            }}
          >
            Remove
          </a>
        </div>
      </div>
      <div>{(item.unitPrice * item.quantity).toFixed(2)}</div>
    </div>
  );
};
