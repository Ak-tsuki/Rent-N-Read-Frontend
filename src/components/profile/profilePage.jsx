import React, { useState, useEffect } from "react";

import axios from "axios";
import "./profile.scss";

const ProfilePage =({profile})=>{
    const [userDetails, setUserDetails] = useState("");

    const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      useEffect(() => {
        axios
          .get("http://localhost:90/user/get", config)
          .then((res) => {
            setUserDetails(res.data.data);
            
          })
          .catch((e) => {
            console.log(e);
          });
      }, []);

    return(
        <>
        <div className="container">
            <h1 className="heading-profile">Profile</h1>
            
            <div className="user_profilePicture">
                <img 
                src={
                    userDetails.profile_pic
                      ? `http://localhost:90/${userDetails.profile_pic}`
                      : "https://www.pngitem.com/pimgs/m/421-4212341_default-avatar-svg-hd-png-download.png"
                  }
                  alt="profile_img"
                  className="img"
                />
                
                <div className="user_details">
                <p className="detail">Full Name:      <br/>{userDetails.first_name} {userDetails.last_name}</p>                      
                <p className="detail">Gender:          <br/>{userDetails.gender}</p>
                <p className="detail">Contact Number:  <br/>{userDetails.contact_no}</p>
                <p className="detail">Email:           <br/>{userDetails.email}</p>
                <p className="detail">Address:           <br/>{userDetails.address}</p>
                
                
            </div>
            </div>
            </div>
            
        </>
    )
}
export default ProfilePage;