import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  GroupedItem,
  shoppingBasketCalculationState,
  shoppingBasketItemsState,
} from "./shopping-basket.state";
import "./shopping-basket.scss";
import { Item } from "../item-list/item.service";

export const ShoppingBasket: React.FC = () => {
  const { groupedItems, totalCost } = useRecoilValue(
    shoppingBasketCalculationState
  );
  const setBasketItemList = useSetRecoilState(shoppingBasketItemsState);

  const handleRemoveItem = (item: GroupedItem) => {
    setBasketItemList((oldBasketItems) =>
      removeItemFromCurrentList(item, oldBasketItems)
    );
  };

  return (
    <div className="c-shopping-basket">
      <h3>Shopping Basket</h3>
      {groupedItems.length > 0 &&
        groupedItems.map((item, index) => {
          return (
            <div
              key={`${item.id}-${index}`}
              className="c-shopping-basket__item"
            >
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
              <div>{item.unitPrice}</div>
            </div>
          );
        })}
      {groupedItems.length > 0 && <div>Sub-total: {totalCost}</div>}
    </div>
  );
};

export const removeItemFromCurrentList = (
  item: GroupedItem,
  currList: Item[]
): Item[] => {
  return currList.filter((value) => {
    return value.id !== item.id;
  });
};
