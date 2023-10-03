import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { useRouter } from "next/router";

export default function NavItem(props) {
  const router = useRouter();

  return (
    <>
      <ListItem key={props.page == "" ? "home" : props.page}>
        <Button
          color="inherit"
          onClick={() => {
            router.push(`/${props.page}`);
          }}
          sx={{ width: "100%", justifyContent: "left" }}
          className="bg-green-900"
        >
          {props.page == "" ? "Home" : props.page}
        </Button>
      </ListItem>
      <Divider />
    </>
  );
}
