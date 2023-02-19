import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles/user.css";
import ApiController from "../../../service/Controller";

export const User_Profile = () => {
  const params = useParams();
  const [user, setUser] = useState([]);
  //getting all data from tbProduct and tbCategory
  useEffect(() => {
    ApiController.get("users", params.id).then((res) => setUser(res.data));
  }, []);
  return (
    <>
      <div className="content open">
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-12">
              <div className="bg-secondary rounded h-100 p-4">
                <form>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h3 className="fs-5">My Profile</h3>
                    </div>
                    <div className="col-md-6">
                      <Link
                        to={`/profile/edit_profile/${user.id}`}
                        className="btn btn-success btn-sm bg-success px-3 py-2 fw-bold float-end"
                      >
                        <i className="fas fa-tools me-2" />
                        Edit Profile
                      </Link>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-3">
                      <div className="form-floating mb-3 d-flex justify-content-center align-item-center rounded-circle">
                        <div
                          className="position-relative rounded-circle pixelate border border-5 border-success"
                          style={{
                            backgroundImage: `url(${user.image})`,
                          }}
                        ></div>
                      </div>

                      <div className="mb-3 text-center">
                        <h4>{user.name}</h4>
                        <span>{user.isAdmin ? "Admin" : "User"}</span>
                      </div>
                    </div>

                    <div className="col-md-9">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control text-light"
                          value={`${user.phone}`}
                          placeholder="phone"
                          disabled
                        />
                        <label className="form-label">Phone</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control text-light"
                          value={`${user.DOB}`}
                          placeholder="date_of_birt"
                          disabled
                        />
                        <label className="form-label">Date Of Birth</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control text-light"
                          value={`${user.email}`}
                          placeholder="email"
                          disabled
                        />
                        <label className="form-label">Email</label>
                      </div>

                      <div className="form-floating mb-3">
                        <textarea
                          className="form-control text-light company-address"
                          placeholder="address"
                          disabled
                          value={`${user.address}`}
                        ></textarea>
                        <label className="form-label">Address</label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
