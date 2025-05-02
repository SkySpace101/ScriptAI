import { Navigate, Route, Routes } from "react-router";
// import { DefaultPage } from "@/pages/dashboards";
import {
  CampaignsListPage,
  ProfileCompanyPage,
  ProfileCreatorPage,
  ProfileWorksPage,
} from "@/pages/public-profile";
import { AccountSettingsPlainPage } from "@/pages/account";
import { AuthPage } from "@/auth";
import { RequireAuth } from "@/auth/RequireAuth";
import { Demo7Layout } from "@/layouts/Demo7";
import { ErrorsRouting } from "@/errors";
// import { AuthenticationWelcomeMessagePage } from "@/pages/authentication";
// import DataFromAPI from "@/DataFromAPI";

const AppRoutingSetup = () => {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<Demo7Layout />}>
          <Route path="/" element={<ProfileCompanyPage />} />
          <Route
            path="/public-profile/profiles/creator"
            element={<ProfileCreatorPage />}
          />
          {/* <Route path="/datafromapi" element={<DataFromAPI />} /> */}
          <Route path="/public-profile/works" element={<ProfileWorksPage />} />
          <Route
            path="/public-profile/campaigns/list"
            S
            element={<CampaignsListPage />}
          />
          {/* <Route
            path="/account/home/settings-plain"
            element={<AccountSettingsPlainPage />}
          /> */}
          {/* <Route
            path="/auth/welcome-message"
            element={<AuthenticationWelcomeMessagePage />}
          /> */}
        </Route>
      </Route>
      <Route path="error/*" element={<ErrorsRouting />} />
      <Route path="auth/*" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};
export { AppRoutingSetup };
