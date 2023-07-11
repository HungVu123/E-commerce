import React, { useEffect, useRef, useState } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, login, register } from "../../actions/userAction";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

export default function LoginSignUp({ location }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openAlertError, setOpenAlertError] = useState(false);
  const [errorLoginSignUp, setErrorLoginSignUp] = useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertError(false);
  };

  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user1, setUser1] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user1;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [activeTab, setActiveTab] = useState("login");

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser1({ ...user1, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      setErrorLoginSignUp(error);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    if (isAuthenticated && user.role !== "admin") {
      navigate("/user/profile");
    }

    if (isAuthenticated && user.role === "admin") {
      navigate("/admin/profile");
    }
  }, [dispatch, error, navigate, isAuthenticated, user]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      setActiveTab(tab);
      switcherTab.current.classList.remove("shiftToRight");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      setActiveTab(tab);
      switcherTab.current.classList.add("shiftToRight");
      registerTab.current.classList.remove("shiftToLeft");
      setUser1({ ...user1, name: "", email: "", password: "" });
    }
  };
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
              {errorLoginSignUp}
            </Alert>
          </Snackbar>

          {/* Breadcrumb */}
          <section class="breadscrumb-section pt-0">
            <div class="container-fluid-lg">
              <div class="row">
                <div class="col-12">
                  <div class="breadscrumb-contain">
                    <h2>{activeTab}</h2>
                    <nav>
                      <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                          <Link to={"/"}>
                            <i class="fa-solid fa-house"></i>
                          </Link>
                        </li>
                        <li class="breadcrumb-item active">{activeTab}</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sign Up */}
          <section class="log-in-section section-b-space section-t-space">
            <div class="container-fluid-lg w-100">
              <div class="row">
                <div class="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
                  <div class="image-contain">
                    <img
                      src="../assets/images/inner-page/sign-up.png"
                      class="img-fluid"
                      alt=""
                    />
                  </div>
                </div>

                <div class="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
                  <div class="log-in-box">
                    <div className="login_signUp_toggle">
                      <p
                        className={activeTab === "login" ? "active" : ""}
                        onClick={(e) => switchTabs(e, "login")}
                      >
                        LOGIN
                      </p>
                      <p
                        className={activeTab === "register" ? "active" : ""}
                        onClick={(e) => switchTabs(e, "register")}
                      >
                        REGISTER
                      </p>
                    </div>
                    <button ref={switcherTab} className="switch"></button>

                    <div className="tabcontent-container">
                      <div
                        id="register"
                        className={`tabcontent ${
                          activeTab === "register" ? "active" : ""
                        }`}
                      >
                        <div class="log-in-title">
                          <h3>Welcome To Fastkart</h3>
                          <h4>Create New Account</h4>
                        </div>

                        <form
                          class="row g-4 signUpForm"
                          ref={registerTab}
                          onSubmit={registerSubmit}
                        >
                          <div class="col-12">
                            <div class="form-floating theme-form-floating">
                              <input
                                type="text"
                                class="form-control"
                                required
                                id="name"
                                placeholder="Full Name"
                                value={name}
                                name="name"
                                onChange={registerDataChange}
                              />
                              <label for="name">Full Name</label>
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="form-floating theme-form-floating">
                              <input
                                type="email"
                                class="form-control"
                                required
                                id="email1"
                                name="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={registerDataChange}
                              />
                              <label for="email">Email Address</label>
                            </div>
                          </div>

                          <div class="col-12">
                            <div class="form-floating theme-form-floating">
                              <input
                                type="password"
                                class="form-control"
                                id="password1"
                                name="password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={registerDataChange}
                              />
                              <label for="password">Password</label>
                            </div>
                          </div>

                          <div class="col-12" id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input
                              type="file"
                              name="avatar"
                              accept="image/*"
                              onChange={registerDataChange}
                            />
                          </div>

                          <div class="col-12">
                            <div class="forgot-box">
                              <div class="form-check ps-0 m-0 remember-box">
                                <input
                                  class="checkbox_animated check-box"
                                  type="checkbox"
                                  id="flexCheckDefault1"
                                  checked={isChecked}
                                  onChange={handleCheckboxChange}
                                />
                                <label
                                  class="form-check-label"
                                  for="flexCheckDefault"
                                >
                                  I agree with <span> Terms</span> and{" "}
                                  <span>Privacy</span>
                                </label>
                              </div>
                            </div>
                          </div>

                          <div class="col-12">
                            <button
                              class="btn btn-animation w-100"
                              type="submit"
                              style={{ color: "#fff", fontWeight: "600" }}
                              disabled={!isChecked}
                            >
                              Sign Up
                            </button>
                          </div>
                        </form>

                        <div class="other-log-in">
                          <h6>or</h6>
                        </div>

                        <div class="log-in-button">
                          <div class="col-12">
                            <button
                              class="btn google-button w-100"
                              style={{
                                backgroundColor: "#fff",
                                marginBottom: "15px",
                              }}
                            >
                              <img
                                src="../assets/images/inner-page/google.png"
                                class="lazyload"
                                alt=""
                                style={{
                                  width:
                                    "calc(18px + (24 - 18) * ((100vw - 320px) / (1920 - 320)))",
                                }}
                              />{" "}
                              Sign up with Google
                            </button>
                          </div>

                          <div class="col-12">
                            <button
                              class="btn google-button w-100"
                              style={{ backgroundColor: "#fff" }}
                            >
                              <img
                                src="../assets/images/inner-page/facebook.png"
                                class="lazyload"
                                alt=""
                                style={{
                                  width:
                                    "calc(18px + (24 - 18) * ((100vw - 320px) / (1920 - 320)))",
                                }}
                              />{" "}
                              Sign up with Facebook
                            </button>
                          </div>
                        </div>
                      </div>

                      <div
                        id="login"
                        className={`tabcontent ${
                          activeTab === "login" ? "active" : ""
                        }`}
                      >
                        <div class="log-in-title">
                          <h3>Welcome To Fastkart</h3>
                          <h4>Log In Your Account</h4>
                        </div>
                        <form
                          class="row g-4 loginForm"
                          ref={loginTab}
                          onSubmit={loginSubmit}
                        >
                          <div class="col-12">
                            <div class="form-floating theme-form-floating log-in-form">
                              <input
                                type="email"
                                class="form-control"
                                id="loginemail"
                                placeholder="Email Address"
                                name="loginemail"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                              />
                              <label for="loginemail">Email Address</label>
                            </div>
                          </div>

                          <div class="col-12">
                            <div class="form-floating theme-form-floating log-in-form">
                              <input
                                type="password"
                                class="form-control"
                                id="loginpassword"
                                name="loginpassword"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) =>
                                  setLoginPassword(e.target.value)
                                }
                              />
                              <label for="loginpassword">Password</label>
                            </div>
                          </div>

                          <div class="col-12">
                            <div class="forgot-box">
                              <div class="form-check ps-0 m-0 remember-box">
                                <input
                                  class="checkbox_animated check-box"
                                  type="checkbox"
                                  id="flexCheckDefault2"
                                />
                                <label
                                  class="form-check-label"
                                  for="flexCheckDefault"
                                >
                                  Remember me
                                </label>
                              </div>
                              <Link
                                to="/password/forgot"
                                className="forgot-password"
                              >
                                Forgot Password?
                              </Link>
                            </div>
                          </div>

                          <div class="col-12">
                            <button
                              class="btn btn-animation w-100 justify-content-center"
                              type="submit"
                              style={{ color: "#fff", fontWeight: "600" }}
                            >
                              Log In
                            </button>
                          </div>
                        </form>
                        <div class="other-log-in">
                          <h6>or</h6>
                        </div>

                        <div class="log-in-button">
                          <div class="col-12">
                            <button
                              class="btn google-button w-100"
                              style={{
                                backgroundColor: "#fff",
                                marginBottom: "15px",
                              }}
                            >
                              <img
                                src="../assets/images/inner-page/google.png"
                                class="lazyload"
                                alt=""
                                style={{
                                  width:
                                    "calc(18px + (24 - 18) * ((100vw - 320px) / (1920 - 320)))",
                                }}
                              />{" "}
                              Log In with Google
                            </button>
                          </div>

                          <div class="col-12">
                            <button
                              class="btn google-button w-100"
                              style={{ backgroundColor: "#fff" }}
                            >
                              <img
                                src="../assets/images/inner-page/facebook.png"
                                class="lazyload"
                                alt=""
                                style={{
                                  width:
                                    "calc(18px + (24 - 18) * ((100vw - 320px) / (1920 - 320)))",
                                }}
                              />{" "}
                              Log In with Facebook
                            </button>
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
