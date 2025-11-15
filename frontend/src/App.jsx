import { Outlet, RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth
import Login from "./pages/Auth/Login.jsx";



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
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;