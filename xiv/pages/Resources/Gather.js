/**
 * @ Author: F.Villanueva
 * @ Create Time: 2024-06-15 18:06:47
 * @ Modified by: F.Villanueva
 * @ Modified time: 2024-06-18 00:45:49
 * @ Description:
 */

import * as gtools from "garlandtools-api";
import Image from "next/image";
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

  var nodes = [];
  var isMultiNodal = false;
  var numberOfNodes = 0;

  if (result !== null) {
    // Items with more than 1 nodes
    if (typeof result.coordinates[0] !== "undefined" && result.coordinates[0] !== null) {
      // if property coordinates[0] exists, set isMultiNodal to true.
      isMultiNodal = true;
      numberOfNodes = Object.keys(result.coordinates).length;

      for (let index = 0; index < numberOfNodes; index++) {
        nodes[index] = {
          x: addPadding(result.coordinates[index].node.coords[0]),
          y: addPadding(result.coordinates[index].node.coords[1]),
          type: result.coordinates[index].node.type,
          zone: ZoneNames[result.coordinates[index].node.zoneid].zoneName,
          time1: result.coordinates[index].node.time[0]
            ? `${result.coordinates[index].node.time[0].toString().padStart(2, "0")}:00`
            : "",
          time2: result.coordinates[index].node.time[1]
            ? `${result.coordinates[index].node.time[1].toString().padStart(2, "0")}:00`
            : "",
        };
      }
    } else {
      //  Items with only 1 node (usually these are the time-limited items)
      if (typeof result.coordinates !== "undefined" && result.coordinates !== null) {
        // if property coordinates[0] exists, set isMultiNodal to true.
        isMultiNodal = false;
        nodes[0] = {
          x: addPadding(result.coordinates?.node.coords[0]),
          y: addPadding(result.coordinates?.node.coords[1]),
          type: result.coordinates.node.type,
          zone: ZoneNames[result.coordinates.node.zoneid].zoneName,
          time1: result.coordinates.node.time[0]
            ? `${result.coordinates.node.time[0].toString().padStart(2, "0")}:00`
            : "",
          time2: result.coordinates.node.time[1]
            ? `${result.coordinates.node.time[1].toString().padStart(2, "0")}:00`
            : "",
        };
      }
    }
  }

  return (
    <>
      <div className={style.row}>
        <div>
          {result?.details.item.name}{" "}
          <Image
            src={`${Types[nodes[0]?.type] ?? Types[0]}`}
            width={20}
            height={20}
            alt="type"
            style={{ marginBottom: -5 }}
          />
        </div>
        {(() => {
          const _rows = [];
          if (numberOfNodes > 1) {
            for (let ind = 0; ind < numberOfNodes; ind++) {
              _rows.push(
                <>
                  <div className={style.itemInfoRow}>
                    <div className={style.itemDetailsLocation} key={Math.random()}>
                      {nodes[ind].zone}({nodes[ind].x}, {nodes[ind].y})
                    </div>
                    <div className={style.itemDetailsTime}>
                      {nodes[ind].time1}
                      {nodes[ind].time1 && ", "}
                      {nodes[ind].time2}
                    </div>
                  </div>
                </>
              );
            }
          } else {
            _rows.push(
              <>
                <div className={style.itemInfoRow}>
                  <div className={style.itemDetailsLocation} key={Math.random()}>
                    {nodes[0]?.zone}({nodes[0]?.x}, {nodes[0]?.y})
                  </div>
                  <div className={style.itemDetailsTime}>
                    {nodes[0]?.time1}
                    {nodes[0]?.time1 && ", "}
                    {nodes[0]?.time2}
                  </div>
                </div>
              </>
            );
          }
          return _rows;
        })()}
      </div>
    </>
  );
}

function addPadding(num) {
  if (!num && num !== null) return;
  let _temp = String(num).split(".");
  return `${_temp[0].padStart(2, "0")}.${_temp[1].padEnd(2, "0")}`;
}

const Types = [
  "/icons/Gathering/060438_hr1.png",
  "/icons/Gathering/060437_hr1.png",
  "/icons/Gathering/060433_hr1.png",
  "/icons/Gathering/060432_hr1.png",
];

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
  if (!id || id === null || id === undefined) return;

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
