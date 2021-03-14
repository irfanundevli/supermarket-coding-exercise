import { render, screen } from "@testing-library/react";
import { removeItemFromCurrentList, ShoppingBasket } from "./shopping-basket";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { GroupedItem } from "./shopping-basket.state";
import userEvent from "@testing-library/user-event";
import { Item } from "../item-list/item.service";

jest.mock("recoil");
const mockUseRecoilValue = useRecoilValue as jest.MockedFunction<
  typeof useRecoilValue
>;
const mockUseSetRecoilState = useSetRecoilState as jest.MockedFunction<
  typeof useSetRecoilState
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
    quantity: 2,
  };

  it("should render items in basket", () => {
    mockUseRecoilValue.mockReturnValueOnce({
      groupedItems: [item1, item2],
      totalCost: 3.15,
    });

    render(<ShoppingBasket />);

    expect(screen.getByText(item1.name)).toBeInTheDocument();
    expect(screen.getByText(item1.unitPrice)).toBeInTheDocument();
    expect(screen.getByAltText(item1.name)).toBeInTheDocument();
    expect(screen.getByText(`Qty: ${item1.quantity}`)).toBeInTheDocument();

    expect(screen.getByText(item2.name)).toBeInTheDocument();
    expect(screen.getByText(item2.unitPrice)).toBeInTheDocument();
    expect(screen.getByAltText(item2.name)).toBeInTheDocument();
    expect(screen.getByText(`Qty: ${item2.quantity}`)).toBeInTheDocument();
  });

  it("should render total cost", () => {
    mockUseRecoilValue.mockReturnValueOnce({
      groupedItems: [item1, item2],
      totalCost: 3.15,
    });

    render(<ShoppingBasket />);

    expect(screen.getByText("Sub-total: 3.15")).toBeInTheDocument();
  });

  it("should remove grouped item from item list when remove button is clicked", () => {
    mockUseRecoilValue
      .mockReturnValueOnce({
        groupedItems: [item1],
        totalCost: 0.65,
      })
      .mockReturnValue({
        groupedItems: [],
      });
    const mocksetBasketItemList = jest.fn();
    mockUseSetRecoilState.mockReturnValue(mocksetBasketItemList);

    render(<ShoppingBasket />);
    userEvent.click(screen.getByText("Remove"));

    expect(mocksetBasketItemList).toHaveBeenNthCalledWith(
      1,
      expect.any(Function)
    );
  });
});

describe("removeItemFromCurrentList", () => {
  const item1: Item = {
    id: "1",
    name: "Face Mask",
    price: 2.5,
    imageUrl: "/placeholder1.png",
  };

  const item2: Item = {
    id: "2",
    name: "Hand Sanitizer",
    price: 2.5,
    imageUrl: "/placeholder2.png",
  };

  it("should remove item from current list", () => {
    const currentList = [item1, item2];
    const { id, name, imageUrl, price: unitPrice } = item1;
    const groupedItem = { id, name, imageUrl, unitPrice, quantity: 1 };

    const result = removeItemFromCurrentList(groupedItem, currentList);

    expect(result).toEqual([item2]);
  });
});
