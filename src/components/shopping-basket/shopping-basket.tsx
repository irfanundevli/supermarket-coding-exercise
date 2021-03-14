import { useRecoilValue } from "recoil";
import { shoppingBasketItemsState } from "./shopping-basket.state";

export const ShoppingBasket: React.FC = () => {
  const itemsInBasket = useRecoilValue(shoppingBasketItemsState);

  return (
    <div>
      <div>Shopping Basket</div>
      {itemsInBasket.length > 0 &&
        itemsInBasket.map((item, index) => {
          return (
            <div key={`${item.id}-${index}`}>
              <img src={item.imageUrl} alt={item.name} />
              <div>{item.name}</div>
              <div>{item.price}</div>
            </div>
          );
        })}
    </div>
  );
};
