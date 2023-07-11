import React from "react";
import { AdminSidebarData } from "./AdminSidebarData";
import { NavLink } from "react-router-dom";
export default function AdminSidebar({ avatarPreview, name, email }) {
  const activeLink = "nav-link active";
  const normalLink = "nav-link";
  return (
    <>
      <div class="col-xxl-3 col-lg-4">
        <div class="dashboard-left-sidebar">
          <div class="close-button d-flex d-lg-none">
            <button class="close-sidebar">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="profile-box">
            <div class="cover-image">
              <img
                src="../assets/images/inner-page/cover-img.jpg"
                class="img-fluid lazyload"
                alt=""
              />
            </div>

            <div class="profile-contain">
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
            {AdminSidebarData.map((item, index) => {
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
      </div>
    </>
  );
}
