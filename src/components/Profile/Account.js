import React, { useEffect, useState } from 'react';
import './style/Account.css';
import { message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get('/api/v1/user/getUserProfile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error('error get user detail');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const edit = () => {
    navigate('/profile/accountSetting');
  };

  const linkStyle = {
    fontFamily: 'CaveatVarialbleFont',
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {user ? (
        <div>
          <h2 style={linkStyle} className="text-center text-black mb-4">
            Personal Profile
          </h2>
          <div style={linkStyle} className="userProfile">
            <div className="mb-3">
              <p className="text-black fs-5 fw-bold">
                Name: <span className="text-info">{user.name}</span>
              </p>
            </div>
            <div className="mb-3">
              <p className="text-black fs-5 fw-bold">
                Email: <span className="text-info">{user.email}</span>
              </p>
            </div>
            <div className="mb-3">
              <p className="text-black fs-5 fw-bold">
                Phone: <span className="text-info">{user.phone}</span>
              </p>
            </div>
            <div>
              <button className="btn btn-warning" type="submit" onClick={edit}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center text-center">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Account;
