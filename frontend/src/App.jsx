import { Outlet, RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Private Route
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/User/Profile.jsx";
import AdminRoutes from "./pages/Admin/AdminRoute.jsx";

// Auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx"
import UserList from "./pages/Admin/UserList.jsx";



const Layout = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
};


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="" element={<PrivateRoute/>} >
        <Route path="/profile" element={<Profile/>}></Route>
      </Route>

      {/* Admin Routes*/}
      <Route path="/admin" element={<AdminRoutes/>}>
        <Route path="userlist" element={<UserList/>}></Route>
      </Route>


    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;