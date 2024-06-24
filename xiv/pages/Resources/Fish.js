import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

import * as style from "./Resources.module.css";

const Fish = () => {
  const fish = {
    name: "Fleeting Brand",
    location: "Mare Lamentorum (22.4, 31.1)",
    bait: "Versatile Lure",
    bite: "!!",
    hookTime: "13s~20s",
    book: null,
    icon: "https://garlandtools.org/files/icons/item/29766.png",
    minCollectability: "244~",
    midCollectability: "408~",
    maxCollectability: "573~",
  };

  return (
    <List className={style.list}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar variant="rounded" src={fish.icon}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${fish.name} ( ${fish.bite} ${fish.hookTime} ) `}
          secondary={
            <>
              <ListItemText primary={`${fish.location} `} />
              {fish.book && <ListItemText primary={`${fish.book}`} />}
              <ListItemText
                primary={`Collectability: ${fish.minCollectability} ${fish.midCollectability} ${fish.maxCollectability}`}
              />
            </>
          }
        />
      </ListItem>
    </List>
  );
};

export default Fish;
