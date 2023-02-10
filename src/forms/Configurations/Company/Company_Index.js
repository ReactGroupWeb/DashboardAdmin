import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../../service/api-service";
import "./styles/company.css";

export const Company_Index = () => {
  const [company, setCompany] = useState([]);
  useEffect(() => {
    ApiService.getAll("companys").then((res) => setCompany(res.data));
  }, []);
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-12">
          <div className="bg-secondary rounded h-100 p-4">
            {company.map((c, i) => (
              <form action="" method="POST" encType="multipart/form-data" key={i}>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h3 className="fs-5">Company Information</h3>
                  </div>
                  <div className="col-md-6">
                    <Link
                      to={`/company/edit_company/${c._id}`}
                      className="btn btn-warning bg-warning btn-sm float-end px-4 py-2 me-2 fw-bold float-end"
                    >
                      <i className="fas fa-tools me-2" />
                      Edit Company
                    </Link>
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
                        className="form-control text-dark"
                        id="name"
                        value={`${c.name}`}
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control text-dark"
                        id="email"
                        value={`${c.email}`}
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Telephone
                      </label>
                      <input
                        type="text"
                        className="form-control text-dark"
                        id="phone"
                        value={`${c.telephone}`}
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="facebook" className="form-label">
                        Facebook
                      </label>
                      <input
                        type="text"
                        className="form-control text-dark"
                        id="facebook"
                        value={`${c.facebook}`}
                        disabled
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
                        className="form-control text-dark"
                        id="twiiter"
                        value={`${c.twitter}`}
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="telegram" className="form-label">
                        Telegram
                      </label>
                      <input
                        type="text"
                        className="form-control text-dark"
                        id="telegram"
                        value={`${c.telegram}`}
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Company Address
                      </label>
                      <textarea
                        className="form-control text-dark company-address"
                        value={`${c.address}`}
                        disabled
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-5">
                      <label htmlFor="image" className="form-label">
                        Company Logo
                      </label>
                      <div className="logo-img text-center">
                        <img src={`${c.logo}`} width="250" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
