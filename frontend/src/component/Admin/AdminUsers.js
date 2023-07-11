import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MuiAlert from "@mui/material/Alert";
import { Pagination, Snackbar } from "@mui/material";
import MetaData from "../layout/MetaData";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../actions/userAction";
import {
  DELETE_USER_RESET,
  UPDATE_USER_RESET,
} from "../../constants/userConstants";

export default function AdminUsers() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, users, loading, itemsPerPage, ordersCount } = useSelector(
    (state) => state.allUsers
  );
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const {
    error: deleteError,
    isDeleted,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const [userId, setUserId] = useState("");
  const handleSetUser = (id, name, email, role) => {
    setUserId(id);
    setName(name);
    setEmail(email);
    setRole(role);
  };

  const updateUserHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  const deleteUserHandler = (e) => {
    e.preventDefault();
    dispatch(deleteUser(userId));
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
      setSuccessInfo("User Deleted Successfully");
      setOpenAlertSuccess(true);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    if (isUpdated) {
      setSuccessInfo("User Updated Successfully");
      setOpenAlertSuccess(true);
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }

    dispatch(getAllUsers(currentPage));
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
                        <h4 style={{ marginBottom: "0" }}>All Users</h4>
                      </div>
                    </div>
                    <div class="table-responsive dashboard-bg-box">
                      <table class="table product-table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">User ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Update/Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users &&
                            users.map((user, index) => (
                              <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td style={{ maxWidth: "250px" }}>
                                  <h6 style={{ marginBottom: "0" }}>
                                    {user._id}
                                  </h6>
                                </td>
                                <td>
                                  <h6 style={{ marginBottom: "0" }}>
                                    {user.email}
                                  </h6>
                                </td>
                                <td>
                                  <h6 style={{ marginBottom: "0" }}>
                                    {user.name}
                                  </h6>
                                </td>
                                <td>
                                  <h6 style={{ marginBottom: "0" }}>
                                    {user.role}
                                  </h6>
                                </td>
                                <td class="efit-delete">
                                  <h6 style={{ marginBottom: "0" }}>
                                    <FiEdit
                                      data-bs-toggle="modal"
                                      data-bs-target={`#modalUpdate`}
                                      onClick={() => {
                                        handleSetUser(
                                          user._id,
                                          user.name,
                                          user.email,
                                          user.role
                                        );
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
                                        handleSetUser(user._id);
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

          <form onSubmit={updateUserHandler}>
            <div
              class="modal fade theme-modal"
              id={`modalUpdate`}
              data-bs-backdrop="static"
              tabindex="-1"
              aria-labelledby="exampleModalLabel2"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Update User Role</h5>
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
                          <div class="col-xxl-12 col-lg-12">
                            <div class="row g-4">
                              <div class="col-lg-12 col-sm-12">
                                <div class="summery-box">
                                  <ul class="summery-contain">
                                    <li>
                                      <h4>Name : {name}</h4>
                                    </li>

                                    <li>
                                      <h4>Email: {email}</h4>
                                    </li>

                                    <li>
                                      <select
                                        value={role}
                                        onChange={(e) =>
                                          setRole(e.target.value)
                                        }
                                      >
                                        <option value="">Choose Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                      </select>
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
                    <button
                      type="submit"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                      style={{
                        backgroundColor: "#0da487",
                        display: role === "" ? "none" : "block",
                      }}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <form onSubmit={deleteUserHandler}>
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
                      Do you want to delete this user?
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
