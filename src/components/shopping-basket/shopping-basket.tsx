import { useRecoilValue } from "recoil";
import { shoppingBasketCalculationState } from "./shopping-basket.state";
import "./shopping-basket.scss";

export const ShoppingBasket: React.FC = () => {
  const { groupedItems, totalCost } = useRecoilValue(
    shoppingBasketCalculationState
  );

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
              <div>{item.name}</div>
              <div>Qty: {item.quantity}</div>
              <div>{item.unitPrice}</div>
            </div>
          );
        })}
      {groupedItems.length > 0 && <div>Sub-total: {totalCost}</div>}
    </div>
  );
};
