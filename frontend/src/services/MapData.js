import axios from "axios";
import config from "./../config/";

const MapPolygon = data => {
  return axios({
    method: "get",
    url: `${config.baseUrl}/map/polygon/${data}`
  });
};

const MapEvents = data => {
  return axios({
    method: "get",
    url: `${config.baseUrl}/map/events/${data}`
  });
};

export { MapEvents, MapPolygon };
