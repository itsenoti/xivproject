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

  const router = useRouter();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const resetLocalStorage = () => {
    if (typeof window != "undefined") {
      window.localStorage.removeItem("gatheringList");
      window.location.reload();
    }
  };

  return (
    <>
      <AppBar position="fixed">
        {/* <Toolbar sx={{ justifyContent: "space-between" }}> */}
        <Toolbar>
          <Typography sx={{ fontWeight: "bold" }}>FFX|V</Typography>
          <Box className={style.navItemContainer}>
            <NavItem page="" />
            {/* <NavItem page="gathering" />
            <NavItem page="crafting" />
            <NavItem page="crafting-list" /> */}
            <NavItem page="eureka" />
            <NavItem page="pvp" />
            {/* <NavItem page="maps" /> */}
            {/* <NavItem page="island" /> */}
            {/* <NavItem page="links" /> */}
            {/* <NavItem page="weather" /> */}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navigation;
