import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

const ItemList = ({ itemsArray }) => {
  const dispatch = useDispatch();

  const handleAddItem = (items) => {
    dispatch(addItem(items));
  };

  return itemsArray.map((items, index) => {
    return (
      <div key={items.card.info.id} className="item">
        <ul>
          <li>
            {items.card.info.name} - {items.card.info.price / 100}
          </li>
          <span>{items.card.info.description}</span>
          <li>
            <button onClick={() => handleAddItem(items)}>Add+</button>
          </li>
        </ul>
      </div>
    );
  });
};

export default ItemList;
