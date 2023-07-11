import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import ProductCard from "./ProductCard";
import { clearErrors, getAllProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import "../Product/Products.css";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  const { loading } = useSelector((state) => state.allproducts);
  const { error, products } = useSelector((state) => state.allproducts);

  const dispatch = useDispatch();

  const [openAlertError, setOpenAlertError] = useState(false);
  const [errorChangePassword, setErrorPassword] = useState("");

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
    if (error) {
      setErrorPassword(error);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    dispatch(getAllProducts());
  }, [dispatch, error]);

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
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorChangePassword}
            </Alert>
          </Snackbar>

          <MetaData title="ECOMMERCE" />
          <section className="home-section-2 home-section-bg pt-0 overflow-hidden">
            <div className="container-fluid p-0">
              <div className="row">
                <div className="col-12">
                  <div className="slider-animate">
                    <div className="home-contain rounded-0 p-0 position-relative">
                      <img
                        src="../assets/images/vegetable/bg-img.jpg"
                        className="img-fluid bg-img lazyload bg-top"
                        alt=""
                      />
                      <div className="home-detail p-center home-overlay position-absolute">
                        <div className="content">
                          <h6 className="ls-expanded theme-color text-uppercase">
                            Weekend Special offer
                          </h6>
                          <h1 className="heding-2">
                            Premium Quality Dry Fruits
                          </h1>
                          <h2 className="content-2">
                            Dryfruits shopping made Easy
                          </h2>
                          <h5 className="text-content">
                            Fresh & Top Quality Dry Fruits are available here!
                          </h5>
                          <Link to={"/products"}>
                            <button className="btn theme-bg-color btn-md text-white fw-bold mt-md-4 mt-2 mend-auto">
                              Shop Now{" "}
                              <i className="fa-solid fa-arrow-right icon"></i>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-t-space section-b-space">
            <div className="container-fluid-lg">
              <div className="row">
                <div className="col-xxl-3 d-xxl-block d-none">
                  <div className="category-menu menu-xl">
                    <ul>
                      <li>
                        <div className="category-list">
                          <img
                            src="../assets/svg/1/vegetable.svg"
                            className=" lazyload"
                            alt=""
                          />
                          <h5>
                            <a href="shop-left-sidebar.html">
                              Vegetables & Fruit
                            </a>
                          </h5>
                        </div>
                      </li>
                      <li>
                        <div className="category-list">
                          <img
                            src="../assets/svg/1/beverages.svg"
                            className=" lazyload"
                            alt=""
                          />
                          <h5>
                            <a href="shop-left-sidebar.html">Beverages</a>
                          </h5>
                        </div>
                      </li>
                      <li>
                        <div className="category-list">
                          <img
                            src="../assets/svg/1/meat.svg"
                            className=" lazyload"
                            alt=""
                          />
                          <h5>
                            <a href="shop-left-sidebar.html">Meats & Seafood</a>
                          </h5>
                        </div>
                      </li>
                      <li>
                        <div className="category-list">
                          <img
                            src="../assets/svg/1/dairy.svg"
                            className=" lazyload"
                            alt=""
                          />
                          <h5>
                            <a href="shop-left-sidebar.html">
                              Breakfast & Dairy
                            </a>
                          </h5>
                        </div>
                      </li>
                      <li>
                        <div className="category-list">
                          <img
                            src="../assets/svg/1/frozen.svg"
                            className=" lazyload"
                            alt=""
                          />
                          <h5>
                            <a href="shop-left-sidebar.html">Frozen Foods</a>
                          </h5>
                        </div>
                      </li>
                      <li>
                        <div className="category-list">
                          <img
                            src="../assets/svg/1/snack.svg"
                            className=" lazyload"
                            alt=""
                          />
                          <h5>
                            <a href="shop-left-sidebar.html">
                              Biscuits & Snacks
                            </a>
                          </h5>
                        </div>
                      </li>
                      <li>
                        <div className="category-list">
                          <img
                            src="../assets/svg/1/grocery.svg"
                            className=" lazyload"
                            alt=""
                          />
                          <h5>
                            <a href="shop-left-sidebar.html">
                              Grocery & Staples
                            </a>
                          </h5>
                        </div>
                      </li>
                      <li>
                        <div className="category-list">
                          <img
                            src="../assets/svg/1/wines.svg"
                            className=" lazyload"
                            alt=""
                          />
                          <h5>
                            <a href="shop-left-sidebar.html">
                              Wines & Alcohol Drinks
                            </a>
                          </h5>
                        </div>
                      </li>
                      <li>
                        <div className="category-list">
                          <img
                            src="../assets/svg/1/milk.svg"
                            className=" lazyload"
                            alt=""
                          />
                          <h5>
                            <a href="shop-left-sidebar.html">Milk & Dairies</a>
                          </h5>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xxl-9">
                  <div className="title d-block">
                    <h2 className="text-theme font-sm">Food Cupboard</h2>
                    <p>
                      A virtual assistant collects the products from your list
                    </p>
                  </div>
                  <div
                    class="row row-cols-xxl-5 row-cols-xl-4 row-cols-md-3 row-cols-2 g-sm-4 g-3 no-arrow
                               section-b-space section-t-space"
                  >
                    {products &&
                      products.map((product) => (
                        <div>
                          <ProductCard key={product._id} product={product} />
                        </div>
                      ))}
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
