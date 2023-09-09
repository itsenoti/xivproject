import { Container } from "@mui/material";
import Header from "./Header";
import Navigation from "./Navigation";

var list_EorzeanTime = [];

function createData(name, coordinate, loot1, loot2, time_start, time_end, weather) {
  return { name, coordinate, loot1, loot2, time_start, time_end, weather };
}

const rows = [
  createData("Amethyst Spriggan", "(Cave) 28, 16 or 24, 19", "Fur", "Fang", "21:00", "00:00", ""),
  createData("Apkallu of Paradise", "19, 11", "Egg", "Fleece", "12:00", "15:00", ""),
  createData("Dodo of Paradise", "16, 12", "Feather", "Egg", "15:00", "18:00", ""),
  createData("Glyptodon", "31, 11", "Claw", "Carapace", "00:00", "03:00", ""),
  createData("Island Billy", "26, 22", "Horn", "Fleece", "03:00", "06:00", ""),
  createData("Island Stag", "20, 19", "Fur", "Horn", "18:00", "21:00", ""),
  createData("Lemur", "20, 26", "Fur", "Claw", "06:00", "09:00", ""),
  createData("Star Marmot", "15, 19", "Fur", "Claw", "09:00", "12:00", ""),
];

function getAvailabilityTime(name) {
  for (let i = 0; i < 100; i++) {
    list_EorzeanTime[i] = getHourWeatherChanges(i);
  }
  console.log(list_EorzeanTime);
}

export default function IslandSanctuary() {
  return (
    <>
      <Header />
      <Navigation />
      <Container sx={{ padding: 0, pt: 8, pb: 3 }}>
        Under Construction.
        {/* <Title text={"Rare Animals Spawn Tracker "} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Animal</TableCell>
                <TableCell>Coordinate</TableCell>
                <TableCell>Loot 1</TableCell>
                <TableCell>Loot 2</TableCell>
                <TableCell>Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 }, textAlign: "center" }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.coordinate}</TableCell>
                  <TableCell>{row.loot1}</TableCell>
                  <TableCell>{row.loot2}</TableCell>
                  <TableCell>{getAvailabilityTime(row.name)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Container>
    </>
  );
}
