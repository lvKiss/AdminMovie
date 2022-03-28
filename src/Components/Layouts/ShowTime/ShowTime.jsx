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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Axios from "axios";
import { DialogContent, DialogTitle } from "@mui/material";
import BaseUrl from "../../api/BaseURL";

function Suat_Chieu() {
  const [value, setValue] = useState([]);
  const [film, setFilm] = useState([]);
  const [input, setInput] = useState("");
  const [cinema, setCinema] = useState([]);
  const [reload, setReload] = useState(); //load lai trang
  // const [reload, setReload] = useState();
  const [data, setData] = useState({
    idPhim: "",
    idRap: "",
    date: "",
    time: "",
    price: "",
  }); //gia tri put phim
  var today = new Date();
  var dd = today.getDate() + 1;
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  const [open, setOpen] = useState(false); //mo dialog
  const [dialog, setDialog] = useState({
    idPhim: "",
    idRap: "",
    ngayChieu: "",
    time: "",
    price: "",
  }); //gia tri dialog

  const [detail, setDetail] = useState([]);

  // *** get phim ***
  useEffect(() => {
    fetch(BaseUrl.baseUrl + "/Phim")
      .then((response) => response.json())
      .then((data) => setFilm(data));
  }, [reload]);
  // *** reload ***
  const handleGet = () => {
    setReload(Math.random());
  };
  useEffect(() => {
    fetch(BaseUrl.baseUrl + "/ChiTietChieu")
      .then((response) => response.json())
      .then((data) => setValue(data));
  }, [reload]);

  useEffect(() => {
    fetch(BaseUrl.baseUrl + "/Phong")
      .then((response) => response.json())
      .then((data) => setCinema(data));
  }, []);

  useEffect(() => {
    fetch(BaseUrl.baseUrl + "/ChiTietChieu")
      .then((response) => response.json())
      .then((data) => setDetail(data));
  }, []);
  const handleSearch = (e) => {
    setInput(e.target.value);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      textTransform: "uppercase",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
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
    if (window.confirm(`Are you sure want to delete ???`)) {
      Axios.delete(
        BaseUrl.baseUrl + `/ChiTietChieu/${item.idChiTietChieu}`
      ).then(() => handleGet());
    }
  };

  const handleClickOpen = (item) => {
    setOpen(true);
    setDialog(item);
    setData({
      idPhim: item.idPhim,
      idRap: item.idPhong,
      date: item.ngayChieu.split("T")[0],
      time: item.gioBatDau,
      price: item.giaVe,
    });
    console.log(data);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const [img, setImg] = data.image;
  const handleValue = (e, idCTC) => {
    let newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
    detail.forEach((i) => {
      if (
        idCTC != i.idChiTietChieu &&
        newdata.idRap == i.idPhong &&
        newdata.date == i.ngayChieu.split("T")[0] &&
        newdata.time == i.gioBatDau
      ) {
        document.getElementById("date").valueAsDate = new Date();
        alert("Trùng Suất Chiếu !!! Vui Lòng Chọn Lại");
      }
    });
  };
  const handlePut = (e, idCTC) => {
    e.preventDefault();
    Axios.put(BaseUrl.baseUrl + "/ChiTietChieu/" + idCTC, {
      idPhong: parseInt(data.idRap),
      idPhim: parseInt(data.idPhim),
      ngayChieu: data.date + "T00:00:00.00",
      gioBatDau: data.time,
      giaVe: parseFloat(data.price),
    })
      .then(setOpen(false))
      .then(console.log(data))
      .then(() => handleGet());
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
      <h1 className="title">Quản Lý Suất Chiếu</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1280 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">Tên Phim</StyledTableCell>
              <StyledTableCell align="center">Tên Rạp</StyledTableCell>
              <StyledTableCell align="center">Ngày Chiếu</StyledTableCell>
              <StyledTableCell align="center">Giờ Bắt Đầu</StyledTableCell>
              <StyledTableCell align="center">Giá Vé</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: "#dfdfdf" }}>
            {value
              .filter((val) => {
                if (input === "") {
                  return val;
                } else if (
                  val.idPhimNavigation.tenPhim
                    .toLowerCase()
                    .includes(input.toLowerCase()) ||
                  val.ngayChieu.split("T")[0].includes(input)
                ) {
                  return val;
                }
              })
              .map((item, i) => {
                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      {item.idChiTietChieu}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.idPhimNavigation.tenPhim}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.idPhongNavigation.tenPhong}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.ngayChieu.split("T")[0]}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.gioBatDau.split("T")[1].slice(0, 5)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.giaVe}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        style={{
                          backgroundColor: "#594AE2",
                          color: "white",
                          display: "block",
                        }}
                        variant="outlined"
                        onClick={(e) => handleClickOpen(item, i)}
                      >
                        Sửa
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          marginTop: "8px",
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ color: "red", textTransform: "uppercase" }}>
          Chỉnh sửa Suất chiếu
        </DialogTitle>
        <DialogContent>
          <label htmlFor="idPhim">Tên Phim</label>
          <select
            defaultValue={dialog.idPhim}
            className="postMovie-input"
            id="idPhim"
            onChange={(e) => {
              handleValue(e, dialog.idChiTietChieu);
            }}
          >
            {film.map((item, i) => {
              return (
                <option key={i} value={item.idPhim}>
                  {item.tenPhim}
                </option>
              );
            })}
          </select>
          <label htmlFor="idRap">Rạp</label>
          <select
            disabled
            defaultValue={dialog.idPhong}
            className="postMovie-input"
            id="idRap"
            onChange={(e) => {
              handleValue(e, dialog.idChiTietChieu);
            }}
          >
            {cinema.map((item, i) => {
              return (
                <option key={i} value={item.idPhong}>
                  {item.tenPhong}
                </option>
              );
            })}
          </select>
          <label htmlFor="date">Ngày Chiếu</label>
          <input
            defaultValue={dialog.ngayChieu.split("T")[0]}
            className="postMovie-datetime"
            style={{ width: "100%" }}
            id="date"
            onChange={(e) => handleValue(e, dialog.idChiTietChieu)}
            type="date"
            min={today}
          />
          <label htmlFor="time">Giờ Chiếu</label>
          <select
            defaultValue={dialog.gioBatDau}
            className="postMovie-input"
            id="time"
            onChange={(e) => {
              handleValue(e, dialog.idChiTietChieu);
            }}
          >
            <option value="2021-11-25T08:00:00">8h00</option>;
            <option value="2021-11-25T11:00:00">11h00</option>;
            <option value="2021-11-25T14:00:00">14h00</option>;
            <option value="2021-11-25T17:00:00">17h00</option>;
            <option value="2021-11-25T20:00:00">20h00</option>;
            <option value="2021-11-25T23:00:00">23h00</option>;
          </select>
          <label htmlFor="price">Giá Vé</label>
          <select
            defaultValue={dialog.giaVe}
            className="postMovie-input"
            id="price"
            onChange={(e) => {
              handleValue(e, dialog.idChiTietChieu);
            }}
          >
            <option value="45000">45000</option>
            <option value="90000">90000</option>
            <option value="120000">120000</option>
            <option value="150000">150000</option>
          </select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handlePut(e, dialog.idChiTietChieu)}>
            Sửa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Suat_Chieu;
