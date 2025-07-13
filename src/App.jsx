import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ProtectedAuth from "./components/ProtectedAuth/ProtectedAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";
import AllOrders from "./components/AllOrders/AllOrders";
import CheckOut from "./components/CheckOut/CheckOut";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
function App() {
  let queryClient = new QueryClient();

  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoutes>
              <CheckOut />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/productDetails/:id/:category",
          element: <ProductDetails />,
        },
        {
          path: "/categoryDetails/:id",
          element: <CategoryDetails />,
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        {
          path: "/register",
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="top-right" reverseOrder={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
