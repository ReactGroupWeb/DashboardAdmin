import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ApiController from "../../../service/Controller";
import Swal from "sweetalert2";
window.Swal = Swal;

export const Edit_Category = () => {
  const tb = "categories";
  const params = useParams();
  const [category, setCategory] = useState([]);
  const [ico, setIco] = useState();
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    ApiController.get(tb, params.id)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const hiddenImageUpload = React.useRef(null);
  const handleImageClick = () => hiddenImageUpload.current.click();
  const handleInputChange = (event) => {
    setIco(URL.createObjectURL(event.target.files[0]));
    setCategory({
      ...category,
      icon: event.target.files[0],
    });
    setChanged(true);
  };

  const submit = async () => ApiController.update(tb, params.id, category);
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
                      <h3 className="fs-5">Edit Category</h3>
                    </div>
                    <div className="col-md-6">
                      <Link
                        onClick={() => alart()}
                        to="/category"
                        className="btn btn-success btn-sm bg-success px-3 py-2 fw-bold float-end"
                      >
                        <i className="fas fa-undo-alt me-2" />
                        Back To Category
                      </Link>
                      {changed ? (
                        <Link
                          to="/category"
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
                    <div className="col-md-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          value={category.name || ""}
                          placeholder="name"
                          onChange={(e) => {
                            setCategory({
                              ...category,
                              name: e.target.value,
                            });
                            setChanged(true);
                          }}
                        />
                        <label htmlFor="name">Name</label>
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
                            onClick={handleImageClick}
                            className="form-control mouse"
                          >
                            Select Icon
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
                            src={ico ? ico : `${category.icon}`}
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
