import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillRightCircle } from "react-icons/ai";
import users from "../../assets/users.svg";
import books from "../../assets/books.svg";
import sales from "../../assets/sales.svg";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import "./dashboardHome.scss";
import axios from "axios";
const barChartData = [
  { year: "2016", users: 30 },
  { year: "2017", users: 50 },
  { year: "2018", users: 55 },
  { year: "2019", users: 58 },
  { year: "2020", users: 35 },
  { year: "2021", users: 70 },
  { year: "2022", users: 80 },
];
const LineChartData = [
  { year: "2016", books: 30 },
  { year: "2017", books: 50 },
  { year: "2018", books: 55 },
  { year: "2019", books: 58 },
  { year: "2020", books: 35 },
  { year: "2021", books: 70 },
  { year: "2022", books: 80 },
];

const DashboardHome = () => {
  const [booksCount, setBooksCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:90/books/count")
      .then((res) => {
        setBooksCount(res.data.count);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get("http://localhost:90/users/count")
      .then((res) => {
        setUsersCount(res.data.count);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="dashboard-home">
      <div className="dashboard-home__cards">
        <DashboardCard
          heading="users"
          icon={users}
          count={usersCount}
          link={"/users"}
        />
        <DashboardCard
          heading="books"
          icon={books}
          count={booksCount}
          link={"/books"}
        />
        <DashboardCard
          heading="sales"
          icon={sales}
          count={200}
          link={"/sales"}
        />
      </div>
      <iframe
      className="mongodbchart"
        title="chart"
        width="640"
        height="480"
        src="https://charts.mongodb.com/charts-rentnread-kujtp/embed/charts?id=63b185c1-b222-4378-8345-6652df4f2d1c&maxDataAge=3600&theme=light&autoRefresh=true"
      ></iframe>
      {/* <div className="dashboard-charts">
        <div className="dashboard-charts__chart">
          <h1 className="dashboard-charts__chart--heading">Users Growth</h1>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData} className="barchart">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#ff6363" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="dashboard-charts__chart">
          <h1 className="dashboard-charts__chart--heading">Books Traffic</h1>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={LineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="books" stroke="#ff6363" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div> */}
    </div>
  );
};

const DashboardCard = ({ heading, icon, count, link }) => {
  return (
    <div className="dash-card">
      <div className="dash-card__heading">
        <span className="dash-card__heading--text">{heading}</span>
      </div>
      <div className="dash-card__icon">
        <img src={icon} alt={heading} />
      </div>
      <p className="dash-card__count">
        {`${heading === "sales" ? "Rs. " : ""}`}
        {count}
      </p>
    </div>
  );
};

export default DashboardHome;
