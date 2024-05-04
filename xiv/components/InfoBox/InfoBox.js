import { Alert } from "@mui/material";

function InfoBox(props) {
  return <Alert severity="info">{props.message}</Alert>;
}

export default InfoBox;
