import { Fragment } from "react";
import { toAbsoluteUrl } from "@/utils/Assets";
import { KeenIcon } from "@/components";
import { Container } from "@/components/container";
import { UserProfileHero } from "@/partials/heros";
import { Navbar, NavbarActions, NavbarDropdown } from "@/partials/navbar";
import { PageMenu } from "@/pages/public-profile";
import { ProfileCompanyContent } from "./";
const ProfileCompanyPage = () => {
  const image = (
    <div className="flex items-center justify-center rounded-full border-2 border-success-clarity size-[100px] shrink-0 bg-light">
      <img
        src={toAbsoluteUrl("/media/app/ScriptAI.png")}
        className="h-[40px] w-[70px]"
      />
    </div>
  );
  return (
    <Fragment>
      <UserProfileHero
        name="ScriptAI"
        image={image}
        info={[
          {
            label: "Private Company",
            icon: "abstract-41",
          },
          {
            label: "Delhi, INDIA",
            icon: "geolocation",
          },
          {
            email: "info@scriptai.com",
            icon: "sms",
          },
        ]}
      />

      <Container>
        <ProfileCompanyContent />
      </Container>
    </Fragment>
  );
};
export { ProfileCompanyPage };
