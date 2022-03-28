import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { DialogContent, DialogTitle } from "@mui/material";
import Axios from "axios";
import BaseUrl from "../../api/BaseURL";
import "./Header.scss";

function Header(props) {
  const [open, setOpen] = useState(false); //mo dialog
  const [data, setData] = useState({ old: "", new: "", confirm: "" });
  const [error, setError] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
    setError("");
    setData({
      old: "",
      new: "",
      confirm: "",
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleActive = () => {
    document.querySelector(".header-dropdown").classList.toggle("active");
  };
  const handlePutChange = (e) => {
    let newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    setError("");
  };

  const handlePut = (e) => {
    e.preventDefault();
    if (
      props.name.password == data.old &&
      data.new == data.confirm &&
      data.old !== "" &&
      data.new !== "" &&
      data.confirm !== ""
    ) {
      Axios.put(BaseUrl.baseUrl + `/Admin/${props.name.idAdmin}`, {
        userName: props.name.name,
        password: data.new,
      })
        .then(
          setTimeout(() => {
            props.change(0);
          }, 2000)
        ).then(alert("Đổi mật khẩu thành công !!!"))
        .then(setOpen(false));
    } else {
      setError("Mật khẩu không khớp hoặc xác nhận mật khẩu mới sai !!!");
    }
  };

  return (
    <div className="header">
      <div className="header-left">
        <img
          src="https://www.soundexp.org/wp-content/uploads/2018/02/icon-tickets.png"
          alt=""
        />
        <span>Booking Movies</span>
      </div>
      <span className="header-right" onClick={handleActive}>
        {props.name.name}
        <i className="fas fa-caret-down"></i>
        <div className="header-dropdown" onClick={handleClickOpen}>
          Đổi Mật Khẩu
          <span className="header-arrow"></span>
        </div>
      </span>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ color: "red", textTransform: "uppercase" }}>
          Đổi mật khẩu
        </DialogTitle>
        <DialogContent>
          <label>Nhập mật khẩu cũ</label>
          <input
            style={{
              width: "400px",
              display: "block",
              padding: "8px",
            }}
            type="password"
            id="old"
            onChange={(e) => handlePutChange(e)}
          ></input>

          <label>Nhập mật khẩu mới</label>
          <input
            style={{
              width: "100%",
              display: "block",
              padding: "8px",
            }}
            type="password"
            id="new"
            onChange={(e) => handlePutChange(e)}
          ></input>

          <label>Nhập lại mật khẩu mới</label>
          <input
            style={{
              width: "100%",
              display: "block",
              padding: "8px",
            }}
            type="password"
            id="confirm"
            onChange={(e) => handlePutChange(e)}
          ></input>
          <span
            style={{
              display: "block",
              color: "red",
              marginBottom: "8px",
              fontSize: "13px",
            }}
          >
            {error}
          </span>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handlePut(e)}>Sửa</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;
