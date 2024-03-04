import { Route, Routes } from "react-router-dom";
import NavBar from "./routes/navbar";
import Home from "./routes/home";
import Login from "./routes/login";
import Signup from "./routes/signup";
import NotFound from "./routes/not_found";
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
