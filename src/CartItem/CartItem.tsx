import { Button, Typography } from "@mui/material";
import { CartItemType } from "../App";
import "./CartItem.css";

export interface CartItemProp {
  cartItem: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

export const CartItem: React.FC<CartItemProp> = (CartItem) => {
  const addAmount = () => {
    CartItem.addToCart(CartItem.cartItem);
  };
  const reduceAmount = () => {
    console.log("del");
    CartItem.removeFromCart(CartItem.cartItem.id);
  };
  return (
    <div>
      <Typography
        variant="h6"
        paddingLeft={1}
        paddingRight={1}
        className="title"
      >
        {CartItem.cartItem.title}
      </Typography>
      <div className="information">
        <div className="list">
          <div className="price">
            <Typography variant="body1">
              Price: ${CartItem.cartItem.price}
            </Typography>
            <Typography variant="body1">
              Price: $
              {(CartItem.cartItem.amount * CartItem.cartItem.price).toFixed(2)}
            </Typography>
          </div>
          <div className="buttonsOnClick">
            <Button
              color="secondary"
              variant="outlined"
              className="writing"
              onClick={() => {
                reduceAmount();
              }}
            >
              <Typography variant="h6">-</Typography>
            </Button>
            <Typography variant="h6" className="writing">
              {CartItem.cartItem.amount}
            </Typography>
            <Button
              color="primary"
              variant="outlined"
              className="writing"
              onClick={() => {
                addAmount();
              }}
            >
              <Typography variant="h6">+</Typography>
            </Button>
          </div>
        </div>
        <img src={CartItem.cartItem.image} className="someImage" alt="cloth" />
      </div>
    </div>
  );
};

export default CartItem;
