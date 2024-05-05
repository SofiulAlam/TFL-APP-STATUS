import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://api.tfl.gov.uk/Line/Mode/Tube",
  headers: {
    "api-key": "",
  },
});

export { CanceledError };
