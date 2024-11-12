import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Navbar.css";

function Navbar() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=5"
        );
        const users = response.data.results.map((user, index) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          avatar: user.picture.large,
          score: Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000,
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

  if (usersData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
    </>
  );
}

export default Navbar;
