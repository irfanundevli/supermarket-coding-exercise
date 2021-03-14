import { render, screen } from "@testing-library/react";
import { ShoppingBasket } from "./shopping-basket";
import { useRecoilValue } from "recoil";
import { GroupedItem } from "./shopping-basket.state";

jest.mock("recoil");
const mockUseRecoilValue = useRecoilValue as jest.MockedFunction<
  typeof useRecoilValue
>;

describe("shopping basket component", () => {
  const item1: GroupedItem = {
    id: "1",
    name: "Face Mask",
    unitPrice: 2.5,
    imageUrl: "/placeholder1.png",
    quantity: 1,
  };

  const item2: GroupedItem = {
    id: "2",
    name: "Toilet Paper",
    unitPrice: 0.65,
    imageUrl: "/placeholder2.png",
    quantity: 1,
  };

  const setGroupedItemsAndTotalCost = (
    itemList: GroupedItem[],
    totalCost: number
  ) => {
    mockUseRecoilValue.mockReturnValue({
      groupedItems: itemList,
      totalCost,
    });
  };

  it("should render items in basket", () => {
    setGroupedItemsAndTotalCost([item1, item2], 3.15);

    render(<ShoppingBasket />);

    expect(screen.getByText(item1.name)).toBeInTheDocument();
    expect(screen.getByText(item1.unitPrice)).toBeInTheDocument();
    expect(screen.getByAltText(item1.name)).toBeInTheDocument();

    expect(screen.getByText(item2.name)).toBeInTheDocument();
    expect(screen.getByText(item2.unitPrice)).toBeInTheDocument();
    expect(screen.getByAltText(item2.name)).toBeInTheDocument();
  });

  it("should render total cost", () => {
    setGroupedItemsAndTotalCost([item1, item2], 3.15);

    render(<ShoppingBasket />);

    expect(screen.getByText("Sub-total: 3.15")).toBeInTheDocument();
  });
});
