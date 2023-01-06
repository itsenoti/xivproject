import { Divider, Typography } from "@mui/material";

function Title(props) {
  return (
    <>
      <Typography variant="subtitle1">{props.text}</Typography>
      <Divider />
    </>
  );
}

export default Title;
