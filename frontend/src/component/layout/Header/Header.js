import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { BiUserCircle } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
const options = [
  {
    value: "vn",
    label: "VietNamese",
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="36" height="36" viewBox="0 0 36 36"%3E%3Cpath fill="%23DA251D" d="M32 5H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"%2F%3E%3Cpath fill="%23FF0" d="M19.753 16.037L18 10.642l-1.753 5.395h-5.672l4.589 3.333l-1.753 5.395L18 21.431l4.589 3.334l-1.753-5.395l4.589-3.333z"%2F%3E%3C%2Fsvg%3E',
  },
  {
    value: "au",
    label: "English",
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="36" height="36" viewBox="0 0 36 36"%3E%3Cpath fill="%23EEE" d="M32 5H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"%2F%3E%3Cpath fill="%23CE1124" d="M21 5h-6v10H0v6h15v10h6V21h15v-6H21z"%2F%3E%3C%2Fsvg%3E',
  },
];

export default function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [keyword, setKeyword] = useState("");
  const { cartItems } = useSelector((state) => state.cart);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    setSelectedOption(selectedOption);
  };

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <header
        className={
          scroll ? "header-compact header-absolute active " : "header-compact"
        }
      >
        <div className="header-top" style={{ backgroundColor: "black" }}>
          <div className="container-fluid-lg">
            <div className="row">
              <div className="col-xl-3 col-lg-7 col-md-7">
                <i className="iconly-Location icli text-white"></i>
                <span className="text-white">
                  1418 Riverwood Drive, CA 96052, US
                </span>
              </div>

              <div className="col-xxl-6 d-none d-xl-block">
                <div className="header-offer">
                  <div className="notification-slider">
                    <div className="scroller">
                      <span>
                        <h6 style={{ color: "white" }}>
                          <strong className="me-1">Welcome to Fastkart!</strong>{" "}
                          Wrap new offers/gift every single day on Weekends.
                        </h6>
                        <h6 style={{ color: "white" }}>
                          Something you love is now on sale!{" "}
                          <Link
                            to={"/products"}
                            className="text-white"
                            style={{ textDecoration: "underline" }}
                          >
                            Buy Now !
                          </Link>
                        </h6>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-2 col-lg-3 col-md-3">
                <img
                  src={selectedOption.imageSrc}
                  alt={selectedOption.label}
                  width="32px"
                />
                <select
                  value={selectedOption.value}
                  onChange={handleSelectChange}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                  }}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {user ? (
                ""
              ) : (
                <div className="col-xl-1 col-lg-2 col-md-2">
                  <Link to={"/login"} style={{ textDecoration: "none" }}>
                    <span className="login-signup">Login/SignUp</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="top-nav top-header sticky-header">
          <div className="container-fluid-lg">
            <div className="row">
              <div className="col-12">
                <div className="navbar-top">
                  <button
                    className="navbar-toggler d-xl-none d-inline navbar-menu-button me-3"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#primaryMenu"
                  >
                    <span className="navbar-toggler-icon">
                      <FaBars />
                    </span>
                  </button>
                  <Link to={`/`} className="web-logo nav-logo">
                    <img
                      src="../assets/images/logo/1.png"
                      className="img-fluid lazyload"
                      alt=""
                    />
                  </Link>
                  <div className="middle-box d-none d-xl-inline">
                    <div className="header-nav-middle">
                      <div className="main-nav navbar navbar-expand-xl navbar-light navbar-sticky">
                        <div className="order-xl-2">
                          <ul className="navbar-nav">
                            <li className="nav-item">
                              <Link to={"/"} className="header">
                                Home
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link to={"/products"} className="header">
                                Products
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link to={"/blog"} className="header">
                                Blog
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link to={"/aboutus"} className="header">
                                About Us
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rightside-box" style={{ gap: "15px" }}>
                    <div class="search-box">
                      <form class="input-group" onSubmit={searchSubmitHandler}>
                        <input
                          type="search"
                          class="form-control"
                          placeholder="I'm searching for..."
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                          onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button
                          class="btn"
                          type="submit"
                          style={{
                            backgroundColor: "#0da487",
                            color: "white",
                            zIndex: "0",
                          }}
                        >
                          <AiOutlineSearch />
                        </button>
                      </form>
                    </div>
                    {user ? (
                      <ul className="right-side-menu">
                        <li className="right-side">
                          <div className="onhover-dropdown header-badge">
                            <button
                              type="button"
                              className="btn p-0 position-relative header-wishlist"
                              style={{ fontSize: "1.75rem" }}
                            >
                              <AiOutlineShoppingCart />
                              <span
                                className="position-absolute top-0 start-100 translate-middle badge"
                                style={{ marginTop: "10px" }}
                              >
                                {cartItems.length}
                              </span>
                            </button>

                            {cartItems.length === 0 ? (
                              <div
                                className="onhover-div"
                                style={{ width: "200px" }}
                              >
                                <h6 style={{ textAlign: "center" }}>
                                  Don't have product yet
                                </h6>
                              </div>
                            ) : (
                              <div className="onhover-div">
                                <ul
                                  className="cart-list"
                                  style={{ paddingLeft: "0" }}
                                >
                                  {cartItems &&
                                    cartItems.map((item) => (
                                      <Link to={`/product/${item.product}`}>
                                        <li className="product-box-contain">
                                          <div className="drop-cart">
                                            <img
                                              src="../assets/images/vegetable/product/1.png"
                                              className="lazyload"
                                              alt=""
                                              style={{ width: "70px" }}
                                            />

                                            <div className="drop-contain">
                                              <h5>{item.name}</h5>
                                              <h6>
                                                <span>
                                                  {item.quantity} x $
                                                  {item.price}
                                                </span>
                                              </h6>
                                            </div>
                                          </div>
                                        </li>
                                      </Link>
                                    ))}
                                </ul>

                                <div className="price-box">
                                  <h5>Total :</h5>
                                  <h4 className="theme-color fw-bold">{`$${cartItems.reduce(
                                    (acc, item) =>
                                      acc + item.quantity * item.price,
                                    0
                                  )}`}</h4>
                                </div>

                                <div className="button-group">
                                  <div
                                    className="btn btn-sm cart-button"
                                    style={{ visibility: "hidden" }}
                                  ></div>
                                  <Link
                                    className="btn btn-sm cart-button"
                                    to={`/cart`}
                                  >
                                    View Cart
                                  </Link>
                                </div>
                              </div>
                            )}
                          </div>
                        </li>
                        <li className="right-side onhover-dropdown">
                          <div className="delivery-login-box">
                            <div
                              className="delivery-icon"
                              style={{ fontSize: "1.5rem" }}
                            >
                              {user.avatar.url ? (
                                <img
                                  className="avatar-icon"
                                  src={user.avatar.url}
                                  alt="Profile"
                                />
                              ) : (
                                <BiUserCircle />
                              )}
                            </div>
                            <h6
                              style={{ paddingLeft: "5px", marginBottom: "0" }}
                            >
                              Hello, {user.name}
                            </h6>
                          </div>

                          <div className="onhover-div onhover-div-login">
                            <ul className="user-box-name">
                              {user.role === "admin" ? (
                                <li className="product-box-contain">
                                  <Link to={"/admin/profile"}>Dashboard</Link>
                                </li>
                              ) : (
                                <>
                                  <li className="product-box-contain">
                                    <Link to={"/user/profile"}>Profile</Link>
                                  </li>
                                  <li className="product-box-contain">
                                    <Link to={"/user/orders"}>Orders</Link>
                                  </li>
                                </>
                              )}
                              <li className="product-box-contain">
                                <Link to={"/"} onClick={logoutUser}>
                                  Log Out
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className="offcanvas offcanvas-start"
        id="primaryMenu"
        style={{ width: "200px" }}
      >
        <div className="offcanvas-header navbar-shadow">
          <h5>Menu</h5>
          <button
            className="btn-close lead"
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/"} className="header">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/products"} className="header">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/blog"} className="header">
                Blog
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/aboutus"} className="header">
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
