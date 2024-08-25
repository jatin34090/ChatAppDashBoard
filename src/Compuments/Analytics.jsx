import React, { useEffect, useState } from "react";
import "./Analytics.css";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,PointElement,LineElement,Filler
} from "chart.js";

Chart.register(
  CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,Filler
);
import Sidebar from "./Sidebar";
import Loader from "./Loader";

const Analytics = () => {
  const [loading, setLoading] = useState(false);
  const [interactions, setInteractions] = useState([]);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [understoodMessages, setUnderstoodMessages] = useState([]);
  const [noOFDays, setNoOfDays] = useState(7);
  const [topIntents, setTopIntents] = useState([]);
  const [date, setDate] = useState([]);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [sessions, setSeessions] = useState([]);

  const lineChartData = (data) => {
    return {
      labels: date,
      datasets: [
        {
          label: "First dataset",
          data: data,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
  };




  
  const options = {
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 12, // Set this to your desired number of ticks
        },
        grid: {
          display: false, // Remove grid lines on x-axis
        },
      },
    },
  };
  const WithOutXAxisoptions = {
    scales: {
      x: {
        ticks: {
          display: false,
           // Set this to your desired number of ticks
        },
        grid: {
          display: false, // Remove grid lines on x-axis
        },
      },
    },
  };

  // const data = [
  //   { label: "total", value: understoodMessages[0] },
  //   { label: "missed", value: understoodMessages[1] },
  // ];

    // Ensure percentage is between 0 and 100
    const sanitizedPercentage = Math.max(0, Math.min(100, understoodMessages[1]*100/understoodMessages[0]));
  
    const data = {
      labels: ['Total', 'Missed'],
      datasets: [
        {
          data: [100 - sanitizedPercentage, sanitizedPercentage],
          backgroundColor: ['yellow', '#1a73e8'],
          borderWidth: 5,
        },
      ],
    };

  const PieChartOptions = {
    cutout: '70%', 
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  const generateQueryForLast7Days = (projectID, name) => {
    const today = new Date();
    const query = [];
    setDate([]);

    for (let i = noOFDays; i > 0; i--) {
      const endDate = new Date(today);
      endDate.setDate(today.getDate() - i);
      const startDate = new Date(endDate);

      // console.log(
      //   "endDate",
      //   monthNames[endDate.getMonth()] + "-" + endDate.getDate()
      // );

      setDate((prev) => [
        ...prev,
        endDate.getDate() + "-" + monthNames[endDate.getMonth()],
      ]);
      // setDate((prev) => [...prev, endDate.getDate()]);

      // console.log("startDate", date);
      startDate.setDate(endDate.getDate() - 1);

      query.push({
        name: name,
        filter: {
          projectID: projectID,
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
        },
      });
    }

    // console.log("date", date);
    return query;
  };

  const fetchDataForLast7Days = async (name) => {
    setLoading(true);

    const projectID = "66a924f06b56308fbf96bb29";

    const query = generateQueryForLast7Days(projectID, name);
    let data = "";

    const url = "/analytics/v1/query/usage";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "VF.DM.66aa370e4b0a0c4b021101e5.0MX0d6ROa5WiRgbg",
      },
      body: JSON.stringify({ query }),
    };

    await fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        data = json.result;
      })
      .catch((err) => console.error("error:" + err));

    setLoading(false);
    return data;
  };

  const fetchDataForGivenRange = async (name) => {
    setLoading(true);

    const projectID = "66a924f06b56308fbf96bb29";

    const query = await getAllDataTogether(name);
    console.log("query", query);
    let data = "";

    const url = "/analytics/v1/query/usage";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "VF.DM.66aa370e4b0a0c4b021101e5.0MX0d6ROa5WiRgbg",
      },
      body: JSON.stringify({ query }),
    };

    await fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        data = json.result;

        console.log("data", data);
      })
      .catch((err) => console.error("error:" + err));

    setLoading(false);
    console.log("message data", data);
    return data;
  };
  const getAllDataTogether = async (name) => {
    const today = new Date();
    const query = [];
    const projectID = "66a924f06b56308fbf96bb29";

    console.log(
      "message time ",
      new Date(today.getTime() - noOFDays * 24 * 60 * 60 * 1000).toISOString()
    );
    console.log("end date", today.toISOString());

    query.push({
      name: name,
      filter: {
        projectID: projectID,
        startTime: new Date(
          today.getTime() - noOFDays * 24 * 60 * 60 * 1000
        ).toISOString(),
        endTime: today.toISOString(),
      },
    });
    console.log("mesage query", query);
    return query;
  };
  const clickHandler = async () => {
    const interactionsData = await fetchDataForLast7Days("interactions");
    console.log("interactionsData", interactionsData);
    setInteractions([]);
    interactionsData.forEach((value) => {
      setInteractions((prev) => {
        return [...prev, value.count];
      });
    });

    const sessionsData = await fetchDataForLast7Days("sessions");
    setSeessions([]);
    await sessionsData.forEach((value) => {
      setSeessions((prev) => {
        return [...prev, value.count];
      });
    });

    const uniqueUsersData = await fetchDataForLast7Days("unique_users");
    setUniqueUsers([]);
    await uniqueUsersData.forEach((value) => {
      setUniqueUsers((prev) => {
        return [...prev, value.count];
      });
    });

    const understoodMessagesData = await fetchDataForGivenRange(
      "understood_messages"
    );
    console.log("understoodMessagesData", understoodMessagesData);
    console.log(
      "understoodMessagesData count",
      understoodMessagesData[0].missed.count
    );
    console.log(
      "understoodMessagesData count",
      understoodMessagesData[0].total.count
    );

    setUnderstoodMessages(() => []);
    setUnderstoodMessages((prev) => [
      ...prev,
      understoodMessagesData[0].total.count,
    ]);
    setUnderstoodMessages((prev) => [
      ...prev,
      understoodMessagesData[0].missed.count,
    ]);
    // understoodMessagesData.forEach((value) => {
    //   console.log("value.count", value);
    //   setUnderstoodMessages((prev) => [...prev, value]);
    // });

    console.log("understoodMessages total", understoodMessages[0]);
    console.log("understoodMessages missed", understoodMessages[1]);
    console.log("understoodMessages missed", understoodMessages);

    const topIntentsData = await fetchDataForGivenRange("top_intents");
    console.log("topIntentsData", topIntentsData);

    setTopIntents([]);
    topIntentsData[0].intents.forEach((value) => {
      setTopIntents((prev) => {
        console.log("value", value);
        return [...prev, value.intent];
      });
    });

    // console.log("topIntents", topIntents[0].length);
    console.log("topIntents", topIntents);
  };
  useEffect(() => {
    clickHandler();
  }, [noOFDays]);

  return (
    <div className="admin-container ">
      <Sidebar />

      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="bg-black text-white p-4">
            <select
              value={noOFDays}
              onChange={(e) => setNoOfDays(e.target.value)}
              className="bg-black border-2"
              name=""
              id=""
            >
              <option className="bg-white text-black" value="7">
                Last 7 days
              </option>
              <option className="bg-white text-black" value="30">
                Last 30 days
              </option>
              <option className="bg-white text-black" value="60">
                Last 60 days
              </option>
              <option className="bg-white text-black" value="365">
                Last 365 days
              </option>
              <option className="bg-white text-black" value="Last year">
                Last year
              </option>
            </select>
          </div>
          <div className="grid grid-cols-12 ">
            <div className=" flex-col p-4 col-span-8">
              <div className="ml-4 pl-4">
                <h2>Interactions</h2>
                <p>
                  Total number of engagements users have had with your agent.
                </p>
              </div>
              <div>
                <Line
                  data={lineChartData(interactions)}
                  options={options}
                  height={90}
                />
              </div>
            </div>

            <div className=" flex flex-col justify-around items-center col-span-4 border-l-2">
              <div className=" flex flex-col justify-start w-full pl-6 ">
                <h2>Recognition rate</h2>
                <p>The % of messages understood by your agent.</p>
              </div>
              <div className="ml-4 flex justify-center items-center">
                {/* <PieChart
                  series={[
                    {
                      paddingAngle: 0,
                      innerRadius: 70,
                      outerRadius: 100,
                      data,
                    },
                  ]}
                  margin={{ right: 5 }}
                  width={200}
                  height={200}
                  legend={{ hidden: true }}
                /> */}

                <Doughnut data={data} options={PieChartOptions} />
              </div>
            </div>
          </div>

          <hr />
          <div className=" w-full grid grid-cols-12 ">
            <div className="pl-6 py-4 col-span-4 w-full">
              <div>
                <h2>Users</h2>
                <p> Unique user sessions with your agent.</p>
              </div>
              <Line
                data={lineChartData(uniqueUsers)}
                options={WithOutXAxisoptions}
                height={150}
              />
            </div>
            <div className="col-span-4 pl-6 py-4 border-l-2">
              <div>
                <h2>Sessions</h2>
                <p>Unique user sessions with your agent.</p>
              </div>
              <div>
                <Line
                  data={lineChartData(sessions)}
                  options={WithOutXAxisoptions}
                  height={150}
                />
              </div>
            </div>

            <div className="w-full flex flex-col p-6 col-span-4 border-l-2">
              <div>
                <h2>Top Intents</h2>
                <p>The most popular queries users ask your agent.</p>
              </div>
              {topIntents[0] > 0 ? (
                <div className="w-full flex justify-center items-center">
                  <div className="w-full flex flex-col justify-center p-6">
                    <h2>No</h2>
                    <div className="flex items-center">
                      <div className=" w-4/5 bg-gray-600 h-3">
                        <div
                          className="bg-gray-400 h-3"
                          style={{ width: `${width}%` }}
                        ></div>
                      </div>
                      <span className="ml-2">{width}%</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex">
                  <div className="flex justify-center items-center ">
                    <p className=" text-base">
                      Report is empty because no data matches filters.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
