import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Announcements from "../../components/announcements";
import Title from "../../components/title";
import Header from "../Header";
import Navigation from "../Navigation";
import * as MapsLocation from "./maps.json";

// Initialize players profile
const TreasureHunt_Players = MapsLocation.Players;

// Update according to which map
const TreasureHunt_Map = MapsLocation.g14;

function G15({ theme, setTheme }) {
  const [playerInfo, setPlayerInfo] = useState(Object.values(TreasureHunt_Players)); // Array containing the players info
  const [selectedMap, setSelectedMap] = useState(null);

  useEffect(() => {
    // console.log(JSON.stringify(playerInfo, null, 2));
    // console.log(JSON.stringify(TreasureHuntersArray["" + 1], null, 2));
  }, [playerInfo]);

  const playerNameChangeHandler = (event, props) => {
    // Check if props.id exists in the array
    const index = playerInfo.findIndex((e) => e.id === props.id);
    // Create copy of the existing playerInfo
    const newState = [...playerInfo];

    const newData = {
      id: playerInfo[index].id,
      name: event.target.value,
      map: playerInfo[index].map,
      coordinates: playerInfo[index].coordinates,
    };

    if (index != -1) {
      newState[index] = newData;
      setPlayerInfo(newState);
    }
  };

  const mapLocationChangeHandler = (event, props) => {
    // Check if props.id exists in the array
    const index = playerInfo.findIndex((e) => e.id === props.id);
    // Create copy of the existing playerInfo
    const newState = [...playerInfo];

    const newData = {
      id: playerInfo[index].id,
      name: playerInfo[index].name,
      map: event.target.value,
      coordinates: playerInfo[index].coordinates,
    };

    if (index != -1) {
      newState[index] = newData;
      setPlayerInfo(newState);
    }

    setSelectedMap(event.target.value);
  };

  const mapCoordinateChangeHandle = (event, id) => {
    // Check if props.id exists in the array
    const index = playerInfo.findIndex((e) => e.id === id);
    const newState = [...playerInfo];

    const newData = {
      id: playerInfo[index].id,
      name: playerInfo[index].name,
      map: playerInfo[index].map,
      coordinates: event.target.value,
    };

    if (index >= 0) {
      // console.log(newState[index].name);
      newState[index] = newData;
      setPlayerInfo(newState);
    }
  };

  return (
    <>
      <Header />
      <Navigation />
      <Announcements />
      <Container sx={{ padding: 0, pt: 8 }}>
        <Title text={"Ophiotauroskin (G15)"} />
        {/* Player Name and Map Location */}
        <Grid container spacing={0}>
          <Grid xs={7}>
            <h4>Player names and Map Location</h4>
            {/* Player name and map input area */}
            <Stack marginTop={2}>
              {(() => {
                var entries = [];
                for (var i = 0; i < 8; i++) {
                  let entry = (
                    <>
                      <Stack direction={"row"} spacing={1} marginBottom={1}>
                        <PlayerName id={playerInfo[i].id} handler={playerNameChangeHandler} />
                        <MapSelection
                          id={playerInfo[i].id}
                          name={playerInfo[i].name}
                          handler={mapLocationChangeHandler}
                        />
                        <LocationSelection
                          player={playerInfo[i]}
                          handler={mapCoordinateChangeHandle}
                        />
                      </Stack>
                    </>
                  );

                  entries.push(entry);
                }
                return entries;
              })()}
            </Stack>
          </Grid>
          {/* Guide map display */}
          <Grid xs={4}>
            <Image src="/maps/TreasureMap_G15_Elpis.png" width={420} height={420}></Image>
          </Grid>
          <Grid xs={1}></Grid>
        </Grid>
        {
          <>
            <h4 className="sub-header">Route</h4>
            {getRoute(playerInfo)}
          </>
        }
      </Container>
    </>
  );
}

function getRoute(info) {
  // const textRef = useRef(null); // To be used for copy-to-clipboard function

  const maps = Object.keys(TreasureHunt_Map);

  var map_new = new Map();

  for (var index in maps) {
    map_new[Object.keys(TreasureHunt_Map)[index]] = [];

    // console.log(map_new);

    for (var i in info) {
      // If player's map == "Labyrinthos"
      if (info[i].map == maps[i]) {
        // Run through the coordinate - nearest to farthest
        for (var coord in Object.keys(Object.values(TreasureHunt_Map)[index])) {
          if (info[i].coordinates == Object.keys(Object.values(TreasureHunt_Map)[index])[coord]) {
            map_new[info[i].map].push(info[i].name);
          }
        }
      }
    }
  }

  return (
    <>
      {Object.keys(TreasureHunt_Map).map((map, i) => (
        <h5>{map}</h5>
      ))}
    </>
  );
}

const PlayerName = (props) => {
  return (
    <TextField
      id={props.id}
      onChange={(event) => props.handler(event, props)}
      InputLabelProps={{ shrink: false }}
      size="small"
      placeholder={"Player " + props.id}
      sx={{ width: 150 }}
    />
  );
};

const MapSelection = (props) => {
  return (
    <>
      <FormControl style={{ width: 160 }} size="small">
        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
        <Select
          disabled={props.name == "" ? true : false}
          labelId="demo-select-small-label"
          id="demo-select-small"
          label=""
          onChange={(event) => props.handler(event, props)}
        >
          {Object.keys(TreasureHunt_Map).map((loc, val) => (
            <MenuItem value={loc}>{loc}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

// Updated depending on which map is selected
const LocationSelection = (props) => {
  // var m_playerId = props.
  var m_location = props.player.map;
  console.log(props.player.id + props.player.name + m_location);
  return (
    <>
      <FormControl style={{ width: 160 }} size="small">
        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
        <Select
          disabled={props.name == "" ? true : false}
          labelId="demo-select-small-label"
          id="demo-select-small"
          // value={props.coord ? props.coord : "ok"}
          label=""
          onChange={(event) => props.handler(event, props.player.id)}
        >
          {TreasureHunt_Map[m_location] &&
            Object.keys(TreasureHunt_Map[m_location]).map((loc, val) => (
              <MenuItem value={loc} key={loc}>{loc}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

export default G15;
