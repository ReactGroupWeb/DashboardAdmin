import { React, useState } from "react";
import "./Header.css";
import ApiService from "../../service/api-service";
import profile from "../../assets/img/user.jpg";
import profile1 from "../../assets/img/testimonial-1.jpg";
import profile2 from "../../assets/img/testimonial-2.jpg";
import { Link, Navigate } from "react-router-dom";
export const Header = ({ click }) => {
  const [navigate, setNavigate] = useState(false);
  const token = localStorage.getItem("token");
  const item = token ? JSON.parse(token) : "";
  const Logout = () => {
    if (token) ApiService.updateActive("users", item.user.id, { active: false });
    localStorage.clear("token");
    setNavigate(true);
  };

  if (navigate) return <Navigate to="/" />;
  return (
    <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
      <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0">
          <i className="fa fa-user-edit" />
        </h2>
      </a>
      <a herf="#" onClick={click} className="sidebar-toggler flex-shrink-0">
        <i className="fa fa-bars" />
      </a>
      <div className="navbar-nav align-items-center ms-auto">
        <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-envelope me-lg-2" />
            <span className="d-none d-lg-inline-flex">Message</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src={profile}
                  style={{ width: 40, height: 40 }}
                />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src={profile1}
                  style={{ width: 40, height: 40 }}
                />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src={profile2}
                  style={{ width: 40, height: 40 }}
                />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item text-center">
              See all message
            </a>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-bell me-lg-2" />
            <span className="d-none d-lg-inline-flex">Notificatin</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Profile updated</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">New user added</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Password changed</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item text-center">
              See all notifications
            </a>
          </div>
        </div>
        <div className="mx-3 d-flex align-items-center nav-item dropdown">
          <div
            className="rounded-circle pixelated mx-1"
            style={{
              backgroundImage: token ? `url(${item.user.image})` : "",
            }}
          ></div>
          <a
            href="#"
            className="dropdown-toggle nav-link nav-link1"
            data-bs-toggle="dropdown"
          >
            <span className="d-none d-lg-inline-flex">
              {token ? item.user.name : ""}
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <Link to={`/profile/${token ? item.user.id : ""}`} className="dropdown-item">
              My Profile
            </Link>
            <Link to={`/profile/edit_profile/${token ? item.user.id : ""}`} className="dropdown-item">
              Settings
            </Link>
            <a
              onClick={() => {
                Logout();
              }}
              className="dropdown-item m-pointer"
            >
              Log Out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
