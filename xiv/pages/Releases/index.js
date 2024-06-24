import { Container } from "@mui/material";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import Title from "../../components/Title";

const Patchx_0 = () => {
  return (
    <>
      <h2>x.0</h2>
      <ul>
        <li>Role Quests</li>
        <li>Achievement FATE added</li>
        <li>Shared FATE added</li>
        <li>New aquarium fish added</li>
        <li>New race added</li>
        <li>New trial</li>
        <li>
          The weekly restriction on receiving clusters upon clearing the last alliance raid removed.
        </li>
        <li>New Rank A mobs added</li>
        <li>New tomestones added</li>
        <li>New scrips added</li>
        <li>New actions and traits have been added for Disciples of the Hand.</li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </>
  );
};

export default function Releases() {
  return (
    <>
      <Header />
      <Navigation />
      <Container className={`containerBody`}>
        <Title text="Releases"></Title>
        <Patchx_0 />
      </Container>
    </>
  );
}
