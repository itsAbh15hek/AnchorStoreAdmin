import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleclick = async (e) => {
    e.preventDefault();
    await login(dispatch, { username, password });

    window.location.reload();
  };

  return (
    <form
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={(e) => handleclick(e)}
        type="submit"
        style={{ padding: "10px 30px", marginBottom: 20 }}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
