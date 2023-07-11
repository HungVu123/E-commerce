import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { Pagination, Snackbar } from "@mui/material";
import { clearErrors } from "../../actions/userAction";
import {
  DELETE_ORDER_RESET,
  UPDATE_ORDER_RESET,
} from "../../constants/orderConstants";
import {
  deleteOrder,
  getAllOrders,
  updateOrder,
} from "../../actions/orderAction";
import MetaData from "../layout/MetaData";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import "./Admin.css";

export default function AdminOrders() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, orders, loading, itemsPerPage, ordersCount } = useSelector(
    (state) => state.allOrders
  );
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const {
    error: deleteError,
    isDeleted,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.order);

  const [openAlertError, setOpenAlertError] = useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");
  const [successInfo, setSuccessInfo] = useState("");
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertError(false);
    setOpenAlertSuccess(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");

  const handleSetOrder = (id) => {
    setOrderId(id);
  };

  const updateOrderHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(orderId, myForm));
  };

  const deleteOrderHandler = (e) => {
    e.preventDefault();
    dispatch(deleteOrder(orderId));
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }

    if (user.role !== "admin") {
      navigate("/login");
    }

    if (error) {
      setErrorInfo(error);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    if (deleteError) {
      setErrorInfo(deleteError);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    if (updateError) {
      setErrorInfo(updateError);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      setSuccessInfo("Order Deleted Successfully");
      setOpenAlertSuccess(true);
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    if (isUpdated) {
      setSuccessInfo("Order Updated Successfully");
      setOpenAlertSuccess(true);
      navigate("/admin/orders");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getAllOrders(currentPage));
  }, [
    isAuthenticated,
    navigate,
    user,
    currentPage,
    dispatch,
    error,
    deleteError,
    isDeleted,
    isUpdated,
    updateError,
  ]);

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

          <Snackbar
            open={openAlertSuccess}
            autoHideDuration={8000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert onClose={handleClose} severity="success">
              {successInfo}
            </Alert>
          </Snackbar>

          <MetaData title={`ALL ORDERS - Admin`} />
          <div class="col-xxl-9 col-lg-8">
            <button
              class="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none"
              data-bs-toggle="offcanvas"
              data-bs-target="#primaryMenu1"
            >
              Show Menu
            </button>
            <div class="dashboard-right-sidebar">
              <div class="tab-content" id="pills-tabContent">
                <div
                  class="tab-pane fade show active"
                  id="pills-product"
                  role="tabpanel"
                  aria-labelledby="pills-product-tab"
                >
                  <div class="product-tab">
                    <div
                      class="title title-flex"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        paddingBottom: "10px",
                      }}
                    >
                      <div class="title">
                        <h4 style={{ marginBottom: "0" }}>All Orders</h4>
                      </div>
                    </div>
                    <div class="table-responsive dashboard-bg-box">
                      <table class="table product-table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Order ID</th>
                            <th scope="col">Status</th>
                            <th scope="col">Items Qty</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Update/Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders &&
                            orders.map((order, index) => (
                              <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td style={{ maxWidth: "250px" }}>
                                  <h6 style={{ marginBottom: "0" }}>
                                    {order._id}
                                  </h6>
                                </td>
                                <td>
                                  <h6
                                    style={{
                                      marginBottom: "0",
                                      color:
                                        order.orderStatus === "Delivered"
                                          ? "green"
                                          : order.orderStatus === "Shipped"
                                          ? "orange"
                                          : "red",
                                    }}
                                  >
                                    {order.orderStatus}
                                  </h6>
                                </td>
                                <td>
                                  <h6 style={{ marginBottom: "0" }}>
                                    {order.orderItems.length}
                                  </h6>
                                </td>
                                <td>
                                  <h6 style={{ marginBottom: "0" }}>
                                    ${order.totalPrice}
                                  </h6>
                                </td>
                                <td class="efit-delete">
                                  <h6 style={{ marginBottom: "0" }}>
                                    <FiEdit
                                      data-bs-toggle="modal"
                                      data-bs-target={`#modalUpdate${index}`}
                                      onClick={() => {
                                        handleSetOrder(order._id);
                                      }}
                                      style={{
                                        color: "green",
                                        width: "19px",
                                        strokeWidth: "1.6px",
                                        cursor: "pointer",
                                      }}
                                    />
                                    <AiOutlineDelete
                                      data-bs-toggle="modal"
                                      data-bs-target="#modalDelete"
                                      onClick={() => {
                                        handleSetOrder(order._id);
                                      }}
                                      style={{
                                        color: "red",
                                        width: "19px",
                                        strokeWidth: "1.6px",
                                        marginLeft: "10px",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </h6>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>

                      {itemsPerPage < ordersCount && (
                        <nav class="custome-pagination">
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={itemsPerPage}
                            totalItemsCount={ordersCount}
                            pageRangeDisplayed={3}
                            onChange={setCurrentPageNo}
                            innerClass="pagination justify-content-center"
                            itemClass="page-item"
                            linkClass="page-link"
                            firstPageText={
                              <i class="fa-solid fa-angles-left"></i>
                            }
                            lastPageText={
                              <i class="fa-solid fa-angles-right"></i>
                            }
                            prevPageText={
                              <i class="fa-solid fa-angle-left"></i>
                            }
                            nextPageText={
                              <i class="fa-solid fa-angle-right"></i>
                            }
                          />
                        </nav>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {orders &&
            orders.map((order, index) => (
              <form onSubmit={updateOrderHandler}>
                <div
                  class="modal fade theme-modal"
                  id={`modalUpdate${index}`}
                  data-bs-backdrop="static"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel2"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-xl modal-dialog-centered modal-fullscreen-sm-down">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">
                          Update Order Status (
                          <span
                            style={{
                              color:
                                order.orderStatus === "Delivered"
                                  ? "green"
                                  : order.orderStatus === "Shipped"
                                  ? "orange"
                                  : "red",
                            }}
                          >
                            {" "}
                            {order.orderStatus}{" "}
                          </span>
                          )
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          <i class="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="row g-4">
                          <section class="cart-section">
                            <div class="row g-sm-4 g-3">
                              <div
                                class="col-xxl-9 col-lg-8"
                                style={{
                                  display: "flex",
                                  gap: "15px",
                                  flexDirection: "column",
                                }}
                              >
                                {order &&
                                  order.orderItems.map((item) => (
                                    <div
                                      class="cart-table order-table order-table-2"
                                      style={{ padding: "20px" }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <div style={{ width: "70px" }}>
                                            <img
                                              src={item.image}
                                              class="img-fluid lazyload"
                                              alt=""
                                            />
                                          </div>
                                          <div>
                                            <h6>{item.name}</h6>
                                            <h6 class="theme-color">
                                              ${item.price}
                                            </h6>
                                            <h6
                                              class="text-title"
                                              style={{ fontSize: "15px" }}
                                            >
                                              X{item.quantity}
                                            </h6>
                                          </div>
                                        </div>
                                        <div class="subtotal1">
                                          <h6>${item.quantity * item.price}</h6>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>

                              <div class="col-xxl-3 col-lg-4">
                                <div class="row g-4">
                                  <div class="col-lg-12 col-sm-6">
                                    <div class="summery-box">
                                      <div class="summery-header">
                                        <h5>
                                          Price Details (
                                          {order.orderItems.length} Items)
                                        </h5>
                                      </div>

                                      <ul class="summery-contain">
                                        <li>
                                          <h4>Tax Price</h4>
                                          <h4 class="price">
                                            ${order.taxPrice}
                                          </h4>
                                        </li>

                                        <li>
                                          <h4>Shipping Price</h4>
                                          <h4 class="price theme-color">
                                            ${order.shippingPrice}
                                          </h4>
                                        </li>

                                        <li>
                                          <h4>Coupon Discount</h4>
                                          <h4 class="price text-danger">
                                            $6.27
                                          </h4>
                                        </li>
                                      </ul>

                                      <ul class="summery-total">
                                        <li class="list-total">
                                          <h5>
                                            Total: ${order.totalPrice}{" "}
                                            <span
                                              style={{
                                                color:
                                                  order.paymentInfo.status ===
                                                  "succeeded"
                                                    ? "green"
                                                    : "red",
                                              }}
                                            >
                                              (
                                              {order.paymentInfo.status ===
                                              "succeeded"
                                                ? "Paid"
                                                : "Not Paid"}
                                              )
                                            </span>
                                          </h5>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div class="col-lg-12 col-sm-6">
                                    <div class="summery-box">
                                      <div class="summery-header d-block">
                                        <h5>Shipping Address</h5>
                                      </div>

                                      <ul class="summery-contain pb-0 border-bottom-0">
                                        <li class="d-block">
                                          <h4>
                                            {order.user && order.user.name}
                                            <h4>
                                              +(
                                              {order.shippingInfo &&
                                                order.shippingInfo.phoneNo}
                                              )
                                            </h4>
                                          </h4>
                                          <h4>
                                            {order.shippingInfo &&
                                              `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`}
                                          </h4>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <select onChange={(e) => setStatus(e.target.value)}>
                          <option value="">Choose Status</option>
                          {order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}

                          {order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select>

                        <button
                          type="submit"
                          class="btn btn-primary"
                          data-bs-dismiss="modal"
                          style={{
                            backgroundColor: "#0da487",
                            display: status === "" ? "none" : "block",
                          }}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ))}

          <form onSubmit={deleteOrderHandler}>
            <div
              class="modal fade theme-modal remove-profile"
              id="modalDelete"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down modal-lg">
                <div class="modal-content">
                  <div class="modal-header d-block text-center">
                    <h5 class="modal-title w-100" id="exampleModalLabel22">
                      Do you want to delete this order?
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                      style={{ backgroundColor: "#0da487" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
}
