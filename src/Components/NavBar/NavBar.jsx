import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import style from "./NavBar.module.css";
import logo from "../../Assets/logo.svg";
import image from "../../Assets/image.svg";

const NavBar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/monitoring");
  }, []);

  const navbarOptions = [
    "Overview",
    "OnBoarding",
    "Monitoring",
    "Flagging",
    "Source Of Income",
    "UAR",
  ];

  return (
    <div className={style.container}>
      <div className={style.leftComponent} id="leftComponent">
        <div className={style.column}>
          <img src={logo} className={style.logo} alt="" />
          <div className={style.navbarOptions}>
            {navbarOptions.map((option, index) => (
              <div
                className={`${"/" + option.toLowerCase() === window.location.pathname &&
                  style.selectedNavItem
                  } ${style.navbarItem}`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        <div className={style.row}>
          <img src={image} alt="" />
          <div className={style.flexColumn} style={{ justifyContent: "flex-start" }}>
            <h1>Elon Musk</h1>
            <p>elon@twitter.com</p>
          </div>
        </div>
      </div>
      <div
        className={style.rightComponent}
        style={{
          marginLeft: document.getElementById("leftComponent")?.clientWidth,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;
