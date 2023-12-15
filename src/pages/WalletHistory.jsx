import React from 'react';
import './WalletHistory.css'; 

const WalletHistory = () => {

  const data = [
    { name: 'John', date: '2023-12-10', type: 'Send', amount: '$100' },
    { name: 'Alice', date: '2023-12-11', type: 'Receive', amount: '$150' },
   
  ];

  return (
    <div className="table-container">
      <table className="demo-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.date}</td>
              <td>{row.type}</td>
              <td>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletHistory;
