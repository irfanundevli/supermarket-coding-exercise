import { Item, itemList } from "./item.service";
import "./item-list.scss";
import { useSetRecoilState } from "recoil";
import { shoppingBasketItemsState } from "../shopping-basket/shopping-basket.state";

export const ItemList: React.FC = () => {
  const items = itemList();
  const setShoppingBasketItems = useSetRecoilState(shoppingBasketItemsState);

  const handleAddToBasket = (newItem: Item) => {
    setShoppingBasketItems((currVal) =>
      addNewItemToCurrentItemList(newItem, currVal)
    );
  };

  return (
    <div>
      <h3>Item List</h3>
      {items && items.length > 0 && (
        <div className="c-item-list__item-container">
          {items.map((item, index) => {
            return (
              <div key={`${item.id}-${index}`} className="c-item-list__item">
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
          })}
        </div>
      )}
    </div>
  );
};

export const addNewItemToCurrentItemList = (
  newItem: Item,
  currItemList: Item[]
): Item[] => {
  return [
    ...currItemList,
    {
      id: newItem.id,
      name: newItem.name,
      price: newItem.price,
      imageUrl: newItem.imageUrl,
    },
  ];
};
