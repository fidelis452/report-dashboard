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
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import "./Index.css";
import topImage from "../files/Acquiretek-Test.png";
import logoImage from "../files/MicrosoftTeams-image.png";

import ReactToPrint, { useReactToPrint } from "react-to-print";

export default function TableContent() {

  const Index = useRef();

  const [serverRes, setServerRes] = useState();
  const [attempts, setAttempts] = useState();
  const [serverDowntime, setServerDowntime] = useState();
  const [loginAttempts, setLoginAttempts] = useState();
  const [startDate, setStartDate] = useState(new Date());

  const current = new Date();
  const month = current.toLocaleString("en-US", { month: "short" });
  const year = `${current.getFullYear()}`;

  const date = `${current.getDate()} ${current.toLocaleString("en-US", {
    month: "long",
  })}, ${current.getFullYear()}`;

  const url = "http://localhost:5000";

  const dateformater = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  useEffect(() => {
    axios.get(`${url}/dashboard/serverResponse`).then(function (res) {
      const serverResponseData = res.data.map((item) => ({
        ...item,
        date_joined: dateformater(item.date_joined),
      }));
      setServerRes(serverResponseData);
      console.log({ serverRes });
      const downtime = res.data.reduce(
        (total = 0, item) => (total += item.response_time),
        0
      );
      setServerDowntime(downtime);
      // console.log({downtime});
    });
  }, []);

  useEffect(() => {
    axios.get(`${url}/dashboard/loginAttempts`).then(function (res) {
      const formattedData = res.data.map((item) => ({
        ...item,
        date: dateformater(item.date),
      }));
      setAttempts(formattedData);
      const hackAttempts = res.data.reduce(
        (total = 0, item) => (total += item.numberOfRetries),
        0
      );
      setLoginAttempts(hackAttempts);
      console.log({ hackAttempts });
    });
  }, []);


  const handleGeneratePdf = useReactToPrint({
    content: () => Index.current,
  })

  return (
    <div>
      <ReactToPrint>
        <div ref={Index}>
      <div className="dashboard" id="pagebreak">
        <div className="page-1">
          <div className="logoImage">
            <img src={logoImage} alt="background" width="150px" />
          </div>
          <img id="image" src={topImage} alt="background" width="100%" />
        </div>
        <div className="time">
          <div>{month}</div>
          <div>{year}</div>
        </div>
        <div className="urls">
          <div>https://www.carveos.com</div>
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
              This is the Monthly Maintenance Report of Acquiretek as of {date}.
              This report covers various sections of WordPress Website
              Maintenance with a focus on security hardening.
            </p>
          </div>
        </div>
        <div className="table">
          <div className="table-intro">Overall Site Health</div>
          <div className="overral-health"></div>
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
                    <input
                      className="green"
                      type="radio"
                      name="site-health"
                    ></input>
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
                    <input
                      className="yellow"
                      type="radio"
                      name="site-health"
                    ></input>
                  </div>
                </td>
                <td>5 - 7</td>
                <td>
                  Some security vulnerabilities were found that can be used by
                  attackers to access sensitive information on the website.
                </td>
              </tr>
              <tr>
                <td>
                  <div className="status-color">
                    Critical
                    <input
                      className="red"
                      type="radio"
                      name="site-health"
                    ></input>
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
            <div className="item">{serverDowntime}</div>
            <div>Total Downtime</div>
          </div>
          <div>
            <div className="item">{"{10 hours}"}</div>
            <div>Billed on Development</div>
          </div>
          <div>
            <div className="item">{loginAttempts}</div>
            <div>Hack attempts prevented</div>
          </div>
          <div>
            <div className="item">2</div>
            <div>Backups taken</div>
          </div>
          <div>
            <div className="item">
              <div>
                <input className="date" type="date" />
              </div>
            </div>
            <div>Last time patched/updated</div>
          </div>
          <div>
            <div className="item">
              <input className="times-tested" type="text" name="times-tested" />
            </div>
            <div>Times tested for enquiry forms</div>
          </div>
        </div>
      </div>
      {/* visuals */}

      <div className="visuals" id="pagebreak">
        <div>
          <div className="visual-title">Visuals</div>
          <div className="visual-subtitle">Uptime Monitoring</div>
          <p>
            (Included only when there is has been an outage over the month. The
            graph will show the uptime in percentage against time in days.)
          </p>
        </div>
        {/* graph 1 */}
        <div className="graphs">
          <div className="graph-title">Server Response Time</div>
          <div>
            <LineChart width={700} height={300} data={serverRes}>
              <Line
                type="monotone"
                dataKey="response_time"
                stroke="blue"
                strokeWidth={2}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date_joined" />
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
            <LineChart width={700} height={300} data={attempts}>
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
            This audit takes care of security areas such as login attempts to
            the wp-admin dashboard, changes to core WordPress files, and
            software updates to prevent attacks via outdated code.
          </p>
        </div>
        <div>
          <p>
            There were 291 login attempts to the WordPress dashboard in
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
            This test ensures that the site performs as expected and that your
            visitors can fully access you site without any difficulties.
          </p>
        </div>
        <table>
          <thead>
            <th>Date</th>
            <th>Task</th>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>
                  <input className="maintenance-dates" type="date" />
                </div>
              </td>
              <td>Contact form tested</td>
            </tr>
            <tr>
              <td>
                <div>
                  <input className="maintenance-dates" type="date" />
                </div>
              </td>
              <td>Speed test performed</td>
            </tr>
            <tr>
              <td>
                <div>
                  <input className="maintenance-dates" type="date" />
                </div>
              </td>
              <td>Navigation tested</td>
            </tr>
            <tr>
              <td>
                <div>
                  <input className="maintenance-dates" type="date" />
                </div>
              </td>
              <td>Image optimisation test performed</td>
            </tr>
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
