import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  const sortOptions = ["name", "surname"];

  useEffect(() => {
    loadEmployeesData();
  }, []);

  const loadEmployeesData = async () => {
    return await axios
      .get(" http://localhost:3000/employees")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };
  console.log("data", data);

  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios
      .get(`http://localhost:3000/employees?q=${value}`)
      .then((response) => {
        setData(response.data);
        setValue("");
      })
      .catch((err) => console.log(err));
  };

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios
      .get(`http://localhost:3000/employees?_sort=${value}&_order=asc`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };
  const handleReset = () => {
    loadEmployeesData();
  };

  return (
    <div className="App">
      <MDBContainer>
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "600px",
            alignItems: "center",
          }}
          className="d-flex input-group w-auto"
          onSubmit={handleSearch}
        >
          <MDBBtn
            className="mx-4"
            type="submit"
            color="dark"
            onClick={() => handleSearch()}
          >
            {" "}
            Add Employee
          </MDBBtn>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <MDBBtn
            className="mx-2"
            type="submit"
            color="dark"
            onClick={() => handleSearch()}
          >
            {" "}
            Search
          </MDBBtn>
          <MDBBtn
            type="submit"
            className="mx-2"
            color="warning"
            onClick={() => handleReset()}
          >
            {" "}
            Reset
          </MDBBtn>
        </form>
        <div style={{ marginTop: "100px" }}>
          <h2 className="text-center">Employees List</h2>
          <MDBRow>
            <MDBCol size="14">
              <MDBTable>
                <MDBTableHead dark className="text-center">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">BirthDate</th>
                  </tr>
                </MDBTableHead>
                {data.length === 0 ? (
                  <MDBTableBody className="align-center mb-0">
                    <tr>
                      <td colSpan={8} className="text-center mb-0">
                        No Employee Found
                      </td>
                    </tr>
                  </MDBTableBody>
                ) : (
                  data.map((item, index) => (
                    <MDBTableBody key={index}>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.surname}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>{item.birthdate}</td>
                      </tr>
                    </MDBTableBody>
                  ))
                )}
              </MDBTable>
            </MDBCol>
          </MDBRow>
        </div>
        <MDBRow>
          <MDBCol size={8}>
            <h4>Sort</h4>
            <select
              style={{ width: "40%", borderRadius: "4px", height: "40px" }}
              onChange={handleSort}
              value={sortValue}
            >
              <option> please select Option</option>
              {sortOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol size={4}>
            <h3>Filter By Email</h3>
            <MDBBtn color="success">Email</MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default App;
