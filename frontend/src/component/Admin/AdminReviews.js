import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import MetaData from "../layout/MetaData";
import { deleteReviews, getAllReviews } from "../../actions/productAction";
import { clearErrors } from "../../actions/userAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { AiOutlineDelete } from "react-icons/ai";
import { MdArrowBackIos } from "react-icons/md";

export default function AdminReviews() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const { user, isAuthenticated } = useSelector((state) => state.user);

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

  const [reviewId, setReviewId] = useState("");
  const handleSetReview = (id) => {
    setReviewId(id);
  };

  const deleteReviewHandler = (e) => {
    e.preventDefault();
    dispatch(deleteReviews(reviewId, id));
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

    if (isDeleted) {
      setSuccessInfo("Review Deleted Successfully");
      setOpenAlertSuccess(true);
      navigate(`/admin/reviews/${id}`);
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    dispatch(getAllReviews(id));
  }, [
    isAuthenticated,
    navigate,
    user,
    dispatch,
    error,
    deleteError,
    isDeleted,
    id,
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

          <MetaData title={`ALL PRODUCT's REVIEWS - Admin`} />
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
                        <Link to={`/admin/products`} style={{ color: "black" }}>
                          <h5>
                            <MdArrowBackIos />
                            Back
                          </h5>
                        </Link>
                        <h4
                          style={{
                            marginBottom: "0",
                            display: reviews.length === 0 ? "none" : "block",
                          }}
                        >
                          All Reviews
                        </h4>
                      </div>
                    </div>
                    {reviews.length === 0 ? (
                      <h4 style={{ marginBottom: "0", color: "red" }}>
                        No Reviews Found
                      </h4>
                    ) : (
                      <div class="table-responsive dashboard-bg-box">
                        <table class="table product-table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Review ID</th>
                              <th scope="col">User</th>
                              <th scope="col">Comment</th>
                              <th scope="col">Rating</th>
                              <th scope="col">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reviews &&
                              reviews.map((review, index) => (
                                <tr key={review._id}>
                                  <td>{index + 1}</td>
                                  <td style={{ maxWidth: "250px" }}>
                                    <h6 style={{ marginBottom: "0" }}>
                                      {review._id}
                                    </h6>
                                  </td>
                                  <td>
                                    <h6 style={{ marginBottom: "0" }}>
                                      {review.name}
                                    </h6>
                                  </td>
                                  <td>
                                    <h6 style={{ marginBottom: "0" }}>
                                      {review.comment}
                                    </h6>
                                  </td>
                                  <td>
                                    <h6
                                      style={{
                                        marginBottom: "0",
                                        color:
                                          review.rating <= 3 ? "red" : "green",
                                      }}
                                    >
                                      {review.rating}
                                    </h6>
                                  </td>
                                  <td class="efit-delete">
                                    <h6 style={{ marginBottom: "0" }}>
                                      <AiOutlineDelete
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalDelete"
                                        onClick={() => {
                                          handleSetReview(review._id);
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
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={deleteReviewHandler}>
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
                      Do you want to delete this review?
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
