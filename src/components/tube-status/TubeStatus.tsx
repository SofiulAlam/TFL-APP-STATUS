import { useEffect, useState } from "react";
import "./TubeStatus.scss";
import logo from "../../assets/TFL_LOGO.svg";

import statusService from "../../services/status-service";
import { CanceledError } from "axios";

interface TubeLine {
  id: string;
  name: string;
  status: string;
}

const TubeStatus = () => {
  //STATE
  const [tubeLines, setTubeLines] = useState<TubeLine[]>([]);
  const [error, setError] = useState("");

  // TUBE COLOR
  const tubeLineColors: { [key: string]: string } = {
    Bakerloo: "#B36305",
    Central: "#DC241F",
    Circle: "#FFD329",
    District: "#007D32",
    "Hammersmith & City": "#F4A9BB",
    Jubilee: "#949CA0",
    Metropolitan: "#751056",
    Northern: "#000000",
    Piccadilly: "#0019A8",
    Victoria: "#00A0E2",
    "Waterloo & City": "#76D0BD",
  };

  //GET DATA
  useEffect(() => {
    const { request, cancel } = statusService.getAll<TubeLine>();
    request
      .then((res) => {
        const data = res.data;
        setTubeLines(
          data.map((line: any) => ({
            id: line.id,
            name: line.name,
            status: line.lineStatuses[0].statusSeverityDescription,
          }))
        );
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.Message);
      });
    return () => cancel();
  }, []);

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      <div className="tube-status-container">
        <img src={logo} alt="TFL Logo" height="100" width="200" />
        <h1>TFL TUBE STATUS</h1>
        <div className="tube-lines">
          {tubeLines.map((line) => (
            <div key={line.id} className="tube-line">
              <div className="line-border">
                <div
                  className="line-color"
                  style={{
                    backgroundColor: tubeLineColors[line.name],
                    height: "40px",
                    width: "10px",
                  }}
                ></div>
                <div className="line-details">
                  {line.name} : {line.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TubeStatus;
