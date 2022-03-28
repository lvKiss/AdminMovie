import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Axios from "axios";
import BaseUrl from "../../api/BaseURL";

function Account() {
  const [value, setValue] = useState([]);
  const [input, setInput] = useState("");
  const [reload, setReload] = useState(); //load lai trang

  useEffect(() => {
    fetch(BaseUrl.baseUrl + "/User")
      .then((response) => response.json())
      .then((data) => setValue(data));
  }, [reload]);
  const handleGet = () => {
    setReload(Math.random());
  };
  const handleSearch = (e) => {
    setInput(e.target.value);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // // hide last border
    // "&:last-child td, &:last-child th": {
    //   border: 0,
    // },
  }));

  const handleDelete = (e, item) => {
    e.preventDefault();
    if (window.confirm(`Are you sure want to delete: ${item.hoTen}`)) {
      Axios.delete(BaseUrl.baseUrl + `/User/${item.idUser}`).then(() =>
        handleGet()
      );
    }
  };

  return (
    <div>
      <div className="search">
        <input
          className="search-input"
          onInput={(e) => {
            handleSearch(e);
          }}
          placeholder="Search"
        ></input>
        <i className="fas fa-search"></i>
      </div>
      <h1 className="title">Quản Lý Tài Khoản</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1280 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">Tên Người Dùng</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Số Điện Thoại</StyledTableCell>
              <StyledTableCell align="center">Tài Khoản</StyledTableCell>
              <StyledTableCell align="center">Mật Khẩu</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: "#dfdfdf" }}>
            {value
              .filter((val) => {
                if (input === "") {
                  return val;
                } else if (
                  val.hoTen.toLowerCase().includes(input.toLowerCase()) ||
                  val.diaChi.toLowerCase().includes(input.toLowerCase()) ||
                  val.sdt.includes(input)
                ) {
                  return val;
                }
              })
              .map((item, i) => {
                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      {item.idUser}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.hoTen}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.diaChi}
                    </StyledTableCell>
                    <StyledTableCell align="center">{item.sdt}</StyledTableCell>
                    <StyledTableCell align="center">
                      {item.taiKhoan}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.matKhau}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                        }}
                        variant="outlined"
                        onClick={(e) => handleDelete(e, item)}
                      >
                        Xóa
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Account;
