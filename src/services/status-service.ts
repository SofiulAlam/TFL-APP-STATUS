import create from "./http-service";

export interface TubeLine {
  id: string;
  name: string;
  status: string;
}

export default create("/Status");
