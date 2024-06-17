export async function searchItemByKeyword(keyword) {
  if (keyword === null) throw "Invalid keyword.";

  let item = {
    id: 0,
    icon: "",
    stars: 0,
    level: 0,
  };

  const url = "https://xivapi.com/search?string=";
  const response = await fetch(`${url}${keyword}`);
  const obj = await response.json();

  item.id = obj.Results[0].ID;
  item.icon = obj.Results[0].ID;
  // console.log(item.id);
  // if (item.id) {
  //   searchItemById(item.id);
  // }
}

export async function searchItemById(id) {
  const url = "https://xivapi.com/Item/";
  const response = await fetch(`${url}${id}`);
  const obj = await response.json();
  // console.log(obj);
  let det = obj.GameContentLinks.GatheringItem.Item[0];

  searchItemByGatheringItemId(det);
}

export async function searchItemByGatheringItemId(id) {
  const url = "https://xivapi.com/GatheringItem/";
  const response = await fetch(`${url}${id}`);
  const obj = await response.json();

  // item.stars = obj.GameContentLinks.GatheringItemLevel.Stars;
  // item.level = obj.GameContentLinks.GatheringItemLevel.GatheringItemLevel;

  console.log(obj);
}
