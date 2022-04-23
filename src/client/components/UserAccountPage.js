import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Header } from './Header'
import { Sidebar } from "./homepage/Sidebar";
import { Footer } from "./Footer";

export const UserAccountPage = () => {

    const location = useLocation();

    const mapRef = useRef();

  return (
    <div className="flex-col">
        <Header user={user} setUser={setUser} setLoggingOut={setLoggingOut} />
        <div className="flex relative">
          <Sidebar apiEvents={apiEvents} setApiEvents={setApiEvents} user={user} setMapBase={setMapBase} mapRef={mapRef} setCircleRadius={setCircleRadius} />
        </div>
    </div>
  )
}