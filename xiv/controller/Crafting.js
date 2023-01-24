export function searchItems(searchString) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://garlandtools.org/api/search.php?text=${searchString}&type=item&craftable=true`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
