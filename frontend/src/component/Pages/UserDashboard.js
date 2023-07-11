import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import Sidebar from "./Sidebar";
import NavPage from "./NavPage";
import { SidebarData } from "./SidebarData";

export default function Profile() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const activeLink = "nav-link active";
  const normalLink = "nav-link";
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }

    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
  }, [isAuthenticated, dispatch, user, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`User's Dashboard`} />
          {/* Breadcrumb */}
          <section class="breadscrumb-section pt-0">
            <div class="container-fluid-lg">
              <div class="row">
                <div class="col-12">
                  <div class="breadscrumb-contain">
                    <h2>My Dashboard</h2>
                    <nav>
                      <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                          <Link to={"/"}>
                            <i class="fa-solid fa-house"></i>
                          </Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                          My Dashboard
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dashboard */}
          <section class="user-dashboard-section section-b-space section-t-space">
            <div class="container-fluid-lg">
              <div class="row">
                <Sidebar
                  name={name}
                  email={email}
                  avatarPreview={avatarPreview}
                />
                <NavPage />
              </div>
            </div>
          </section>

          <div
            class="offcanvas offcanvas-start dashboard-left-sidebar1"
            id="primaryMenu2"
            style={{ width: "300px" }}
          >
            <div class="close-button1 d-flex d-lg-none">
              <button class="close-sidebar">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div class="profile-box" style={{ position: "relative" }}>
              <div
                class="cover-image"
                style={{ position: "relative", overflow: "hidden" }}
              >
                <img
                  src="../assets/images/inner-page/cover-img.jpg"
                  class="img-fluid lazyload"
                  alt=""
                />
              </div>

              <div class="profile-contain" style={{ padding: "0 15px" }}>
                <div class="profile-image">
                  <div class="position-relative">
                    <img
                      src={avatarPreview}
                      class="avatar-preview"
                      alt=""
                      style={{ objectFit: "fill" }}
                    />
                  </div>
                </div>

                <div class="profile-name">
                  <h3>{name}</h3>
                  <h6 class="text-content">{email}</h6>
                </div>
              </div>
            </div>

            <ul
              class="nav nav-pills user-nav-pills"
              id="pills-tab"
              role="tablist"
            >
              {SidebarData.map((item, index) => {
                return (
                  <li class="nav-item" role="presentation" key={index}>
                    <NavLink to={item.path} style={{ textDecoration: "none" }}>
                      {({ isActive }) => (
                        <button className={isActive ? activeLink : normalLink}>
                          {item.icon}
                          {item.title}
                        </button>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
