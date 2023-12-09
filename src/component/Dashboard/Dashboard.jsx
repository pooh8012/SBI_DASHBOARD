import React, { useState, useEffect } from 'react';
import Tile from '.././Tiles/Tiles'; 
import '../../tailwind.css';

const Dashboard = () => {
  const [selectedQuarter, setSelectedQuarter] = useState('quarter1');
  const [quarterData, setQuarterData] = useState({});
  const [error, setError] = useState(null);

  const quarters = [
    { value: 'quarter1', label: 'Quarter 1 (Dec 22)' },
    { value: 'quarter2', label: 'Quarter 2 (Mar 23)' },
    { value: 'quarter3', label: 'Quarter 3 (Jun 23)' },
    { value: 'quarter4', label: 'Quarter 4 (Sep 23)' },
  ];

  const fetchData = async (quarter) => {
    try {
      //const response = await fetch(`http://localhost:5000/api/metrics/${quarter}`);
      const response = await fetch(`https://sbi-dashboard-api.onrender.com/api/metrics/${quarter}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setQuarterData(data);
      setError(null); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.');
    }
  };

  useEffect(() => {
    fetchData(selectedQuarter);
  }, [selectedQuarter]);

  const handleQuarterChange = (event) => {
    setSelectedQuarter(event.target.value);
  };

  return (
    <div className="dashboard p-5 bg-gray-100">
      <h1 className="text-3xl mb-4 font-bold text-gray-800">SBI Metrics Dashboard</h1>
      <select
        value={selectedQuarter}
        onChange={handleQuarterChange}
        className="p-2 rounded-md border border-gray-300 bg-white text-gray-800 text-lg mb-4"
      >
        {quarters.map((quarter) => (
          <option key={quarter.value} value={quarter.value}>
            {quarter.label}
          </option>
        ))}
      </select>
      
      <div className="tiles-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Tile title="Revenue" value={quarterData?.revenue || ''} />
        <Tile title="Net Income" value={quarterData?.netIncome || ''} />
        <Tile title="Net Profit" value={quarterData?.netProfit || ''} />
        <Tile title="Operating Income" value={quarterData?.operatingIncome || ''} />
      </div>

      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default Dashboard;
