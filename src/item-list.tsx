import { itemList } from "./item.service";
import "./item-list.scss";

export const ItemList: React.FC = () => {
  const items = itemList();

  return (
    <div>
      <h3>Item List</h3>
      {items && items.length > 0 && (
        <div className="c-item-list__item-container">
          {items.map((item, index) => {
            return (
              <div key={`${item.id}-${index}`} className="c-item-list__item">
                <img
                  className="c-item-list__item-image"
                  src={item.imageUrl}
                  alt={item.name}
                />
                <div>{item.name}</div>
                <div>{item.price}</div>
                <button>Add to Basket</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
