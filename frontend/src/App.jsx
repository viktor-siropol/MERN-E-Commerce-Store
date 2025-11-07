import Navigation from "./pages/Auth/Navigation";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import store from './redux/features/store.js';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
        <ToastContainer />
        <Navigation />
        <main className="py-3">
          <Outlet />
        </main>
    </Provider>
  );
}
