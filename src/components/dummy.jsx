import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./form.css";

function Dummy() {
  const [clients, setClients] = useState([{ name: "select a client" }]);
  const [currentClient, setCurrentClient] = useState(null);
  const [lastTime] = useState(null);
  const [backupsTaken] = useState(null);
  const [formTested] = useState(null);
  const navigate = useNavigate();

  const dataBlueprint = {
    clientName: "",
    health: "",
    lastTime: "",
    backupsTaken: "",
    formTested: "",
  };

  const [clientData, setClientData] = useState([]);

  const [newData, setNewData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/dashboard/clients").then(function (res) {
      const newArray = res.data.map((user) => ({ name: user.name }));
      setClients([...clients, ...newArray]);
    });
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "clientName") {
      setCurrentClient(e.target.value);
      const isFound = clientData.find(
        (client) => client.clientName === e.target.value
      );
      if (!isFound) {
        setClientData((prev) => [
          ...prev,
          { ...dataBlueprint, clientName: e.target.value },
        ]);
      }
    } else {
      setClientData(
        clientData.map((data) => {
          if (data.clientName === currentClient) {
            return {
              ...data,
              health: e.target.name === "health" ? e.target.value : data.health,
              lastTime:
                e.target.name === "lastTime" ? e.target.value : data.lastTime,
              backupsTaken:
                e.target.name === "backupsTaken"
                  ? e.target.value
                  : data.backupsTaken,
              formTested:
                e.target.name === "formTested"
                  ? e.target.value
                  : data.formTested,
            };
          } else {
            return data;
          }
        })
      );
    }
  };

  console.log({ clientData });
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("data", JSON.stringify(clientData));
    navigate("/");
  };

  return (
    <div>
      {/* list of clients */}
      <div>
        <h2> SELECT THE CLIENT</h2>
        <div className="radiobtn">
          <label for="clients">Select the Client: </label>
          <select
            id="clients"
            name="clientName"
            value={clientData.clientName}
            onChange={handleChange}
          >
            {clients.map((client) => (
              <option value={client.name}>{client.name}</option>
            ))}
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
            <input
              type="radio"
              name="health"
              id="good"
              value="good"
              onChange={handleChange}
            />
          </div>
          <div className="radio-div">
            <label for="moderate">Moderate : (5 - 7)</label>
            <input
              type="radio"
              name="health"
              id="moderate"
              value="moderate"
              onChange={handleChange}
            />
          </div>
          <div className="radio-div">
            <label for="critical">Critical : (0 - 4)</label>
            <input
              type="radio"
              name="health"
              id="critical"
              value="critical"
              onChange={handleChange}
            />
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

            <input
              type="date"
              name="lastTime"
              value={lastTime}
              onChange={handleChange}
            />
          </div>
          <div className="radio-div">
            <label for="moderate">Backups taken</label>
            <input
              type="text"
              name="backupsTaken"
              value={backupsTaken}
              onChange={handleChange}
            />
          </div>
          <div className="radio-div">
            <label for="critical">Times tested for enquiry forms</label>
            <input
              type="text"
              name="formTested"
              value={formTested}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {/*  */}

      {/*  */}
      <div>
        <button type="submit" onClick={handleSubmit}>
          SUBMIT
        </button>
      </div>

      <div>{JSON.stringify(clientData)}</div>
      {/*  */}
    </div>
  );
}

export default Dummy;
