import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from './CarbonEmission.module.css';
import v2 from './v2.mp4';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import usericon from './usericon.png';



// Registering the necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const CarbonEmission = () => {
    const location = useLocation();
    
    // Retrieve the formData from location.state
    const formData = location.state?.data;

    useEffect(() => {
        if (formData) {
            console.log('Form Data:', formData);
        } else {
            console.log('No form data available.');
        }
    }, [formData]);
    
    const navigate = useNavigate();
  
    const handleNeutralizeClick = () => {
        // Passing emissionData to the Afforestation page
        navigate('/afforestation', { state: { emissionData ,formData} });
    };

    const emissionData = location.state?.emissionData || {
        excavationEmissions: 0,
        transportEmissions: 0,
        equipmentEmissions: 0,
        totalEmissions: 0,
    };
    console.log(emissionData);


    useEffect(() => {
        // If emissionData is not available, navigate to the home page
        if (!location.state?.emissionData) {
            alert('Emission data not found. Please go back and submit the form again.');
            navigate('/');
        }
    }, [location.state?.emissionData, navigate]); // Dependency array ensures this effect runs only when these variables change
    
    // If emissionData is still undefined, return null to prevent further rendering
    if (!emissionData) return null;

    const data = {
        labels: ['Excavation Emissions', 'Transport Emissions', 'Equipment Emissions'],
        datasets: [
            {
                label: 'CO2 Emissions (Tonnes)',
                data: [
                    emissionData.excavationEmissions,
                    emissionData.transportEmissions,
                    emissionData.equipmentEmissions,
                ],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allows custom sizing
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (context.parsed !== null) {
                            label += `: ${context.parsed.toFixed(2)} Tonnes`;
                        }
                        return label;
                    }
                }
            }
        }
    };

    return (
        <div className={styles.container}>
  <video autoPlay muted loop className={styles.videoBackground}>
    <source src={v2} type="video/mp4" />
    <source src={v2} type="video/webm" />
    Your browser does not support the video tag.
  </video>

  <h1 className={styles.title}>Carbon Emissions Breakdown</h1>

  <div className={styles.mainContent}>
    <div className={styles.tablecontainer}>
      <div className={styles.table}>
        <h3 className={styles.title2}>Carbon Emission Data</h3>
        <table >
          <thead>
            <tr>
              <th>Activity</th>
              <th>Carbon Emission</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Excavation</td>
              <td>{emissionData.excavationEmissions} Tons</td>
            </tr>
            <tr>
              <td>Transport</td>
              <td>{emissionData.transportEmissions} Tons</td>
            </tr>
            <tr>
              <td>Equipment</td>
              <td>{emissionData.equipmentEmissions} Tons</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className={styles.chartWrapper}>
      <div className={styles.chartContainer}>
        <Pie data={data} options={options} />
      </div>
    </div>
  </div>

  <div className={styles.summary}>
    <h2>Total Emissions: {emissionData.totalEmissions} Tonnes</h2>
  </div>

  <button className={styles.afforestation} onClick={handleNeutralizeClick}>
    Neutralize
  </button>
</div>
    );
};

export default CarbonEmission;