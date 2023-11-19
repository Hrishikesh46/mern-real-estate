import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HeaderNav from "./pages/HeaderNav";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/createListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HeaderNav />,
      children: [
        { index: true, element: <Home /> },
        { path: "/sign-in", element: <SignIn /> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "/about", element: <About /> },
        { path: "/listing/:listingId", element: <Listing /> },
        {
          element: <PrivateRoute />,
          children: [
            { path: "/profile", element: <Profile /> },
            { path: "/create-listing", element: <CreateListing /> },
            { path: "/update-listing/:listingId", element: <UpdateListing /> },
          ],
        },
      ],
    },
  ]);
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
