type Props = {
  totalPay: string;
};

export const ReceiptTotalPay: React.FC<Props> = ({ totalPay }) => {
  return (
    <>
      <div>---------------------------</div>
      <div className="c-receipt__row">
        <div>Total to Pay</div>
        <div>{totalPay}</div>
      </div>
    </>
  );
};
