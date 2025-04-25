import { Navigate, Route, Routes } from "react-router";
import { Login, Signup } from "./pages/jwt";
import { AuthBrandedLayout } from "@/layouts/auth-branded";
import { AuthLayout } from "@/layouts/auth";
import { CheckEmail } from "@/auth/pages/jwt";
const AuthPage = () => (
  <Routes>
    <Route element={<AuthBrandedLayout />}>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Route>

    <Route element={<AuthLayout />}>
      <Route path="/classic/login" element={<Login />} />
      <Route path="/classic/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Route>
  </Routes>
);
export { AuthPage };
