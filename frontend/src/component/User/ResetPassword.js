import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import MuiAlert from "@mui/material/Alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Snackbar } from "@mui/material";

export default function ResetPassword() {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openAlertError, setOpenAlertError] = useState(false);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [errorInfo, setErrorInfo] = useState("");

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

      const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
      );

      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");

      const resetPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(resetPassword(token, myForm));
      };

      useEffect(() => {
        if (error) {
            setErrorInfo(error);
            setOpenAlertError(true);
          dispatch(clearErrors());
        }
    
        if (success) {
            setOpenAlertSuccess(true);
            navigate("/login");
        }
      }, [dispatch, error, success,navigate]);

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
              Update Password Success !!!
            </Alert>
          </Snackbar>

        <MetaData title="Forgot Password" />
        {/* Breadcrumb */}
        <section class="breadscrumb-section pt-0">
          <div class="container-fluid-lg">
            <div class="row">
              <div class="col-12">
                <div class="breadscrumb-contain">
                  <h2>Reset Password</h2>
                  <nav>
                    <ol class="breadcrumb mb-0">
                      <li class="breadcrumb-item">
                        <Link to={"/"}>
                          <i class="fa-solid fa-house"></i>
                        </Link>
                      </li>
                      <li class="breadcrumb-item active">Reset Password</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*Reset Password */}
        <section class="log-in-section otp-section section-b-space" >
          <div class="container-fluid-lg">
            <div class="row">
              <div class="col-xxl-8 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
                <div class="image-contain">
                  <img
                    src="../../assets/images/inner-page/otp.png"
                    class="img-fluid"
                    alt=""
                  />
                </div>
              </div>

              <div class="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
                <div class="d-flex align-items-center justify-content-center h-100">
                  <div class="log-in-box">
                    <div class="log-in-title">
                      <h3 class="text-title">
                        Please enter new password to reset your password
                      </h3>
                    </div>

                    <div
                      id="otp"
                      class="inputs d-flex flex-row justify-content-center"
                    >
                      <form
                        className="forgotPasswordForm"
                        onSubmit={resetPasswordSubmit}
                      >
                        <div>
                          <input
                            className="input-form"  
                            type="password"
                            placeholder="New Password"
                            required
                            name="email"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div>
                          <input
                            className="input-form"  
                            type="password"
                            placeholder="Confirm Password"
                            required
                            name="email"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>

                        <input
                          type="submit"
                          value="Send"
                          className="btn btn-animation w-100 mt-3"
                        />
                      </form>
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
  )
}
