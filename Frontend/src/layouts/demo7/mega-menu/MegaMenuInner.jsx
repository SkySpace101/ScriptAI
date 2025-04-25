import { Fragment } from "react";
import { useResponsive } from "@/hooks";
import { KeenIcon } from "@/components";
import {
  MenuItem,
  MenuLink,
  MenuTitle,
  MenuArrow,
  Menu,
} from "@/components/menu";
import {
  MegaMenuSubProfiles,
  MegaMenuSubAccount,
  MegaMenuSubNetwork,
  MegaMenuSubAuth,
  MegaMenuSubHelp,
} from "@/partials/menu/mega-menu";
import { MENU_MEGA } from "@/config";
import { useLanguage } from "@/i18n";
const MegaMenuInner = () => {
  const desktopMode = useResponsive("up", "lg");
  const build = (items) => {
    const homeItem = items[0];
    const publicProfilesItem = items[1];
    const myAccountItem = items[2];
    const networkItem = items[3];
    const authItem = items[4];
    const { isRTL } = useLanguage();
    const linkClass =
      "border-b border-b-transparent menu-item-active:border-b-gray-400 menu-item-here:border-b-gray-400";
    const titleClass =
      "text-2sm text-gray-800 dark:menu-item-here:text-gray-900 dark:menu-item-active:text-gray-900 menu-item-show:text-gray-900 menu-item-here:text-gray-900 menu-item-active:font-medium menu-item-here:font-medium";
    return (
      <Fragment>
        <MenuItem key="home">
          <MenuLink path={homeItem.path} className={linkClass}>
            <MenuTitle className={titleClass}>Home</MenuTitle>
          </MenuLink>
        </MenuItem>

        <MenuItem
          key="public-profiles"
          toggle={desktopMode ? "dropdown" : "accordion"}
          trigger={desktopMode ? "hover" : "click"}
          dropdownProps={{
            placement: isRTL() ? "bottom-end" : "bottom-start",
          }}
        >
          <MenuLink
            path={publicProfilesItem.children[1].children[0].children[2].path}
            className={linkClass}
          >
            <MenuTitle className={titleClass}>DashBoard</MenuTitle>
            {buildArrow()}
          </MenuLink>
          {/* {MegaMenuSubProfiles(items)} */}
        </MenuItem>

        <MenuItem
          key="my-account"
          toggle={desktopMode ? "dropdown" : "accordion"}
          trigger={desktopMode ? "hover" : "click"}
          dropdownProps={{
            placement: isRTL() ? "bottom-end" : "bottom-start",
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: isRTL() ? [300, 0] : [-300, 0], // [skid, distance]
                },
              },
            ],
          }}
        >
          <MenuLink
            path={publicProfilesItem.children[0].children[0].children[1].path}
            className={linkClass}
          >
            <MenuTitle className={titleClass}>CreateScript</MenuTitle>
            {buildArrow()}
          </MenuLink>
          {/* {MegaMenuSubAccount(items)} */}
        </MenuItem>

        <MenuItem
          key="auth"
          toggle={desktopMode ? "dropdown" : "accordion"}
          trigger={desktopMode ? "hover" : "click"}
          dropdownProps={{
            placement: "bottom-start",
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [-300, 0], // [skid, distance]
                },
              },
            ],
          }}
        >
          <MenuLink
            path={authItem.children[0].children[1].children[0].path}
            className={linkClass}
          >
            <MenuTitle className={titleClass}>Sign In </MenuTitle>
            {buildArrow()}
          </MenuLink>
          {/* {MegaMenuSubAuth(items)} */}
        </MenuItem>

        <MenuItem
          key="auth"
          toggle={desktopMode ? "dropdown" : "accordion"}
          trigger={desktopMode ? "hover" : "click"}
          dropdownProps={{
            placement: "bottom-start",
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [-300, 0], // [skid, distance]
                },
              },
            ],
          }}
        >
          <MenuLink
            path={authItem.children[0].children[1].children[1].path}
            className={linkClass}
          >
            <MenuTitle className={titleClass}>Register</MenuTitle>
            {buildArrow()}
          </MenuLink>
          {/* {MegaMenuSubAuth(items)} */}
        </MenuItem>
      </Fragment>
    );
  };
  const buildArrow = () => {
    return (
      <MenuArrow className="flex lg:hidden text-gray-400">
        <KeenIcon icon="plus" className="text-2xs menu-item-show:hidden" />
        <KeenIcon
          icon="minus"
          className="text-2xs hidden menu-item-show:inline-flex"
        />
      </MenuArrow>
    );
  };
  return (
    <Menu
      multipleExpand={true}
      highlight={true}
      className="flex-col lg:flex-row gap-5 lg:gap-7.5 p-5 lg:p-0"
    >
      {build(MENU_MEGA)}
    </Menu>
  );
};
export { MegaMenuInner };
