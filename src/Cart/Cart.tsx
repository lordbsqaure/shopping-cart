import { Typography } from "@mui/material";
import { CartItemType } from "../App";
import CartItem from "../CartItem/CartItem";

export interface CartProp {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

const Cart: React.FC<CartProp> = (cart) => {
  const calculateTotal = () => {
    return cart.cartItems.reduce(
      (prev, current) => prev + current.price * current.amount,
      0
    );
  };
  return (
    <>
      <Typography variant="h3">Your shopping cart</Typography>
      {!cart.cartItems.length && <Typography>No item in cart</Typography>}
      {cart?.cartItems.map((item) => (
        <CartItem
          key={item.id}
          cartItem={item}
          addToCart={cart.addToCart}
          removeFromCart={cart.removeFromCart}
        />
      ))}
      {cart.cartItems.length !== 0 && (
        <Typography variant="h4">Total: ${calculateTotal()}</Typography>
      )}
    </>
  );
};

export default Cart;
