import { useEffect, useState } from "react";
import InfoBox from "../../components/InfoBox/InfoBox";

function Maintenance() {
  const [hasMaintenance, setHasMaintenance] = useState(false);
  const [maintenanceDetails, setMaintenanceDetails] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });

  // Get user's timezone. Example: GMT+0800
  var userTimeZone = new Date().toString().split(" ")[5];

  useEffect(() => {
    // Get the news
    var lodestoneNewsUrl = "https://lodestonenews.com/news/maintenance/current?locale=na";
    fetch(lodestoneNewsUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.game.length > 0) {
          setHasMaintenance(true);
          setMaintenanceDetails({
            title: data.game[0]["title"] ? data.game[0]["title"] : null,
            startDate: new Date(data["game"][0]["start"]).toLocaleString("default", {
              month: "long",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            endDate: new Date(data["game"][0]["end"]).toLocaleString("default", {
              month: "long",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        }
      });
  }, []);

  const infoBoxMessage = `${maintenanceDetails.title.split("(")[0]} from ${
    maintenanceDetails.startDate
  } (${userTimeZone}) until
  ${maintenanceDetails.endDate} (${userTimeZone})`;

  return <>{hasMaintenance && <InfoBox message={infoBoxMessage} />}</>;
}

export default Maintenance;