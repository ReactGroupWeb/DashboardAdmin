import React, { useState } from "react";
import profile from "../../assets/img/user.jpg";
import profile1 from "../../assets/img/testimonial-1.jpg";
import profile2 from "../../assets/img/testimonial-2.jpg";
// import Calendars from "../../service/Calenders";

export const Widgets = () => {
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h6 className="mb-0">Messages</h6>
              <a>Show All</a>
            </div>
            <div className="d-flex align-items-center border-bottom py-3">
              <img
                className="rounded-circle flex-shrink-0"
                src={profile}
                style={{ width: 40, height: 40 }}
              />
              <div className="w-100 ms-3">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-0">Jhon Doe</h6>
                  <small>15 minutes ago</small>
                </div>
                <span>Short message goes here...</span>
              </div>
            </div>
            <div className="d-flex align-items-center border-bottom py-3">
              <img
                className="rounded-circle flex-shrink-0"
                src={profile1}
                style={{ width: 40, height: 40 }}
              />
              <div className="w-100 ms-3">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-0">Jhon Doe</h6>
                  <small>15 minutes ago</small>
                </div>
                <span>Short message goes here...</span>
              </div>
            </div>
            <div className="d-flex align-items-center border-bottom py-3">
              <img
                className="rounded-circle flex-shrink-0"
                src={profile2}
                le={{ width: 40, height: 40 }}
              />
              <div className="w-100 ms-3">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-0">Jhon Doe</h6>
                  <small>15 minutes ago</small>
                </div>
                <span>Short message goes here...</span>
              </div>
            </div>
            <div className="d-flex align-items-center pt-3">
              <img
                className="rounded-circle flex-shrink-0"
                src={profile}
                style={{ width: 40, height: 40 }}
              />
              <div className="w-100 ms-3">
                <div className="d-flex w-100 justify-content-between">
                  <h6 className="mb-0">Jhon Doe</h6>
                  <small>15 minutes ago</small>
                </div>
                <span>Short message goes here...</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Calender</h6>
              <a>Show All</a>
            </div>
            {/* <Calendars/> */}
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">To Do List</h6>
              <a>Show All</a>
            </div>
            <div className="d-flex mb-2">
              <input
                className="form-control bg-dark border-0"
                type="text"
                placeholder="Enter task"
              />
              <button type="button" className="btn btn-primary ms-2">
                Add
              </button>
            </div>
            <div className="d-flex align-items-center border-bottom py-2">
              <input className="form-check-input m-0" type="checkbox" />
              <div className="w-100 ms-3">
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <span>Short task goes here...</span>
                  <button className="btn btn-sm">
                    <i className="fa fa-times" />
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center border-bottom py-2">
              <input className="form-check-input m-0" type="checkbox" />
              <div className="w-100 ms-3">
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <span>Short task goes here...</span>
                  <button className="btn btn-sm">
                    <i className="fa fa-times" />
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center border-bottom py-2">
              <input
                className="form-check-input m-0"
                type="checkbox"
                defaultChecked
              />
              <div className="w-100 ms-3">
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <span>
                    <del>Short task goes here...</del>
                  </span>
                  <button className="btn btn-sm text-primary">
                    <i className="fa fa-times" />
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center border-bottom py-2">
              <input className="form-check-input m-0" type="checkbox" />
              <div className="w-100 ms-3">
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <span>Short task goes here...</span>
                  <button className="btn btn-sm">
                    <i className="fa fa-times" />
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center pt-2">
              <input className="form-check-input m-0" type="checkbox" />
              <div className="w-100 ms-3">
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <span>Short task goes here...</span>
                  <button className="btn btn-sm">
                    <i className="fa fa-times" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
