import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles/user.css";
import Alart from "../../../service/Alart";
import ApiService from "../../../service/api-service";
export const Edit_User_Profile = () => {
  const params = useParams();
  const [user, setUser] = useState([]);
  const [img, setImg] = useState();
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    ApiService.get("users", params.id).then((res) => setUser(res.data));
  }, [params.id]);
  //edit new Image
  const hiddenImageUpload = React.useRef(null);
  const handleClick = () => hiddenImageUpload.current.click();
  const handleInputChange = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
    setUser({
      ...user,
      image: event.target.files[0],
    });
    setChanged(true);
  };
  //send data to api to update
  const submit = async () => ApiService.update("users", params.id, user);
  return (
    <div className="content open">
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-secondary rounded h-100 p-4">
              <form action="" method="PUT" encType="multipart/form-data">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h3 className="fs-5">My Profile</h3>
                  </div>
                  <div className="col-md-6">
                    <Link
                      to={`/profile/${params.id}`}
                      onClick={() => Alart.alartSave(changed, submit())}
                      className="btn btn-success btn-sm bg-success px-3 py-2 fw-bold float-end"
                    >
                      <i className="fas fa-undo-alt me-2" />
                      Back To Profile
                    </Link>
                    {changed ? (
                      <Link
                        to={`/profile/${params.id}`}
                        onClick={() => submit()}
                        className="btn btn-warning bg-warning btn-sm float-end px-4 py-2 me-2 fw-bold"
                      >
                        <i className="fas fa-tools me-2" />
                        Update Profile
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-3">
                    <div className="form-floating mb-3 d-flex justify-content-center align-item-center rounded-circle">
                      <div
                        className="position-relative rounded-circle pixelate border border-5 border-success"
                        style={{
                          backgroundImage: img
                            ? `url(${URL.createObjectURL(user.image)})`
                            : `url(${user.image})`,
                        }}
                      ></div>
                    </div>
                    <div
                      className="mb-5"
                      style={{
                        width: "auto",
                        margin: "10px auto",
                        textAlign: "center",
                      }}
                    >
                      <label
                        onClick={handleClick}
                        className="form-control"
                        style={{ cursor: "pointer" }}
                      >
                        Select Image
                      </label>
                      <input
                        ref={hiddenImageUpload}
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div
                      className="mb-5"
                      style={{
                        width: "auto",
                        margin: "10px auto",
                        textAlign: "center",
                      }}
                    >
                      <button
                        onClick={() => Alart.alartChangePassword(params.id)}
                        className="form-control"
                        style={{ cursor: "pointer" }}
                      >
                        Change Password
                      </button>
                    </div>
                  </div>

                  <div className="col-md-9">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="name"
                        value={user.name||""}
                        onChange={(e) => {
                          setChanged(true);
                          setUser({
                            ...user,
                            name: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="email"
                        value={user.email||""}
                        onChange={(e) => {
                          setChanged(true);
                          setUser({
                            ...user,
                            email: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="phone"
                        value={user.phone||""}
                        onChange={(e) => {
                          setChanged(true);
                          setUser({
                            ...user,
                            phone: e.target.value,
                          });
                        }}
                      />
                      <label className="form-label">Phone</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="date"
                        style={{ colorScheme: "dark" }}
                        className="form-control"
                        id="date_of_birt"
                        placeholder="date_of_birth"
                        value={user.DOB||""}
                        onChange={(e) => {
                          setChanged(true);
                          setUser({
                            ...user,
                            DOB: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="date_of_birth" className="form-label">
                        Date of Birth
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <textarea
                        className="form-control company-address"
                        placeholder="address"
                        value={user.address||""}
                        onChange={(e) => {
                          setChanged(true);
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
