import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  const fetchData = async () => {
    const url = "URL/account/profile";
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };
    try {
      const response = await axios.get(url, config);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Profile Data</button>
      {data && (
        <ul>
          <li>Name: {data.name}</li>
          <li>Email: {data.email}</li>
          <li>Avatar: {data.avatar}</li>
        </ul>
      )}
    </div>
  );
};

export default Profile;
