import { Fragment } from "react";
import { useRecoilValue } from "recoil";
import {
  shoppingBasketCalculationState,
  shoppingBasketItemsState,
} from "../shopping-basket/state/shopping-basket.state";
import "./receipt.scss";

export const Receipt: React.FC = () => {
  const items = useRecoilValue(shoppingBasketItemsState);
  const { discounts, totalCost, totalDiscount, totalPay } = useRecoilValue(
    shoppingBasketCalculationState
  );

  return (
    <div className="c-receipt">
      {items.map((item, index) => {
        return (
          <div key={`item-${index}`} className="c-receipt__row">
            <div>{item.name}</div>
            <div>{item.price.toFixed(2)}</div>
          </div>
        );
      })}
      {discounts.length > 0 && (
        <>
          <div>-----</div>
          <div className="c-receipt__row">
            <div>Sub-total</div>
            <div>{totalCost}</div>
          </div>
          <div className="c-receipt__row">
            <div>Savings</div>
          </div>
          {discounts.map((discount, index) => {
            return (
              <div key={`discount-${index}`} className="c-receipt__row">
                <div>{discount.promotionName}</div>
                <div>-{discount.reducedPay.toFixed(2)}</div>
              </div>
            );
          })}
          <div>-----</div>
          <div className="c-receipt__row">
            <div>Total savings</div>
            <div>{totalDiscount}</div>
          </div>
        </>
      )}
      <div>---------------------------</div>
      <div className="c-receipt__row">
        <div>Total to Pay</div>
        <div>{totalPay}</div>
      </div>
    </div>
  );
};
