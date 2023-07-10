import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "react-query";
import {
  Badge,
  Button,
  ButtonGroup,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
} from "@mui/material";
import Item from "./Item/Item";
import { Home, ShoppingCart } from "@mui/icons-material";
import Cart from "./Cart/Cart";
export interface CartItemType {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> => {
  const products = (await fetch("https://fakestoreapi.com/products")) as any;
  const allProducts = products.json();
  return allProducts as CartItemType[];
};

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const getTotalItems = (items: CartItemType[]) => {
    items.reduce((ark: number, item) => ark + item.amount, 0);
  };

  const handleAddItem = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      console.log(isItemInCart);
      if (isItemInCart) {
        return prev.map((item) => {
          if (item.id === clickedItem.id) {
            const newItem = {
              ...item,
              amount: item.amount + 1,
            };
            console.log(newItem.amount);
            return newItem;
          } else {
            return item;
          }
        });
      }
      const newClicked = {
        ...clickedItem,
        amount: 1,
      };
      return [...prev, newClicked];
    });
  };
  const handleremoveItem = (id: number) => {
    setCartItems((prev) => {
      return prev.reduce((ark, item) => {
        if (id === item.id) {
          if (item.amount === 1) return ark;
          return [...ark, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ark, item];
        }
      }, [] as CartItemType[]);
    });
  };
  if (isLoading) return <LinearProgress />;
  if (error) return <div>something went wrong</div>;
  return (
    <>
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => {
          setCartOpen(false);
        }}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddItem}
          removeFromCart={handleremoveItem}
        />
      </Drawer>
      <ButtonGroup className="cartButton">
        <IconButton
          onClick={() => {
            setCartOpen(true);
          }}
        >
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </ButtonGroup>
      <div className="totalGrid">
        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddItem} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default App;
