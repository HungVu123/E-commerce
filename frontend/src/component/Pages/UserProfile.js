import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";
import { Snackbar } from "@mui/material";
import MetaData from "../layout/MetaData";

export default function Home() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

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

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    if (avatar === "") {
      myForm.set("avatar", "");
    } else {
      myForm.set("avatar", avatar);
    }

    myForm.set("name", name);
    myForm.set("email", email);

    dispatch(updateProfile(myForm));
    setSuccessInfo("success");
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }

    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      setErrorInfo(error);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      setSuccessInfo("Change Profile Successfully");
      setOpenAlertSuccess(true);
      dispatch({ type: UPDATE_PROFILE_RESET });
      dispatch(loadUser());
    }
  }, [isAuthenticated, dispatch, error, user, isUpdated, navigate]);

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
          <MetaData title={`${user.name}'s Profile`} />
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
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  <div class="dashboard-profile">
                    <div class="title">
                      <h2>My Profile</h2>
                    </div>

                    <div class="profile-about dashboard-bg-box">
                      <form onSubmit={updateProfileSubmit}>
                        <div class="row">
                          <div class="col-xxl-8">
                            <div class="dashboard-title mb-3">
                              <h3>Profile About</h3>
                            </div>

                            <div class="table-responsive">
                              <table class="table">
                                <tbody>
                                  <tr>
                                    <td>Name :</td>
                                    <td>
                                      <input
                                        className="input-form"
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Email :</td>
                                    <td>
                                      {" "}
                                      <input
                                        className="input-form"
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div
                            class="col-xxl-4"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={avatarPreview}
                              alt="Avatar Preview"
                              className="avatar-preview"
                            />
                            <input
                              type="file"
                              name="avatar"
                              accept="image/*"
                              onChange={updateProfileDataChange}
                              style={{ width: "90%" }}
                            />
                          </div>
                        </div>
                        <div class="text-center">
                          <button
                            type="submit"
                            class="btn theme-bg-color btn-md fw-bold text-light"
                          >
                            Save Changes
                          </button>
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
