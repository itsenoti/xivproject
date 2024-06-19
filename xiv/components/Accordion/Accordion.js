import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Typography } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `0px solid ${theme.palette.divider}`,
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
  backgroundColor: theme.palette.mode === "dark" ? "transparent" : "black",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomAccordion(props) {
  let panelExpanded = props.ExpandedPanel;
  let panelName = props.PanelName ?? "";
  let panelIcon = props.Icon;
  let panelTitle = props.Title;
  let panelBody = props.Body;

  return (
    <>
      <Accordion
        expanded={panelExpanded === panelName}
        onChange={(e) => props.Handler(e, panelName)}
      >
        <AccordionSummary aria-controls={`${panelName}-content`} id={`${panelName}-header`}>
          <Image src={`${panelIcon}`} width={25} height={25} alt="---" style={{ marginRight: 2 }} />
          <Typography>
            {panelTitle} ({props.Patch})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{panelBody}</AccordionDetails>
      </Accordion>
    </>
  );
}
