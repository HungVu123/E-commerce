import React from "react";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import CartItemCard from "./CartItemCard";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <>
      <section class="breadscrumb-section pt-0">
        <div class="container-fluid-lg">
          <div class="row">
            <div class="col-12">
              <div class="breadscrumb-contain">
                <h2>Cart</h2>
                <nav>
                  <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                      <Link to={"/"}>
                        <i class="fa-solid fa-house"></i>
                      </Link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Cart
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cart-section section-b-space section-t-space">
        <div className="container-fluid-lg">
          <div className="row g-sm-5 g-3">
            <div className="col-xxl-9">
              <div className="cart-table">
                <div className="table-responsive-xl">
                  <table className="table">
                    <tbody>
                      {cartItems.length === 0 ? (
                        <tr className="product-box-contain">
                          <td className="product-detail">
                            No Product in Your Cart
                          </td>
                          <td className="save-remove">
                            <Link to="/products">View Products</Link>
                          </td>
                        </tr>
                      ) : (
                        cartItems &&
                        cartItems.map((item) => (
                          <tr
                            className="product-box-contain"
                            key={item.product}
                          >
                            <CartItemCard
                              item={item}
                              deleteCartItems={deleteCartItems}
                              increaseQuantity={increaseQuantity}
                              decreaseQuantity={decreaseQuantity}
                            />
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-xxl-3">
              {cartItems.length === 0 ? (
                <div className="summery-box p-sticky">
                  <div className="summery-header">
                    <h3>Cart Total</h3>
                  </div>
                </div>
              ) : (
                <div className="summery-box p-sticky">
                  <div className="summery-header">
                    <h3>Cart Total</h3>
                  </div>

                  <div className="summery-contain">
                    <div className="coupon-cart">
                      <h6 className="text-content mb-2">Coupon Apply</h6>
                      <div className="mb-3 coupon-box input-group">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Coupon Code Here..."
                        />
                        <button className="btn-apply">Apply</button>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <h4>Subtotal</h4>
                        <h4 className="price">$125.65</h4>
                      </li>

                      <li>
                        <h4>Coupon Discount</h4>
                        <h4 className="price">(-) 0.00</h4>
                      </li>

                      <li className="align-items-start">
                        <h4>Shipping</h4>
                        <h4 className="price text-end">$6.90</h4>
                      </li>
                    </ul>
                  </div>

                  <ul className="summery-total">
                    <li className="list-total border-top-0">
                      <h4>Total (USD)</h4>
                      <h4 className="price theme-color">{`$${cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}`}</h4>
                    </li>
                  </ul>

                  <div className="button-group cart-button">
                    <ul>
                      <li>
                        <button
                          onClick={checkoutHandler}
                          className="btn btn-animation proceed-btn fw-bold"
                        >
                          Process To Checkout
                        </button>
                      </li>

                      <li>
                        <button class="btn btn-light shopping-button text-dark">
                          <Link
                            to={"/products"}
                            style={{ color: "#212529", textDecoration: "none" }}
                          >
                            <i className="fa-solid fa-arrow-left-long"></i>{" "}
                            Return To Shopping
                          </Link>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
