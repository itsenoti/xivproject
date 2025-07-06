import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, { accordionSummaryClasses } from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

import Header from "../../components/Header";
import Navigation from "../../components/Navigation";

import styles from "./Release.module.css";

function createData(name, calories) {
  return { name, calories };
}

const rows = [createData("Patch 7.25", 159), createData("Patch 7.21", "Occult Crescent")];

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
    transform: "rotate(90deg)",
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Header />
      <Navigation />
      <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography component="span">Dawntrail (7.0)</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.content}>
          <div className={styles.title}>2025/08/05 (Patch 7.3)</div>
          <li>Main Story: The Promise of Tomorrow</li>
          <li>Alliance Raid: Alliance Raid San d&apos;Oria</li>
          <li>Dungeon: The Meso Terminal</li>
          <li>Extreme: ???</li>
          <li>Unreal: The Wreath of Snakes</li>
          <li>Allied Society: Yok Huy (crafters)</li>
          <li>Deep Dungeon: Pilgrim&apos;s Traverse (7.3x)</li>
          <div className={styles.title}>2025/05/27 (Patch 7.25)</div>
          <li>Relic Weapons: Occult Crescent</li>
          <li>Allied Society: Mamool Ja (gatherers)</li>
          <div className={styles.title}>2025/03/25 (Patch 7.21)</div>
          <li>Relic Tools: Cosmic Exploration</li>
          <div className={styles.title}>2025/03/25 (Patch 7.2)</div>
          <li>Main Story: Seekers of Eternity</li>
          <li>Dungeon: The Underkeep</li>
          <li>Extreme: Recollection</li>
          <li>Savage: AAC Cruiserweight Tier</li>
          <li>Unreal: Hell&apos;s Kier</li>
          <div className={styles.title}>2024/12/17 (Patch 7.15)</div>
          <li>Chaotic Raid: The Cloud of Darkness</li>
          <div className={styles.title}>2024/11/26 (Patch 7.11)</div>
          <li>Ultimate Raid: Futures Rewritten</li>
          <div className={styles.title}>2024/11/12 (Patch 7.1)</div>
          <li>Main Story: Crossroads</li>
          <li>Alliance Raid: Alliance Raid Jeuno</li>
          <li>Dungeon: Yuweyawata Field Station</li>
          <li>Extreme: Sphene&apos;s Burden</li>
          <li>Unreal: The Jade Stoa</li>
          <li>Allied Society: Pelupelu (battle)</li>
          <div className={styles.title}>2024/07/02 (Patch 7.0)</div>
          <li>Main Story: Dawntrail Release</li>
          <li>Extreme: Worqor Lar Dor</li>
          <li>Extreme: Everkeep</li>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography component="span">Endwalker (6.0)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
