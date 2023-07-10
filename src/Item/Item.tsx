import { Button, Typography } from "@mui/material";
import { CartItemType } from "../App";
import "./Item.css";

export interface ItemType {
  item: CartItemType;
  handleAddToCart: (clickAddToCart: CartItemType) => void;
}

export const Item: React.FC<ItemType> = (items) => {
  const handleToCart = (item: CartItemType) => {
    items.handleAddToCart(item);
  };
  return (
    <div className="item">
      <img src={items.item.image} alt={items.item.image} className="image" />
      <div className="writting">
        <Typography>{items.item.title}</Typography>
        <Typography>{items.item.description}</Typography>
        <Typography>${items.item.price}</Typography>
      </div>
      <Button
        className="button"
        onClick={() => {
          handleToCart(items.item);
        }}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default Item;
