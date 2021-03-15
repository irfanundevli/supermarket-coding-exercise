import { Discount } from "../../../shopping-basket/services/discount/discount.service";

type Props = {
  discounts: Discount[];
  totalDiscount: string;
  totalCost: string;
};

export const ReceiptDiscount: React.FC<Props> = ({
  discounts,
  totalCost,
  totalDiscount,
}) => {
  return discounts.length > 0 ? (
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
  ) : (
    <></>
  );
};
