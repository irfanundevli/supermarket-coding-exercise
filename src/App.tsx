import React from "react";
import { ItemList } from "./item-list";
import { ShoppingBasket } from "./shoping-basket";
import "./app.scss";

export const App: React.FC = () => {
  return (
    <div className="c-app__container">
      <ItemList />
      <ShoppingBasket />
    </div>
  );
};
