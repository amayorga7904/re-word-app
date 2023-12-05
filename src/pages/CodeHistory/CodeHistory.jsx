import React, { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const CODE_HISTORY_API_URL = 'http://localhost:3000/api/codes/history'

export default function CodeHistory() {
    const [codes, setCodes] = useState([]);
  
    useEffect(() => {
      // Fetch saved codes when the component mounts
      const fetchCodes = async () => {
        try {
          const reply = await axios.get(CODE_HISTORY_API_URL);
          console.log(reply)
          setCodes(reply.data);
         setTimeout(() => {
          console.log('alex is awesome', codes)
         }, 2000)
  
        } catch (error) {
          console.error('Error fetching codes:', error);
        }
      };
  
      fetchCodes();
    }, []);
  
    console.log(codes)

  return (
    <div>
      <h1>Code History</h1>
      {Array.isArray(codes) ? (
        <ul>
          {codes.map((code) => (
            <li key={code._id}>
            <strong>Code:</strong> {code.code}<br />
            <strong>Explanation:</strong> {code.reply}<br />
            {/* emphasize */}
            <em>Timestamp: {new Date(code.timestamp).toLocaleString()}</em>
            <p>________________________</p>
          </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}