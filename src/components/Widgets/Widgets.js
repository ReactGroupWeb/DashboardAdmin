import React, { useEffect, useState } from "react";
import ApiController from "../../service/Controller";
import Calendars from "../Calender/Calenders";
import "../Calender/calenders.css";
import {
  CCarousel,
  CCarouselItem,
} from "@coreui/react";
export const Widgets = () => {
  const [users, setUsers] = useState([]);
  const [companys, setCompanys] = useState([]);
  useEffect(() => {
    ApiController.getAll(`users/get/user-admin`).then((res) => setUsers(res.data));
    ApiController.getAll(`companys`).then((res) => setCompanys(res.data));
  }, []);
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h6 className="mb-0">Company</h6>
            </div>
            {companys.map((c) => (
              <div key={c._id}>
                <div className="logo-img text-center">
                  <img src={`${c.logo}`} width="250" />
                  <h3>{c.name}</h3>
                  <label>Address</label>
                  <p>{c.address}</p>
                  <label>Phone</label>
                  <p>{c.telephone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Calender</h6>
            </div>
            <Calendars />
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Team</h6>
            </div>
            <CCarousel controls indicators>
              {users.map((user) => (
                <CCarouselItem key={user.id} style={{ textAlign: "center" }}>
                  <div
                    className="position-relative rounded-circle mb-3"
                    style={{
                      width: 200,
                      height: 200,
                      backgroundImage: `url(${user.image})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "100%",
                      backgroundPosition: "center",
                      backgroundColor: "#0775d4",
                      margin: "auto",
                    }}
                  />
                  <div>
                    <h5>{user.name}</h5>
                    <span>{user.isAdmin ? "Admin" : "User"}</span>
                    <br />
                    <span>{user.email}</span>
                    <br />
                    <span>{user.phone}</span>
                  </div>
                </CCarouselItem>
              ))}
            </CCarousel>
          </div>
        </div>
      </div>
    </div>
  );
};
