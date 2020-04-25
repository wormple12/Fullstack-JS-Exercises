const express = require("express");
const gju = require("geojson-utils");
const { gameArea, players } = require("./gameData");
const app = express();

/*
 Create a new polygon meant to be used on clients by React Native's MapView which
 requres an object as the one we create below 
 NOTE --> how we swap longitude, latitude values
*/
polygonForClient = {};
polygonForClient.coordinates = gameArea.coordinates[0].map((point) => {
  return { latitude: point[1], longitude: point[0] };
});

//Returns a polygon, representing the gameArea
app.get("/geoapi/gamearea", (req, res) => {
  res.json(polygonForClient);
});

app.get("/geoapi/isuserinarea/:lon/:lat", async function (req, res) {
  const point = {
    type: "Point",
    coordinates: [req.params.lon, req.params.lat],
  };
  const isInArea = gju.pointInPolygon(point, gameArea);
  return res.json({
    status: isInArea,
    msg: isInArea
      ? "Point was inside the tested polygon"
      : "Point was NOT inside tested polygon",
  });
});

app.get("/geoapi/findNearbyPlayers/:lon/:lat/:rad", async function (req, res) {
  const center = {
    type: "Point",
    coordinates: [Number(req.params.lon), Number(req.params.lat)],
  };

  let result = players.filter((player) =>
    gju.geometryWithinRadius(player.geometry, center, Number(req.params.rad))
  );
  return res.json(result);
});

app.get("/geoapi/distanceToUser/:lon/:lat/:username", async function (
  req,
  res
) {
  const point = {
    type: "Point",
    coordinates: [Number(req.params.lon), Number(req.params.lat)],
  };
  const player = players.find(
    (player) => player.properties.name === req.params.username
  );

  return player !== undefined
    ? res.json({
        distance: gju.pointDistance(point, player.geometry),
        to: player.properties.name,
      })
    : res.status(404).json({
        msg: "User not found",
      });
});

app.get("/", (req, res) => res.send("Geo Demo!"));
app.listen(3000, () => console.log("Example app listening on port 3000!"));
