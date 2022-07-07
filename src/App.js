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
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(5);

  const [sortFilterValue, setSortFilterValue] = useState(" ");
  const [operation, setOperation] = useState(" ");

  const sortOptions = ["name", "surname", "email"];

  useEffect(() => {
    loadEmployeesData(0, 5, 0);
  }, []);

  const loadEmployeesData = async (
    start,
    end,
    increase,
    optType = null,
    filterOrSortValue
  ) => {
    switch (optType) {
      case "search":
        setOperation(optType);
        setSortValue("");
        return await axios
          .get(
            `http://localhost:3000/employees?q=${value}&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      case "sort":
        setOperation(optType);
        setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:3000/employees?_sort=${sortFilterValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
      default:
        return await axios
          .get(` http://localhost:3000/employees?_start=${start}&_end=${end}`)
          .then((response) => {
            setData(response.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((err) => console.log(err));
    }
  };
  console.log("data", data);

  const handleSearch = async (e) => {
    loadEmployeesData(0, 5, 0, "search");
    e.preventDefault();
  };

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    loadEmployeesData(0, 5, 0, "sort", value);
    // return await axios
    //   .get(`http://localhost:3000/employees?_sort=${value}&_order=asc`)
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((err) => console.log(err));
  };
  const handleFilter = async (value) => {
    return await axios
      .get(`http://localhost:3000/employees?email=${value}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };
  const handleReset = () => {
    setOperation("");
    setValue("");
    setSortFilterValue("");
    setSortValue("");
    loadEmployeesData(0, 5, 0);
  };

  const showPagination = () => {
    if (data.length < 5 && currentPage === 0) return null;
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadEmployeesData(5, 10, 1, operation, sortFilterValue)
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadEmployeesData(
                  (currentPage - 1) * 5,
                  currentPage * 5,
                  -1,
                  operation,
                  sortFilterValue
                )
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>

          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadEmployeesData(
                  (currentPage + 1) * 5,
                  (currentPage + 2) * 5,
                  1,
                  operation,
                  sortFilterValue
                )
              }
              className="mx-2"
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else
      return (
        <MDBPagination className="mb-0">
          <MDBPaginationItem>
            <MDBBtn
              onClick={() =>
                loadEmployeesData(5, 10, -1, operation, sortFilterValue)
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
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
        <div style={{ marginTop: "80px" }}>
          <h2 className="text-center">Employees List</h2>
          <MDBRow>
            <MDBCol size="14">
              <MDBTable>
                <MDBTableHead dark>
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
          <div
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "250px",
              alignItems: "center",
            }}
          >
            {showPagination()}
          </div>
        </div>
        {data.length > 0 && (
          <MDBRow>
            <MDBCol size={8}>
              <h5>Sort</h5>
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
              <h5>Filter By Email</h5>
              <MDBBtn color="success" onClick={() => handleFilter("email")}>
                Email
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        )}
      </MDBContainer>
    </div>
  );
}

export default App;
