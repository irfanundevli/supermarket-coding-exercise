import { render, screen } from "@testing-library/react";
import { ShoppingBasket } from "./shopping-basket";
import { useRecoilValue } from "recoil";
import { Item } from "../item-list/item.service";

jest.mock("recoil");
const mockUseRecoilValue = useRecoilValue as jest.MockedFunction<
  typeof useRecoilValue
>;

describe("shopping basket component", () => {
  const item1 = {
    id: "1",
    name: "Face Mask",
    price: 2.5,
    imageUrl: "/placeholder1.png",
  };

  const item2 = {
    id: "2",
    name: "Toilet Paper",
    price: 0.65,
    imageUrl: "/placeholder2.png",
  };

  const setItems = (itemList: Item[]) => {
    mockUseRecoilValue.mockReturnValue(itemList);
  };

  it("should render items in basket", () => {
    setItems([item1, item2]);

    render(<ShoppingBasket />);

    expect(screen.getByText(item1.name)).toBeInTheDocument();
    expect(screen.getByText(item1.price)).toBeInTheDocument();
    expect(screen.getByAltText(item1.name)).toBeInTheDocument();

    expect(screen.getByText(item2.name)).toBeInTheDocument();
    expect(screen.getByText(item2.price)).toBeInTheDocument();
    expect(screen.getByAltText(item2.name)).toBeInTheDocument();
  });
});
