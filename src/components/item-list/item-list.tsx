import { Fragment } from "react";
import { Item, itemList } from "./services/item-provider/item-provider.service";
import "./item-list.scss";
import { useSetRecoilState } from "recoil";
import { shoppingBasketItemsState } from "../shopping-basket/state/shopping-basket.state";
import { SingleItemContainer } from "./services/single-item-container/single-item-container";

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
              <Fragment key={`${item.id}-${index}`}>
                <SingleItemContainer
                  item={item}
                  handleAddToBasket={handleAddToBasket}
                />
              </Fragment>
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
