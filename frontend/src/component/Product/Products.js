import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllProducts } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../layout/MetaData";
import SliderBanner from "react-slick";
import "./Products.css";
import { Link, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import SliderPrice from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Rating } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

export default function Products() {
  const dispatch = useDispatch();

  const [openAlertError, setOpenAlertError] = useState(false);
  const [errorProduct, setErrorProduct] = useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertError(false);
  };

  const { products, loading, error, productsCount, itemsPerPage } = useSelector(
    (state) => state.allproducts
  );

  const theme = createTheme({
    palette: {
      neutral: {
        main: "#0da487",
      },
    },
  });

  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2500]);
  const [priceSlider, setPriceSlider] = useState([0, 2500]);
  const minPrice = priceSlider[0];
  const maxPrice = priceSlider[1];
  const [ratings, setRatings] = useState([0, 5]);
  const [category, setCategory] = useState("");
  const [checkboxes, setCheckboxes] = useState([
    { label: "1 star", checked: false, rating: 1 },
    { label: "2 stars", checked: false, rating: 2 },
    { label: "3 stars", checked: false, rating: 3 },
    { label: "4 stars", checked: false, rating: 4 },
    { label: "5 stars", checked: false, rating: 5 },
  ]);
  const [categories, setCategories] = useState([
    {
      name: "Vegetables and Fruit",
      srcImg: "../assets/svg/1/vegetable.svg",
      id: "pills-vegetable",
      checked: false,
    },
    {
      name: "Beverages",
      srcImg: "../assets/svg/1/beverages.svg",
      id: "pills-beverages",
      checked: false,
    },
    {
      name: "Meats and Seafood",
      srcImg: "../assets/svg/1/meat.svg",
      id: "pills-meat",
      checked: false,
    },
    {
      name: "Breakfast and Dairy",
      srcImg: "../assets/svg/1/dairy.svg",
      id: "pills-dairy",
      checked: false,
    },
    {
      name: "Frozen Foods",
      srcImg: "../assets/svg/1/frozen.svg",
      id: "pills-frozen",
      checked: false,
    },
    {
      name: "Biscuits and Snacks",
      srcImg: "../assets/svg/1/snack.svg",
      id: "pills-snack",
      checked: false,
    },
    {
      name: "Grocery and Staples",
      srcImg: "../assets/svg/1/grocery.svg",
      id: "pills-grocery",
      checked: false,
    },
    {
      name: "Wines and Alcohol Drinks",
      srcImg: "../assets/svg/1/wines.svg",
      id: "pills-wines",
      checked: false,
    },
    {
      name: "Milk and Dairies",
      srcImg: "../assets/svg/1/milk.svg",
      id: "pills-milk",
      checked: false,
    },
    {
      name: "Pet Foods",
      srcImg: "../assets/svg/1/pet.svg",
      id: "pills-pet",
      checked: false,
    },
  ]);

  const handleReset = (e) => {
    setPriceSlider([0, 2500]);
    setPrice([0, 2500]);
    setRatings([0, 5]);
    setCheckboxes([
      { label: "1 star", checked: false, rating: 1 },
      { label: "2 stars", checked: false, rating: 2 },
      { label: "3 stars", checked: false, rating: 3 },
      { label: "4 stars", checked: false, rating: 4 },
      { label: "5 stars", checked: false, rating: 5 },
    ]);
    setCategories([
      {
        name: "Vegetables and Fruit",
        srcImg: "../assets/svg/1/vegetable.svg",
        id: "pills-vegetable",
        checked: false,
      },
      {
        name: "Beverages",
        srcImg: "../assets/svg/1/beverages.svg",
        id: "pills-beverages",
        checked: false,
      },
      {
        name: "Meats and Seafood",
        srcImg: "../assets/svg/1/meat.svg",
        id: "pills-meat",
        checked: false,
      },
      {
        name: "Breakfast and Dairy",
        srcImg: "../assets/svg/1/dairy.svg",
        id: "pills-dairy",
        checked: false,
      },
      {
        name: "Frozen Foods",
        srcImg: "../assets/svg/1/frozen.svg",
        id: "pills-frozen",
        checked: false,
      },
      {
        name: "Biscuits and Snacks",
        srcImg: "../assets/svg/1/snack.svg",
        id: "pills-snack",
        checked: false,
      },
      {
        name: "Grocery and Staples",
        srcImg: "../assets/svg/1/grocery.svg",
        id: "pills-grocery",
        checked: false,
      },
      {
        name: "Wines and Alcohol Drinks",
        srcImg: "../assets/svg/1/wines.svg",
        id: "pills-wines",
        checked: false,
      },
      {
        name: "Milk and Dairies",
        srcImg: "../assets/svg/1/milk.svg",
        id: "pills-milk",
        checked: false,
      },
      {
        name: "Pet Foods",
        srcImg: "../assets/svg/1/pet.svg",
        id: "pills-pet",
        checked: false,
      },
    ]);
    setCategory("");
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceSliderHandler = (event, newPrice) => {
    setPriceSlider(newPrice);
  };
  const submitFilter = () => {
    setPrice([minPrice, maxPrice]);
    setRatings([selectedRating - 0.9, selectedRating]);
    setCategory(selectedCate);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleCheckboxChange = (event, index) => {
    const updatedCheckboxes = checkboxes.map((checkbox, i) => {
      if (i === index) {
        return { ...checkbox, checked: event.target.checked };
      } else {
        return { ...checkbox, checked: false };
      }
    });

    setCheckboxes(updatedCheckboxes);
  };

  const handleCheckboxChangeCate = (event, index) => {
    const updatedCheckboxCate = categories.map((cate, i) => {
      if (i === index) {
        return { ...cate, checked: event.target.checked };
      } else {
        return { ...cate, checked: false };
      }
    });

    setCategories(updatedCheckboxCate);
  };

  const selectedCheckbox = checkboxes.find(
    (checkbox) => checkbox.checked === true
  );

  const selectedCheckboxCate = categories.find((cate) => cate.checked === true);

  const selectedRating = selectedCheckbox ? selectedCheckbox.rating : 0;
  const selectedCate = selectedCheckboxCate ? selectedCheckboxCate.name : "";

  useEffect(() => {
    if (error) {
      setErrorProduct(error);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    dispatch(getAllProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, keyword, currentPage, price, category, ratings]);

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
              {errorProduct}
            </Alert>
          </Snackbar>

          <MetaData title="PRODUCTS - ECOMMERCE" />

          {/* Breadcrumb */}
          <section class="breadscrumb-section pt-0">
            <div class="container-fluid-lg">
              <div class="row">
                <div class="col-12">
                  <div class="breadscrumb-contain">
                    <h2>Products</h2>
                    <nav>
                      <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                          <Link to={"/"}>
                            <i class="fa-solid fa-house"></i>
                          </Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                          Products
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Banner */}
          <section>
            <div class="container-fluid-lg">
              <div class="row">
                <div class="col-12">
                  <div class="slider-1 slider-animate product-wrapper no-arrow section-t-space">
                    <SliderBanner {...settings}>
                      <div>
                        <div
                          class="banner-contain-2 hover-effect bg-size lazyloaded"
                          style={{
                            backgroundImage: "url(../assets/images/shop/1.jpg)",
                          }}
                        >
                          <div class="banner-detail p-center-right position-relative shop-banner ms-auto banner-small">
                            <div>
                              <h2>
                                Healthy, nutritious & Tasty Fruits & Veggies
                              </h2>
                              <h3>Save upto 50%</h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div
                          class="banner-contain-2 hover-effect bg-size lazyloaded"
                          style={{
                            backgroundImage: "url(../assets/images/shop/1.jpg)",
                          }}
                        >
                          <div class="banner-detail p-center-right position-relative shop-banner ms-auto banner-small">
                            <div>
                              <h2>
                                Healthy, nutritious & Tasty Fruits & Veggies
                              </h2>
                              <h3>Save upto 50%</h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div
                          class="banner-contain-2 hover-effect bg-size lazyloaded"
                          style={{
                            backgroundImage: "url(../assets/images/shop/1.jpg)",
                          }}
                        >
                          <div class="banner-detail p-center-right position-relative shop-banner ms-auto banner-small">
                            <div>
                              <h2>
                                Healthy, nutritious & Tasty Fruits & Veggies
                              </h2>
                              <h3>Save upto 50%</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SliderBanner>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Products */}
          <section class="section-b-space shop-section">
            <div class="container-fluid-lg">
              <div class="row">
                <div class="col-xxl-3 d-xxl-block d-none">
                  <div class="left-box wow fadeInUp">
                    <div class="shop-left-sidebar">
                      <ul
                        class="nav nav-pills mb-3 custom-nav-tab"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li class="nav-item" role="presentation">
                          <button
                            className={
                              category === "" ? "nav-link active" : "nav-link"
                            }
                            data-bs-toggle="pill"
                            data-bs-target="pills-all"
                            type="button"
                            role="tab"
                            aria-controls="pills-all"
                            aria-selected="true"
                            onClick={() => setCategory("")}
                          >
                            All
                            <img
                              src="../assets/svg/1/wines.svg"
                              class="lazyload"
                              alt=""
                            />
                          </button>
                        </li>

                        {categories.map((cate) => (
                          <li
                            class="nav-item"
                            role="presentation"
                            key={cate.name}
                          >
                            <button
                              className={
                                cate.name === category
                                  ? "nav-link active"
                                  : "nav-link"
                              }
                              id={cate.id}
                              data-bs-toggle="pill"
                              data-bs-target={cate.id}
                              type="button"
                              role="tab"
                              aria-controls={cate.id}
                              aria-selected="true"
                              onClick={() => setCategory(cate.name)}
                            >
                              {cate.name}{" "}
                              <img src={cate.srcImg} class="lazyload" alt="" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="col-xxl-9">
                  <div class="show-button">
                    <div class="top-filter-menu-2">
                      <div
                        class="sidebar-filter-menu"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                      >
                        <a href="/#" style={{ textDecoration: "none" }}>
                          <i class="fa-solid fa-filter"></i> Filter Menu
                        </a>
                      </div>

                      <div class="ms-auto d-flex align-items-center">
                        <div class="category-dropdown me-md-3">
                          <h5 class="text-content">Sort By :</h5>
                          <div class="dropdown">
                            <button
                              class="dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                            >
                              <span>Most Popular</span>{" "}
                              <i class="fa-solid fa-angle-down"></i>
                            </button>
                            <ul
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                <a class="dropdown-item" id="pop" href="/#">
                                  Popularity
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" id="low" href="/#">
                                  Low - High Price
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" id="high" href="/#">
                                  High - Low Price
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" id="rating" href="/#">
                                  Average Rating
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" id="aToz" href="/#">
                                  A - Z Order
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" id="zToa" href="/#">
                                  Z - A Order
                                </a>
                              </li>
                              <li>
                                <a class="dropdown-item" id="off" href="/#">
                                  % Off - Hight To Low
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form
                    class="top-filter-category"
                    id="collapseExample"
                    onSubmit={submitFilter}
                  >
                    <div class="row g-sm-4 g-3">
                      <div class="col-xl-4 col-md-6">
                        <div class="category-title">
                          <h3>Price</h3>
                        </div>

                        <div className="range-input">
                          <span>
                            <input type="text" value={minPrice} />
                            <label className="place-holder">$</label>
                          </span>
                          <span>
                            <input type="text" value={maxPrice} />
                            <label className="place-holder">$</label>
                          </span>
                        </div>

                        <div class="range-slider">
                          <ThemeProvider theme={theme}>
                            <SliderPrice
                              aria-labelledby="range-slider"
                              value={priceSlider}
                              onChange={priceSliderHandler}
                              defaultValue={30}
                              min={0}
                              max={2500}
                              valueLabelDisplay="off"
                              color="neutral"
                              step={100}
                            />
                          </ThemeProvider>
                        </div>
                        <div className="filter-list price">
                          <a href="/#" className="c-btnbox">
                            Below 100$
                          </a>
                          <a href="/#" className="c-btnbox">
                            From 100$ to 500$
                          </a>
                          <a href="/#" className="c-btnbox">
                            From 500$ to 1000$
                          </a>
                          <a href="/#" className="c-btnbox">
                            Above 1000$
                          </a>
                        </div>
                      </div>

                      <div class="col-xl-4 col-md-6">
                        <div class="category-title">
                          <h3>Discount</h3>
                        </div>

                        <ul class="category-list" style={{ paddingLeft: "0" }}>
                          <li>
                            <div class="form-check ps-0 m-0 category-list-box">
                              <input
                                class="checkbox_animated"
                                type="checkbox"
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault"
                              >
                                <span class="name">upto 5%</span>
                                <span class="number">(15)</span>
                              </label>
                            </div>
                          </li>

                          <li>
                            <div class="form-check ps-0 m-0 category-list-box">
                              <input
                                class="checkbox_animated"
                                type="checkbox"
                                id="flexCheckDefault1"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault1"
                              >
                                <span class="name">5% - 10%</span>
                                <span class="number">(15)</span>
                              </label>
                            </div>
                          </li>

                          <li>
                            <div class="form-check ps-0 m-0 category-list-box">
                              <input
                                class="checkbox_animated"
                                type="checkbox"
                                id="flexCheckDefault2"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault2"
                              >
                                <span class="name">10% - 15%</span>
                                <span class="number">(15)</span>
                              </label>
                            </div>
                          </li>

                          <li>
                            <div class="form-check ps-0 m-0 category-list-box">
                              <input
                                class="checkbox_animated"
                                type="checkbox"
                                id="flexCheckDefault3"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault3"
                              >
                                <span class="name">15% - 25%</span>
                                <span class="number">(15)</span>
                              </label>
                            </div>
                          </li>

                          <li>
                            <div class="form-check ps-0 m-0 category-list-box">
                              <input
                                class="checkbox_animated"
                                type="checkbox"
                                id="flexCheckDefault4"
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckDefault4"
                              >
                                <span class="name">More than 25%</span>
                                <span class="number">(15)</span>
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div class="col-xl-4 col-md-6">
                        <div class="category-title">
                          <h3>Rating</h3>
                        </div>

                        <div>
                          <ul
                            class="category-list custom-padding"
                            style={{ paddingLeft: "0" }}
                          >
                            {checkboxes.map((checkbox, index) => (
                              <li key={index}>
                                <div class="form-check ps-0 m-0 category-list-box">
                                  <input
                                    class="checkbox_animated"
                                    type="checkbox"
                                    checked={checkbox.checked}
                                    onChange={(event) =>
                                      handleCheckboxChange(event, index)
                                    }
                                  />
                                  <div class="form-check-label">
                                    <Rating
                                      name="size-large"
                                      defaultValue={checkbox.rating}
                                      size="large"
                                      readOnly
                                    />
                                    <span class="text-content">
                                      ({checkbox.label})
                                    </span>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div class="col-xl-4 col-md-6">
                        <div class="category-title">
                          <h3>Product</h3>
                        </div>
                        <ul
                          class="category-list custom-padding custom-height"
                          style={{ paddingLeft: "0" }}
                        >
                          {categories.map((cate, index) => (
                            <li>
                              <div class="form-check ps-0 m-0 category-list-box">
                                <input
                                  class="checkbox_animated"
                                  type="checkbox"
                                  id={cate.id}
                                  checked={cate.checked}
                                  onChange={(event) =>
                                    handleCheckboxChangeCate(event, index)
                                  }
                                />
                                <label class="form-check-label" for={cate.id}>
                                  <span class="name">{cate.name}</span>
                                  <span class="number">(15)</span>
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="filter-button filter-button--total">
                      <button class="btn-filter-close" onClick={handleReset}>
                        <span>Clear All</span>
                      </button>
                      <button class="btn-filter-readmore" type="submit">
                        <span>Result</span>
                      </button>
                    </div>
                  </form>

                  <div
                    class="row row-cols-xxl-5 row-cols-xl-4 row-cols-md-3 row-cols-2 g-sm-4 g-3 no-arrow section-b-space">
                    {products &&
                      products.map((product) => (
                        <div>
                          <ProductCard key={product._id} product={product} />
                        </div>
                      ))}
                  </div>

                  {itemsPerPage < productsCount && (
                    <nav class="custome-pagination">
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={productsCount}
                        pageRangeDisplayed={3}
                        onChange={setCurrentPageNo}
                        innerClass="pagination justify-content-center"
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText={<i class="fa-solid fa-angles-left"></i>}
                        lastPageText={<i class="fa-solid fa-angles-right"></i>}
                        prevPageText={<i class="fa-solid fa-angle-left"></i>}
                        nextPageText={<i class="fa-solid fa-angle-right"></i>}
                      />
                    </nav>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
