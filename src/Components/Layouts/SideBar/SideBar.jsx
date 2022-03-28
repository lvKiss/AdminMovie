import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./SideBar.scss";

function Navbar() {
  useEffect(() => {
    const menu = document.querySelectorAll(".sidebar-item");
    menu.forEach((item) => {
      item.addEventListener("click", (e) => {
        for (let i of menu) {
          i.classList.remove("active");
        }
        e.target.classList.add("active");
        handleDelete();
      });
    });
  });

  const handleToggleSidebar = () => {
    document.querySelector(".sidebar").classList.toggle("visible");
    document
      .querySelector(".sidebar-overlay")
      .classList.toggle("active-overlay");
  };

  function handleDelete() {
    document.querySelector(".sidebar").classList.remove("visible");
    document
      .querySelector(".sidebar-overlay")
      .classList.remove("active-overlay");
  }

  return (
    <>
      <i className="fas fa-bars" onClick={() => handleToggleSidebar()}></i>
      <div className="sidebar-overlay" onClick={() => handleDelete()}></div>
      <div className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <span>M</span>ovies<span>.</span>
          </div>
          <span className="mobile-logo">M</span>
          <div className="sidebar-items">
            <Link className="sidebar-item active" to="/">
              <i className="fas fa-film"></i>
              Phim Đang Chiếu
            </Link>
            <Link className="sidebar-item" to="/addmovies">
              <i className="fas fa-plus"></i>
              Thêm Phim Mới
            </Link>
            <Link className="sidebar-item" to="/showtime">
              <i className="fas fa-calendar-alt"></i>
              Quản Lý Suất Chiếu
            </Link>
            <Link className="sidebar-item" to="/addshowtime">
              <i className="fas fa-plus"></i>
              Thêm Suất Chiếu
            </Link>
            <Link className="sidebar-item" to="/ticket">
              <i className="fab fa-bitcoin"></i>
              Doanh thu
            </Link>
            {/* <Link className="sidebar-item" to="/revenue">
              <i className="fab fa-bitcoin"></i>
              Doanh thu theo tháng
            </Link> */}
            <Link className="sidebar-item" to="/chart">
              <i className="fas fa-chart-bar"></i>
              Thống kê
            </Link>
            <Link className="sidebar-item" to="/account">
              <i className="fas fa-user"></i>
              Quản Lý Tài Khoản
            </Link>
          </div>
        </div>
        <div className="sidebar-bottom"></div>
      </div>
    </>
  );
}

export default Navbar;
