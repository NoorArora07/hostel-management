import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeeStatus = () => {
    const [feeStatus, setFeeStatus] = useState(null);
  
    const getFeeStatus = async () => {
      try {
        const response = await axios.get('');
        setFeeStatus(response.data);
      } catch (error) {
        console.error('Error fetching fee status:', error);
        alert('Failed to fetch fee status.');
      }
    };
  
    React.useEffect(() => {
      getFeeStatus();
    }, []);
  
    return (
      <div>
        <h1>Fee Status</h1>
        {feeStatus ? (
          <div>
            <p>Name: {feeStatus.name}</p>
            <p>Student ID: {feeStatus.studentId}</p>
            <p>Status: {feeStatus.status}</p>
            <p>Amount: ${feeStatus.amount}</p>
            <p>Amount: ${feeStatus.sessionId}</p>
          </div>
        ) : (
          <p>Loading fee status...</p>
        )}
      </div>
    );
  };

  export default FeeStatus;