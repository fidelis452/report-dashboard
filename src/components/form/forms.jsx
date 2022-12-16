import axios from "axios";
import React, { useEffect, useState } from "react";
import "./form.css";

function Form() {
    const [clients, setClients] = useState([{url: 'Select a client'}])
    const [currentClient, setCurrentClient] = useState(null);

    const [radio, setRadio] = useState(false)
    const [lastTime] = useState("")
    const [backupsTaken] = useState("")
    const [formTested] = useState("")

   useEffect(() => {
    axios.get("http://localhost:4000/dashboard/clients")
    .then( function(res) {
        setClients(res.data)
        console.log(clients);
    })
   }, [])

  return (
    <div>
      {/* list of clients */}
      <div>
        <h2> SELECT THE CLIENT</h2>
        <div className="radiobtn">
        <label for="clients">Select the Client: </label>
        <select id="clients" name="clients" onChange={handleChange}>
          {
            clients.map((client) => 
            <option value={client.url}>{client.url}</option>
            )
          }
        </select>
        </div>
      </div>
      {/* end of clients list */}

      {/* site health */}
      <div>
        <h2>OVERALL SITE HEALTH </h2>
        <div className="radiobtn">
          <div className="radio-div">
            <label for="good">Good : (8 - 10)</label>
            <input type="radio" name="overral-health" id="good" value='good' onChange={handleChange}/>
          </div>
          <div className="radio-div">
            <label for="moderate">Moderate : (5 - 7)</label>
            <input type="radio" name="overral-health" id="moderate" value='moderate' onChange={handleChange}/>
          </div>
          <div className="radio-div">
            <label for="critical">Critical : (0 - 4)</label>
            <input type="radio" name="overral-health" id="critical" value='critical'  onChange={handleChange}/>
          </div>
        </div>
      </div>
      {/* end of site health */}

      {/*  */}
      <div>
        <h2>SNAPSHOT </h2>
        <div className="radiobtn">
          <div className="radio-div">
            <label for="good">Last time patched/updated</label>
            <input type="date" name="overral-health" value={lastTime} onChange={handleChange}/>
          </div>
          <div className="radio-div">
            <label for="moderate">Backups taken</label>
            <input type="text" name="overral-health" value={backupsTaken} onChange={handleChange}/>
          </div>
          <div className="radio-div">
            <label for="critical">Times tested for enquiry forms</label>
            <input type="text" name="overral-health" value={formTested} onChange={handleChange}/>
          </div>
        </div>
      </div>
      {/*  */}

      {/*  */}
      <div>
        <button type="submit" 
        // onSubmit={handleSubmit}
        >SUBMIT</button>
        </div>
      {/*  */}
    </div>
  );
}

export default Form;
