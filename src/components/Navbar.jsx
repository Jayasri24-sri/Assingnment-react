import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import screenfull from "screenfull";
import "./Navbar.css";

function Navbar() {
  const [usersData, setUsersData] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=8"
        );
        const users = response.data.results.map((user, index) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          avatar: user.picture.large,
          score: 54375,
          number: index + 1,
          email: user.email,
        }));
        setUsersData(users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsersData();
  }, []);

  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(containerRef.current);
    }
  };

  useEffect(() => {
    if (screenfull.isEnabled) {
      const handleScreenChange = () => setIsFullScreen(screenfull.isFullscreen);
      screenfull.on("change", handleScreenChange);
      return () => screenfull.off("change", handleScreenChange);
    }
  }, []);

  if (usersData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div ref={containerRef} className="fullscreen-container">
      <button className="fullscreen-btn" onClick={toggleFullScreen}>
        {isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
      </button>
      {usersData.map((user) => (
        <div key={user.id} className="navbar">
          <div className="number">{user.number}</div>
          <div className="avatar">
            <img src={user.avatar} alt="User Avatar" />
          </div>
          <div className="info">
            <div className="name">{user.name}</div>
            <div className="email">{user.email}</div>
          </div>
          <div className="score">&pound; {user.score.toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}

export default Navbar;
