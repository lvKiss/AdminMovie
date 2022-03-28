import React, { useState, useEffect } from "react";
import BaseUrl from "../../api/BaseURL";
import Axios from "axios";

function PostShowTime() {
  const [film, setFilm] = useState([]);
  const [cinema, setCinema] = useState([]);
  const [detail, setDetail] = useState([]);
  const [value, setValue] = useState({
    idPhim: "",
    idRap: "",
    date: "",
    time: "",
    price: "",
  });
  const time = [
    "8:00:00",
    "11:00:00",
    "14:00:00",
    "17:00:00",
    "20:00:00",
    "23:00:00",
  ];
  const [img, setImg] = useState(
    "https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png"
  );
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

  useEffect(() => {
    fetch(BaseUrl.baseUrl + "/ChiTietChieu")
      .then((response) => response.json())
      .then((data) => setDetail(data));
  }, []);

  useEffect(() => {
    fetch(BaseUrl.baseUrl + "/Phim")
      .then((response) => response.json())
      .then((data) => setFilm(data));
  }, []);

  useEffect(() => {
    fetch(BaseUrl.baseUrl + "/Phong")
      .then((response) => response.json())
      .then((data) => setCinema(data));
  }, []);
  const war = [];
  const handleValue = (e) => {
    let newdata = { ...value };
    newdata[e.target.id] = e.target.value;
    film.forEach((j) => {
      if (newdata.idPhim == j.idPhim) {
        setImg(j.image);
      }
    });
    detail.forEach((i) => {
      if (
        newdata.idRap == i.idPhong &&
        newdata.date == i.ngayChieu.split("T")[0] &&
        newdata.time == i.gioBatDau
      ) {
        detail.forEach((j) => {
          time.forEach((item) => {
            if (
              j.ngayChieu.split("T")[0] == i.ngayChieu.split("T")[0] &&
              item == j.gioBatDau.split("T")[1]
            ) {
              war.push(item.slice(0, 5) + " ");
            }
          });
        });
        alert(
          ` TRÙNG SUẤT CHIẾU !!! Rạp ${newdata.idRap} Ngày ${newdata.date} đã có suất chiếu vào các giờ: ${war} !!! Vui lòng chọn giờ khác hoặc ngày khác !!!`
        );
        // newdata.idRap = "";
        newdata.time = "";
      } else {
        setValue(newdata);
      }
    });
  };

  const handlePost = (e) => {
    e.preventDefault();
    value.date == "" ||
    value.idPhim == "" ||
    value.idRap == "" ||
    value.price == "" ||
    value.time == ""
      ? alert("Nhập đầy đủ thông tin !!!")
      : Axios.post(BaseUrl.baseUrl + "/ChiTietChieu", {
          idPhong: parseInt(value.idRap),
          idPhim: parseInt(value.idPhim),
          ngayChieu: value.date + "T00:00:00.00",
          gioBatDau: value.time,
          giaVe: parseFloat(value.price),
        })
          .then(alert("Thêm suất chiếu thành công !!!"))
          .then(
            setValue({
              idPhim: "",
              idRap: "",
              date: "",
              time: "",
              price: "",
            })
          )
          .catch(function (error) {
            console.log(error);
          });
  };

  return (
    <>
      <h1 className="title">Thêm Suất Chiếu</h1>
      <div className="postMovie">
        <form onSubmit={(e) => handlePost(e)}>
          <label htmlFor="idPhim">Tên Phim</label>
          <select
            className="postMovie-input"
            id="idPhim"
            onChange={(e) => {
              handleValue(e);
            }}
          >
            <option>-- Chọn Phim --</option>
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
            className="postMovie-input"
            id="idRap"
            onChange={(e) => {
              handleValue(e);
            }}
            value={value.idRap}
          >
            <option>-- Chọn Rạp --</option>
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
            className="postMovie-datetime"
            id="date"
            onChange={(e) => handleValue(e)}
            type="date"
            min={today}
            value={value.date}
          />
          <label htmlFor="time">Giờ Chiếu</label>
          <select
            className="postMovie-input"
            id="time"
            onChange={(e) => {
              handleValue(e);
            }}
            value={value.time}
          >
            <option>-- Chọn Giờ --</option>
            <option value="2021-11-25T08:00:00">8h00</option>;
            <option value="2021-11-25T11:00:00">11h00</option>;
            <option value="2021-11-25T14:00:00">14h00</option>;
            <option value="2021-11-25T17:00:00">17h00</option>;
            <option value="2021-11-25T20:00:00">20h00</option>;
            <option value="2021-11-25T23:00:00">23h00</option>;
          </select>
          <label htmlFor="price">Giá Vé</label>
          <select
            className="postMovie-input"
            id="price"
            onChange={(e) => {
              handleValue(e);
            }}
            value={value.price}
          >
            <option>-- Chọn Giá --</option>
            <option>45000</option>
            <option>90000</option>
            <option>120000</option>
            <option>150000</option>
          </select>
          <button className="postMovie-btn">Thêm Suất Chiếu</button>
        </form>
        <div className="postMovie-img">
          <label htmlFor="">Poster</label>
          <img style={{ display: "block" }} src={img} alt="" />
        </div>
      </div>
    </>
  );
}
export default PostShowTime;
