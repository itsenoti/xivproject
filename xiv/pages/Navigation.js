import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  SwipeableDrawer,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Theme } from "../public/globals";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

function Navigation() {
  /* Set theme to Dark Mode */
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /* Set menu drawer to close */
  const [isDrawerOpen, setDrawerState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const router = useRouter();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setDrawerState({ ...isDrawerOpen, [anchor]: open });
  };

  // These are the items inside the hamburger menu
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {" "}
        <ListItem key="Home">
          <Button
            color="inherit"
            onClick={() => {
              router.push("/");
            }}
            sx={{ width: "100%", justifyContent: "left" }}
          >
            Home
          </Button>
        </ListItem>
        <Divider />
        <ListItem key="Gathering">
          <Button
            color="inherit"
            onClick={() => {
              router.push("/gathering");
            }}
            sx={{ width: "100%", justifyContent: "left" }}
          >
            Gathering
          </Button>
        </ListItem>
        <Divider />
        <ListItem key="Eureka">
          <Button
            color="inherit"
            onClick={() => {
              router.push("/eureka");
            }}
            sx={{ width: "100%", justifyContent: "left" }}
          >
            Eureka
          </Button>
        </ListItem>
        <Divider />
        <ListItem key="IslandSanctuary">
          <Button
            color="inherit"
            onClick={() => {
              router.push("/island-sanctuary");
            }}
            sx={{ width: "100%", justifyContent: "left" }}
          >
            Island Sanctuary
          </Button>
        </ListItem>
        <Divider />
        <ListItem key="Links">
          <Button
            color="inherit"
            onClick={() => {
              router.push("/links");
            }}
            sx={{ width: "100%", justifyContent: "left" }}
          >
            Links
          </Button>
        </ListItem>
        <Divider />
        <ListItem key="ThemeSwitcher">
          {/* Theme Switcher */}
          <FormControlLabel
            control={
              <MaterialUISwitch
                sx={{ m: 1 }}
                defaultChecked={theme === "dark" ? Theme.DARK : Theme.LIGHT}
              />
            }
            onChange={() => {
              theme === "light" ? setTheme("dark") : setTheme("light");
            }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontFamily: "Inter !important", fontWeight: "bold" }}>FFX|V</Typography>
          {/* Right side menu */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button color="inherit">Eureka</Button>
            <Button color="inherit">{theme}</Button>
            <Divider />
            {/* Theme Switcher */}
            <FormControlLabel
              control={
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  defaultChecked={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                />
              }
              onChange={() => {
                theme === "light" ? setTheme("dark") : setTheme("light");
              }}
            />
          </Box>
          <div />
          {/* Hamburger Menu */}
          {["right"].map((anchor) => (
            <>
              <Button onClick={toggleDrawer(anchor, true)}>
                <MenuIcon sx={{ display: { xs: "block", md: "none" }, color: "Highlight" }} />
              </Button>
              <SwipeableDrawer
                anchor={anchor}
                open={isDrawerOpen[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                {list(anchor)}
              </SwipeableDrawer>
            </>
          ))}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navigation;
