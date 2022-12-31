import { Typography } from "@mui/material";

export function Title(props) {
  return (
    <>
      <Typography variant="h5">{props.text}</Typography>
      <hr />
    </>
  );
}
