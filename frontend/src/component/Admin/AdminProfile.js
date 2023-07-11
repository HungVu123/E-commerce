import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { clearErrors, getAllUsers } from "../../actions/userAction";
import { getAllProducts } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminProfile() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.profile);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.allproducts);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  let totalPrice = [];
  orders &&
    orders.forEach((item) => {
      totalPrice.push(item.totalPrice);
    });

  const [topSalesItems, setTopSalesItems] = useState([]);

  React.useEffect(() => {
    // Step 1: Iterate over each order
    const quantityMap = orders.reduce((map, order) => {
      // Step 2: Iterate over each order item
      order.orderItems.forEach((item) => {
        const { name, quantity, price } = item;
        // Step 3: Update the quantity in the map for each product encountered
        if (map[name]) {
          map[name].quantity += quantity;
          map[name].totalPrice += price * quantity;
        } else {
          map[name] = {
            quantity,
            totalPrice: price * quantity,
          };
        }
      });
      return map;
    }, {});

    // Step 4: Get the top 5 items with the highest quantities
    const topItems = Object.entries(quantityMap)
      .sort((a, b) => b[1].quantity - a[1].quantity) // Sort by quantity in descending order
      .slice(0, 5) // Take the top 5 items
      .map(([name, { quantity, totalPrice }]) => ({
        name,
        quantity,
        totalPrice,
      }));
    setTopSalesItems(topItems);
  }, [orders]);

  const barData = {
    labels: topSalesItems.map((item) => item.name),
    datasets: [
      {
        label: "Qty",
        data: topSalesItems.map((item) => item.quantity),
        backgroundColor: ["#0da487"],
        borderColor: ["#0da487"],
      },
    ],
  };

  const barOptions = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      tooltip: {
        displayColors: false,
      },
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Top 5 Sales",
      },
    },
  };

  const lineStateProduct = {
    labels: topSalesItems.map((item) => item.name),
    datasets: [
      {
        label: "Price",
        backgroundColor: ["#0da487"],
        borderColor: ["#0da487"],
        hoverBackgroundColor: ["#0da487"],
        data: topSalesItems.map((item) => item.totalPrice),
      },
    ],
  };

  const lineOptionsProduct = {
    aspectRatio: 2,
    responsive: true,
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 5 sales amount",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const lineState = {
    labels,
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#0da487"],
        borderColor: ["#0da487"],
        hoverBackgroundColor: ["#0da487"],
        data: totalPrice,
      },
    ],
  };

  const lineOptions = {
    aspectRatio: 2,
    responsive: true,
    plugins: {
      tooltip: {
        displayColors: false,
      },
      title: {
        display: true,
        text: "Total Revenue",
      },
    },
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#f00202", "#0da487"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  const doughnutOptions = {
    aspectRatio: 2,
    responsive: true,
    plugins: {
      tooltip: {
        displayColors: false,
      },
      title: {
        display: true,
        text: "Overall ",
      },
    },
  };

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

    if (user.role !== "admin") {
      navigate("/login");
    }

    if (error) {
      setErrorInfo(error);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    dispatch(getAllProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
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

          <MetaData title={`${user.name}'s Dashboard`} />
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
                  id="pills-dashboard"
                  role="tabpanel"
                  aria-labelledby="pills-dashboard-tab"
                >
                  <div class="dashboard-home">
                    <div class="title">
                      <h2>My Dashboard</h2>
                    </div>

                    <div class="total-box">
                      <div class="row g-sm-4 g-3">
                        <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                          <div class="totle-contain">
                            <img
                              src="../assets/images/svg/order.svg"
                              class="img-1 lazyload"
                              alt=""
                            />
                            <img
                              src="../assets/images/svg/order.svg"
                              class="lazyload"
                              alt=""
                            />
                            <div class="totle-detail">
                              <h5>Total Products</h5>
                              <h3>{products && products.length}</h3>
                            </div>
                          </div>
                        </div>

                        <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                          <div class="totle-contain">
                            <img
                              src="../assets/images/svg/pending.svg"
                              class="img-1 lazyload"
                              alt=""
                            />
                            <img
                              src="../assets/images/svg/pending.svg"
                              class="lazyload"
                              alt=""
                            />
                            <div class="totle-detail">
                              <h5>Total Orders</h5>
                              <h3>{orders && orders.length}</h3>
                            </div>
                          </div>
                        </div>

                        <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6">
                          <div class="totle-contain">
                            <img
                              src="../assets/images/svg/user.png"
                              class="img-1 lazyload"
                              alt=""
                            />
                            <img
                              src="../assets/images/svg/user.png"
                              class="lazyload"
                              alt=""
                            />
                            <div class="totle-detail">
                              <h5>Total Users</h5>
                              <h3>{users && users.length}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row g-4">
                      <div class="col-xxl-6">
                        <div
                          class="dashboard-bg-box"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Bar options={barOptions} data={barData} />
                        </div>
                      </div>
                      <div class="col-xxl-6">
                        <div
                          class="dashboard-bg-box"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Line
                            data={lineStateProduct}
                            options={lineOptionsProduct}
                          />
                        </div>
                      </div>

                      <div class="col-xxl-6">
                        <div
                          class="dashboard-bg-box"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Line data={lineState} options={lineOptions} />
                        </div>
                      </div>

                      <div class="col-xxl-6">
                        <div
                          class="dashboard-bg-box"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Doughnut
                            data={doughnutState}
                            options={doughnutOptions}
                          />
                        </div>
                      </div>

                      <div class="col-xxl-6">
                        <div class="table-responsive dashboard-bg-box">
                          <div class="dashboard-title mb-4">
                            <h3>Trending Products</h3>
                          </div>

                          <table class="table product-table">
                            <thead>
                              <tr>
                                <th scope="col">Images</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Sales</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="product-image">
                                  <img
                                    src="../assets/images/vegetable/product/1.png"
                                    class="img-fluid"
                                    alt=""
                                  />
                                </td>
                                <td>
                                  <h6>Fantasy Crunchy Choco Chip Cookies</h6>
                                </td>
                                <td>
                                  <h6>$25.69</h6>
                                </td>
                                <td>
                                  <h6>152</h6>
                                </td>
                              </tr>

                              <tr>
                                <td class="product-image">
                                  <img
                                    src="../assets/images/vegetable/product/2.png"
                                    class="img-fluid"
                                    alt=""
                                  />
                                </td>
                                <td>
                                  <h6>
                                    Peanut Butter Bite Premium Butter Cookies
                                    600 g
                                  </h6>
                                </td>
                                <td>
                                  <h6>$35.36</h6>
                                </td>
                                <td>
                                  <h6>34</h6>
                                </td>
                              </tr>

                              <tr>
                                <td class="product-image">
                                  <img
                                    src="../assets/images/vegetable/product/3.png"
                                    class="img-fluid"
                                    alt=""
                                  />
                                </td>
                                <td>
                                  <h6>
                                    Yumitos Chilli Sprinkled Potato Chips 100 g
                                  </h6>
                                </td>
                                <td>
                                  <h6>$78.55</h6>
                                </td>
                                <td>
                                  <h6>78</h6>
                                </td>
                              </tr>

                              <tr>
                                <td class="product-image">
                                  <img
                                    src="../assets/images/vegetable/product/4.png"
                                    class="img-fluid"
                                    alt=""
                                  />
                                </td>
                                <td>
                                  <h6>healthy Long Life Toned Milk 1 L</h6>
                                </td>
                                <td>
                                  <h6>$32.98</h6>
                                </td>
                                <td>
                                  <h6>135</h6>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div class="col-xxl-6">
                        <div class="order-tab dashboard-bg-box">
                          <div class="dashboard-title mb-4">
                            <h3>Recent Order</h3>
                          </div>

                          <div class="table-responsive">
                            <table class="table order-table">
                              <thead>
                                <tr>
                                  <th scope="col">Order ID</th>
                                  <th scope="col">Product Name</th>
                                  <th scope="col">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="product-image">#254834</td>
                                  <td>
                                    <h6>Choco Chip Cookies</h6>
                                  </td>
                                  <td>
                                    <label class="success">Shipped</label>
                                  </td>
                                </tr>

                                <tr>
                                  <td class="product-image">#355678</td>
                                  <td>
                                    <h6>Premium Butter Cookies</h6>
                                  </td>
                                  <td>
                                    <label class="danger">Pending</label>
                                  </td>
                                </tr>

                                <tr>
                                  <td class="product-image">#647536</td>
                                  <td>
                                    <h6>Sprinkled Potato Chips</h6>
                                  </td>
                                  <td>
                                    <label class="success">Shipped</label>
                                  </td>
                                </tr>

                                <tr>
                                  <td class="product-image">#125689</td>
                                  <td>
                                    <h6>Milk 1 L</h6>
                                  </td>
                                  <td>
                                    <label class="danger">Pending</label>
                                  </td>
                                </tr>

                                <tr>
                                  <td class="product-image">#215487</td>
                                  <td>
                                    <h6>Raw Mutton Leg</h6>
                                  </td>
                                  <td>
                                    <label class="danger">Pending</label>
                                  </td>
                                </tr>

                                <tr>
                                  <td class="product-image">#365474</td>
                                  <td>
                                    <h6>Instant Coffee</h6>
                                  </td>
                                  <td>
                                    <label class="success">Shipped</label>
                                  </td>
                                </tr>

                                <tr>
                                  <td class="product-image">#368415</td>
                                  <td>
                                    <h6>Jowar Stick and Jowar Chips</h6>
                                  </td>
                                  <td>
                                    <label class="danger">Pending</label>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
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
