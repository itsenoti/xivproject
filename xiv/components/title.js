import { Divider, Typography } from "@mui/material";

function Title(props) {
  return (
    <>
      <Typography variant="subtitle1" sx={{ pl: 1 }}>
        {props.text}
      </Typography>
      <Divider className="divider" sx={{ mt: "1rem" }} />
    </>
  );
}

export default Title;
