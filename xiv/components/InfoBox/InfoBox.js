import { Alert } from "@mui/material";

import * as style from "./InfoBox.module.css";

function InfoBox(props) {
  return (
    <Alert className={style.alertMessage} severity="info" variant="outlined">
      <span className={style.alertTitle}>{props.title}</span>
      <div>
        {props.startDate} ({props.timeZone}) ~ {props.endDate} ({props.timeZone})
      </div>
    </Alert>
  );
}

export default InfoBox;
