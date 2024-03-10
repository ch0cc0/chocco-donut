import { Route, Routes } from "react-router-dom";
import NavBar from "./routes/navbar";
import Home from "./routes/home";
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


function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/donuts/:itemId" element={<ItemDetails />} />
        <Route path="/cart/:userId" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/orders/*" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/orders/success" element={<SuccessPage />} />
        <Route path="/orders/failed" element={<FailedPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
