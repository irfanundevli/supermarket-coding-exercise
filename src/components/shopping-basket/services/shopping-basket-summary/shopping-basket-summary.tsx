type Props = {
  totalCost: string;
  totalDiscount: string;
  totalPay: string;
  setShoppingAsDone: () => void;
};
export const ShoppingBasketSummary: React.FC<Props> = ({
  totalCost,
  totalDiscount,
  totalPay,
  setShoppingAsDone,
}) => {
  return (
    <div className="c-shopping-basket__summary">
      <div>Sub-total: {totalCost}</div>
      <div>Total savings: {totalDiscount}</div>
      <div>Total to Pay: {totalPay}</div>
      <button
        onClick={() => {
          setShoppingAsDone();
        }}
      >
        Buy Now
      </button>
    </div>
  );
};
