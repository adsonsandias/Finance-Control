import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PrivateRoutes } from ".";
import { Homer } from "../pages/Home";
import { LoggedInUser } from "../pages/LoggedInUser";
import { PageNotFound } from "../pages/PageNotFound";
import { Signin } from "../pages/SignIn";
import { Signup } from "../pages/SignUp";
import { Auth0Callback } from "../pages/Auth0Callback";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/cadastro" element={<Signup />} />
        <Route path="/auth/callback" element={<Auth0Callback />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Homer />} />
          <Route path="/user/*" element={<LoggedInUser />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
