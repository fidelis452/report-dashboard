import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
import topImage from "../files/Acquiretek-Test.png";
import logoImage from "../files/MicrosoftTeams-image.png";
import JsonData from "./logos.json";
import ReactToPrint, { useReactToPrint } from "react-to-print";

export default function TableContent() {
  // console.log(JsonData);

  const Index = useRef();

  const [serverRes, setServerRes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [serverDowntime, setServerDowntime] = useState();
  const [loginAttempts, setLoginAttempts] = useState();

  // const [clients, setClients] = useState([{ name: "select a client" }]);
  const [formData, setFormData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [mergedData, setMergedData] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [activeUser, setActiveUser] = useState();
  const current = new Date();
  const month = current.toLocaleString("en-US", { month: "short" });
  const year = `${current.getFullYear()}`;

  const date = `${current.getDate()} ${current.toLocaleString("en-US", {
    month: "long",
  })}, ${current.getFullYear()}`;

  const url = "http://localhost:4000";

  const dateformater = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };
  
  useEffect(() => {
    axios.get("http://localhost:4000/dashboard/serverResponse")
    .then(res=> {
      const serverResponseData = res.data.map((item1) => ({
        ...item1,
        date_added: dateformater(item1.date_added),
      }));
     setServerRes(serverResponseData);
     setTimeout(() => {
      // console.log();
    }, 2000);
    });
  }, []);

  // console.log({serverRes});

  // daniel my way 
  // useEffect(() =>{
  //    axios.get("http://localhost:4000/dashboard/serverResponse")
  //     .then(response => {
  //       const data = response.data
  //       console.log(data);
  //   })
  // },[])

  // const fetchData = async () =>{
  //   await fetch("http://localhost:4000/dashboard/serverResponse")
  //   .then(res => res.json())
  //   .then(result => {
  //     for(let item of result){
  //       serverRes.push(item)
  //       setTimeout(() => {
  //         // console.log();
  //       }, 2000);
  //     }
  //   })
  //   .catch(error =>{
  //     console.log(error);
  //   })
  // }
  
  // useEffect(() =>{
  //   fetchData()
  // },[])
  // en of daniel my way 

    // const downtime = res.data.reduce(
    //   (total = 0, item) => (total += item.response_time),
    //   0
    // );
    // setServerDowntime(downtime);
    // console.log({downtime});

  useEffect(() => {
    axios.get("http://localhost:4000/dashboard/loginAttempts")
    .then(function (res) {
      const formattedData = res.data.map((item) => ({
        ...item,
        date: dateformater(item.date),
      }));
      setAttempts(formattedData);
      setTimeout(() => {
        // console.log();
      }, 2000);
    });
  }, []);

  // console.log("attempts" , {attempts});
  useEffect(() => {
    const lsData = localStorage.getItem("data");

    setFormData(JSON.parse(lsData));
  }, []);

  // console.log(formData);

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
      return {...item, server_response: server_response }
    })

    // console.log(withServerResponse);
    
    const withLoginAttempts = withServerResponse?.map((item) => {
      let login_attempts = attempts.filter((single_attempt) => {
        return single_attempt?.clientname === item?.clientName
      })
      console.log({login_attempts});
      return {...item, login_attempts: login_attempts }
    })
    
    setMergedData(withLoginAttempts);
    
  }, [formData,serverRes, attempts]);

 

  console.log({attempts});
  console.log({ mergedData });

  const handleChange = (e) => {
    const clientFound = mergedData.find(
      (client) => client.clientName === e.target.value
    );
    // console.log(clientFound);
    setCurrentUser(clientFound);
  };

  // console.log("data => ", currentUser.serverRes);

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
  console.log("cuur" , {currentUser});
  return (
    <div>
      <ReactToPrint>
        <div className="radiobtn">
          <label for="clients">Select the Client: </label>
          <select id="clients" name="clientName" onChange={handleChange}>
            {new1?.map((item, index) => (
              <option value={item.url} key={index}>
                {item.url}
              </option>
            ))}
          </select>
        </div>
        <div ref={Index}>
          <div className="dashboard" id="pagebreak">
            <div className="page-1">
              <div className="logoImage">
                <img
                  src={currentUser?.JsonData[0]?.image}
                  alt=" company logo"
                  width="150px"
                />
              </div>
              <img id="image" src={topImage} alt="background" width="100%" />
            </div>
            <div className="time">
              <div>{month}</div>
              <div>{year}</div>
            </div>
            <div className="urls">
              <div>{currentUser?.clientName}</div>
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
                <div>Snapshoots</div>
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
                <div className="name">Acquiretek</div>
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
                  This is the Monthly Maintenance Report of Acquiretek as of{" "}
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
                <div className="item">{total_serverResponseTime.toFixed(2)}
                  </div>
                <div>Total Downtime</div>
              </div>
              <div>
                <div className="item">{currentUser?.tempoHours}</div>
                <div>Billed on Development ("Hours")</div>
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
                  <div>{currentUser?.lastTime}</div>
                </div>
                <div>Last time patched/updated</div>
              </div>
              <div>
                <div className="item">{currentUser?.formTested}</div>
                <div>Times tested for enquiry forms</div>
              </div>
            </div>
          </div>
          {/* visuals */}

          <div className="visuals" id="pagebreak">
            <div>
              <div className="visual-title">Visuals</div>
              <div className="visual-subtitle">Uptime Monitoring</div>
              {/* <p>
                (Included only when there is has been an outage over the month.
                The graph will show the uptime in percentage against time in
                days.)
              </p> */}
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
                    strokeWidth={2}
                  />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="date_added" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </div>
            </div>
            {/* graph 2 */}
            <div className="graphs">
              <div className="graph-title">Attempted Login</div>
              <div>
                <LineChart width={700} height={300} data={currentUser?.login_attempts}>
                  <Line
                    type="monotone"
                    dataKey="numberOfRetries"
                    stroke="blue"
                    strokeWidth={2}
                  />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5,5" />
                  <XAxis dataKey={"date"} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
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
                        <td>{new_item['date']}</td>
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
