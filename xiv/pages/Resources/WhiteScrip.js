// import * as gtools from "garlandtools-api";
import { useState } from "react";
import CustomAccordion from "../../components/Accordion/Accordion";
import { JOBS } from "../globals";
import Gather from "./Gather";

function WhiteScrip() {
  const [expanded, setExpanded] = useState("");

  const handleChange = (e, panelName) => {
    if (panelName === expanded) setExpanded("");
    else setExpanded(panelName);
  };

  return (
    <>
      <CustomAccordion
        Title="Test if gathering"
        Patch="6.3"
        ExpandedPanel={expanded}
        PanelName="tests"
        Icon="https://garlandtools.org/files/icons/item/21246.png"
        Body={
          <>
            <Gather keyword="Rarefied Eblan Alumen" />
            <Gather keyword="Ghostly Umbral Rock" />
            <Gather keyword="Dark Matter Cluster" />
          </>
        }
        Handler={handleChange}
      ></CustomAccordion>
      <CustomAccordion
        Title="Earth Break Aethersand"
        Patch="6.3"
        ExpandedPanel={expanded}
        PanelName="EarthbreakAethersand"
        Icon="https://garlandtools.org/files/icons/item/21246.png"
        Body={
          <>
            Spearfish <b>Verdigris Guppy</b> or <b>Nosceasaur</b> as collectables at{" "}
            <b>Upper La Noscea (X: 25.0, Y: 21.5)</b> and perform Aetherial Reduction.
          </>
        }
        Handler={handleChange}
      ></CustomAccordion>
      <CustomAccordion
        Title="White Gatherers' Scrip"
        Patch="6.8"
        ExpandedPanel={expanded}
        PanelName="WhiteGathererScrip"
        Icon="/icons/Gathering/065069.png"
        Body={
          <>
            Rodfishing <b>Fleeting Brand (!!)</b> at <b>Mare Lamentorum (X: 22.7, Y:31)</b> using{" "}
            <b>Versatile Lure</b>
          </>
        }
        Handler={handleChange}
      ></CustomAccordion>
      <CustomAccordion
        Title="Purple Gatherers' Scrip"
        Patch="6.8"
        ExpandedPanel={expanded}
        PanelName="PurpleGathererScrip"
        Icon="/icons/Gathering/065087.png"
        Body={
          <>
            Spearfish <b>Kitefin Shark</b> at the <b>Ruby Sea (X: 37.4, Y: 12.2)</b>
          </>
        }
        Handler={handleChange}
      ></CustomAccordion>
      <CustomAccordion
        Title="White Crafters' Scrip"
        Patch="6.8"
        ExpandedPanel={expanded}
        PanelName="WhiteCrafterScrip"
        Icon="/icons/Gathering/065070.png"
        Body={
          <>
            ({JOBS.ALC}) Craft <b>Rarefied Draught</b> collectables
          </>
        }
        Handler={handleChange}
      ></CustomAccordion>
      <CustomAccordion
        Title="Purple Crafters' Scrip"
        Patch="6.8"
        ExpandedPanel={expanded}
        PanelName="PurpleCrafterScrip"
        Icon="/icons/Gathering/065088.png"
        Body={
          <>
            ({JOBS.CUL}) Craft <b>Rarefied Sykon Bavarois</b> collectables
          </>
        }
        Handler={handleChange}
      ></CustomAccordion>
    </>
  );
}

export default WhiteScrip;
