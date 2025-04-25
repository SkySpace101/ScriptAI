import { Fragment, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router";
import { useMenuCurrentItem } from "@/components/menu";
import { useMenus } from "@/providers";
import { Header, Footer } from "..";
import { Toolbar, ToolbarHeading, ToolbarActions } from "../toolbar";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { KeenIcon } from "@/components/keenicons";
const Main = () => {
  const { pathname } = useLocation();
  const { getMenuConfig } = useMenus();
  const menuConfig = getMenuConfig("primary");
  const { isRTL } = useLanguage();
  const menuItem = useMenuCurrentItem(pathname, menuConfig);
  const [date, setDate] = useState({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });
  return (
    <Fragment>
      <Helmet>
        <title>{menuItem?.title}</title>
      </Helmet>
      <div className="flex grow flex-col [[data-sticky-header=on]_&]:pt-[--tw-header-height-default]">
        <Header />

        <div className="grow" role="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};
export { Main };
