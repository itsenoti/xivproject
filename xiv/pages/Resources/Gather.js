/**
 * @ Author: F.Villanueva
 * @ Create Time: 2024-06-15 18:06:47
 * @ Modified by: F.Villanueva
 * @ Modified time: 2024-06-17 20:08:48
 * @ Description:
 */

import * as gtools from "garlandtools-api";
import { useEffect, useState } from "react";
import * as style from "./Resources.module.css";
import { ZoneNames } from "./Zones";

export default function Gather(props) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    getItemSpawnDetailsByName(props.keyword).then((res) => {
      setResult(res);
    });
  }, [props.keyword]);

  if (!props.keyword) return;

  async function getItemSpawnDetailsByName(name) {
    var id = 0;
    var details = "";
    var coordinates = [];

    try {
      // Get item id
      id = (await getItemId(name)) ?? null;

      // Get item details
      details = (await getItemDetails(id)) ?? null;

      // Check how many nodes the item can be gathered from
      if (Object.keys(details.item.nodes).length == 1) {
        coordinates = (await getNodeCoordinates(details.item.nodes)) ?? null;
      } else {
        for (var item of details.item.nodes) {
          let coord;
          coord = (await getNodeCoordinates(item)) ?? null;
          coordinates.push(coord);
        }
      }
    } catch (e) {
      console.log(`Error occured: ${e}`);
    }

    return { id, details, coordinates };
  }

  // console.log(result);

  var node1 = { x: 0, y: 0, zone: "", time1: 0, time2: 0 };
  var node2 = { x: 0, y: 0, zone: "", time1: 0, time2: 0 };
  var node3 = { x: 0, y: 0, zone: "", time1: 0, time2: 0 };
  var node4 = { x: 0, y: 0, zone: "", time1: 0, time2: 0 };
  var node5 = { x: 0, y: 0, zone: "", time1: 0, time2: 0 };
  var isMultiNodal = false;

  if (result !== null) {
    if (typeof result.coordinates[0] !== "undefined" && result.coordinates[0] !== null) {
      // if property coordinates[0] exists, set isMultiNodal to true.
      isMultiNodal = true;
      node1 = {
        x: result.coordinates[0].node.coords[0],
        y: result.coordinates[0].node.coords[1],
        zone: ZoneNames[result.coordinates[0].node.zoneid].zoneName,
        time1: result.coordinates[0].node.time[0]
          ? `${result.coordinates[0].node.time[0]}:00`
          : "-",
        time2: result.coordinates[0].node.time[1]
          ? `${result.coordinates[0].node.time[1]}:00`
          : "-",
      };
    } else {
      if (typeof result.coordinates !== "undefined" && result.coordinates !== null) {
        // if property coordinates[0] exists, set isMultiNodal to true.
        isMultiNodal = false;
        node1 = {
          x: result.coordinates?.node.coords[0],
          y: result.coordinates?.node.coords[1],
          zone: ZoneNames[result.coordinates.node.zoneid].zoneName,
          time1: result.coordinates.node.time[0] ? `${result.coordinates.node.time[0]}:00` : "-",
          time2: result.coordinates.node.time[1] ? `${result.coordinates.node.time[1]}:00` : "-",
        };
      }
    }

    if (typeof result.coordinates[1] !== "undefined" && result.coordinates[1] !== null) {
      // if property coordinates[0] exists, set isMultiNodal to true.
      isMultiNodal = true;
      node2 = {
        x: result.coordinates[1].node.coords[0],
        y: result.coordinates[1].node.coords[1],
        zone: ZoneNames[result.coordinates[1].node.zoneid].zoneName,
        time1: result.coordinates[1].node.time[0]
          ? `${result.coordinates[1].node.time[0]}:00`
          : "-",
        time2: result.coordinates[1].node.time[1]
          ? `${result.coordinates[1].node.time[1]}:00`
          : "-",
      };
    }

    if (typeof result.coordinates[2] !== "undefined" && result.coordinates[2] !== null) {
      // if property coordinates[0] exists, set isMultiNodal to true.
      isMultiNodal = true;
      node3 = {
        x: result.coordinates[2].node.coords[0],
        y: result.coordinates[2].node.coords[1],
        zone: ZoneNames[result.coordinates[2].node.zoneid].zoneName,
        time1: result.coordinates[2].node.time[0]
          ? `${result.coordinates[2].node.time[0]}:00`
          : "-",
        time2: result.coordinates[2].node.time[1]
          ? `${result.coordinates[2].node.time[1]}:00`
          : "-",
      };
    }

    if (typeof result.coordinates[3] !== "undefined" && result.coordinates[3] !== null) {
      // if property coordinates[0] exists, set isMultiNodal to true.
      isMultiNodal = true;
      node4 = {
        x: result.coordinates[3].node.coords[0],
        y: result.coordinates[3].node.coords[1],
        zone: ZoneNames[result.coordinates[3].node.zoneid].zoneName,
        time1: result.coordinates[3].node.time[0]
          ? `${result.coordinates[3].node.time[0]}:00`
          : "-",
        time2: result.coordinates[3].node.time[1]
          ? `${result.coordinates[3].node.time[1]}:00`
          : "-",
      };
    }

    if (typeof result.coordinates[4] !== "undefined" && result.coordinates[4] !== null) {
      // if property coordinates[0] exists, set isMultiNodal to true.
      isMultiNodal = true;
      node5 = {
        x: result.coordinates[4].node.coords[0],
        y: result.coordinates[4].node.coords[1],
        zone: ZoneNames[result.coordinates[4].node.zoneid].zoneName,
        time1: result.coordinates[4].node.time[0]
          ? `${result.coordinates[4].node.time[0]}:00`
          : "-",
        time2: result.coordinates[4].node.time[1]
          ? `${result.coordinates[4].node.time[1]}:00`
          : "-",
      };
    }
  }

  return (
    <>
      <div className={style.row}>
        <div>▶ {result?.details.item.name}</div>
        <div className={style.itemDetails}>
          📍{node1.zone}({node1.x}, {node1.y})
        </div>
        <div className={style.itemDetails}>
          🕒 {node1.time1}, {node1.time2}
        </div>
      </div>
      {isMultiNodal && (
        <>
          <div className={style.itemDetails}>
            📍 {node2.zone}({node2.x}, {node2.y})
          </div>
          <div className={style.itemDetails}>
            🕒 {node2.time1}, {node2.time2}
          </div>
        </>
      )}
    </>
  );
}

async function getItemId(name) {
  if (!name) return;

  try {
    let response = await gtools.search(name);
    // console.log(response);
    return response[0]?.obj.i;
  } catch (e) {
    console.log(e);
  }
}

async function getItemDetails(id) {
  if (!id || id == null || id == undefined) return;

  try {
    let result = await gtools.item(id);
    // console.log(result);

    if (result) return result;
  } catch (e) {
    console.log(e);
  }
}

async function getNodeCoordinates(nodeId) {
  if (!nodeId || nodeId === null || nodeId === undefined) return;

  try {
    let result = await gtools.node(nodeId);
    // console.log(result);
    if (result) return result;
  } catch (e) {
    console.log(e);
  }
}
