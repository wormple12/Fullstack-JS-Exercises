import { SERVER_URL } from "./settings";
import fetch from "node-fetch";

ServerFacade = () => {
  async function fetchNearbyPlayers(userName, password, lat, lon, distance) {
    const data = { userName, password, lat, lon, distance };
    console.log(JSON.stringify(data));
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const url = `${SERVER_URL}/gameapi/nearbyplayers`;
    let res = await fetch(url, config).then((r) => r.json());
    console.log(JSON.stringify(res));
    return res;
  }

  return {
    fetchNearbyPlayers,
  };
};

export default ServerFacade();
