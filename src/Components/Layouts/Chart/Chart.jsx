import { textAlign } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BaseUrl from "../../api/BaseURL";

function Chart() {
  const gg = [];
  const chart = [];
  let tien = [];
  let total = 0;
  const [value, setValue] = useState([]);
  const [year, setYear] = useState("2021");
  useEffect(() => {
    fetch(BaseUrl.baseUrl + "/Ve")
      .then((response) => response.json())
      .then((data) => setValue(data));
  }, []);

  for (let i = 1; i <= 12; i++) {
    value.filter((item) => {
      if (
        item.idChiTietChieuNavigation.ngayChieu
          .slice(0, 7)
          .includes(i < 10 ? `${year}-0${i}` : `${year}-${i}`)
      ) {
        tien.push(item.idChiTietChieuNavigation.giaVe);
      }
    });
    total = tien.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
    tien = [];
    gg.push(total);
  }
  gg.map((item, i) => {
    chart.push({
      month: `Tháng ${i + 1}`,
      Turnover: `${item}`,
    });
  });

  function handleYear(e) {
    setYear(e.target.value);
  }

  return (
    <div>
      <h1 className="title">Biểu đồ doanh thu</h1>
      <lable
        style={{
          color: "red",
        }}
      >
        Chọn năm
      </lable>
      <select
        style={{
          position: "relative",
          padding: "8px 14px",
          display: "block",
          marginBottom: "20px",
        }}
        onChange={(e) => handleYear(e)}
      >
        <option>2018</option>
        <option>2019</option>
        <option>2020</option>
        <option selected>2021</option>
        <option>2022</option>
        <option>2023</option>
        <option>2024</option>
        <option>2025</option>
        <option>2026</option>
      </select>
      <ResponsiveContainer width="100%" height="100%" aspect={3 / 1}>
        <BarChart
          width={500}
          height={300}
          data={chart}
          margin={{
            top: 0,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis ticks={[0, 500000, 1000000, 1500000, 2000000]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Turnover" barSize={50} fill="red" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
