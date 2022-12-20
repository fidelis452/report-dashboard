import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./form.scss";

const Form = () => {
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

  // const [newData, setNewData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard/fetchClients")
      .then(function (res) {
        const newArray = res.data.map((user) => ({
          url: user.url,
          name: user.name,
        }));
        console.log({ newArray });
        setClients([...clients, ...newArray]);
        console.log({ clients });
      });
  }, []);

  useEffect(() => {
    setClientData(JSON.parse(localStorage.getItem("data")) ?? []);
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
              // name: client.url,
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
    <div className="form_div">
      <div className="container">
        <div className="row form__row">
          <div className="col-md-5 form__left">
            <form action="">
              <div className="form-group">
                <label>Client Name:</label>
                <select
                  className="form-select"
                  id="clients"
                  name="clientName"
                  value={clientData.clientName}
                  onChange={handleChange}
                >
                  {clients.map((client, index) => (
                    <option value={client.url} key={index}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* overall health  */}
              <div className="row">
                <h6>Overall Site Health</h6>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-check">
                    <input
                      type="radio"
                      name="health"
                      id="good"
                      value="good"
                      onChange={handleChange}
                    />
                    <label className="ps-1" htmlFor="good">
                      Good : (8 - 10)
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-check">
                    <input
                      type="radio"
                      name="health"
                      id="moderate"
                      value="moderate"
                      onChange={handleChange}
                    />
                    <label className="ps-1" htmlFor="moderate">
                      Average : (5 - 7)
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-check">
                    <input
                      type="radio"
                      name="health"
                      id="critical"
                      value="critical"
                      onChange={handleChange}
                    />
                    <label className="ps-1" htmlFor="critical">
                      Critical (0-4)
                    </label>
                  </div>
                </div>
              </div>
              {/* end of overall health  */}

              <div className="row">
                <h6>Snapshot</h6>
              </div>
              <div className="row form_napshot">
                <div className="form-group">
                  <label htmlFor="">Last time Patched:</label>
                  <input
                    type="date"
                    name="lastTime"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Backups taken:</label>
                  <input
                    type="number"
                    name="backupsTaken"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Times tested for enquiry forms:</label>
                  <input
                    type="number"
                    name="formTested"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row ">
                <button className="btn btn-danger" onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
          <div className="col-md-7 form__right">
            <table className="table text-center ">
              <thead>
                <tr>
                  {/* <th>#</th> */}
                  <th>Client Name</th>
                  <th>Site Health</th>
                  <th>Last Patched</th>
                  <th>Backups Taken</th>
                  <th>Number of forms Tested</th>
                </tr>
              </thead>
              <tbody>
                {
                  clientData?.map((singledata, index) => {
                    console.log(singledata.index);
                return(
                  <tr key={index}>
                  {/* <td>{index}</td> */}
                  <td>{singledata["clientName"]}</td>
                  <td>{singledata['health']}</td>
                  <td>{singledata['lastTime']}</td>
                  <td>{singledata['backupsTaken']}</td>
                  <td>{singledata['formTested']}</td>
                </tr>
                )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// more dynamic form user experience tests
// make the form dynamic , name and the input field

export default Form;
