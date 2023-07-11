import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const dispatch = useDispatch();
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

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      setErrorInfo(error);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    if (message) {
      console.log(message);
      setSuccessInfo(message);
      setOpenAlertSuccess(true);
    }
  }, [dispatch, error, message]);

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

          <MetaData title="Forgot Password" />
          {/* Breadcrumb */}
          <section class="breadscrumb-section pt-0">
            <div class="container-fluid-lg">
              <div class="row">
                <div class="col-12">
                  <div class="breadscrumb-contain">
                    <h2>OTP</h2>
                    <nav>
                      <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                          <Link to={"/"}>
                            <i class="fa-solid fa-house"></i>
                          </Link>
                        </li>
                        <li class="breadcrumb-item active">OTP</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* OTP */}
          <section class="log-in-section otp-section section-b-space" >
            <div class="container-fluid-lg">
              <div class="row">
                <div class="col-xxl-8 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
                  <div class="image-contain">
                    <img
                      src="../assets/images/inner-page/otp.png"
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
                          Please enter email to verify your account
                        </h3>
                        <h5 class="text-content">
                          A code has been sent to <span>*******9897</span>
                        </h5>
                      </div>

                      <div
                        id="otp"
                        class="inputs d-flex flex-row justify-content-center"
                      >
                        <form
                          className="forgotPasswordForm"
                          onSubmit={forgotPasswordSubmit}
                        >
                          <div>
                            <input
                              className="input-form"  
                              type="email"
                              placeholder="Email"
                              required
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <input
                            type="submit"
                            value="Send"
                            className="btn btn-animation w-100 mt-3"
                          />
                        </form>
                      </div>

                      <div class="send-box pt-4">
                        <h5>
                          Didn't get the code?{" "}
                          <a href="/" class="theme-color fw-bold">
                            Resend It
                          </a>
                        </h5>
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
