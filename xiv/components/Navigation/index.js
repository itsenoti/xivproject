import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Toolbar } from "@mui/material";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import style from "./Navigation.module.css";

function Navigation() {
  /* Set theme to Dark Mode */
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const router = useRouter();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const MenuItemClicked = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  const resetLocalStorage = () => {
    if (typeof window != "undefined") {
      window.localStorage.removeItem("gatheringList");
      window.location.reload();
    }
  };

  return (
    <>
      <AppBar position="sticky">
        {/* The navigation header */}
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Image
            src={"/logos/dawntrail_logo.png"}
            width={100}
            height={60}
            className={style.logo}
            alt="img"
            unoptimized
            priority
          />
          <MenuIcon onClick={MenuItemClicked} />
        </Toolbar>

        {/* The menu items */}
        {isMenuClicked && (
          <Box className={style.navItemContainer}>
            <NavItem page="" />
            <NavItem page="FauxHallow" />
            <NavItem page="Eureka" />
            <NavItem page="Resources" />
            {/* <NavItem page="Gathering" /> */}
            {/* <NavItem page="Crafting" /> */}
            {/* <NavItem page="G15" /> */}
          </Box>
        )}
      </AppBar>
    </>
  );
}

export default Navigation;
