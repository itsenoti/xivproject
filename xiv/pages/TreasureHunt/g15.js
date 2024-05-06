import { Container, Select, TextField } from "@mui/material";
import { useState } from "react";
import Title from "../../components/title";
import Header from "../Header";
import Navigation from "../Navigation/Navigation";

const MAPNAME = "Ophiotauroskin (G15)";

const zonesCount = 1;
const zoneNames = ["Elpis"];

const coordinatesTbl = [
  { id: 0, zone: zoneNames[0], coordinates: "11.8, 33.1" }, // ← Starts in 'The Twelve Wonders'
  { id: 1, zone: zoneNames[0], coordinates: "16.8, 31.0" },
  { id: 2, zone: zoneNames[0], coordinates: "22.5, 24.6" },
  { id: 3, zone: zoneNames[0], coordinates: "27.2, 24.3" },
  { id: 4, zone: zoneNames[0], coordinates: "29.0, 17.5" },
  { id: 5, zone: zoneNames[0], coordinates: "37.1, 18.5" },
  { id: 6, zone: zoneNames[0], coordinates: "29.9, 9.5" },
  { id: 7, zone: zoneNames[0], coordinates: "13.0, 8.7" },
];

function G15({ theme, setTheme }) {
  const [playerInfo, setPlayerInfo] = useState([
    { id: 0, name: "", zone: "", coordinates: "" },
    { id: 1, name: "", zone: "", coordinates: "" },
    { id: 2, name: "", zone: "", coordinates: "" },
    { id: 3, name: "", zone: "", coordinates: "" },
    { id: 4, name: "", zone: "", coordinates: "" },
    { id: 5, name: "", zone: "", coordinates: "" },
    { id: 6, name: "", zone: "", coordinates: "" },
    { id: 7, name: "", zone: "", coordinates: "" },
  ]);

  const playerNameChangeHandler = (id, name) => {
    const newPlayerInfo = playerInfo.map((player) => {
      if (player.id === id) return { ...player, name: name };
      else return player;
    });
    setPlayerInfo(newPlayerInfo);
  };

  const coordinateChangeHandler = (id, zoneCoord) => {
    const zoneName = coordinatesTbl.map((zone) => {
      if (zone.id === id) {
        return zone.zone;
      }
    });

    const newPlayerInfo = playerInfo.map((player) => {
      if (player.id === id)
        return { ...player, zone: cleanString(zoneName), coordinates: zoneCoord };

      return player;
    });

    setPlayerInfo(newPlayerInfo);
  };

  const coordSelection = (playerId) => {
    return (
      <>
        <Select
          native
          defaultValue=""
          id="grouped-native-select"
          sx={{ minWidth: "60%" }}
          size="small"
          onChange={(e) => coordinateChangeHandler(playerId, e.target.value)}
        >
          {(() => {
            const options = [];
            options.push(<option value=""></option>);
            for (let index = 0; index < coordinatesTbl.length; index++) {
              options.push(
                <option value={coordinatesTbl[index].id}>
                  {coordinatesTbl[index].zone} ({coordinatesTbl[index].coordinates})
                </option>
              );
            }
            return options;
          })()}
        </Select>
      </>
    );
  };

  function cleanString(text) {
    return text.toString().replace(/,/g, "");
  }

  function getRoute(zoneName) {
    return (
      <div>
        <Title text={zoneName} />
        {(() => {
          const filteredByZone = [];
          const sequence = [];

          playerInfo
            .filter(
              (player) =>
                cleanString(player.zone) == zoneName &&
                cleanString(player.coordinates) != "" &&
                player.name != ""
            )
            .map((i) => {
              filteredByZone.push(i);
            });

          for (let i = 0; i < coordinatesTbl.length; i++) {
            for (let index = 0; index < filteredByZone.length; index++) {
              if (filteredByZone[index].coordinates == i.toString()) {
                sequence.push(filteredByZone[index].name);

                if (sequence.length < filteredByZone.length) sequence.push(" > ");
              }
            }
          }

          return sequence;
        })()}
      </div>
    );
  }

  return (
    <>
      <Header />
      <Navigation />
      <Container sx={{ padding: 0, pt: 8 }}>
        <Title text={MAPNAME} />
        {(() => {
          const elements = [];

          for (let playerId = 0; playerId < 8; playerId++) {
            elements.push(
              <Container sx={{ marginBottom: "2px" }}>
                <TextField
                  id="outlined-basic"
                  InputLabelProps={{ shrink: false }}
                  placeholder={playerInfo[playerId].name}
                  size="small"
                  variant="outlined"
                  sx={{ maxWidth: "35%", marginRight: "2px" }}
                  onChange={(e) => playerNameChangeHandler(playerId, e.target.value)}
                />
                {coordSelection(playerId)}
              </Container>
            );
          }
          return elements;
        })()}
      </Container>

      {getRoute("Elpis")}
    </>
  );
}

export default G15;
