import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './admin.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Admin() {
  const logout = () => {
    // destroy the cookie
    cookies.remove('TOKEN', { path: '/' });
    // redirect user to the landing page
    localStorage.clear();
    window.location.href = '/';
  };

  const [state, setState] = useState('');
  const [booking, setBooking] = useState('');
  const [connections, setConnection] = useState('');

  const handleSubmit = () => {
    const configuration = {
      method: 'post',
      url: 'http://localhost:3001/display',
      data: {},
    };
    axios(configuration)
      .then((result) => {
        setState(result);
        localStorage.setItem('Result', JSON.stringify(state.data.result));
      })
      .catch((error) => {
        error = new Error();
      });
  };

  const handleSubmit2 = () => {
    const configuration = {
      method: 'post',
      url: 'http://localhost:3001/displaybooking',
      data: {},
    };
    axios(configuration)
      .then((result) => {
        setBooking(result);
        localStorage.setItem('Bookings', JSON.stringify(booking.data.result));
      })
      .catch((error) => {
        error = new Error();
      });
  };

  const handleSubmit3 = () => {
    const configuration = {
      method: 'post',
      url: 'http://localhost:3001/displayconnections',
      data: {},
    };
    axios(configuration)
      .then((result) => {
        setConnection(result);
        localStorage.setItem(
          'Connections',
          JSON.stringify(connections.data.result)
        );
      })
      .catch((error) => {
        error = new Error();
      });
  };
  useEffect(() => {
    handleSubmit();
    handleSubmit2();
    handleSubmit3();
  });
  return (
    <>
      <div className="portal">
        <h1>Admin Portal</h1>
        <div className="admin">
          <div className="users">
            <Link to="/showusers" className="mb-2 mb-21">
              USERS
            </Link>
          </div>
          <div className="bookings">
            <Link to="/showbooking" className="mb-22">
              BOOKINGS
            </Link>
          </div>
          <div className="connections">
            <Link to="/showconnection" className="mb-23">
              CONNECTIONS
            </Link>
          </div>
        </div>
        <div className="button">
          <Button type="submit" variant="danger" onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
