import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { clearErrors } from "../../actions/userAction";
import { getOrderDetails } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { BsTruck } from "react-icons/bs";
import { FiMapPin, FiPackage, FiUser, FiMail } from "react-icons/fi";
import "./Order.css";
import { TbLocation } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";

export default function OrderDetail() {
  let navigate = useNavigate();
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetail);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  const timestamps = [
    order && order.createdAt,
    order && order.paidAt,
    order && order.deliveryAt === undefined ? 0 : order && order.deliveryAt,
  ];

  const subtotal = order && order.orderItems=== undefined ? '':order && order.orderItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const formattedTimestamps = timestamps.map((timestamp) => {
    const date = new Date(timestamp);

    const formattedDate = date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
      .replace(/\//g, "-");

    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return ` ${formattedTime} ${formattedDate}`;
  });

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }

    if (error) {
      setErrorInfo(error);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, isAuthenticated, error, id, navigate]);
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
          <MetaData title="Order Details" />
          {/* Breadcrumb */}
          <section class="breadscrumb-section pt-0">
            <div class="container-fluid-lg">
              <div class="row">
                <div class="col-12">
                  <div class="breadscrumb-contain">
                    <Link
                      to={"/user/orders"}
                      style={{ display: "flex", textDecoration: "none" }}
                    >
                      <IoIosArrowBack
                        style={{
                          width: "25px",
                          height: "auto",
                          color: "#4a5568",
                        }}
                      />
                      <h2 style={{ color: "black" }}>Back</h2>
                    </Link>
                    <nav>
                      <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                          <Link to={"/"}>
                            <i class="fa-solid fa-house"></i>
                          </Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                          Order Detail
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="order-detail">
            <div class="container-fluid-lg">
              <div class="row g-sm-4 g-3">
                <div class="col-xxl-12 col-xl-12 col-lg-12">
                  <div class="row g-sm-4 g-3">
                    <div class="col-12 overflow-hidden">
                      <ol class="progtrckr">
                        <li class="progtrckr-done">
                          <h5>Order Processing</h5>
                          <h6>{formattedTimestamps[0]}</h6>
                        </li>
                        <li class="progtrckr-done">
                          <h5>Paid Processing</h5>
                          <h6>{formattedTimestamps[1]}</h6>
                        </li>
                        <li class="progtrckr-done">
                          <h5>In Production</h5>
                          <h6>Processing</h6>
                        </li>
                        <li class="progtrckr-todo">
                          <h5>Shipped</h5>
                          <h6>Pending</h6>
                        </li>
                        <li class="progtrckr-todo">
                          <h5>Delivered</h5>
                          <h6>
                            {order && order.deliveryAt === undefined
                              ? "Pending"
                              : formattedTimestamps[3]}
                          </h6>
                        </li>
                      </ol>
                    </div>

                    <div class="col-xl-4 col-sm-6">
                      <div class="order-details-contain">
                        <div class="order-tracking-icon">
                          <FiPackage
                            style={{
                              width: "25px",
                              height: "auto",
                              color: "#4a5568",
                            }}
                          />
                        </div>

                        <div class="order-details-name">
                          <h5 class="text-content">Order Code</h5>
                          <h6 class="theme-color">{order._id}</h6>
                        </div>
                      </div>
                    </div>

                    <div class="col-xl-4 col-sm-6">
                      <div class="order-details-contain">
                        <div class="order-tracking-icon">
                          <TbLocation
                            style={{
                              width: "25px",
                              height: "auto",
                              color: "#4a5568",
                            }}
                          />
                        </div>

                        <div class="order-details-name">
                          <h5 class="text-content">From</h5>
                          <h6>STR. Smardan 9, Bucuresti, romania.</h6>
                        </div>
                      </div>
                    </div>

                    <div class="col-xl-4 col-sm-6">
                      <div class="order-details-contain">
                        <div class="order-tracking-icon">
                          <FiMapPin
                            style={{
                              width: "25px",
                              height: "auto",
                              color: "#4a5568",
                            }}
                          />
                        </div>

                        <div class="order-details-name">
                          <h5 class="text-content">To</h5>
                          <h6>
                            {order.shippingInfo &&
                              `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                          </h6>
                        </div>
                      </div>
                    </div>

                    <div class="col-xl-4 col-sm-6">
                      <div class="order-details-contain">
                        <div class="order-tracking-icon">
                          <FiUser
                            style={{
                              width: "25px",
                              height: "auto",
                              color: "#4a5568",
                            }}
                          />
                        </div>

                        <div class="order-details-name">
                          <h5 class="text-content">User</h5>
                          <h6>
                            {order.user && order.user.name} (+
                            {order.shippingInfo && order.shippingInfo.phoneNo})
                          </h6>
                        </div>
                      </div>
                    </div>

                    <div class="col-xl-4 col-sm-6">
                      <div class="order-details-contain">
                        <div class="order-tracking-icon">
                          <FiMail
                            style={{
                              width: "25px",
                              height: "auto",
                              color: "#4a5568",
                            }}
                          />
                        </div>

                        <div class="order-details-name">
                          <h5 class="text-content">Email</h5>
                          <h6>{order.user && order.user.email}</h6>
                        </div>
                      </div>
                    </div>

                    <div class="col-xl-4 col-sm-6">
                      <div class="order-details-contain">
                        <div class="order-tracking-icon">
                          <BsTruck
                            style={{
                              width: "25px",
                              height: "auto",
                              color: "#4a5568",
                            }}
                          />
                        </div>

                        <div class="order-details-name">
                          <h5 class="text-content">Estimated Time</h5>
                          <h6>7 Frb, 05:05pm</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="order-table-section section-b-space section-t-space">
            <div class="container-fluid-lg">
              <div class="row">
                <div class="col-12">
                  <div class="productList">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <Link
                          to={`/product/${item.product}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div class="cart-table1">
                            <img
                              src="../assets/images/vegetable/product/1.png"
                              class="product-image lazyload"
                              alt=""
                              style={{width:'10%'}}
                            />

                            <div class="product-detail">
                              <h5>{item.name}</h5>
                              <h6>Category: {item.product.category}</h6>
                              <h7>x{item.quantity}</h7>
                            </div>

                            <div class="price1">
                              <h6>${item.price}</h6>
                            </div>
                          </div>
                        </Link>
                      ))}
                    <div class="subtotal">
                    <div class="productPrice">
                        <h5>Product Price:</h5>
                        <h6>${subtotal}</h6>
                      </div>
                      <div class="taxPrice">
                        <h5>Tax Price:</h5>
                        <h6>${order && order.taxPrice}</h6>
                      </div>
                      <div class="shippingPrice">
                        <h5>Shipping Price:</h5>
                        <h6>${order && order.shippingPrice}</h6>
                      </div>
                      <div class="totalPrice">
                        <h5>Total Price:</h5>
                        <h6>${order && order.totalPrice}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
