import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.api-ninjas.com/v1/animals",
  headers: {
    "X-Api-Key": "whRnoDG5P9gexc4FOYp4Tw==AxezDHyfYFfo5NxL",
  },
});

export default instance;
