import { Connections, Contributions, Projects, Tags } from "../default";
import {
  Statistics,
  Highlights,
  OpenJobs,
  Network,
  CompanyProfile,
  Locations,
} from "./blocks";
const ProfileCompanyContent = () => {
  const items = [
    {
      number: "200K",
      label: "Seed Funding",
    },
    {
      number: "1000+",
      label: "Users",
    },
  ];
  const data = [
    {
      icon: "dribbble",
      link: "https://scriptai.com",
    },
    {
      icon: "sms",
      link: "info@scriptai.com",
    },
    {
      icon: "facebook",
      link: "ScriptAI",
    },
    {
      icon: "twitter",
      link: "ScriptAI-news",
    },
    {
      icon: "youtube",
      link: "ScriptAI-tuts",
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-1 lg:col-span-3">
        <Statistics items={items} />
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <Highlights />

          <Network title="Contacts & Socials" data={data} />

          <Tags title="Tags" />
        </div>
      </div>
      <div className="col-span-1 lg:col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <CompanyProfile />

          <Locations />
        </div>
      </div>
    </div>
  );
};
export { ProfileCompanyContent };
