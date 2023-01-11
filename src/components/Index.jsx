import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import { DatePicker, message } from 'antd';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,

} from "recharts";

import "./Index.css";
import { format } from 'date-fns'

import topImage from "../files/Acquiretek-Test.png";
import logoImage from "../files/MicrosoftTeams-image.png";
import JsonData from "./logos.json";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import moment from "moment/moment";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const { RangePicker } = DatePicker;

export default function TableContent() {
  // console.log(JsonData);

  const Index = useRef();

  const [serverRes, setServerRes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [serverDowntime, setServerDowntime] = useState();
  const [loginAttempts, setLoginAttempts] = useState();
  const [wpversionData, setWpversionData] = useState()
  // const [clients, setClients] = useState([{ name: "select a client" }]);
  const [formData, setFormData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mergedData, setMergedData] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [activeUser, setActiveUser] = useState();
  const [dates, setDates] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const current = new Date();
  const month = current.toLocaleString("en-US", { month: "short" });
  const year = `${current.getFullYear()}`;

  const date = `${current.getDate()} ${current.toLocaleString("en-US", {
    month: "long",
  })}, ${current.getFullYear()}`;

  const url = "http://localhost:4000";

  const dateformater = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return `${month}/${day}`;
  };

  useEffect(() => {
    axios.get("http://localhost:4000/dashboard/serverResponse")
      .then(res => {
        const serverResponseData = res.data.map((item1) => ({
          ...item1,
          date_added: dateformater(item1.date_added),
        }));
        setServerRes(serverResponseData);
        setTimeout(() => {
        }, 2000);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/dashboard/loginAttempts")
      .then(function (res) {
        const formattedData = res.data.map((item) => ({
          ...item,
          date: dateformater(item.date),
        }));
        setAttempts(formattedData);
        setTimeout(() => {
        }, 2000);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/dashboard/serverDowntime")
      .then(res => {
        const serverDowntimeData = res.data;
        setServerDowntime(serverDowntimeData);
        setTimeout(() => {
        }, 2000);
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  console.log(serverDowntime);

  useEffect(() => {
    axios.get("http://localhost:4000/dashboard/wpversion")
      .then(res => {
        const wpversion = res.data.map((item) => ({
          ...item,
          date: dateformater(item.date)
        }));
        setWpversionData(wpversion);
        setTimeout(() => {
        }, 2000);
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  console.log({ wpversionData });

  useEffect(() => {
    const lsData = localStorage.getItem("data");
    setFormData(JSON.parse(lsData));
  }, []);

  // const xy = formData?.map((item) => ({
  //   ...item,
  //   lastTime: new Date(item.lastTime).toLocaleDateString("en-GB"),
  // }))
  // console.log(xy);



  const new1 = formData?.map((data) => ({
    url: data.clientName,
  }));



  useEffect(() => {
    const newData = formData?.map((singleFormData) => {
      let xy = JsonData.logo.filter((jsonDataObj) => {
        return jsonDataObj.name === singleFormData.clientName;
      });
      return { ...singleFormData, JsonData: xy };
    });

    const withServerResponse = newData?.map((item) => {
      let server_response = serverRes.filter((single_server_response) => {
        return single_server_response?.client_name === item?.clientName
      })
      return { ...item, server_response: server_response}
    })

    const withLoginAttempts = withServerResponse?.map((item) => {
      let login_attempts = attempts.filter((single_attempt) => {
        return single_attempt?.clientname === item?.clientName
      })
      return { ...item, login_attempts: login_attempts }
    })

    const withWpversionData = withLoginAttempts?.map((item) => {
      let wpversions = wpversionData?.filter((single_clientWPV) => {
        return single_clientWPV?.clientname === item?.clientName
      })
      return { ...item, wpversion: wpversions }
    })

    // console.log(withWpversionData);
    setMergedData(withWpversionData);
    // setActiveUser(withLoginAttempts)

  }, [formData, serverRes, attempts, wpversionData]);

  console.log({ mergedData });

  const handleSelect = (values) => {
    setDates(values.map(item => {
      return item.format("MM/DD")
    }))
  }

  const selectionRange = {
    startDate: new Date(dates[0]),
    endDate: new Date(dates[1]),
  }

  // console.log(selectionRange);


  const filtered = mergedData?.map(item => {
    const server_response = item?.server_response?.filter(item1 => {
      const date = new Date(item1?.date_added)
      return date >= selectionRange?.startDate &&
        date <= selectionRange?.endDate;
    })
    const login_attempts = item?.login_attempts?.filter(item2 => {
      const date = new Date(item2?.date)
      return date >= selectionRange?.startDate &&
        date <= selectionRange?.endDate;
    })
    return { ...item, server_response: server_response, login_attempts: login_attempts }

  })

  // console.log({ filtered });

  const handleChange = (e) => {
    const clientFound = filtered.find(
      (client) => client.clientName === e.target.value
    );
    setCurrentUser(clientFound);
  };

  console.log(currentUser?.wpversion[0]?.wordPressVersion
  );

  function healthStatus() {
    if (currentUser?.health === "good") {
      return <div className="overral-health-good"></div>;
    } else if (currentUser?.health === "moderate") {
      return <div className="overral-health-moderate"></div>;
    } else {
      return <div className="overral-health-critical"></div>;
    }
  }

  const total_loginAttempts = currentUser?.login_attempts.reduce(
    (total = 0, item) => (total += item.numberOfRetries),
    0
  );

  const total_serverResponseTime = currentUser?.server_response.reduce(
    (total = 0, item) => (total += item.response_time),
    0
  );

  const handleGeneratePdf = useReactToPrint({
    content: () => Index.current,
  });

  console.log(currentUser);

  return (
    <div>
      <ReactToPrint>
        <div className="filter">
          <div className="col-md-6">
            <RangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
            >
            </RangePicker >
          </div>
          <div className="col-md-6">
            <label for="clients">Select the Client: </label>
            <select id="clients" name="clientName" onChange={handleChange}>
              {filtered?.map((item, index) => (
                <option value={item.clientName} key={index}>
                  {item.clientName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* pdf generation */}
        <div ref={Index}>
          <div className="dashboard" id="pagebreak1">
            <div className="page-1">
              <div className="logoImage">
                <img
                  src={currentUser?.JsonData[0]?.image}
                  alt=" company logo"
                  width="150px"
                />
              </div>
              <img id="image" className="bg-image" src={topImage} alt="background" width="100%" />
            </div>
            <div className="time">
              <div>{month}</div>
              <div>{year}</div>
            </div>
            <div className="urls">
              <div>{currentUser?.JsonData[0]?.url}</div>
            </div>
          </div>

          {/* section 2 */}
          <div className="table-content" id="pagebreak">
            <div className="heading">TABLE OF CONTENTS</div>
            <div className="">
              <a href="#exec-summary" className="title">
                <div>Table of contents</div>
                <div class="leaders" aria-hidden="true"></div>
                <div className="page">1</div>
              </a>
              <Link href="#" className="title">
                <div>Executive Summary</div>
                <div class="leaders" aria-hidden="true"></div>
                <div className="page">2</div>
              </Link>
              <div className="sub-title">
                <Link href="#" className="subtitle">
                  <div>Introduction</div>
                  <div class="sub-leaders" aria-hidden="true"></div>
                  <div className="page">2</div>
                </Link>
                <Link href="#" className="subtitle">
                  <div>Overall site health</div>
                  <div class="sub-leaders" aria-hidden="true"></div>
                  <div className="page">2</div>
                </Link>
                <Link href="#" className="subtitle">
                  <div>Feature Request</div>
                  <div class="sub-leaders" aria-hidden="true"></div>
                  <div className="page">2</div>
                </Link>
              </div>
              <Link href="#" className="title">
                <div>Snapshots</div>
                <div class="leaders" aria-hidden="true"></div>
                <div className="page">1</div>
              </Link>
              <Link href="#" className="title">
                <div>Visuals</div>
                <div class="leaders" aria-hidden="true"></div>
                <div className="page">1</div>
              </Link>
              <Link href="#" className="title">
                <div>security Audit</div>
                <div class="leaders" aria-hidden="true"></div>
                <div className="page">1</div>
              </Link>
              <div className="sub-title">
                <Link href="#" className="subtitle">
                  <div>Unauthorized access and update</div>
                  <div class="sub-leaders" aria-hidden="true"></div>
                  <div className="page">2</div>
                </Link>
              </div>
              <Link href="#" className="title">
                <div>Technical maintenance</div>
                <div class="leaders" aria-hidden="true"></div>
                <div className="page">1</div>
              </Link>
              <div className="sub-title">
                <Link href="#" className="subtitle">
                  <div>user experience tests</div>
                  <div class="sub-leaders" aria-hidden="true"></div>
                  <div className="page">2</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="contentpage" id="pagebreak">
            <div>
              <div>
                <div className="name">{currentUser?.clientName}</div>
                <div className="name">WEBSITE SECURITY REPORT</div>
              </div>
              <div className="date">{date}</div>
            </div>
            <div>
              <h1 className="content-title" id="exec-summary">
                Executive Summary
              </h1>
              <h1 className="content-subtitle" id="introduction">
                Introduction
              </h1>
              <div className="intro">
                <p>
                  This is the Monthly Maintenance Report of {currentUser?.clientName} as of{" "}
                  {date}. This report covers various sections of WordPress
                  Website Maintenance with a focus on security hardening.
                </p>
              </div>
            </div>
            <div className="table">
              <div className="table-intro">Overall Site Health</div>
              {/* <div className="overral-health">{currentUser?.health}</div> */}
              {healthStatus()}
              <table>
                <thead>
                  <tr>
                    <th className="status">Status</th>
                    <th className="score">SCORE RANGE</th>
                    <th className="definitaion">DEFINITION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="status-color">
                        Good
                        <span className="green"></span>
                      </div>
                    </td>
                    <td>8 - 10</td>
                    <td>
                      The website is running as expected. There were no issues
                      detected with the webserver or website files.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="status-color">
                        Moderate
                        <span className="yellow"></span>
                      </div>
                    </td>
                    <td>5 - 7</td>
                    <td>
                      Some security vulnerabilities were found that can be used
                      by attackers to access sensitive information on the
                      website.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="status-color">
                        Critical
                        <span className="red"></span>
                      </div>
                    </td>
                    <td>0 - 4</td>
                    <td>
                      The website could provide hackers access to sensitive
                      information or the ability to run malicious code.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* snapshot */}
          <div className="snapshot-container" id="pagebreak">
            <div className="snapshot">Snapshot</div>
            <div class="grid-container">
              <div>
                <div className="item">{total_serverResponseTime?.toFixed(2)}
                </div>
                <div>Total Downtime</div>
              </div>
              <div>
                <div className="item">{currentUser?.tempoHours}</div>
                <div>Hours Billed on Development</div>
              </div>
              <div>
                <div className="item">{total_loginAttempts}</div>
                <div>Login attempts prevented</div>
              </div>
              <div>
                <div className="item">{currentUser?.backupsTaken}</div>
                <div>Backups taken</div>
              </div>
              <div>
                <div className="item">
                  <div>{new Date(currentUser?.lastTime).toLocaleDateString("en-GB")}</div>
                </div>
                <div>Last time patched/updated</div>
              </div>
              <div>
                <div className="item">{currentUser?.formTested}</div>
                <div>Times tested for enquiry forms</div>
              </div>
              <div>
                <div className="item">
                  <div>{currentUser?.wpversion[0]?.wordPressVersion || "No PHP version"}</div>
                </div>
                <div>PHP version</div>
              </div>
              <div>
                <div className="item">{currentUser?.wpversion[0]?.wordPressVersion || "No WP version"}</div>
                <div>WP Versions</div>
              </div>
            </div>
          </div>
          {/* visuals */}

          <div className="visuals" id="pagebreak">
            <div>
              <div className="visual-title">Visuals</div>
              <div className="visual-subtitle">Uptime Monitoring</div>
            </div>
            {/* graph 1 */}
            <div className="graphs">
              <div className="graph-title">Server Response Time</div>
              <div>
                <LineChart width={700} height={300} data={currentUser?.server_response}>
                  <Line
                    type="monotone"
                    dataKey="response_time"
                    stroke="blue"
                    strokeWidth={1}
                  />
                  <CartesianGrid stroke="#ccc" strokeDasharray="2,2" />
                  <XAxis
                    dataKey={'date_added'}
                    position="insideTop"
                    fontSize="7px"
                    interval={0}
                    // angle="60"
                    tickMargin={10}
                    label={{ value: "Days", tickMargin: 20, fontSize: 10, offset: "-4", position: 'insideBottom' }}
                  />
                  <YAxis label={{ value: "Server response time (ms) ", inset: "-10", angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                  />
                  <Tooltip />
                  {/* <Legend /> */}
                </LineChart>
              </div>
            </div>
            {/* graph 2 */}
            <div className="graphs">
              <div className="graph-title">Attempted LoginsS</div>
              <div>
                <LineChart width={700} height={300} data={currentUser?.login_attempts}>
                  <Line
                    type="monotone"
                    dataKey="numberOfRetries"
                    stroke="blue"
                    strokeWidth={1}
                  />
                  <CartesianGrid stroke="#ccc" strokeDasharray="2,2" />
                  <XAxis dataKey={"date"}
                    position="insideTop"
                    fontSize="7px"
                    interval={0}
                    tickMargin={10}
                    label={{ value: "Days", fontSize: 10, offset: "-4", position: 'insideBottom' }}
                  />
                  <YAxis label={{ value: "Number of Login Attempts ", angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} />
                  <Tooltip />
                  {/* <Legend /> */}
                </LineChart>
              </div>
            </div>
          </div>

          {/* Unauthorized access and update */}
          <div className="unauthorized" id="pagebreak">
            <div className="tech-maintenance">Security Audit</div>
            <div className="user-test">UNAUTHORIZED ACCESS AND UPDATE</div>
            <div className="subsect">
              <div>
                <i className="fas fa-info"></i>
              </div>
              <p className="italics">
                This audit takes care of security areas such as login attempts
                to the wp-admin dashboard, changes to core WordPress files, and
                software updates to prevent attacks via outdated code.
              </p>
            </div>
            <div>
              <p>
                There were {total_loginAttempts} login attempts to the WordPress dashboard in
                acceptable intervals over the course of the month. However, all
                attempts were blocked, and none was successful.
              </p>
            </div>
          </div>

          {/* Technical maintenance */}
          <div className="maintenance" id="pagebreak">
            <div className="tech-maintenance">TECHNICAL MAINTENACE</div>
            <div className="user-test">USER EXPERIENCE TESTS</div>
            <div className="subsect">
              <div>
                <i className="fas fa-info"></i>
              </div>
              <p className="italics">
                This test ensures that the site performs as expected and that
                your visitors can fully access you site without any
                difficulties.
              </p>
            </div>
            <table>
              <thead>
                <th>Date</th>
                <th>Task</th>
              </thead>
              <tbody>
                {currentUser?.userExpData?.map((item) => (
                  item?.map((new_item, x) => {
                    return (
                      <tr key={x}>
                        <td>{new Date(new_item['date']).toLocaleDateString("en-GB")}</td>
                        <td>{new_item['testName']}</td>
                      </tr>
                    );

                  })
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ReactToPrint>
      <div className="btn-classs">
        <button className="button" onClick={handleGeneratePdf}>
          Generate PDF
        </button>
      </div>
    </div>
  );
}
