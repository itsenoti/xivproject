import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NavItem from "../../components/NavItem";
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
      <AppBar position="fixed" sx={{}}>
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
          <Typography sx={{ fontWeight: "" }} onClick={MenuItemClicked}>
            Menu
          </Typography>
        </Toolbar>

        {/* The menu items */}
        {isMenuClicked && (
          <Box className={style.navItemContainer}>
            <NavItem page="" />
            <NavItem page="Eureka/Eureka" />
            <NavItem page="Gathering/Gathering" />
            <NavItem page="Crafting/Crafting" />
            {/* <NavItem page="pvp" /> */}
            <NavItem page="TreasureHunt/G15" />
            {/* <NavItem page="FelicitousFavors" /> */}
          </Box>
        )}
      </AppBar>
    </>
  );
}

export default Navigation;
