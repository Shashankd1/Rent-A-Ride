import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { UsersList } from "./components/UserList";
import { UserRegistrationForm } from "./components/UserRegistration";
import { UserEditForm } from "./components/UserEditForm";
import { Login } from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { RedirectIfLoggedIn } from "./components/RedirectIfLoggedIn";
//import { CarsDisplay } from "./components/CarsDisplay";
import BookingForm from "./components/BookingForm";
import AboutUs from "./components/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-dark text-light min-vh-100">
        <Routes>
          <Route
            path="/"
            element={
              <RedirectIfLoggedIn>
                {" "}
                <Login />{" "}
              </RedirectIfLoggedIn>
            }
          ></Route>{" "}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                {" "}
                <Dashboard />{" "}
              </PrivateRoute>
            }
          ></Route>{" "}
          <Route
            path="/users-list"
            element={
              <PrivateRoute>
                {" "}
                <UsersList />{" "}
              </PrivateRoute>
            }
          ></Route>{" "}
          <Route
            path="/BookingForm"
            element={
              <PrivateRoute>
                {" "}
                <BookingForm />{" "}
              </PrivateRoute>
            }
          ></Route>{" "}
          <Route
            path="/user-registration"
            element={
              <>
                {" "}
                <UserRegistrationForm />{" "}
              </>
            }
          ></Route>{" "}
          <Route
            path="/aboutus"
            element={
              <PrivateRoute>
                {" "}
                <AboutUs />{" "}
              </PrivateRoute>
            }
          ></Route>{" "}
          <Route
            path="/edit/:email"
            element={
              <PrivateRoute>
                {" "}
                <UserEditForm />{" "}
              </PrivateRoute>
            }
          ></Route>{" "}
        </Routes>{" "}
      </div>{" "}
    </BrowserRouter>
  );
}

export default App;
