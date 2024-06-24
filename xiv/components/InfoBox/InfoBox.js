import { Alert } from "@mui/material";

import * as style from "./InfoBox.module.css";

function InfoBox(props) {
  return (
    <Alert className={style.alertMessage} severity="info" variant="outlined">
      {props.message}
    </Alert>
  );
}

export default InfoBox;
