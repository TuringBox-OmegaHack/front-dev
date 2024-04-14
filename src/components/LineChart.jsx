import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import styles from "../styles/linechart.module.css";
import axios from "axios";

export default function Combining() {
  const [file, setFile] = useState(null);
  const [devices, setDevices] = useState({});

  const [seriesData, setSeriesData] = useState([]);

  async function sendFile() {
    const formData = new FormData();
    await formData.append("csv_file", file);
    axios
      .post("http://localhost:8000/api/upload_csv/", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then(async (response) => {
        console.log("response:", response.data);
        setDevices(response.data);
      });
  }

  useEffect(() => {
    if (devices) {
      let series = [];
      Object.keys(devices).forEach((device) => {
        series.push({
          data: devices[device].points,
          showMark: false,
          label: device,
        });
      });
      setSeriesData(series);
    }
  }, [devices]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <input
          type="file"
          id="file"
          name="file"
          accept=".csv"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          style={{ marginLeft: "100px" }}
          className={styles.file}
        ></input>

        <button
          onClick={sendFile}
          className={styles.button}
          style={{ marginLeft: "20px" }}
        >
          Enviar
        </button>
      </div>

      <LineChart
        series={seriesData}
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: 16,
              fill: "black",
            },
          },
        }}
        width={screen.width}
        height={screen.height * 0.65}
        margin={{ top: 100, left: 200, right: 200 }}
        style={{ marginLeft: "100px" }}
      />

      <div></div>
    </div>
  );
}
