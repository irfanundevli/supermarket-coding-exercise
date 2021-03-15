import { render, screen } from "@testing-library/react";
import { Receipt } from "./receipt";
import { useRecoilValue } from "recoil";
import { Item } from "../item-list/services/item-provider/item-provider.service";
import { Discount } from "../shopping-basket/services/discount/discount.service";

jest.mock("recoil");
const mockUseRecoilValue = useRecoilValue as jest.MockedFunction<
  typeof useRecoilValue
>;

describe("receipt component", () => {
  const item: Item = {
    id: "1",
    name: "Test Item",
    price: 22,
    imageUrl: "/img-url",
  };

  const discount: Discount = {
    itemId: "1",
    promotionName: "Promotion Name",
    reducedPay: 50,
  };

  it("should render items", () => {
    mockUseRecoilValue.mockReturnValueOnce([item]).mockReturnValueOnce({
      discounts: [],
      totalPay: "0",
      totalCost: "0",
      totalDiscount: "0",
    });

    render(<Receipt />);

    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(item.price.toFixed(2))).toBeInTheDocument();
  });

  it("should render sub-total", () => {
    const subTotal = "111";
    mockUseRecoilValue.mockReturnValueOnce([item]).mockReturnValueOnce({
      discounts: [discount],
      totalPay: "0",
      totalCost: subTotal,
      totalDiscount: "0",
    });

    render(<Receipt />);

    expect(screen.getByText(subTotal)).toBeInTheDocument();
  });

  it("should render discounts", () => {
    mockUseRecoilValue.mockReturnValueOnce([item]).mockReturnValueOnce({
      discounts: [discount],
      totalPay: "0",
      totalCost: "0",
      totalDiscount: "0",
    });

    render(<Receipt />);

    expect(screen.getByText(discount.promotionName)).toBeInTheDocument();
    expect(
      screen.getByText(`-${discount.reducedPay.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("should render total savings", () => {
    const totalSavings = "34";
    mockUseRecoilValue.mockReturnValueOnce([item]).mockReturnValueOnce({
      discounts: [discount],
      totalPay: "0",
      totalCost: "0",
      totalDiscount: totalSavings,
    });

    render(<Receipt />);

    expect(screen.getByText(totalSavings)).toBeInTheDocument();
  });

  it("should render total pay", () => {
    const totalPay = "9990";
    mockUseRecoilValue.mockReturnValueOnce([item]).mockReturnValueOnce({
      discounts: [],
      totalPay: totalPay,
      totalCost: "0",
      totalDiscount: "0",
    });

    render(<Receipt />);

    expect(screen.getByText(totalPay)).toBeInTheDocument();
  });
});
