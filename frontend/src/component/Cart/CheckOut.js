import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { clearErrors } from "../../actions/userAction";
import axios from "axios";
import { createOrder } from "../../actions/orderAction";
import { BsCalendarEvent, BsCreditCard, BsKeyFill } from "react-icons/bs";

export default function CheckOut() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [openAlertError, setOpenAlertError] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertError(false);
  };
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  const [Id, setId] = useState(user.shippingInfos[0]._id);
  const [index, setIndex] = useState(0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.2;
  const totalPrice = subtotal + tax + shippingCharges;

  const paymentData = {
    amount: Math.round(totalPrice * 100),
  };

  const shippingInfo = {
    address: user.shippingInfos[index].address,
    city: user.shippingInfos[index].city,
    state: user.shippingInfos[index].state,
    pinCode: user.shippingInfos[index].pinCode,
    country: user.shippingInfos[index].country,
    phoneNo: user.shippingInfos[index].phoneNo,
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subtotal,
    taxPrice: tax,
    shippingPrice: shippingCharges,
    totalPrice: totalPrice,
  };

  const PlaceOrderSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: user.shippingInfos[index].address,
              city: user.shippingInfos[index].city,
              state: user.shippingInfos[index].state,
              postal_code: user.shippingInfos[index].pinCode,
              country: user.shippingInfos[index].country,
            },
          },
        },
      });

      if (result.error) {
        setErrorInfo(result.error.message);
        setOpenAlertError(true);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/success");
        } else {
          setErrorInfo("There's some issue while processing payment ");
          setOpenAlertError(true);
        }
      }
    } catch (error) {
      setErrorInfo(error.response.data.message);
      setOpenAlertError(true);
    }
  };

  const handleCheckboxChange = (index) => {
    setIndex(index);
    setId(user.shippingInfos[index]._id);
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }

    if (error) {
      setErrorInfo(error);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }
  }, [isAuthenticated, navigate, dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Snackbar
            open={openAlertError}
            autoHideDuration={8000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert onClose={handleClose} severity="error">
              {errorInfo}
            </Alert>
          </Snackbar>

          <MetaData title="CheckOut" />
          <section class="breadscrumb-section pt-0">
            <div class="container-fluid-lg">
              <div class="row">
                <div class="col-12">
                  <div class="breadscrumb-contain">
                    <h2>Checkout</h2>
                    <nav>
                      <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                          <Link to={"/"}>
                            <i class="fa-solid fa-house"></i>
                          </Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                          Checkout
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="checkout-section-2 section-b-space section-t-space">
            <div className="container-fluid-lg">
              <div className="row g-sm-4 g-3">
                <div className="col-lg-8">
                  <div className="left-sidebar-checkout">
                    <div className="checkout-detail-box">
                      <ul>
                        <li>
                          <div className="checkout-icon">
                            <lord-icon
                              target=".nav-item"
                              src="https://cdn.lordicon.com/ggihhudh.json"
                              trigger="loop-on-hover"
                              colors="primary:#121331,secondary:#646e78,tertiary:#0baf9a"
                              className="lord-icon"
                            ></lord-icon>
                          </div>
                          <div className="checkout-box">
                            <div className="checkout-title">
                              <h4>Delivery Address</h4>
                            </div>

                            <div className="checkout-detail">
                              <div className="row g-4">
                                <div class="col-xxl-12 col-lg-12 col-md-6">
                                  <div class="delivery-address-box">
                                    <div>
                                      <div
                                        class="label1"
                                        style={{
                                          display:
                                            Id === user.shippingInfos[0]._id
                                              ? ""
                                              : "none",
                                        }}
                                      >
                                        <label>Default</label>
                                      </div>

                                      <div className="labelChange">
                                        <label
                                          type="button"
                                          data-bs-toggle="modal"
                                          data-bs-target="#changeAddressModal"
                                        >
                                          Change
                                        </label>
                                      </div>

                                      <ul
                                        class="delivery-address-detail"
                                        style={{ paddingLeft: "0" }}
                                      >
                                        <li>
                                          <h5 class="fw-500">
                                            {user.name} | +
                                            {user.shippingInfos[index].phoneNo}
                                          </h5>
                                        </li>

                                        <li>
                                          <p class="text-content">
                                            {user.shippingInfos[index].address},{" "}
                                            {user.shippingInfos[index].city},{" "}
                                            {user.shippingInfos[index].state},{" "}
                                            {user.shippingInfos[index].country}
                                          </p>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div className="checkout-icon">
                            <lord-icon
                              target=".nav-item"
                              src="https://cdn.lordicon.com/qmcsqnle.json"
                              trigger="loop-on-hover"
                              colors="primary:#0baf9a,secondary:#0baf9a"
                              className="lord-icon"
                            ></lord-icon>
                          </div>
                          <div className="checkout-box">
                            <div className="checkout-title">
                              <h4>Payment Option</h4>
                            </div>

                            <div className="checkout-detail">
                              <div
                                className="accordion accordion-flush custom-accordion"
                                id="accordionFlushExample"
                              >
                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="flush-headingFour"
                                  >
                                    <div
                                      className="accordion-button collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseFour"
                                    >
                                      <div className="custom-form-check form-check mb-0">
                                        <label
                                          className="form-check-label"
                                          htmlFor="cash"
                                        >
                                          <input
                                            className="form-check-input mt-0"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="cash"
                                            defaultChecked
                                          />{" "}
                                          Cash On Delivery
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    id="flush-collapseFour"
                                    className="accordion-collapse collapse show"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div className="accordion-body1">
                                      <p
                                        className="cod-review"
                                        style={{ marginLeft: "30px" }}
                                      >
                                        Pay digitally with SMS Pay Link. Cash
                                        may not be accepted in COVID restricted
                                        areas. <a href="/">Know more.</a>
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="flush-headingOne"
                                  >
                                    <div
                                      className="accordion-button collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseOne"
                                    >
                                      <div className="custom-form-check form-check mb-0">
                                        <label
                                          className="form-check-label"
                                          htmlFor="credit"
                                        >
                                          <input
                                            className="form-check-input mt-0"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="credit"
                                          />
                                          Credit or Debit Card
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    id="flush-collapseOne"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div className="accordion-body1">
                                      <div className="row g-2">
                                        <div className="col-12">
                                          <BsCreditCard />
                                          <CardNumberElement className="paymentInput" />
                                        </div>

                                        <div className="col-12">
                                          <BsCalendarEvent />
                                          <CardExpiryElement className="paymentInput" />
                                        </div>

                                        <div className="col-12">
                                          <BsKeyFill />
                                          <CardCvcElement className="paymentInput" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="flush-headingTwo"
                                  >
                                    <div
                                      className="accordion-button collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseTwo"
                                    >
                                      <div className="custom-form-check form-check mb-0">
                                        <label
                                          className="form-check-label"
                                          htmlFor="banking"
                                        >
                                          <input
                                            className="form-check-input mt-0"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="banking"
                                          />
                                          Net Banking
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    id="flush-collapseTwo"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div className="accordion-body1">
                                      <h5 className="text-uppercase mb-4">
                                        Select Your Bank
                                      </h5>
                                      <div className="row g-2">
                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="bank1"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="bank1"
                                            >
                                              Industrial & Commercial Bank
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="bank2"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="bank2"
                                            >
                                              Agricultural Bank
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="bank3"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="bank3"
                                            >
                                              Bank of America
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="bank4"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="bank4"
                                            >
                                              Construction Bank Corp.
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="bank5"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="bank5"
                                            >
                                              HSBC Holdings
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="bank6"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="bank6"
                                            >
                                              JPMorgan Chase & Co.
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-12">
                                          <div className="select-option">
                                            <div className="form-floating theme-form-floating">
                                              <select
                                                className="form-select theme-form-select"
                                                aria-label="Default select example"
                                              >
                                                <option value="hsbc">
                                                  HSBC Holdings
                                                </option>
                                                <option value="loyds">
                                                  Lloyds Banking Group
                                                </option>
                                                <option value="natwest">
                                                  Nat West Group
                                                </option>
                                                <option value="Barclays">
                                                  Barclays
                                                </option>
                                                <option value="other">
                                                  Others Bank
                                                </option>
                                              </select>
                                              <label>Select Other Bank</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="accordion-item">
                                  <div
                                    className="accordion-header"
                                    id="flush-headingThree"
                                  >
                                    <div
                                      className="accordion-button collapsed"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseThree"
                                    >
                                      <div className="custom-form-check form-check mb-0">
                                        <label
                                          className="form-check-label"
                                          htmlFor="wallet"
                                        >
                                          <input
                                            className="form-check-input mt-0"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="wallet"
                                          />
                                          My Wallet
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    id="flush-collapseThree"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div className="accordion-body1">
                                      <h5 className="text-uppercase mb-4">
                                        Select Your Wallet
                                      </h5>
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <label
                                              className="form-check-label"
                                              htmlFor="amazon"
                                            >
                                              <input
                                                className="form-check-input mt-0"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="amazon"
                                              />
                                              Amazon Pay
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="gpay"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="gpay"
                                            >
                                              Google Pay
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="airtel"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="airtel"
                                            >
                                              Airtel Money
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="paytm"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="paytm"
                                            >
                                              Paytm Pay
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="jio"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="jio"
                                            >
                                              JIO Money
                                            </label>
                                          </div>
                                        </div>

                                        <div className="col-md-6">
                                          <div className="custom-form-check form-check">
                                            <input
                                              className="form-check-input mt-0"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id="free"
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor="free"
                                            >
                                              Freecharge
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="right-side-summery-box">
                    <div className="summery-box-2">
                      <div className="summery-header">
                        <h3>Order Summery</h3>
                      </div>

                      <ul className="summery-contain">
                        {cartItems &&
                          cartItems.map((item) => (
                            <li key={item.product}>
                              <img
                                src={item.image}
                                alt="Product"
                                style={{ width: "70px" }}
                              />
                              <Link
                                to={`/product/${item.product}`}
                                style={{ textDecoration: "none" }}
                              >
                                <h4>
                                  {item.name} <span>X {item.quantity}</span>
                                </h4>
                              </Link>{" "}
                              <h4 className="price">${item.price}</h4>
                            </li>
                          ))}
                      </ul>

                      <ul className="summery-total">
                        <li>
                          <h4>Subtotal</h4>
                          <h4 className="price">${subtotal}</h4>
                        </li>

                        <li>
                          <h4>Shipping</h4>
                          <h4 className="price">${shippingCharges}</h4>
                        </li>

                        <li>
                          <h4>Tax</h4>
                          <h4 className="price">${tax}</h4>
                        </li>

                        <li>
                          <h4>Coupon/Code</h4>
                          <h4 className="price">$-23.10</h4>
                        </li>

                        <li className="list-total">
                          <h4>Total (USD)</h4>
                          <h4 className="price">${totalPrice}</h4>
                        </li>
                      </ul>
                    </div>

                    <div className="checkout-offer">
                      <div className="offer-title">
                        <div className="offer-icon">
                          <img
                            src="../assets/images/inner-page/offer.svg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="offer-name">
                          <h6>Available Offers</h6>
                        </div>
                      </div>

                      <ul className="offer-detail">
                        <li>
                          <p>
                            Combo: BB Royal Almond/Badam Californian, Extra Bold
                            100 gm...
                          </p>
                        </li>
                        <li>
                          <p>
                            combo: Royal Cashew Californian, Extra Bold 100 gm +
                            BB Royal Honey 500 gm
                          </p>
                        </li>
                      </ul>
                    </div>

                    <button
                      className="btn theme-bg-color text-white btn-md w-100 mt-4 fw-bold"
                      onClick={PlaceOrderSubmit}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div
            class="modal fade"
            id="changeAddressModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    My Address
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row g-4">
                    {user.shippingInfos &&
                      user.shippingInfos.map((item, index) => (
                        <div
                          class="col-xxl-12 col-lg-12 col-md-6"
                          key={item.shippingInfo}
                          style={{
                            borderBottom:
                              index === user.shippingInfos.length - 1
                                ? "none"
                                : "1px solid rgba(0,0,0,.09)",
                          }}
                        >
                          <div class="delivery-address-box">
                            <div style={{ display: "flex" }}>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="jack"
                                  checked={Id === item._id}
                                  onChange={() => {
                                    handleCheckboxChange(index);
                                  }}
                                />
                              </div>
                              <ul class="deliveryAddressDetail">
                                <li>
                                  <h6 class="fw-500">
                                    {user.name} | +{item.phoneNo}
                                  </h6>
                                </li>

                                <li>
                                  <p class="text-content">
                                    {item.address}, {item.city}, {item.state},{" "}
                                    {item.country}
                                  </p>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
