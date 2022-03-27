import React from "react";
import "./topbar.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/userRedux";

export default function Topbar() {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logOut());
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
          <img
            src="https://ps.w.org/avatar-privacy/assets/icon.svg?rev=1888388"
            alt=""
            className="topAvatar"
          />
          <button className="topbarIconContainer" onClick={signOut}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
