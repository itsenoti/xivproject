import { Box, Container } from "@mui/material";
import { useState } from "react";
import Header from "../../components/Header";
import Navigation from "./Navigation/Navigation";
import styles from "./styles/FelicitousFavors.module.css";

function FelicitousFavors() {
  const [Selected4HourFavour, setSelected4HourFavour] = useState();
  const [Selected6HourFavour, setSelected6HourFavour] = useState();
  const [Selected8HourFavour, setSelected8HourFavour] = useState();
  const [craftPlan, setCraftPlan] = useState();

  // const [_4HFavor_4HLink] = useState();

  const FavoursList = [
    { duration: 4, name: "Baked Pumpkin", category1: "Foodstuffs", category2: "" },
    { duration: 4, name: "Boiled Egg", category1: "Foodstuffs", category2: "Creature Creations" },
    { duration: 4, name: "Brass Serving Dish", category1: "Sundries", category2: "Metalworks" },
    { duration: 4, name: "Brush", category1: "Sundries", category2: "Woodworks" },
    {
      duration: 4,
      name: "Buffalo Bean Salad",
      category1: "Foodstuffs",
      category2: "Creature Creations",
    },
    { duration: 4, name: "Butter", category1: "Ingredients", category2: "Creature Creations" },
    { duration: 4, name: "Coconut Juice", category1: "Confections", category2: "Concoctions" },
    { duration: 4, name: "Corn Flakes", category1: "Preserved Food", category2: "" },
    { duration: 4, name: "Culinary Knife", category1: "Sundries", category2: "Creature Creations" },
    { duration: 4, name: "Dressing", category1: "Ingredients", category2: "" },
    { duration: 4, name: "Earrings", category1: "Accessories", category2: "Creature Creations" },
    { duration: 4, name: "Firesand", category1: "Concoctions", category2: "Unburied Treasures" },
    { duration: 4, name: "Fruit Punch", category1: "Confections", category2: "" },
    { duration: 4, name: "Grilled Clam", category1: "Foodstuffs", category2: "Marine Merchandise" },
    { duration: 4, name: "Honey", category1: "Confections", category2: "Ingredients" },
    { duration: 4, name: "Isloaf", category1: "Foodstuffs", category2: "Concoctions" },
    { duration: 4, name: "Natron", category1: "Sundries", category2: "Concoctions" },
    { duration: 4, name: "Necklace", category1: "Accessories", category2: "Woodworks" },
    { duration: 4, name: "Parsnip Salad", category1: "Foodstuffs", category2: "" },
    { duration: 4, name: "Popoto Salad", category1: "Foodstuffs", category2: "" },
    { duration: 4, name: "Potion", category1: "Concoctions", category2: "" },
    { duration: 4, name: "Powdered Paprika", category1: "Ingredients", category2: "Concoctions" },
    { duration: 4, name: "Rope", category1: "Sundries", category2: "Textiles" },
    { duration: 4, name: "Runner Bean Saute", category1: "Foodstuffs", category2: "" },
    { duration: 4, name: "Sauerkraut", category1: "Preserved Food", category2: "" },
    { duration: 4, name: "Squid Ink", category1: "Ingredients", category2: "Marine Merchandise" },
    { duration: 4, name: "Tomato Relish", category1: "Ingredients", category2: "" },
    { duration: 6, name: "Barbut", category1: "Attire", category2: "Metalworks" },
    { duration: 6, name: "Beet Soup", category1: "Foodstuffs", category2: "" },
    {
      duration: 6,
      name: "Brick Counter",
      category1: "Furnishings",
      category2: "Unburied Treasures",
    },
    { duration: 6, name: "Caramels", category1: "Confections", category2: "" },
    { duration: 6, name: "Cavaliers Hat", category1: "Attire", category2: "Textiles" },
    { duration: 6, name: "Cawl Cennin", category1: "Concoctions", category2: "Creature Creations" },
    { duration: 6, name: "Coral Ring", category1: "Accessories", category2: "Marine Merchandise" },
    { duration: 6, name: "Dried Flowers", category1: "Sundries", category2: "Furnishings" },
    { duration: 6, name: "Durium Tathlums", category1: "Arms", category2: "Metalworks" },
    {
      duration: 6,
      name: "Essential Draught",
      category1: "Concoctions",
      category2: "Marine Merchandise",
    },
    {
      duration: 6,
      name: "Fossil Display",
      category1: "Creature Creations",
      category2: "Unburied Treasures",
    },
    { duration: 6, name: "Garden Scythe", category1: "Sundries", category2: "Metalworks" },
    { duration: 6, name: "Grinding Wheel", category1: "Sundries", category2: "" },
    { duration: 6, name: "Hora", category1: "Arms", category2: "Creature Creations" },
    { duration: 6, name: "Horn", category1: "Sundries", category2: "Creature Creations" },
    { duration: 6, name: "Imam Bayildi", category1: "Foodstuffs", category2: "" },
    { duration: 6, name: "Isleberry Jam", category1: "Ingredients", category2: "" },
    {
      duration: 6,
      name: "Islefish Pie",
      category1: "Confections",
      category2: "Marine Merchandise",
    },
    { duration: 6, name: "Macuahuitl", category1: "Arms", category2: "Woodworks" },
    { duration: 6, name: "Onion Soup", category1: "Foodstuffs", category2: "" },
    { duration: 6, name: "Peperoncino", category1: "Foodstuffs", category2: "" },
    { duration: 6, name: "Pumpkin Pudding", category1: "Confections", category2: "" },
    { duration: 6, name: "Ribbon", category1: "Accessories", category2: "Textiles" },
    { duration: 6, name: "Salt Cod", category1: "Preserved Food", category2: "Marine Merchandise" },
    {
      duration: 6,
      name: "Sheepfluff Rug",
      category1: "Furnishings",
      category2: "Creature Creations",
    },
    { duration: 6, name: "Spectacles", category1: "Attire", category2: "Sundries" },
    { duration: 6, name: "Stove", category1: "Furnishings", category2: "Metalworks" },
    { duration: 6, name: "Sweet Popoto", category1: "Confections", category2: "" },
    { duration: 6, name: "Tunic", category1: "Attire", category2: "Textiles" },
    { duration: 6, name: "Vegetable Juice", category1: "Concoctions", category2: "" },
    { duration: 6, name: "Wooden Chair", category1: "Furnishings", category2: "Woodworks" },
    { duration: 8, name: "Bathtub", category1: "Furnishings", category2: "Unburied Treasures" },
    { duration: 8, name: "Bed", category1: "Furnishings", category2: "Textiles" },
    {
      duration: 8,
      name: "Bouillabaisse",
      category1: "Foodstuffs",
      category2: "Marine Merchandise",
    },
    { duration: 8, name: "Bronze Sheep", category1: "Furnishings", category2: "Metalworks" },
    { duration: 8, name: "Cooling Glass", category1: "Unburied Treasures", category2: "" },
    { duration: 8, name: "Coral Sword", category1: "Arms", category2: "Marine Merchandise" },
    { duration: 8, name: "Crook", category1: "Arms", category2: "Woodworks" },
    { duration: 8, name: "Garnet Rapier", category1: "Arms", category2: "Unburied Treasures" },
    { duration: 8, name: "Gold Hairpin", category1: "Accessories", category2: "Metalworks" },
    { duration: 8, name: "Growth Formula", category1: "Concoctions", category2: "" },
    { duration: 8, name: "Iron Axe", category1: "Arms", category2: "Metalworks" },
    { duration: 8, name: "Lantern", category1: "Sundries", category2: "" },
    { duration: 8, name: "Mammet Award", category1: "Furnishings", category2: "" },
    { duration: 8, name: "Pickled Radish", category1: "Preserved Food", category2: "" },
    { duration: 8, name: "Pickled Zucchini", category1: "Preserved Food", category2: "" },
    { duration: 8, name: "Porcelain Vase", category1: "Sundries", category2: "Unburied Treasures" },
    { duration: 8, name: "Quartz Ring", category1: "Accessories", category2: "Unburied Treasures" },
    { duration: 8, name: "Scale Fingers", category1: "Attire", category2: "Creature Creations" },
    { duration: 8, name: "Seashine Opal", category1: "Unburied Treasures", category2: "" },
    { duration: 8, name: "Shark Oil", category1: "Sundries", category2: "Marine Merchandise" },
    { duration: 8, name: "Silver Ear Cuffs", category1: "Accessories", category2: "Metalworks" },
    { duration: 8, name: "Spruce Round Shield", category1: "Attire", category2: "Woodworks" },
    { duration: 8, name: "Sweet Popoto Pie", category1: "Foodstuffs", category2: "Confections" },
  ];

  const SetFavour4Selected = (event) => {
    setSelected4HourFavour(event.target.value);
  };

  const SetFavour6Selected = (event) => {
    setSelected6HourFavour(event.target.value);
  };

  const SetFavour8Selected = (event) => {
    setSelected8HourFavour(event.target.value);
  };

  function getRecommendations() {
    // 4H→4H
    var _4H_4H_Link = FavoursList.find(
      (item) =>
        item.duration == 4 &&
        item.name != Selected4HourFavour.name &&
        (item.category1 === Selected4HourFavour.category1 ||
          item?.category2 === Selected4HourFavour.category1 ||
          item.category1 === Selected4HourFavour?.category2 ||
          item?.category2 === Selected4HourFavour?.category2)
    );
    // 4H→6H
    var _4H_6H_Link = FavoursList.find(
      (item) =>
        item.duration == 6 &&
        item.name != Selected4HourFavour.name &&
        (item.category1 === Selected4HourFavour.category1 ||
          item?.category2 === Selected4HourFavour.category1 ||
          item.category1 === Selected4HourFavour?.category2 ||
          item?.category2 === Selected4HourFavour?.category2)
    );
    // 4H→8H
    var _4H_8H_Link = FavoursList.find(
      (item) =>
        item.duration == 4 &&
        item.name != Selected8HourFavour.name &&
        (item.category1 === Selected8HourFavour.category1 ||
          item?.category2 === Selected8HourFavour.category1 ||
          item.category1 === Selected8HourFavour?.category2 ||
          item?.category2 === Selected8HourFavour?.category2)
    );
    // 6H→4H
    var _6H_4H_Link = FavoursList.find(
      (item) =>
        item.duration == 4 &&
        item.name != Selected6HourFavour.name &&
        (item.category1 === Selected6HourFavour.category1 ||
          item?.category2 === Selected6HourFavour.category1 ||
          item.category1 === Selected6HourFavour?.category2 ||
          item?.category2 === Selected6HourFavour?.category2)
    );
    // 6H→4H 2nd
    var _6H_4H2_Link = FavoursList.filter(
      (item) =>
        item.duration == 4 &&
        item.name != Selected6HourFavour.name &&
        (item.category1 === Selected6HourFavour.category1 ||
          item?.category2 === Selected6HourFavour.category1 ||
          item.category1 === Selected6HourFavour?.category2 ||
          item?.category2 === Selected6HourFavour?.category2)
    )[1];
    // 6H→8H
    var _6H_8H_Link = FavoursList.find(
      (item) =>
        item.duration == 8 &&
        item.name != Selected6HourFavour.name &&
        (item.category1 === Selected6HourFavour.category1 ||
          item?.category2 === Selected6HourFavour.category1 ||
          item.category1 === Selected6HourFavour?.category2 ||
          item?.category2 === Selected6HourFavour?.category2)
    );
    // 8H→4H
    var _8H_4H_Link = FavoursList.find(
      (item) =>
        item.duration == 4 &&
        item.name != Selected8HourFavour.name &&
        (item.category1 === Selected8HourFavour.category1 ||
          item?.category2 === Selected6HourFavour.category1 ||
          item.category1 === Selected8HourFavour?.category2 ||
          item?.category2 === Selected8HourFavour?.category2)
    );
    // 8H→6H
    var _8H_6H_Link = FavoursList.find(
      (item) =>
        item.duration == 6 &&
        item.name != Selected8HourFavour.name &&
        (item.category1 === Selected8HourFavour.category1 ||
          item?.category2 === Selected6HourFavour.category1 ||
          item.category1 === Selected8HourFavour?.category2 ||
          item?.category2 === Selected8HourFavour?.category2)
    );

    var No_Links = !(_4H_8H_Link || _4H_6H_Link || _6H_8H_Link);
    var All_Link = _4H_8H_Link && _4H_6H_Link && _6H_8H_Link;
  }

  return (
    <>
      <Header />
      <Navigation />

      <Container sx={{ padding: 0, pt: 8 }}>
        <select onChange={SetFavour4Selected} className={styles.dropdownMenu}>
          <option>--Select 4-hour favour--</option>
          {FavoursList.filter((item) => item.duration == 4).map((filteredFavours) => (
            <option key={filteredFavours.name}>{filteredFavours.name}</option>
          ))}
        </select>
        <br />
        <select onChange={SetFavour6Selected} className={styles.dropdownMenu}>
          <option>--Select 6-hour favour--</option>
          {FavoursList.filter((item) => item.duration == 6).map((filteredFavours) => (
            <option key={filteredFavours.name}>{filteredFavours.name}</option>
          ))}
        </select>
        <br />
        <select onChange={SetFavour8Selected} className={styles.dropdownMenu}>
          <option>--Select 8-hour favour--</option>
          {FavoursList.filter((item) => item.duration == 8).map((filteredFavours) => (
            <option key={filteredFavours.name}>{filteredFavours.name}</option>
          ))}
        </select>
        <Box>
          {/* {_4H_4H1Link} */}
          {/* <h2>Cycle 1</h2>
          {Cycle_1()} */}
        </Box>
      </Container>
    </>
  );
}

export default FelicitousFavors;
