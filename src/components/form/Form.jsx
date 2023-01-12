import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./form.scss";

// const DEFAULT_CLIENT_FORM ={
//   clientname0 :"",
//   url: "",
//   username: "",
//   password: ""
// }

const Form = () => {
  const [clients, setClients] = useState([{ clientname: "select a client" }]);
  const [currentClient, setCurrentClient] = useState();
  const [lastTime] = useState(null);
  const [backupsTaken] = useState(null);
  const [newData, setNewData] = useState();
  const navigate = useNavigate();
  const [myData, setMyData] = useState();
  const [client, setClient] = useState();
  const [userExperience, setUserExperience] = useState([
    { testName: "", date: "" },
  ]);
  const [clientData, setClientData] = useState([]);
  const [error, setError] = useState("");
  // state for the addClient form
  // const [addClient, setAddClient] = useState(DEFAULT_CLIENT_FORM);
  const [clienta, setClienta] = useState([]);

  const [clientname, setClientname] = useState();
  const [url, setUrl] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const dataBlueprint = {
    clientName: "",
    health: "",
    lastTime: "",
    backupsTaken: "",
    formTested: "",
    tempoHours: "",
    id: "",
  };

  // function to add more fields on the user experience tests
  const addFields = (e) => {
    e.preventDefault();
    setUserExperience([...userExperience, { testName: "", date: "" }]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/dashboard/fetchClients")
      .then(function (res) {
        // console.log(res.data);
        const newArray = res.data.map((user) => ({
          id: user._id,
          username: user.username,
          url: user.url,
          clientname: user.clientname,
          password: user.password,
        }));
        console.log({ newArray });
        console.log({ clients });
        setClients([...clients, ...newArray]);
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "clientName") {
      setCurrentClient(e.target.value);
      setUserExperience([{ testName: "", date: "" }]);

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
              tempoHours:
                e.target.name === "tempoHours"
                  ? e.target.value
                  : data.tempoHours,
            };
          } else {
            return data;
          }
        })
      );
    }
  };

  console.log({ clientData });

  const handleTestChange = (e, index) => {
    const newValues = [...userExperience];
    newValues[index][e.target.name] = e.target.value;
    setUserExperience(newValues);

    setClient(currentClient);

    setMyData([{ client: currentClient, userExperience }]);

    const merges = clientData?.map((data) => {
      let y = myData.filter((mydataonj) => {
        console.log({ myData });
        return mydataonj.client === data.clientName;
      });
      console.log({ y });
      return { ...data, userExpData: y.map((data) => data.userExperience) };
    });
    console.log({ merges });

    setClientData(merges);
  };

  useEffect(() => {
    setClientData(JSON.parse(localStorage.getItem("data")) ?? []);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("data", JSON.stringify(clientData));
    navigate("/");
  };

  //handler the onChange event

  // const changeHandler = (e) => {
  //   setAddClient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  //validating the url

  const isUrlValid = (url) => {
    const legitEmail =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    return legitEmail.test(url);
  };

  const submitHandler = async (e) => {
    // e.preventDefault();
    const data = {
      clientname: clientname,
      url: url,
      username: username,
      password: password,
    };
    try {
      if (clientname === "") {
        return setError("The Client's name is needed");
      } else if (url === "") {
        return setError("The website url is needed");
      } else if (!isUrlValid(data.url)) {
        return setError("Invalid Url !!!");
      } else if (username === "") {
        return setError("Please fill in your name");
      } else if (password === "") {
        return setError("Please fill in the password");
      } else {
        await axios.post("http://localhost:4000/register", data).then((res) => {
          console.log(JSON.stringify(res.data));
        });
        navigate("/form")
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="form_div">
      <div className="container">
        <div className="row form__row">
          <div className="col-md-5 form__left">
            <form>
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
                    <option value={client.clientname} key={index}>
                      {client.clientname}
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
                  placeholder="dd/mm/yyyy"
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
                <div className="form-group">
                  <label htmlFor="">Billed on Development:</label>
                  <input
                    type="number"
                    name="tempoHours"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row ">
                <h6>User Experience tests</h6>
                {/* begining the loop  */}
                {userExperience.map((data, index) => {
                  // console.log(data);
                  return (
                    <div className="row expreience_inputs" key={index}>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="">Test Name:</label>
                          <input
                            type="text"
                            name="testName"
                            onChange={(e) => handleTestChange(e, index)}
                            value={userExperience.testName}
                            className="form-control"
                            // onChange={(e) => handleChange(e, index)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="">Date:</label>
                          <input
                           placeholder="dd/mm/yyyy"
                            type="date"
                            name="date"
                            onChange={(e) => handleTestChange(e, index)}
                            value={userExperience.date}
                            className="form-control"
                            // onChange={(e) => handleChange(e, index)}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* end of the loop  */}
              </div>
              <div className="row">
                <button onClick={(e) => addFields(e)} className="plus_btn">
                  +
                </button>
              </div>
              <div className="row ">
                <button className="btn btn-danger" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* begining of the right side  */}
          <div className="col-md-7 form__right">
            <div className="row">
              {/* modal button  */}
              <div className="col-md-5 bg-light mb-5">
                <button
                  type="button"
                  class="btn btn-primary client__btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add Client
                </button>
              </div>
              {/* end of modal button  */}
            </div>
            <table className="table text-center ">
              <thead>
                <tr>
                  {/* <th>#</th> */}
                  <th>Client Name</th>
                  <th>Site Health</th>
                  <th>Last Patched</th>
                  <th>Backups Taken</th>
                  <th>Number of forms Tested</th>
                  <th>Billed on Development</th>
                </tr>
              </thead>
              <tbody>
                {
                  // [...(newData || []), ...clientData]
                  clientData?.map((singledata, index) => {
                    return (
                      <tr key={index}>
                        {/* <td>{index}</td> */}
                        <td>{singledata["clientName"]}</td>
                        <td>{singledata["health"]}</td>
                        <td>{singledata["lastTime"]}</td>
                        <td>{singledata["backupsTaken"]}</td>
                        <td>{singledata["formTested"]}</td>
                        <td>{singledata["tempoHours"]}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* modal content  */}

      <div
        class="modal fade modal__form"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add A New Client
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {error && <p className="error_message">{error} </p>}

              <form action="">
                <div className="form-group">
                  <label htmlFor="">Client Name:</label>
                  <input
                    type="text"
                    onChange={(e) => setClientname(e.target.value)}
                    name="clientname0"
                    value={clientname}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Url:</label>
                  <input
                    type="text"
                    onChange={(e) => setUrl(e.target.value)}
                    name="url"
                    value={url}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Username:</label>
                  <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    value={username}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Password:</label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    value={password}
                    className="form-control"
                  />
                </div>
                <div className="row">
                  <button onClick={submitHandler} className="add__btn">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* end of modal content   */}
    </div>
  );
};

// more dynamic form user experience tests
// make the form dynamic , name and the input field

export default Form;
