import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { TokenContext } from "../../context/TokenContext";
import Cookies from "js-cookie";
import { CartContext } from "../../context/CartContext";

function Navbar() {
  let { token, setToken } = useContext(TokenContext);
  let { numOfItems, getCartProducts } = useContext(CartContext);
  let navigate = useNavigate();

  async function fetchCartProducts() {
    await getCartProducts();
    // console.log("Cart products:", res.data.data.products);
    // setCartItems(res.data.data.products);
    // setLoading(false);
  }

  useEffect(() => {
    if (Cookies.get("userToken")) {
      fetchCartProducts();
    }
  }, []);

  function logOut() {
    Cookies.remove("userToken");
    window.location.href = "/login";
  }

  return (
    <div className="bg-slate-100">
      <div className="navbar w-full md:w-[90%] mx-auto ">
        <div className="navbar-start">
          {token ? (
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink to="/" className="text-lg">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/cart" className="text-lg">
                    Cart
                  </NavLink>
                  {numOfItems > 0 ? (
                    <div className="w-[16px] h-[20px] bg-red-500 rounded-full flex justify-center items-center text-white absolute top-[0] left-11">
                      {numOfItems}
                    </div>
                  ) : null}
                </li>
                <li>
                  <NavLink to="/products" className="text-lg">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/categories" className="text-lg">
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/brands" className="text-lg">
                    Brands
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : null}
          <Link to="/" className="btn btn-ghost text-xl">
            <img src={logo} alt="Logo image" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          {token ? (
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink to="/" className="text-xl">
                  Home
                </NavLink>
              </li>
              <li className="relative">
                <NavLink to="/cart" className="text-xl">
                  Cart
                </NavLink>
                {numOfItems > 0 ? (
                  <div className="w-[1px] h-[24px] bg-red-500 rounded-full flex justify-center items-center text-white absolute top-[-4px] right-[-6px]">
                    {numOfItems}
                  </div>
                ) : null}
              </li>
              <li>
                <NavLink to="/products" className="text-xl">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories" className="text-xl">
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink to="/brands" className="text-xl">
                  Brands
                </NavLink>
              </li>
            </ul>
          ) : null}
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            {token ? (
              <li>
                <a onClick={() => logOut()} className="text-xl">
                  Logout
                </a>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className="text-xl">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Register" className="text-xl">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
