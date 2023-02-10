import { React, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import ApiService from "../../service/api-service";
import Alart from "../../service/Alart";
import axios from "axios";

export const Login_Form = () => {
  const [navigate, setNavigate] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setNavigate(true);
  }, []);
  const submit = async () => {
    if (user.email != "" && user.password != "") {
      const res = await axios
        .post(
          `http://localhost:5000/api/v1/users/login`,
          user,
          { headers: { "Content-Type": "application/json" } },
          { withCredentials: true }
        )
        .catch((err) => {
          if (err.response)
            return Alart.alartLoginError(
              err.response.status,
              err.response.data
            );
        });
      if (res) {
        //update user active to true
        ApiService.updateActive("users", res.data.user.id, { active: true });
        res.data.user.active = true;
        //get current date
        const date = new Date();
        //set expire date
        date.setHours(date.getHours() + 1);
        //push user, date expire, token into item
        const item = {
          user: res.data.user,
          token: res.data.token,
          expDate: date,
        };
        //set item into localStorage
        localStorage.setItem("token", JSON.stringify(item));
        //calling success function Login
        Alart.alartLoginSuccess();
        //go to admin page
        setNavigate(true);
      }
    } else {
      user.email
        ? Alart.alartLoginEmpty("Password")
        : Alart.alartLoginEmpty("Email");
    }
  };
  if (navigate) {
    return <Navigate to="/admin" />;
  }
  return (
    <div className="container-fluid position-relative d-flex p-0">
      {/* Sign In Start */}
      <div className="container-fluid">
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="bg-secondary rounded p-5 p-sm-5 my-4 mx-1">
              <form>
                <div className="text-center">
                  <a>
                    <h3 className="text-primary">
                      <i className="fa fa-user-edit me-2" />
                      Furniture Store
                    </h3>
                  </a>
                </div>
                <div className="text-center">
                  <h3>Sign In</h3>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => {
                      setUser({
                        ...user,
                        email: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div
                  className="form-floating mb-4"
                  style={{ position: "relative" }}
                >
                  <input
                    type={passwordShown ? "text" : "password"}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => {
                      setUser({
                        ...user,
                        password: e.target.value,
                      });
                    }}
                  />
                  <i
                    className={`fa ${
                      passwordShown ? "fa-eye-slash" : "fa-eye"
                    } floatingPassword`}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      top: 25,
                      right: 20,
                    }}
                    onClick={() => setPasswordShown(Alart.eye(passwordShown))}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="mb-4 text-center">
                  <a href="#" onClick={() => Alart.alartForgotPassword()}>
                    Forgot Password
                  </a>
                </div>
                <button
                  type="button"
                  onClick={submit}
                  className="btn btn-primary py-3 w-100 mb-4"
                >
                  Sign In
                </button>
              </form>
              <p className="text-center mb-0">
                Don't have an Account? <Link to="/register">Sign Up</Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Sign In End */}
    </div>
  );
};
