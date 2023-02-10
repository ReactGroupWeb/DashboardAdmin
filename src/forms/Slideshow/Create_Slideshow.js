import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiService from "../../service/api-service";
import Alart from "../../service/Alart";

export const Create_Slideshow = () => {
  const tb = "sliders";
  const [slider, setSliders] = useState({
    title: "",
    miniTitle: "",
    description: "",
    image: "",
    order: "",
    url: "",
  });
  const [img, setImg] = useState();
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleInputChange = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
    setSliders({
      ...slider,
      image: event.target.files[0],
    });
  };
  useEffect(() => {
    ApiService.getLastOrder(tb)
      .then((res) => {
        setSliders({
          ...slider,
          order: res.data[0].order + 1,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const submit = async () => {
    if (slider.title != "" || slider.description != "")
      ApiService.create(tb, slider);
    else Alart.alartCreate("Slider", "Title and Description");
  };
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
                      <h3 className="fs-5">Create Slideshow</h3>
                    </div>
                    <div className="col-md-6">
                      <Link
                        to="/slideshow"
                        className="btn btn-danger btn-sm bg-danger px-3 py-2 fw-bold float-end"
                      >
                        <i className="fas fa-undo-alt me-2" />
                        Back To Slideshow
                      </Link>
                      <Link
                        to="/slideshow"
                        className="btn btn-success bg-success btn-sm float-end px-4 py-2 me-2 fw-bold"
                        onClick={() => submit()}
                      >
                        <i className="fas fa-share-square me-2" /> Save
                      </Link>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          value={slider.title}
                          onChange={(e) => {
                            setSliders({
                              ...slider,
                              title: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="title" className="form-label">
                          Title
                        </label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="mini_title"
                          value={slider.miniTitle}
                          onChange={(e) => {
                            setSliders({
                              ...slider,
                              miniTitle: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="mini_title" className="form-label">
                          Mini Title
                        </label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="link"
                          value={slider.url}
                          onChange={(e) => {
                            setSliders({
                              ...slider,
                              url: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="link" className="form-label">
                          Slide Link
                        </label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          id="sequence"
                          value={slider.order}
                          onChange={(e) => {
                            setSliders({
                              ...slider,
                              order: e.target.value,
                            });
                          }}
                        />
                        <label htmlFor="sequence" className="form-label">
                          Slide Order
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <textarea
                          className="form-control"
                          style={{ height: "150px" }}
                          value={slider.description}
                          onChange={(e) => {
                            setSliders({
                              ...slider,
                              description: e.target.value,
                            });
                          }}
                        ></textarea>
                        <label htmlFor="description" className="form-label">
                          Descriptions
                        </label>
                      </div>

                      <div className="mb-5">
                        <label className="form-label"> Slide Image </label>
                        <div
                          style={{
                            width: "40%",
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
                            ref={hiddenFileInput}
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div style={{ textAlign: "center" }}>
                          {img ? (
                            <img
                              src={URL.createObjectURL(slider.image)}
                              height="200px"
                              style={{
                                border: "1px solid white",
                                padding: "20px",
                              }}
                            />
                          ) : null}
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
