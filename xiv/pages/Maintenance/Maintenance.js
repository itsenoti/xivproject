import { useEffect, useState } from "react";
import InfoBox from "../../components/InfoBox/InfoBox";

function Maintenance() {
  const [hasMaintenance, setHasMaintenance] = useState(false);
  const [maintenanceDetails, setMaintenanceDetails] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });

  var userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var lodestoneNewsUrl = "https://lodestonenews.com/news/maintenance/current?locale=na";

  useEffect(() => {
    fetch(lodestoneNewsUrl)
      .then((response) => response.json())
      .then((data) => {
        setHasMaintenance(true);
        setMaintenanceDetails({
          title: data["game"][0]["title"],
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
      });
  }, []);

  const infoBoxMessage = `${maintenanceDetails.title.split("(")[0]} from ${
    maintenanceDetails.startDate
  } (${userTimeZone}) until
  ${maintenanceDetails.endDate} (${userTimeZone})`;

  return (
    <div>
      {hasMaintenance && (
        <>
          <InfoBox message={infoBoxMessage} />
        </>
      )}
    </div>
  );
}

export default Maintenance;
