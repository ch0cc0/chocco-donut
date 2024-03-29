import { Route, Routes } from "react-router-dom";
import NavBar from "./routes/navbar";
import ProductListings from "./routes/productListings";
import Login from "./routes/login";
import ItemDetails from "./routes/itemDetails";
import Cart from "./routes/cart";
import Signup from "./routes/signup";
import NotFound from "./routes/not_found";
import SuccessPage from "./routes/success";
import FailedPage from "./routes/failed";
import Orders from "./routes/orders";
import OrderDetails from "./routes/orderDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated } from "./store/auth/authActions";
import React, { useEffect } from 'react';
import UserProfile from "./routes/userProfile";
import Home from "./routes/home";
import { ThemeProvider, createTheme } from "@mui/material";
import { getUserInfo } from "./store/user/userActions";



function App() {

  const dispatch = useDispatch();
  

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(isAuthenticated());
    };
    checkAuth();
    if (auth.isAuthenticated) {
      const getInfo = async () => {
        await dispatch(getUserInfo());
      };
      getInfo();
    }
  }, [auth.isAuthenticated, dispatch]);

  const queryClient = new QueryClient();

  const theme = createTheme({
    typography: {
      fontFamily: ['"Comic Sans MS", cursive'].join(','),
    },
    palette: {
      primary: {
        main: '#ac00a6',
      },
      secondary: {
        main: '#e58300',
      },
    },
  });


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/donuts" element={<ProductListings />} />
            <Route path="/donuts/:itemId" element={<ItemDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/orders/" element={<Orders />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
            <Route path="/orders/success" element={<SuccessPage />} />
            <Route path="/orders/failed" element={<FailedPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
