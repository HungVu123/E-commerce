import React, { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { SiHackthebox } from "react-icons/si";
import { myOrders } from "../../actions/orderAction";

export default function UserOrders() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user, isAuthenticated } = useSelector((state) => state.user);

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

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }

    if (error) {
      setErrorInfo(error);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [isAuthenticated, dispatch, error, user, navigate]);

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

          <MetaData title={`${user.name}'s Orders`} />
          <div class="col-xxl-9 col-lg-8">
            <button
              class="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none"
              data-bs-toggle="offcanvas"
              data-bs-target="#primaryMenu2"
            >
              Show Menu
            </button>
            <div class="dashboard-right-sidebar">
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-order"
                  role="tabpanel"
                  aria-labelledby="pills-order-tab"
                >
                  <div class="dashboard-order">
                    <div class="title">
                      <h2>My Orders History</h2>
                    </div>
                    <div class="order-contain">
                      {orders &&
                        orders.map((orderItems) => (
                          <div
                            class="order-box dashboard-bg-box"
                            style={{ flexGrow: "1" }}
                          >
                            <Link
                              to={`/order/${orderItems._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <div
                                class="order-container"
                                style={{ justifyContent: "space-between" }}
                              >
                                <div class="order-icon">
                                  <SiHackthebox style={{ fontSize: "25px" }} />
                                </div>

                                <div class="order-detail">
                                  <h4 style={{ color: "#0da487" }}>
                                    {orderItems.orderStatus === "Processing" ? (
                                      <span>Processing</span>
                                    ) : (
                                      <span class="success-bg">Delivered</span>
                                    )}
                                  </h4>
                                </div>

                                <div style={{ flex: "1", textAlign: "right" }}>
                                  <h6 style={{ color: "tomato" }}>
                                    Order #{orderItems._id}
                                  </h6>
                                </div>
                              </div>
                            </Link>

                            {orderItems.orderItems &&
                              orderItems.orderItems.map((order) => (
                                <Link
                                  to={`/product/${order.product}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <div
                                    class="product-order-detail"
                                    style={{ color: "black" }}
                                  >
                                    <img
                                      src="../assets/images/vegetable/product/1.png"
                                      class="lazyload"
                                      alt=""
                                      style={{ width: "13%" }}
                                    />

                                    <div class="order-wrap">
                                      <h5>{order.name}</h5>
                                      <ul
                                        class="product-size"
                                        style={{
                                          paddingLeft: "0px",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        <li>
                                          <div class="size-box">
                                            <h6 class="text-content">
                                              x{order.quantity}
                                            </h6>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div
                                      style={{
                                        flexGrow: "1",
                                        textAlign: "right",
                                      }}
                                    >
                                      <h6>${order.price}</h6>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            <div class="totalPrice">
                              <h5>Total Price:</h5>
                              <h6>${orderItems.totalPrice}</h6>
                            </div>
                          </div>
                        ))}
                    </div>
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
