import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../context/TokenContext";
import Cookies from "js-cookie";
import { CartContext } from "../../context/CartContext";

function Navbar() {
  let { token, setToken } = useContext(TokenContext);
  let { numOfItems, getCartProducts } = useContext(CartContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      <div className="navbar w-full md:w-[90%] mx-auto">
        <div className="navbar-start">
          {token ? (
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden "
                onClick={() => setIsDropdownOpen((prev) => !prev)}
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
                className={`menu menu-sm dropdown-content mt-3 z-[9999] p-2 shadow bg-base-100 rounded-box w-52 ${
                  isDropdownOpen ? "block" : "hidden"
                }`}
              >
                <li>
                  <NavLink
                    to="/"
                    onClick={() => setIsDropdownOpen(false)}
                    className={({ isActive }) =>
                      `text-xl ${
                        isActive
                          ? "text-main-color font-semibold"
                          : "text-gray-700"
                      } focus:outline-none focus:bg-transparent`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    onClick={() => setIsDropdownOpen(false)}
                    className={({ isActive }) =>
                      `text-xl ${
                        isActive
                          ? "text-main-color font-semibold"
                          : "text-gray-700"
                      } focus:outline-none focus:bg-transparent`
                    }
                  >
                    Cart
                  </NavLink>
                  {numOfItems > 0 ? (
                    <div
                      className={`h-[24px] w-[20px] rounded-full bg-red-500  flex justify-center items-center text-white absolute left-[48px] top-[-4px] hover:bg-red-500`}
                    >
                      {numOfItems}
                    </div>
                  ) : null}
                </li>
                <li>
                  <NavLink
                    to="/products"
                    onClick={() => setIsDropdownOpen(false)}
                    className={({ isActive }) =>
                      `text-xl ${
                        isActive
                          ? "text-main-color font-semibold"
                          : "text-gray-700"
                      } focus:outline-none focus:bg-transparent`
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/categories"
                    onClick={() => setIsDropdownOpen(false)}
                    className={({ isActive }) =>
                      `text-xl ${
                        isActive
                          ? "text-main-color font-semibold"
                          : "text-gray-700"
                      } focus:outline-none focus:bg-transparent`
                    }
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/brands"
                    onClick={() => setIsDropdownOpen(false)}
                    className={({ isActive }) =>
                      `text-xl ${
                        isActive
                          ? "text-main-color font-semibold"
                          : "text-gray-700"
                      } focus:outline-none focus:bg-transparent`
                    }
                  >
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
            <ul className="menu menu-horizontal px-1 focus:outline-none">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-xl ${
                      isActive
                        ? "text-main-color font-semibold"
                        : "text-gray-700"
                    } focus:outline-none focus:bg-transparent`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="relative">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `text-xl ${
                      isActive
                        ? "text-main-color font-semibold"
                        : "text-gray-700"
                    } focus:outline-none focus:bg-transparent`
                  }
                >
                  Cart
                </NavLink>
                {numOfItems > 0 ? (
                  <div
                    className={`h-[28px] w-[20px] rounded-full bg-red-500 flex justify-center items-center text-white absolute top-[-8px] right-[-10px] hover:bg-red-500`}
                  >
                    {numOfItems}
                  </div>
                ) : null}
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `text-xl ${
                      isActive
                        ? "text-main-color font-semibold"
                        : "text-gray-700"
                    } focus:outline-none focus:bg-transparent`
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    `text-xl ${
                      isActive
                        ? "text-main-color font-semibold"
                        : "text-gray-700"
                    } focus:outline-none focus:bg-transparent`
                  }
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/brands"
                  className={({ isActive }) =>
                    `text-xl ${
                      isActive
                        ? "text-main-color font-semibold"
                        : "text-gray-700"
                    } focus:outline-none focus:bg-transparent`
                  }
                >
                  Brands
                </NavLink>
              </li>
            </ul>
          ) : null}
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal flex-nowrap">
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
