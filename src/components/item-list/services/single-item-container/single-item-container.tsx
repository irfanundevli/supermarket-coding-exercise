import { Item } from "../item-provider/item-provider.service";

type SingleItemContainerProps = {
  item: Item;
  handleAddToBasket: (item: Item) => void;
};

export const SingleItemContainer: React.FC<SingleItemContainerProps> = ({
  item,
  handleAddToBasket,
}) => {
  return (
    <div className="c-item-list__item">
      <img
        className="c-item-list__item-image"
        src={item.imageUrl}
        alt={item.name}
      />
      <div>{item.name}</div>
      <div>{item.price}</div>
      <button
        onClick={() => {
          handleAddToBasket(item);
        }}
      >
        Add to Basket
      </button>
    </div>
  );
};
