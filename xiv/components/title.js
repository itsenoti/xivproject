import { Typography } from "@mui/material";

function Title(props) {
  return (
    <>
      <Typography variant="h6">{props.text}</Typography>
      <hr />
    </>
  );
}

export default Title;
