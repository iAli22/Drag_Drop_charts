import React, { useState, useContext, useEffect, useRef } from "react";
import style from "./ChartsContainer.module.scss";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { Store } from "../../context/BodyContextProvider";

function ChartsContainer() {
  const mounted = useRef(false);
  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
  });
  const { store, setStore } = useContext(Store);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const labels = chartData.labels; // dimension
  const data = {
    // Measure

    labels,
    datasets: [
      {
        label: store.dimension,
        data: chartData.data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const getData = async () => {
    const response = await fetch("https://plotter-task.herokuapp.com/data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        measures: [store.measure],
        dimension: store.dimension,
      }),
    });

    const data = await response.json();

    setChartData((prev) => {
      return {
        labels: data[0].values,
        data: data[1].values,
      };
    });
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (store.dimension && store.measure) {
        getData();
      } else {
        setChartData({
          labels: [],
          data: [],
        });
      }
    }
  }, [store]);

  return (
    <div className={style.chartsContainer}>
      <Line options={options} data={data} />
    </div>
  );
}

export default ChartsContainer;
