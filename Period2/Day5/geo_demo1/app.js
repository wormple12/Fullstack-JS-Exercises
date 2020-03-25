const express = require("express");
const gju = require("geojson-utils");
const { gameArea, players } = require("./gameData");
const app = express();

app.get("/geoapi/isuserinarea/:lon/:lat", async function(req, res) {
  const point = {
    type: "Point",
    coordinates: [req.params.lon, req.params.lat]
  };
  const isInArea = gju.pointInPolygon(point, gameArea);
  return isInArea
    ? res.json({
        status: true,
        msg: "Point was inside the tested polygon"
      })
    : res.json({
        status: false,
        msg: "Point was NOT inside tested polygon"
      });
});

app.get("/geoapi/findNearbyPlayers/:lon/:lat/:rad", async function(req, res) {
  const center = {
    type: "Point",
    coordinates: [req.params.lon, req.params.lat]
  };

  let result = players.filter(player =>
    gju.geometryWithinRadius(player.geometry, center, req.params.rad)
  );
  return res.json(result);
});

app.get("/geoapi/distanceToUser/:lon/:lat/:username", async function(req, res) {
  const point = {
    type: "Point",
    coordinates: [req.params.lon, req.params.lat]
  };
  const player = players.find(
    player => player.properties.name === req.params.username
  );

  return player !== undefined
    ? res.json({
        distance: gju.pointDistance(point, player.geometry),
        to: player.properties.name
      })
    : res.status(404).json({
        msg: "User not found"
      });
});

app.get("/", (req, res) => res.send("Geo Demo!"));
app.listen(3000, () => console.log("Example app listening on port 3000!"));
