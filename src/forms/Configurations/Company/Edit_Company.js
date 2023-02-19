import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiController from "../../../service/Controller";
import Swal from "sweetalert2";
window.Swal = Swal;

export const Edit_Company = () => {
  const tb = "companys";
  const params = useParams();
  const [changed, setChanged] = useState(false);
  const [company, setCompany] = useState([]);
  const [img, setImg] = useState();
  useEffect(() => {
    ApiController.get(tb, params.id).then((res) => setCompany(res.data));
  }, []);
  const alart = () => {
    if (changed) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          submit();
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => hiddenFileInput.current.click();
  const handleInputChange = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
    setCompany({
      ...company,
      logo: event.target.files[0],
    });
    setChanged(true);
  };
  const submit = async () => ApiController.update(tb, params.id, company);
  return (
    <>
      <div className="content open">
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-12">
              <div className="bg-secondary rounded h-100 p-4">
                <form action="" method="PUT" encType="multipart/form-data">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h3 className="fs-5">Company Information</h3>
                    </div>
                    <div className="col-md-6">
                      <Link
                        onClick={() => alart()}
                        to="/company"
                        className="btn btn-success btn-sm bg-success px-3 py-2 fw-bold float-end"
                      >
                        <i className="fas fa-undo-alt me-2" />
                        Back To Company
                      </Link>
                      {changed ? (
                        <Link
                          to="/company"
                          onClick={() => submit()}
                          className="btn btn-warning bg-warning btn-sm float-end px-4 py-2 me-2 fw-bold text-light"
                        >
                          <i className="fas fa-tools me-2" />
                          Update
                        </Link>
                      ) : null}
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={company.name || ""}
                          onChange={(e) => {
                            setCompany({
                              ...company,
                              name: e.target.value,
                            });
                            setChanged(true);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={company.email || ""}
                          onChange={(e) => {
                            setCompany({
                              ...company,
                              email: e.target.value,
                            });
                            setChanged(true);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          Telephone
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          value={company.telephone || ""}
                          onChange={(e) => {
                            setCompany({
                              ...company,
                              telephone: e.target.value,
                            });
                            setChanged(true);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="facebook" className="form-label">
                          Facebook
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="facebook"
                          value={company.facebook || ""}
                          onChange={(e) => {
                            setCompany({
                              ...company,
                              facebook: e.target.value,
                            });
                            setChanged(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="twiiter" className="form-label">
                          Twiiter
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="twiiter"
                          value={company.twitter || ""}
                          onChange={(e) => {
                            setCompany({
                              ...company,
                              twitter: e.target.value,
                            });
                            setChanged(true);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="telegram" className="form-label">
                          Telegram
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="telegram"
                          value={company.telegram || ""}
                          onChange={(e) => {
                            setCompany({
                              ...company,
                              telegram: e.target.value,
                            });
                            setChanged(true);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                          Company Address
                        </label>
                        <textarea
                          className="form-control company-address"
                          value={company.address || ""}
                          onChange={(e) => {
                            setCompany({
                              ...company,
                              address: e.target.value,
                            });
                            setChanged(true);
                          }}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label"> Company Logo </label>
                      <div className="mb-5 text-center">
                        <div
                          style={{
                            width: "50%",
                            margin: "10px auto",
                            textAlign: "center",
                          }}
                        >
                          <label
                            onClick={handleClick}
                            className="form-control mouse"
                          >
                            Change Image
                          </label>
                          <input
                            ref={hiddenFileInput}
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <img
                            src={img ? img : `${company.logo}`}
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
    </>
  );
};
