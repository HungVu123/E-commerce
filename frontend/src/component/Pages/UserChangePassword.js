import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import MetaData from "../layout/MetaData";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

export default function UserChangePassword() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
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

    if (isUpdated) {
      setSuccessInfo("Password Updated Successfully");
      navigate("/user/changePassword");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [isAuthenticated, dispatch, error, isUpdated, navigate]);

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

          <MetaData title={`${user.name} Change Password`} />
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
                  id="pills-changepassword"
                  role="tabpanel"
                  aria-labelledby="pills-changepassword-tab"
                >
                  <div class="dashboard-profile">
                    <div class="title">
                      <h2>Change Password</h2>
                    </div>

                    <div class="profile-about dashboard-bg-box">
                      <form onSubmit={updatePasswordSubmit}>
                        <div class="dashboard-title mb-3">
                          <h3>Password About</h3>
                        </div>
                        <div class="row">
                          <div
                            class="col-3"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-evenly",
                              rowGap: "40px",
                            }}
                          >
                            <td>Old Password</td>
                            <td>New Password</td>
                            <td>Confirm Password</td>
                            <td></td>
                          </div>

                          <div
                            class="col-6"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-evenly",
                              rowGap: "30px",
                            }}
                          >
                            <td>
                              <input
                                className="input-form"
                                type="password"
                                placeholder="Old Password"
                                required
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                              />
                            </td>

                            <td>
                              <input
                                className="input-form"
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                            </td>

                            <td>
                              <input
                                className="input-form"
                                type="password"
                                placeholder="New Password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                              />
                            </td>

                            <div class="text-left">
                              <button
                                type="submit"
                                class="btn theme-bg-color btn-md fw-bold text-light"
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>

                          <div
                            class="col-3"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-evenly",
                              rowGap: "40px",
                            }}
                          >
                            <Link to={"/password/forgot"}>
                              <td>ForgotPassword?</td>
                            </Link>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </div>
                        </div>
                      </form>
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
