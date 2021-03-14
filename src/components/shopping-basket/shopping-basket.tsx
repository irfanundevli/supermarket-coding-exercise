import { useRecoilValue } from "recoil";
import { shoppingBasketItemsState } from "./shopping-basket.state";
import "./shopping-basket.scss";

export const ShoppingBasket: React.FC = () => {
  const itemsInBasket = useRecoilValue(shoppingBasketItemsState);

  return (
    <div className="c-shopping-basket">
      <h3>Shopping Basket</h3>
      {itemsInBasket.length > 0 &&
        itemsInBasket.map((item, index) => {
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
              <div>{item.price}</div>
            </div>
          );
        })}
    </div>
  );
};
