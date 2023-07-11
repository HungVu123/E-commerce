import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { addItemsToCart } from "../../actions/cartAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

export default function DetailProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openAlertError, setOpenAlertError] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
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

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState("");
  const labels = {
    1: "Useless+",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };
  const getLabelText = (rating) => {
    return `${rating} Star${rating !== 1 ? "s" : ""}, ${labels[rating]}`;
  };
  const reviewCancelHandler = (e) => {
    e.preventDefault();
    setComment("");
    setRating(0);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    if (rating === 0 || comment === "") {
      setErrorInfo("Please enter a rating or comment");
      setOpenAlertError(true);
    } else {
      dispatch(newReview(myForm));
    }
  };

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    if (isAuthenticated) {
      dispatch(addItemsToCart(id, quantity));
    } else {
      navigate("/login");
    }
  };

  //   const [items, setItems] = useState();

  //   setItems([...items, {id: `${items.length + 1}` }]);

  useEffect(() => {
    if (error) {
      setErrorInfo(error);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    if (reviewError) {
      setErrorInfo(reviewError);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    if (success) {
      setSuccessInfo("Review Submitted Successfully");
      setOpenAlertSuccess(true);
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

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
              {errorInfo}
            </Alert>
          </Snackbar>

          <Snackbar
            open={openAlertSuccess}
            autoHideDuration={8000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {successInfo}
            </Alert>
          </Snackbar>

          <section className="product-section section-b-space">
            <MetaData title={`${product.name} -- ECOMMERCE`} />

            {/* Breadcrumb */}
            <section
              class="breadscrumb-section pt-0"
              style={{ marginTop: "25px", marginBottom: "20px" }}
            >
              <div class="container-fluid-lg">
                <div class="row">
                  <div class="col-12">
                    <div class="breadscrumb-contain">
                      <h2>{product.name}</h2>
                      <nav>
                        <ol class="breadcrumb mb-0">
                          <li class="breadcrumb-item">
                            <Link to={"/"}>
                              <i class="fa-solid fa-house"></i>
                            </Link>
                          </li>

                          <li class="breadcrumb-item active">{product.name}</li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="container-fluid-lg">
              <div className="row">
                <div className="col-xxl-9 col-xl-8 col-lg-7 wow fadeInUp">
                  <div className="row g-4">
                    <div className="col-xl-6 wow fadeInUp">
                      <Slider
                        asNavFor={nav2}
                        ref={(slider1) => setNav1(slider1)}
                      >
                        {/* <div>
                      {items.map((item) => (
                        <img
                          src={`../assets/images/product/category/${item.id}.jpg`}
                          id="img-1"
                          data-zoom-image="../assets/images/product/category/1.jpg"
                          className="img-fluid image_zoom_cls-0 lazyload"
                          alt=""
                        />
                      ))}
                    </div> */}
                        <div>
                          <img
                            src="../assets/images/product/category/1.jpg"
                            id="img-1"
                            data-zoom-image="../assets/images/product/category/1.jpg"
                            className="img-fluid image_zoom_cls-0 lazyload"
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="../assets/images/product/category/2.jpg"
                            data-zoom-image="../assets/images/product/category/2.jpg"
                            className="img-fluid image_zoom_cls-1 lazyload"
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="../assets/images/product/category/3.jpg"
                            data-zoom-image="../assets/images/product/category/3.jpg"
                            className="img-fluid image_zoom_cls-2 lazyload"
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="../assets/images/product/category/4.jpg"
                            data-zoom-image="../assets/images/product/category/4.jpg"
                            className="img-fluid image_zoom_cls-3 lazyload"
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="../assets/images/product/category/5.jpg"
                            data-zoom-image="../assets/images/product/category/5.jpg"
                            className="img-fluid image_zoom_cls-4 lazyload"
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="../assets/images/product/category/6.jpg"
                            data-zoom-image="../assets/images/product/category/6.jpg"
                            className="img-fluid image_zoom_cls-5 lazyload"
                            alt=""
                          />
                        </div>
                      </Slider>

                      <Slider
                        asNavFor={nav1}
                        ref={(slider2) => setNav2(slider2)}
                        slidesToShow={4}
                        swipeToSlide={true}
                        focusOnSelect={true}
                      >
                        <div>
                          <img
                            src="../assets/images/product/category/1.jpg"
                            id="img-1"
                            data-zoom-image="../assets/images/product/category/1.jpg"
                            className="img-fluid image_zoom_cls-0 lazyload"
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="../assets/images/product/category/2.jpg"
                            data-zoom-image="../assets/images/product/category/2.jpg"
                            className="img-fluid image_zoom_cls-1 lazyload"
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="../assets/images/product/category/3.jpg"
                            data-zoom-image="../assets/images/product/category/3.jpg"
                            className="img-fluid image_zoom_cls-2 lazyload"
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="../assets/images/product/category/4.jpg"
                            data-zoom-image="../assets/images/product/category/4.jpg"
                            className="img-fluid image_zoom_cls-3 lazyload"
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="../assets/images/product/category/5.jpg"
                            data-zoom-image="../assets/images/product/category/5.jpg"
                            className="img-fluid image_zoom_cls-4 lazyload"
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="../assets/images/product/category/6.jpg"
                            data-zoom-image="../assets/images/product/category/6.jpg"
                            className="img-fluid image_zoom_cls-5 lazyload"
                            alt=""
                          />
                        </div>
                      </Slider>
                    </div>

                    <div
                      className="col-xl-6 wow fadeInUp"
                      data-wow-delay="0.1s"
                    >
                      <div className="right-box-contain">
                        <h6 className="offer-top">30% Off</h6>
                        <h2 className="name">{product.name}</h2>
                        <div className="price-rating">
                          <h3 className="theme-color price">
                            ${product.price}{" "}
                            <del className="text-content">$58.46</del>
                            <span className="offer theme-color">(8% off)</span>
                          </h3>
                        </div>
                        <div>
                          <Rating {...options} /> ({product.numOfReviews}{" "}
                          Reviews)
                        </div>

                        <div className="procuct-contain">
                          <p>
                            {product.des}, Weight: {product.weight}g
                          </p>
                        </div>

                        <div className="note-box product-packege">
                          <div className="procuct-contain">
                            <p>Quantity</p>
                          </div>
                          <div className="cart_qty qty-box product-qty">
                            <div className="input-group">
                              <button
                                type="button"
                                className="qty-left-minus"
                                data-type="minus"
                                data-field=""
                                onClick={decreaseQuantity}
                              >
                                <i
                                  className="fa fa-minus"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <input
                                className="form-control input-number qty-input"
                                type="text"
                                name="quantity"
                                value={quantity}
                                readOnly
                              />
                              <button
                                type="button"
                                className="qty-right-plus"
                                data-type="plus"
                                data-field=""
                                onClick={increaseQuantity}
                              >
                                <i
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>

                          <b
                            style={{
                              color: product.stock < 1 ? "red" : "green",
                              fontSize: "0.95em",
                            }}
                          >
                            {product.stock < 1
                              ? `OutOfStock`
                              : `${product.stock} Available Products`}
                          </b>
                        </div>

                        <div className="buy-box">
                          <button
                            onClick={addToCartHandler}
                            disabled={product.stock < 1 ? true : false}
                            className="btn btn-md bg-dark cart-button text-white w-50"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="product-section-box">
                        <ul
                          className="nav nav-tabs custom-nav"
                          id="myTab"
                          role="tablist"
                        >
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link active"
                              id="description-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#description"
                              type="button"
                              role="tab"
                              aria-controls="description"
                              aria-selected="true"
                            >
                              Description
                            </button>
                          </li>

                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="info-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#info"
                              type="button"
                              role="tab"
                              aria-controls="info"
                              aria-selected="false"
                            >
                              Additional info
                            </button>
                          </li>

                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="care-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#care"
                              type="button"
                              role="tab"
                              aria-controls="care"
                              aria-selected="false"
                            >
                              Care Instuctions
                            </button>
                          </li>

                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="review-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#review"
                              type="button"
                              role="tab"
                              aria-controls="review"
                              aria-selected="false"
                            >
                              Review
                            </button>
                          </li>
                        </ul>

                        <div
                          className="tab-content custom-tab"
                          id="myTabContent"
                        >
                          <div
                            className="tab-pane fade show active"
                            id="description"
                            role="tabpanel"
                            aria-labelledby="description-tab"
                          >
                            <div className="product-description">
                              <div className="nav-desh">
                                <p>
                                  Jelly beans carrot cake icing biscuit oat cake
                                  gummi bears tart. Lemon drops carrot cake
                                  pudding sweet gummi bears. Chocolate cake tart
                                  cupcake donut topping liquorice sugar plum
                                  chocolate bar. Jelly beans tiramisu caramels
                                  jujubes biscuit liquorice chocolate. Pudding
                                  toffee jujubes oat cake sweet roll. Lemon
                                  drops dessert croissant danish cake cupcake.
                                  Sweet roll candy chocolate toffee jelly sweet
                                  roll halvah brownie topping. Marshmallow
                                  powder candy sesame snaps jelly beans candy
                                  canes marshmallow gingerbread pie.
                                </p>
                              </div>

                              <div className="nav-desh">
                                <div className="desh-title">
                                  <h5>Organic:</h5>
                                </div>
                                <p>
                                  vitae et leo duis ut diam quam nulla porttitor
                                  massa id neque aliquam vestibulum morbi
                                  blandit cursus risus at ultrices mi tempus
                                  imperdiet nulla malesuada pellentesque elit
                                  eget gravida cum sociis natoque penatibus et
                                  magnis dis parturient montes nascetur
                                  ridiculus mus mauris vitae ultricies leo
                                  integer malesuada nunc vel risus commodo
                                  viverra maecenas accumsan lacus vel facilisis
                                  volutpat est velit egestas dui id ornare arcu
                                  odio ut sem nulla pharetra diam sit amet nisl
                                  suscipit adipiscing bibendum est ultricies
                                  integer quis auctor elit sed vulputate mi sit
                                  amet mauris commodo quis imperdiet massa
                                  tincidunt nunc pulvinar sapien et ligula
                                  ullamcorper malesuada proin libero nunc
                                  consequat interdum varius sit amet mattis
                                  vulputate enim nulla aliquet porttitor lacus
                                  luctus accumsan.
                                </p>
                              </div>

                              <div className="banner-contain nav-desh">
                                <img
                                  src="../assets/images/vegetable/banner/14.jpg"
                                  className="bg-img  lazyload"
                                  alt=""
                                />
                                <div className="banner-details p-center banner-b-space w-100 text-center">
                                  <div>
                                    <h6 className="ls-expanded theme-color mb-sm-3 mb-1">
                                      SUMMER
                                    </h6>
                                    <h2>VEGETABLE</h2>
                                    <p className="mx-auto mt-1">
                                      Save up to 5% OFF
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="nav-desh">
                                <div className="desh-title">
                                  <h5>From The Manufacturer:</h5>
                                </div>
                                <p>
                                  Jelly beans shortbread chupa chups carrot cake
                                  jelly-o halvah apple pie pudding gingerbread.
                                  Apple pie halvah cake tiramisu shortbread
                                  cotton candy croissant chocolate cake. Tart
                                  cupcake caramels gummi bears macaroon
                                  gingerbread fruitcake marzipan wafer. Marzipan
                                  dessert cupcake ice cream tootsie roll.
                                  Brownie chocolate cake pudding cake powder
                                  candy ice cream ice cream cake. Jujubes
                                  soufflé chupa chups cake candy halvah donut.
                                  Tart tart icing lemon drops fruitcake apple
                                  pie.
                                </p>

                                <p>
                                  Dessert liquorice tart soufflé chocolate bar
                                  apple pie pastry danish soufflé. Gummi bears
                                  halvah gingerbread jelly icing. Chocolate cake
                                  chocolate bar pudding chupa chups bear claw
                                  pie dragée donut halvah. Gummi bears cookie
                                  ice cream jelly-o jujubes sweet croissant.
                                  Marzipan cotton candy gummi bears lemon drops
                                  lollipop lollipop chocolate. Ice cream cookie
                                  dragée cake sweet roll sweet roll.Lemon drops
                                  cookie muffin carrot cake chocolate marzipan
                                  gingerbread topping chocolate bar. Soufflé
                                  tiramisu pastry sweet dessert.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            className="tab-pane fade"
                            id="info"
                            role="tabpanel"
                            aria-labelledby="info-tab"
                          >
                            <div className="table-responsive">
                              <table className="table info-table">
                                <tbody>
                                  <tr>
                                    <td>Specialty</td>
                                    <td>Vegetarian</td>
                                  </tr>
                                  <tr>
                                    <td>Ingredient Type</td>
                                    <td>Vegetarian</td>
                                  </tr>
                                  <tr>
                                    <td>Brand</td>
                                    <td>Lavian Exotique</td>
                                  </tr>
                                  <tr>
                                    <td>Form</td>
                                    <td>Bar Brownie</td>
                                  </tr>
                                  <tr>
                                    <td>Package Information</td>
                                    <td>Box</td>
                                  </tr>
                                  <tr>
                                    <td>Manufacturer</td>
                                    <td>Prayagh Nutri Product Pvt Ltd</td>
                                  </tr>
                                  <tr>
                                    <td>Item part number</td>
                                    <td>
                                      LE 014 - 20pcs Crème Bakes (Pack of 2)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Net Quantity</td>
                                    <td>40.00 count</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div
                            className="tab-pane fade"
                            id="care"
                            role="tabpanel"
                            aria-labelledby="care-tab"
                          >
                            <div className="information-box">
                              <ul>
                                <li>
                                  Store cream cakes in a refrigerator. Fondant
                                  cakes should be stored in an air conditioned
                                  environment.
                                </li>

                                <li>
                                  Slice and serve the cake at room temperature
                                  and make sure it is not exposed to heat.
                                </li>

                                <li>
                                  Use a serrated knife to cut a fondant cake.
                                </li>

                                <li>
                                  Sculptural elements and figurines may contain
                                  wire supports or toothpicks or wooden skewers
                                  for support.
                                </li>

                                <li>
                                  Please check the placement of these items
                                  before serving to small children.
                                </li>

                                <li>
                                  The cake should be consumed within 24 hours.
                                </li>

                                <li>Enjoy your cake!</li>
                              </ul>
                            </div>
                          </div>

                          <div
                            className="tab-pane fade"
                            id="review"
                            role="tabpanel"
                            aria-labelledby="review-tab"
                          >
                            <div className="review-box">
                              <div className="row g-4">
                                <div className="col-xl-8">
                                  <div className="review-title">
                                    <h4 className="fw-500">Customer reviews</h4>
                                  </div>

                                  <div
                                    className="d-flex"
                                    style={{ alignItems: "center" }}
                                  >
                                    <Rating {...options} />
                                    <h6
                                      className="ms-2"
                                      style={{ marginBottom: "0px" }}
                                    >
                                      {product.ratings} Out Of 5 Stars (
                                      {product.numOfReviews} reviews)
                                    </h6>
                                  </div>

                                  <div className="rating-box">
                                    <ul>
                                      <li>
                                        <div className="rating-list">
                                          <h5>5 Star</h5>
                                          <div className="progress">
                                            <div
                                              className="progress-bar"
                                              role="progressbar"
                                              style={{ width: "68%" }}
                                              aria-valuenow="100"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              68%
                                            </div>
                                          </div>
                                        </div>
                                      </li>

                                      <li>
                                        <div className="rating-list">
                                          <h5>4 Star</h5>
                                          <div className="progress">
                                            <div
                                              className="progress-bar"
                                              role="progressbar"
                                              style={{ width: "67%" }}
                                              aria-valuenow="100"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              67%
                                            </div>
                                          </div>
                                        </div>
                                      </li>

                                      <li>
                                        <div className="rating-list">
                                          <h5>3 Star</h5>
                                          <div className="progress">
                                            <div
                                              className="progress-bar"
                                              role="progressbar"
                                              style={{ width: "42%" }}
                                              aria-valuenow="100"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              42%
                                            </div>
                                          </div>
                                        </div>
                                      </li>

                                      <li>
                                        <div className="rating-list">
                                          <h5>2 Star</h5>
                                          <div className="progress">
                                            <div
                                              className="progress-bar"
                                              role="progressbar"
                                              style={{ width: "30%" }}
                                              aria-valuenow="100"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              30%
                                            </div>
                                          </div>
                                        </div>
                                      </li>

                                      <li>
                                        <div className="rating-list">
                                          <h5>1 Star</h5>
                                          <div className="progress">
                                            <div
                                              className="progress-bar"
                                              role="progressbar"
                                              style={{ width: "24%" }}
                                              aria-valuenow="100"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              24%
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="col-xl-4">
                                  <div className="review-title">
                                    <h4 className="fw-500">Add a review</h4>
                                  </div>

                                  <form onSubmit={reviewSubmitHandler}>
                                    <div className="row g-4">
                                      <div
                                        className="col-12"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Rating
                                          getLabelText={getLabelText}
                                          onChange={(e) =>
                                            setRating(e.target.value)
                                          }
                                          onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                          }}
                                          value={rating}
                                          size="large"
                                        />
                                        {rating !== null && (
                                          <div>
                                            {
                                              labels[
                                                hover !== -1 ? hover : rating
                                              ]
                                            }
                                          </div>
                                        )}
                                      </div>

                                      <div className="col-12">
                                        <div className="form-floating theme-form-floating">
                                          <textarea
                                            className="form-control"
                                            placeholder="Leave a comment here"
                                            id="floatingTextarea2"
                                            style={{ height: "165px" }}
                                            value={comment}
                                            onChange={(e) =>
                                              setComment(e.target.value)
                                            }
                                          ></textarea>
                                          <label for="floatingTextarea2">
                                            Write Your Comment
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{ display: "flex", gap: "10px" }}
                                    >
                                      <button
                                        className="submitReview"
                                        style={{ backgroundColor: "tomato" }}
                                        onClick={reviewCancelHandler}
                                      >
                                        Clear
                                      </button>
                                      <button
                                        className="submitReview"
                                        type="submit"
                                      >
                                        Submit Review
                                      </button>
                                    </div>
                                  </form>
                                </div>

                                <div className="col-12">
                                  <div className="review-title">
                                    <h4 className="fw-500">
                                      Customer's Reviews
                                    </h4>
                                  </div>

                                  <div className="review-people">
                                    <ul className="review-list">
                                      {product.reviews && product.reviews[0] ? (
                                        product.reviews &&
                                        product.reviews.map((review) => (
                                          <li key={review._id}>
                                            <ReviewCard
                                              key={review._id}
                                              review={review}
                                            />
                                          </li>
                                        ))
                                      ) : (
                                        <h4 className="noReviews">
                                          No Reviews Yet
                                        </h4>
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-3 col-xl-4 col-lg-5 d-none d-lg-block wow fadeInUp">
                  <div className="right-sidebar-box">
                    <div className="pt-25">
                      <div className="category-menu">
                        <h3>Trending Products</h3>

                        <ul className="product-list product-right-sidebar border-0 p-0">
                          <li>
                            <div className="offer-product">
                              <a
                                href="product-left-thumbnail.html"
                                className="offer-image"
                              >
                                <img
                                  src="../assets/images/vegetable/product/23.png"
                                  className="img-fluid  lazyload"
                                  alt=""
                                />
                              </a>

                              <div className="offer-detail">
                                <div>
                                  <a href="product-left-thumbnail.html">
                                    <h6 className="name">
                                      Meatigo Premium Goat Curry
                                    </h6>
                                  </a>
                                  <span>450 G</span>
                                  <h6 className="price theme-color">$ 70.00</h6>
                                </div>
                              </div>
                            </div>
                          </li>

                          <li>
                            <div className="offer-product">
                              <a
                                href="product-left-thumbnail.html"
                                className="offer-image"
                              >
                                <img
                                  src="../assets/images/vegetable/product/24.png"
                                  className=" lazyload"
                                  alt=""
                                />
                              </a>

                              <div className="offer-detail">
                                <div>
                                  <a href="product-left-thumbnail.html">
                                    <h6 className="name">
                                      Dates Medjoul Premium Imported
                                    </h6>
                                  </a>
                                  <span>450 G</span>
                                  <h6 className="price theme-color">$ 40.00</h6>
                                </div>
                              </div>
                            </div>
                          </li>

                          <li>
                            <div className="offer-product">
                              <a
                                href="product-left-thumbnail.html"
                                className="offer-image"
                              >
                                <img
                                  src="../assets/images/vegetable/product/25.png"
                                  className=" lazyload"
                                  alt=""
                                />
                              </a>

                              <div className="offer-detail">
                                <div>
                                  <a href="product-left-thumbnail.html">
                                    <h6 className="name">
                                      Good Life Walnut Kernels
                                    </h6>
                                  </a>
                                  <span>200 G</span>
                                  <h6 className="price theme-color">$ 52.00</h6>
                                </div>
                              </div>
                            </div>
                          </li>

                          <li className="mb-0">
                            <div className="offer-product">
                              <a
                                href="product-left-thumbnail.html"
                                className="offer-image"
                              >
                                <img
                                  src="../assets/images/vegetable/product/26.png"
                                  className=" lazyload"
                                  alt=""
                                />
                              </a>

                              <div className="offer-detail">
                                <div>
                                  <a href="product-left-thumbnail.html">
                                    <h6 className="name">
                                      Apple Red Premium Imported
                                    </h6>
                                  </a>
                                  <span>1 KG</span>
                                  <h6 className="price theme-color">$ 80.00</h6>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="ratio_156 pt-25">
                      <div className="home-contain">
                        <img
                          src="../assets/images/vegetable/banner/8.jpg"
                          className="bg-img  lazyload"
                          alt=""
                        />
                        <div className="home-detail p-top-left home-p-medium">
                          <div>
                            <h6 className="text-yellow home-banner">Seafood</h6>
                            <h3 className="text-uppercase fw-normal">
                              <span className="theme-color fw-bold">
                                Freshes
                              </span>{" "}
                              Products
                            </h3>
                            <h3 className="fw-light">every hour</h3>
                            <Link
                              to={"/"}
                              className="btn btn-animation btn-md fw-bold mend-auto"
                            >
                              Shop Now{" "}
                              <i className="fa-solid fa-arrow-right icon"></i>
                            </Link>
                          </div>
                        </div>
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
