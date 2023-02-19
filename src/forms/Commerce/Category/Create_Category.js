import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApiController from "../../../service/Controller";
import Alart from "../../../service/Alart";

export const Create_Category = () => {
  const tb = "categories";
  const [category, setCategory] = useState({
    name: "",
    icon: "",
  });
  const [ico, setIco] = useState();
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => hiddenFileInput.current.click();
  const handleInputChange = (event) => {
    setIco(URL.createObjectURL(event.target.files[0]));
    setCategory({
      ...category,
      icon: event.target.files[0],
    });
  };
  const submit = async () => {
    if (category.name != "") ApiController.create(tb, category);
    else Alart.alartCreate("Category", "Name");
  };
  return (
    <div className="content open">
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-secondary rounded h-100 p-4">
              <form action="" method="POST" encType="multipart/form-data">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h3 className="fs-5">Create Category</h3>
                  </div>
                  <div className="col-md-6">
                    <Link
                      to="/category"
                      className="btn btn-danger btn-sm bg-danger px-3 py-2 fw-bold float-end"
                    >
                      <i className="fas fa-undo-alt me-2" />
                      Back To Category
                    </Link>
                    <Link
                      to="/category"
                      onClick={() => submit()}
                      className="btn btn-success btn-sm float-end px-4 py-2 me-2 fw-bold"
                    >
                      <i className="fas fa-share-square me-2" />
                      Save
                    </Link>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={category.name}
                        placeholder="name"
                        onChange={(e) => {
                          setCategory({
                            ...category,
                            name: e.target.value,
                          });
                        }}
                      />
                      <label htmlFor="name">Name *</label>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">
                        Category Icon
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
                          Select Icon
                        </label>
                        <input
                          ref={hiddenFileInput}
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div style={{ textAlign: "center" }}>
                        {ico ? (
                          <img
                            src={URL.createObjectURL(category.icon)}
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
  );
};
