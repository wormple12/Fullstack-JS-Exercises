const gameArea = {
  type: "Polygon",
  coordinates: [
    [
      [12.544326782226562, 55.77541444884565],
      [12.576255798339844, 55.7774419234324],
      [12.570762634277344, 55.7950089519825],
      [12.544326782226562, 55.77541444884565]
    ]
  ]
};
const players = [
  {
    type: "Feature",
    properties: {
      name: "Team1-inside"
    },
    geometry: {
      type: "Point",
      coordinates: [12.567157745361326, 55.78670903555303]
    }
  },
  {
    type: "Feature",
    properties: {
      name: "Team2-inside"
    },
    geometry: {
      type: "Point",
      coordinates: [12.558574676513672, 55.779276214316695]
    }
  },
  {
    type: "Feature",
    properties: { name: "Team3-outside" },
    geometry: {
      type: "Point",
      coordinates: [12.5518798828125, 55.79240335472841]
    }
  },
  {
    type: "Feature",
    properties: { name: "Team4-outside" },
    geometry: {
      type: "Point",
      coordinates: [12.569732666015625, 55.773097205876766]
    }
  }
];

module.exports = { gameArea, players };
