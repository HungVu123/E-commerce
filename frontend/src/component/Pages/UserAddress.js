import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  deleteShippingInfo,
  loadUser,
  newShippingInfo,
  updateShippingInfo,
} from "../../actions/userAction";
import {
  DELETE_SHIPPINGINFO_RESET,
  NEW_SHIPPINGINFO_RESET,
  UPDATE_SHIPPINGINFO_RESET,
} from "../../constants/userConstants";
import { Country, State } from "country-state-city";
import { BiEdit, BiTrash } from "react-icons/bi";
import AddressCard from "../User/AddressCard";

export default function Address() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error, loading, isCreated } = useSelector(
    (state) => state.shippingInfo
  );
  const { isUpdated, idDeleted } = useSelector((state) => state.profile);

  const [Id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [className, setClassName] = useState("");
  const shippingInfoSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("address", address);
    myForm.set("city", city);
    myForm.set("state", state);
    myForm.set("country", country);
    myForm.set("pinCode", pinCode);
    myForm.set("phoneNo", phoneNo);

    if (className === "addAddress") {
      if (phoneNo.length < 10 || phoneNo.length > 10) {
        setErrorInfo("Phone Number should be 10 digits long");
        setOpenAlertError(true);
        return;
      }
      dispatch(newShippingInfo(myForm));
    } else if (className === "editAddress") {
      if (phoneNo.length < 10 || phoneNo.length > 10) {
        setErrorInfo("Phone Number should be 10 digits long");
        setOpenAlertError(true);
        return;
      }
      dispatch(updateShippingInfo(Id, myForm));
    } else {
      dispatch(deleteShippingInfo(Id));
    }
  };

  const addAddress = (e) => {
    e.preventDefault();
    setClassName("addAddress");
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setPinCode("");
    setPhoneNo("");
  };

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

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }

    if (error) {
      setErrorInfo(error);
      setOpenAlertError(true);
      dispatch(clearErrors());
    }

    if (isCreated) {
      setSuccessInfo("Address Created Successfully");
      setOpenAlertSuccess(true);
      dispatch({ type: NEW_SHIPPINGINFO_RESET });
      dispatch(loadUser());
    }

    if (isUpdated) {
      setSuccessInfo("Address Update Successfully");
      setOpenAlertSuccess(true);
      dispatch({ type: UPDATE_SHIPPINGINFO_RESET });
      dispatch(loadUser());
    }

    if (idDeleted) {
      setSuccessInfo("Address Delete Successfully");
      setOpenAlertSuccess(true);
      dispatch({ type: DELETE_SHIPPINGINFO_RESET });
      dispatch(loadUser());
    }
  }, [
    isAuthenticated,
    dispatch,
    error,
    isCreated,
    navigate,
    isUpdated,
    idDeleted,
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

          <MetaData title={`${user.name}'s Address`} />
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
                  id="pills-address"
                  role="tabpanel"
                  aria-labelledby="pills-address-tab"
                >
                  <div class="dashboard-address">
                    <div class="title title-flex">
                      <div>
                        <h2>My Address</h2>
                      </div>

                      <button
                        class="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3"
                        data-bs-toggle="modal"
                        data-bs-target="#Profile"
                        onClick={addAddress}
                      >
                        <i data-feather="plus" class="me-2"></i> Add New Address
                      </button>
                    </div>

                    <div class="row g-sm-4 g-3">
                      {user.shippingInfos &&
                        user.shippingInfos.map((shippingInfo, index) => (
                          <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                            <div class="address-box" key={shippingInfo.product}>
                              <AddressCard
                                shippingInfo={shippingInfo}
                                user={user}
                                index1={index}
                              />

                              <div
                                class="button"
                                style={{ position: "absolute" }}
                              >
                                <div class="button-group">
                                  <button
                                    class="btn btn-sm add-button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#Profile"
                                    onClick={() => {
                                      setClassName("editAddress");
                                      setId(shippingInfo._id);
                                      setAddress(shippingInfo.address);
                                      setCity(shippingInfo.city);
                                      setState(shippingInfo.state);
                                      setCountry(shippingInfo.country);
                                      setPinCode(shippingInfo.pinCode);
                                      setPhoneNo(shippingInfo.phoneNo);
                                    }}
                                  >
                                    <BiEdit style={{ fontSize: "20px" }} />
                                    Edit
                                  </button>
                                  <button
                                    class="btn btn-sm add-button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#removeProfile"
                                    onClick={() => {
                                      setClassName("deleteAddress");
                                      setId(shippingInfo._id);
                                    }}
                                  >
                                    <BiTrash style={{ fontSize: "20px" }} />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade theme-modal"
            id="Profile"
            data-bs-backdrop="static"
            tabindex="-1"
            aria-labelledby="exampleModalLabel2"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg modal-dialog-centered modal-fullscreen-sm-down">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">
                    {className === "addAddress"
                      ? "Add New Address"
                      : "Edit Address"}
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
                <form onSubmit={shippingInfoSubmit}>
                  <div class="modal-body">
                    <div class="row g-4">
                      <div class="col-12">
                        <div class="form-floating theme-form-floating">
                          <input
                            class="form-control"
                            type="tel"
                            value={phoneNo}
                            placeholder="Phone Number"
                            onChange={(e) => setPhoneNo(e.target.value)}
                            name="mobile"
                            maxlength="10"
                          />
                          <label for="mobile">Phone Number</label>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-floating theme-form-floating">
                          <input
                            type="text"
                            class="form-control"
                            name="address"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          <label for="address">Address</label>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-floating theme-form-floating">
                          <input
                            type="text"
                            class="form-control"
                            name="city"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                          <label for="city">City</label>
                        </div>
                      </div>

                      <div class="col-xl-4">
                        <div class="form-floating theme-form-floating">
                          <select
                            class="form-select"
                            aria-label="Floating label select example"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          >
                            <option value="">Choose Your Country</option>
                            {Country &&
                              Country.getAllCountries().map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                          <label for="floatingSelect">Country</label>
                        </div>
                      </div>

                      {country && (
                        <div class="col-xl-4">
                          <div class="form-floating theme-form-floating">
                            <select
                              class="form-select"
                              required
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                            >
                              <option value="">State</option>
                              {State &&
                                State.getStatesOfCountry(country).map(
                                  (item) => (
                                    <option
                                      key={item.isoCode}
                                      value={item.isoCode}
                                    >
                                      {item.name}
                                    </option>
                                  )
                                )}
                            </select>
                            <label for="floatingSelect">State</label>
                          </div>
                        </div>
                      )}

                      <div class="col-xl-4">
                        <div class="form-floating theme-form-floating">
                          <input
                            type="text"
                            class="form-control"
                            required
                            placeholder="Pin Code"
                            name="pincode"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                          />
                          <label for="pincode">Pin Code</label>
                        </div>
                      </div>
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
                      style={{ backgroundColor: "#0da487" }}
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <form onSubmit={shippingInfoSubmit}>
            <div
              class="modal fade theme-modal remove-profile"
              id="removeProfile"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
                <div class="modal-content">
                  <div class="modal-header d-block text-center">
                    <h5 class="modal-title w-100" id="exampleModalLabel22">
                      Are You Sure To Delete ?
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
                      No
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                      style={{ backgroundColor: "#0da487" }}
                    >
                      Yes
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
