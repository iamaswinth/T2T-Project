import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom"; // ✅ Fixed import
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice.js";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {}
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  console.log(userInfo);

  return (
    <div>
      <section className="py-4 lg:py-8 fixed w-full top-0 z-50">
        <div className="container">
          <div className="border border-black/15 rounded-[27px] md:rounded-full backdrop-blur-lg bg-[#BOBOBO]/30">
            <div className="grid grid-cols-2 lg:grid-cols-3 p-2 px-4 md:pr-2 items-center">
              {/* Logo */}
              <div className="text-[1.5rem] font-semibold">T2T</div>

              {/* Desktop Navigation */}
              <div className="lg:flex justify-center items-center hidden">
                <nav className="flex gap-6 font-medium">
                  <Link to="/">HOME</Link>
                  <Link to="/shop">SHOP</Link>
                  <Link to="/cart">CART</Link>
                  <Link to="/favorite">FAVORITE</Link>
                </nav>
              </div>

              {/* Mobile Menu Toggle & Buttons */}
              <div className="flex justify-end gap-4">
                {/* Hamburger Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[1.5rem] md:hidden cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <line
                    x1="4"
                    x2="20"
                    y1="12"
                    y2="12"
                    className={twMerge("transition", isOpen && "opacity-0")}
                  />
                  <line
                    x1="4"
                    x2="20"
                    y1="6"
                    y2="6"
                    className={twMerge(
                      "origin-left transition",
                      isOpen && "rotate-45 -translate-y-1"
                    )}
                  />
                  <line
                    x1="4"
                    x2="20"
                    y1="18"
                    y2="18"
                    className={twMerge(
                      "origin-left transition",
                      isOpen && "-rotate-45 translate-y-1"
                    )}
                  />
                </svg>
                {userInfo && (
                  <div className="relative lg:flex hidden">
                    {/* Dropdown Button */}
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center justify-center text-white px-4 py-2 bg-black/40 rounded-lg hover:bg-black/60 transition duration-300"
                    >
                      {userInfo && (
                        <span className="mr-2">{userInfo.username}</span>
                      )}
                      {userInfo && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ml-1 transition-transform ${
                            dropdownOpen ? "rotate-180" : "rotate-0"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && userInfo && (
                      <ul className="absolute right-0 top-full mt-2 w-48 bg-black/80 text-white rounded-lg shadow-lg p-2 transition duration-300">
                        {userInfo?.isAdmin && (
                          <>
                            <li>
                              <Link
                                to="/admin/dashboard"
                                className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                              >
                                Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/admin/productlist"
                                className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                              >
                                Products
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/admin/categorylist"
                                className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                              >
                                Category
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/admin/allproductslist"
                                className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                              >
                                All Products
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/admin/orderlist"
                                className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                              >
                                Orders
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/admin/userlist"
                                className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                              >
                                Users
                              </Link>
                            </li>
                          </>
                        )}
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={logoutHandler}
                            className="block w-full text-left px-4 py-2 rounded hover:bg-red-600 transition"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                )}

                {/* Desktop Login & Sign Up Buttons */}
                <div className="md:flex hidden gap-4">
                  {userInfo ? (
                    <button onClick={logoutHandler}>
                      <Button text="Logout" className="bg-black text-white" />
                    </button>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button text="Log In" className="bg-black text-white" />
                      </Link>
                      <Link to="/register">
                        <Button
                          text="Sign Up"
                          className="hover:bg-white hover:text-black"
                        />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.nav
                  className="overflow-visible relative z-50" // 🔹 Ensuring dropdown is not clipped
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="flex flex-col gap-4 py-4 items-center font-medium">
                    <Link to="/">HOME</Link>
                    <Link to="/shop">SHOP</Link>
                    <Link to="/cart">CART</Link>
                    <Link to="/map">Map</Link>
                    <Link to="/favorite">FAVORITE</Link>

                    {userInfo ? (
                      <div className="relative w-full flex flex-col items-center gap-4">
                        <button onClick={logoutHandler}>
                          <Button
                            text="Logout"
                            className="bg-black text-white"
                          />
                        </button>
                        {/* User Dropdown Button */}
                        <button
                          onClick={toggleDropdown}
                          className="flex items-center px-4 py-2 bg-black/40 text-white rounded-lg hover:bg-black/60 transition duration-300"
                        >
                          <span className="mr-2">{userInfo.username}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-1 transition-transform ${
                              dropdownOpen ? "rotate-180" : "rotate-0"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.ul
                              className="absolute top-full mt-2 w-48 bg-black/80 text-white rounded-lg shadow-lg p-2 transition duration-300 z-50" // 🔹 Fixed z-index
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              {userInfo?.isAdmin && (
                                <>
                                  <li>
                                    <Link
                                      to="/admin/dashboard"
                                      className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                                    >
                                      Dashboard
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/admin/productlist"
                                      className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                                    >
                                      Products
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/admin/allproductslist"
                                      className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                                    >
                                      All Products
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/admin/categorylist"
                                      className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                                    >
                                      Category
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/admin/orderlist"
                                      className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                                    >
                                      Orders
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="/admin/userlist"
                                      className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                                    >
                                      Users
                                    </Link>
                                  </li>
                                </>
                              )}
                              <li>
                                <Link
                                  to="/profile"
                                  className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                                >
                                  Profile
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/allproductslist"
                                  className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                                >
                                  All Products
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/productlist"
                                  className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                                >
                                  Products
                                </Link>
                              </li>
                              <li>
                                <button
                                  onClick={logoutHandler}
                                  className="block w-full text-left px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                  Logout
                                </button>
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <>
                        <Link to="/login">
                          <Button
                            text="Log In"
                            className="bg-black text-white"
                          />
                        </Link>
                        <Link to="/register">
                          <Button
                            text="Sign Up"
                            className="hover:bg-white hover:text-black"
                          />
                        </Link>
                      </>
                    )}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <div className="pb-[86px] md:pb-[98px] lg:px-[130px] "></div>
    </div>
  );
};

export default Navigation;
