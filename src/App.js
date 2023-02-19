import React, { useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router , Routes, Route} from "react-router-dom";
import { Home } from "./pages/Homepage/Home";
import { Category } from "./pages/Commerce_Page/Category/Category";
import { Slideshow } from "./pages/Commerce_Page/Slideshow/Slideshow";
import { Product } from "./pages/Commerce_Page/Product/Product";
import { Order } from "./pages/Commerce_Page/Order/Order";
import { Company } from "./pages/Configuration_Page/Company/Company";
import { User } from "./pages/Configuration_Page/User/User";

import { Create_Slideshow } from "./forms/Slideshow/Create_Slideshow";
import { Edit_Slideshow } from "./forms/Slideshow/Edit_Slideshow";

import { Edit_Company } from "./forms/Configurations/Company/Edit_Company";

import { Create_User } from "./forms/Configurations/User/Create_User";
import { Edit_User } from "./forms/Configurations/User/Edit_User";

import { Create_Category } from "./forms/Commerce/Category/Create_Category";
import { Edit_Category } from "./forms/Commerce/Category/Edit_Category";

import { Create_Product } from "./forms/Commerce/Product/Create_Product";
import { Edit_Product } from "./forms/Commerce/Product/Edit_Product";

import { Order_Detail } from "./forms/Commerce/Order/Order_Detail";

import { Login } from "./pages/Authentication/Login";
import { Register } from "./pages/Authentication/Register";

import { Profile } from "./pages/Configuration_Page/User/Profile";
import { Edit_User_Profile } from "./forms/Configurations/User/Edit_User_Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  useEffect(()=>{
    if (localStorage.getItem("DarkMode") == "false")
      document.querySelector("body").setAttribute("dark-theme", "L");
  },[])
  return (
  <Router>
    <Routes>
      {/* Link to Admin Page */}
      <Route path="/admin" element={<ProtectedRoute><Home /></ProtectedRoute>}/>

      {/* Link for SideBar */}
      <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>}/>
      <Route path="/slideshow" element={<ProtectedRoute><Slideshow /></ProtectedRoute>}/>
      <Route path="/product" element={<ProtectedRoute><Product /></ProtectedRoute>}/>
      <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>}/>
      <Route path="/company" element={<ProtectedRoute><Company /></ProtectedRoute>}/>
      <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>}/>

      {/* Link for Slide Form */}
      <Route path="/slideshow/create_slideshow" element={<ProtectedRoute><Create_Slideshow /></ProtectedRoute>}/>
      <Route path="/slideshow/edit_slideshow/:id" element={<ProtectedRoute><Edit_Slideshow /></ProtectedRoute>}/>

      {/* Link for Company Form */}
      <Route path="/company/edit_company/:id" element={<ProtectedRoute><Edit_Company /></ProtectedRoute>}/>

      {/* Link for User Form */}
      <Route path="/user/create_user" element={<ProtectedRoute><Create_User /></ProtectedRoute>}/>
      <Route path="/user/edit_user/:id" element={<ProtectedRoute><Edit_User /></ProtectedRoute>}/>

      {/* Link for Category Form */}
      <Route path="/category/create_category" element={<ProtectedRoute><Create_Category /></ProtectedRoute>}/>
      <Route path="/category/edit_category/:id" element={<ProtectedRoute><Edit_Category /></ProtectedRoute>}/>

      {/* Link for Product Form */}
      <Route path="/product/create_product" element={<ProtectedRoute><Create_Product /></ProtectedRoute>}/>
      <Route path="/product/edit_product/:id" element={<ProtectedRoute><Edit_Product /></ProtectedRoute>}/>

      {/* Link for Order Detail */}
      <Route path="/order/order_detail/:id/:prevpage" element={<ProtectedRoute><Order_Detail/></ProtectedRoute>}/>
      
      {/* Link for User Profile */}
      <Route path="/profile/:id" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
      <Route path="/profile/edit_profile/:id" element={<ProtectedRoute><Edit_User_Profile/></ProtectedRoute>}></Route>
      
      {/* Link for Login Form */}
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  </Router>
  );
}

export default App;
