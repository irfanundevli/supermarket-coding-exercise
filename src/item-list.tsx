import { itemList } from "./item.service";

export const ItemList: React.FC = () => {
  const items = itemList();

  return (
    <div>
      <div>Item List</div>
      {items?.map((item, index) => {
        return (
          <div key={`${item.id}-${index}`}>
            <div>{item.name}</div>
            <div>{item.price}</div>
          </div>
        );
      })}
    </div>
  );
};
