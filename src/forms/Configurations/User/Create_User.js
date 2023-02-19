import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/user.css";
import ApiController from "../../../service/Controller";
import Alart from "../../../service/Alart";
export const Create_User = () => {
  const tb = "users";
  const [checked, setChecked] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    nationality: "",
    DOB: "",
    address: "",
    isAdmin: false,
    active: false,
    image: "",
  });
  const [img, setImage] = useState();
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => hiddenFileInput.current.click();
  const handleInputChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    setUser({
      ...user,
      image: event.target.files[0],
    });
  };
  const submit = async () => {
    if (
      user.name != "" ||
      user.email != "" ||
      user.password != "" ||
      user.image != ""
    )
      ApiController.create(tb, user);
    else Alart.alartCreate("User", "Name , Email, Password and Image");
  };
  return (
    <>
      <div className="content open">
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-12">
              <div className="bg-secondary rounded h-100 p-4">
                <form action="" method="POST" encType="multipart/form-data">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h3 className="fs-5">Create User</h3>
                    </div>
                    <div className="col-md-6">
                      <Link
                        to="/user"
                        className="btn btn-danger btn-sm bg-danger px-3 py-2 fw-bold float-end"
                      >
                        <i className="fas fa-undo-alt me-2" />
                        Back To User
                      </Link>
                      <Link
                        to="/user"
                        className="btn btn-success btn-sm float-end px-4 py-2 me-2 fw-bold"
                        onClick={() => submit()}
                      >
                        <i className="fas fa-share-square me-2" />
                        Save
                      </Link>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={user.name}
                          placeholder="name"
                          onChange={(e) => {
                            setUser({
                              ...user,
                              name: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="name">Name *</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="email"
                          value={user.email}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              email: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="email" className="form-label">
                          Email *
                        </label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="password"
                          value={user.password}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              password: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="password" className="form-label">
                          Password *
                        </label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          placeholder="phone"
                          value={user.phone}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              phone: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="phone" className="form-label">
                          Phone
                        </label>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="nationality"
                          placeholder="nationality"
                          value={user.nationality}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              nationality: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="nationality" className="form-label">
                          Nationality
                        </label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="date"
                          className="form-control"
                          style={{ colorScheme: "dark" }}
                          id="date_of_birt"
                          placeholder="date_of_birt"
                          value={user.DOB}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              DOB: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="date_of_birt" className="form-label">
                          Date of Birth
                        </label>
                      </div>

                      <div className="form-floating mb-3">
                        <textarea
                          className="form-control company-address"
                          placeholder="address"
                          value={user.address}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              address: e.target.value,
                            });
                          }}
                        ></textarea>
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="col-md-12 py-3">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input px-3 py-2 me-3"
                            type="checkbox"
                            role="switch"
                            id="featured_product"
                            value={user.isAdmin}
                            onClick={() => {
                              setChecked(!checked);
                              setUser({
                                ...user,
                                isAdmin: checked,
                              });
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="featured_product"
                          >
                            Admin Role
                          </label>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                          User Image *
                        </label>
                        <div
                          style={{
                            width: "40%",
                            margin: "10px auto",
                            textAlign: "center",
                          }}
                        >
                          <label
                            onClick={handleClick}
                            className="form-control mouse"
                          >
                            Select Image
                          </label>
                          <input
                            ref={hiddenFileInput}
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div style={{ textAlign: "center" }}>
                          {img ? (
                            <img
                              src={URL.createObjectURL(user.image)}
                              height="200px"
                              style={{
                                border: "1px solid white",
                                padding: "20px",
                              }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
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
