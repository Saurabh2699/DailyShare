import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/icon.jpg';
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const responseGoolge = (response) => {
    const decoded = jwt(response.credential);
    localStorage.setItem('user', JSON.stringify(decoded));
    const { name, sub, picture } = decoded;
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="flex px-5 gap-2 my-6 pt-1 w-20 justify-center items-center">
            <img src={logo} width="130px" />
            <h1 style={{ fontSize: '24px', color: 'white' }}>DailyShare</h1>
          </div>

          <div className="shadow-2xl">
            <GoogleLogin onSuccess={(response) => responseGoolge(response)} onError={(error) => console.log(error)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
