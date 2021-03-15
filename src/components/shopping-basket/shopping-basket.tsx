import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  GroupedItem,
  shoppingBasketCalculationState,
  shoppingBasketItemsState,
} from "./state/shopping-basket.state";
import "./shopping-basket.scss";
import { Item } from "../item-list/services/item-provider/item-provider.service";
import { appState } from "../app/state/app.state";
import { Fragment } from "react";
import { ShoppingBasketGroupItem } from "./services/shopping-basket-group-items/shopping-basket-group-items";
import { ShoppingBasketSummary } from "./services/shopping-basket-summary/shopping-basket-summary";

export const ShoppingBasket: React.FC = () => {
  const setBasketItemList = useSetRecoilState(shoppingBasketItemsState);
  const setShoppingStatus = useSetRecoilState(appState);
  const { groupedItems, totalCost, totalDiscount, totalPay } = useRecoilValue(
    shoppingBasketCalculationState
  );

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
            <Fragment key={`${item.id}-${index}`}>
              <ShoppingBasketGroupItem
                item={item}
                handleRemoveItem={handleRemoveItem}
              />
            </Fragment>
          );
        })}

      {groupedItems.length > 0 && (
        <ShoppingBasketSummary
          totalCost={totalCost}
          totalPay={totalPay}
          totalDiscount={totalDiscount}
          setShoppingAsDone={() => setShoppingStatus({ isShoppingDone: true })}
        />
      )}
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
