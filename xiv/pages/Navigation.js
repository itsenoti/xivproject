import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NavItem from "./../components/NavItem";
import style from "./../pages/styles/Navigation.module.css";

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
      <AppBar position="fixed" sx={{ backgroundColor: "#67655c" }}>
        {/* The navigation header */}
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: "bold" }}>FF14</Typography>
          <Typography sx={{ fontWeight: "" }} onClick={MenuItemClicked}>
            Menu
          </Typography>
        </Toolbar>

        {/* The menu items */}
        {isMenuClicked && (
          <Box className={style.navItemContainer}>
            <NavItem page="" />
            <NavItem page="eureka" />
            <NavItem page="Gathering/Gathering" />
            {/* <NavItem page="pvp" /> */}
            {/* <NavItem page="maps" /> */}
            {/* <NavItem page="FelicitousFavors" /> */}
          </Box>
        )}
      </AppBar>
    </>
  );
}

export default Navigation;
