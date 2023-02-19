import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styles/user.css";
import ApiController from "../../../service/Controller";
import Swal from "sweetalert2";
window.Swal = Swal;
export const Edit_User = () => {
  const tb = "users";
  const [checked, setChecked] = useState(true);
  const params = useParams();
  const [user, setUser] = useState([]);
  const [img, setImg] = useState();
  const [changed, setChanged] = useState(false);
  //getting all data from tbProduct and tbCategory
  useEffect(() => {
    ApiController.get(tb, params.id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //alart popup box when go back to list without save
  const alart = () => {
    if (changed) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          submit();
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };
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
  const submit = async () => ApiController.update(tb, params.id, user);
  return (
    <div className="content open">
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-secondary rounded h-100 p-4">
              <form action="" method="PUT" encType="multipart/form-data">
                <div className="row my-4 mb-4">
                  <div className="col-md-6">
                    <h3 className="fs-5">Edit User</h3>
                  </div>
                  <div className="col-md-6">
                    <Link
                      onClick={() => alart()}
                      to="/user"
                      className="btn btn-success btn-sm bg-success px-3 py-2 fw-bold float-end"
                    >
                      <i className="fas fa-undo-alt me-2" />
                      Back To User
                    </Link>
                    {changed ? (
                      <Link
                        to="/user"
                        onClick={() => submit()}
                        className="btn btn-warning bg-warning btn-sm float-end px-4 py-2 me-2 fw-bold text-light"
                      >
                        <i className="fas fa-tools me-2" />
                        Update
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-4">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={user.name || ""}
                        placeholder="name"
                        onChange={(e) => {
                          setChanged(true);
                          setUser({
                            ...user,
                            name: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="name">Name</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="email"
                        value={user.email || ""}
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
                        value={user.phone || ""}
                        onChange={(e) => {
                          setChanged(true);
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

                    <div className="form-floating mb-3">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input px-3 py-2 me-3"
                          type="checkbox"
                          role="switch"
                          id="featured_product"
                          value={user.isAdmin || ""}
                          checked={user.isAdmin}
                          onClick={() => {
                            setChecked(!checked);
                            setUser({
                              ...user,
                              isAdmin: checked,
                            });
                            setChanged(true);
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
                  </div>

                  <div className="col-md-4">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="nationality"
                        placeholder="nationality"
                        value={user.nationality || ""}
                        onChange={(e) => {
                          setChanged(true);
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
                        value={user.DOB || ""}
                        onChange={(e) => {
                          setChanged(true);
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
                        value={user.address || ""}
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

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">
                        User Image
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
                          ref={hiddenImageUpload}
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <img
                          src={
                            img
                              ? URL.createObjectURL(user.image)
                              : `${user.image}`
                          }
                          height="200px"
                          style={{
                            border: "1px solid white",
                            padding: "20px",
                          }}
                        />
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
  );
};
