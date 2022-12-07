import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";
export default function TableContent() {
  const current = new Date();

  const date = `${current.getDate()} ${current.toLocaleString("en-US", {
    month: "long",
  })}, ${current.getFullYear()}`;
  console.log(date);

  return (
    <div>
      <div className="table-content">
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
      <div className="contentpage">
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
                    Good<span className="green"></span>
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
                    Moderate<span className="yellow"></span>
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
                    Critical<span className="red"></span>
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
      <div className="snapshot-container">
        <div className="snapshot">Snapshot</div>
        <div class="grid-container">
          <div>
            <div>{"{10 hours}"}</div>
            <div>Total Downtime</div>
          </div>
          <div>
            <div>{"{10 hours}"}</div>
            <div>Billed on Development</div>
          </div>
          <div>
            <div>{"{10 hours}"}</div>
            <div>Hack attempts prevented</div>
          </div>
          <div>
            <div>{"{10 hours}"}</div>
            <div>Backups taken</div>
          </div>
          <div>
            <div>{"{10 hours}"}</div>
            <div>Last time patched/updated</div>
          </div>
          <div>
            <div>{"{10 hours}"}</div>
            <div>Times tested for enquiry forms</div>
          </div>
        </div>
      </div>
      {/* visuals */}

      <div>

      </div>

      {/* Unauthorized access and update */}
      <div className="unauthorized">
        <div>UNAUTHORIZED ACCESS AND UPDATE</div>
        <div className="italics">
          <p>This audit takes care of security areas such as 
            login attempts to the wp-admin dashboard, changes 
            to core WordPress files, 
            and software updates to prevent attacks via outdated code.</p>
        </div>
        <div>
          <p>
          There were 291 login attempts to the WordPress 
          dashboard in acceptable intervals over the course 
          of the month. However, 
          all attempts were blocked, and none was successful.
          </p>
        </div>
      </div>
      
      {/* Technical maintenance */}
      <div className="maintenance">
        <div>TECHNICAL MAINTENACE</div>
        <div>USER EXPERIENCE TESTS</div>
        <div className="italics">
          <p>
          This test ensures that the site performs as expected and 
          that your 
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
              <td>October 5th</td>
              <td>Contact form tested</td>
            </tr>
            <tr>
              <td>October 10th</td>
              <td>Speed test performed</td>
            </tr>
            <tr>
              <td>October 15th</td>
              <td>Navigation tested</td>
            </tr>
            <tr>
              <td>October 20th</td>
              <td>Image optimisation test performed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
