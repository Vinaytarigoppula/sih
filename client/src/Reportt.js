import React, { useEffect, useRef ,useState} from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { useReactToPrint } from 'react-to-print';
import styles from './Reportt.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const ReportPage = () => {
  const location = useLocation();
  const reportRef = useRef();
  const formData = location.state?.formData;
  const emission = location.state?.emission;
  const solar = location.state?.solarPercentage;
  const methane = location.state?.methanePercentage;
  const methaneCapture = location.state?.methaneCaptured;
  const Sgap = location.state?.Sgap;
  const electricPercentage = location.state?.electricPercentage;
  const reqland = location.state?.reqLand;
  const totalseq = location.state?.tottalSeq;
  const totalcc = location.state?.totalcc;
  let mathaneConsum=0;
  let f=0;
  // Sample data for charts
  useEffect(()=>
  {
    console.log(methaneCapture)
    console.log(emission);
    axios.get('/report').then(response=>{
      console.log(response.data.forest.state);
      setUserLocation(response.data.forest.state);
      setSeq(response.data.sequestration_rate);
      setTreeSpecies(response.data.forest.type_of_plantation)
    })
    
  },[formData,emission])
  
  const [userLocation, setUserLocation] = useState();

  const [TreeSpecies, setTreeSpecies] = useState(30);
  const [seq, setSeq] = useState(30);
  const data = {
    labels: ['Excavation Emissions', 'Transport Emissions', 'Equipment Emissions'],
    datasets: [
        {
            label: 'CO2 Emissions (Tonnes)',
            data: [
                emission.excavationEmissions,
                emission.transportEmissions,
                emission.equipmentEmissions,
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
    ],
};

const lineeData = {
  labels: ['Before Clean Tech', 'After Clean Tech'],
  datasets: [
    {
      label: 'Emissions (tons of CO2)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light greenish-blue fill
      borderColor: 'rgba(75, 192, 192, 1)', // Darker greenish-blue border
      pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Blue for data points
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
      data: [
        totalcc,
        emission.totalEmissions
      ], // Emission values before and after clean tech
    },
  ],
};
  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
  });

  return (
    <div className={styles.reportcontainer} ref={reportRef} style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Carbon Emission Report</h1>
      
      {/* Overview Section */}
      <section>
        <h2>Overview</h2>
        <p><strong>Mine Name:</strong> {formData.mineName}</p>
        <p><strong>Location:</strong> {formData.location}</p>
        <p><strong>Total Emissions:</strong> {emission.totalEmissions} tons of CO2</p>
      </section>
      
      {/* Emission Breakdown Table */}
      <section>
        <h2>Emission Breakdown</h2>
        <table border="1" cellPadding="10" style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>Activity</th>
              <th>CO2 Emissions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Excavation</td>

              <td>{(emission.excavationEmissions).toFixed(2)} Tons</td>
            </tr>
            <tr>
              <td>Transportation</td>

              <td>{(emission.transportEmissions).toFixed(2)} Tons</td>
            </tr>
            <tr>
              <td>Equipment Usage</td>
   
              <td>{(emission.equipmentEmissions).toFixed(2)} Tons</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Charts Section */}
      <section style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
          <h3>Emission Sources</h3>
          <Pie data={data} />
        </div>
        <div className={styles.emissionreduction}style={{ width: '30%' }}>
          <h3>Emission Reduction</h3>
          <Line data={lineeData} />
        </div>
        
      </section>

      {/* Clean Technologies and Cost Analysis */}
      <section className={styles.cleantechnologies}>
        <h2>Clean Technologies Impact</h2>
        <table border="1" cellPadding="10" style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>Technology</th>
              <th>Emissions Reduced (tons)</th>
              <th>Percentage Reduction</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>Electric Vehicle</td>
              <td>{Sgap} tons</td>
              <td>{electricPercentage}%</td>
            </tr>
            <tr>
              <td>Solar</td>
              <td>{Sgap} tons</td>
              <td>{solar}%</td>
            </tr>
            <tr>
              <td>Methane Capture Systems</td>
              <td>69.4444</td>
              <td>{methane}%</td>
            </tr>
          </tbody>
          
        </table>
      </section>
      <section>
        <h2>Afforestation Details</h2>
        <table border="1" cellPadding="10" style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>Location</th>
              <th>Area Allocated(Hectars)</th>
              <th>Tree Species</th>
              <th>CO2 Absorbed</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>{userLocation}</td>
              <td> {reqland} Hectars</td>
              <td>Sal</td>
              <td>{(totalseq).toFixed(2)} Tons</td>
            </tr>
          </tbody>
          
        </table>
      </section>
      <section>
        <h2>Carbon Credits</h2>
        <table border="1" cellPadding="10" style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>Before Afforestation/Clean Technologies</th>
              <th>After Afforestation/Clean Technologies</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>{parseInt(totalcc)}</td>
              <td>{parseInt(emission.totalEmissions)}</td>
            </tr>
          </tbody>
          </table>
  </section>      
      {/* Key Insights and PDF Button */}
      <section>
        <h2>Key Insights</h2>
        <p>
          The mine has significantly reduced its carbon emissions by adopting clean technologies such as electric vehicles 
          and methane capture systems. The progress toward carbon neutrality is evident, with a reduction of 40 tons of CO2 
          achieved within three years. Further afforestation and clean energy adoption are recommended to meet carbon neutrality targets.
        </p>
      </section>

      <button onClick={handlePrint} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#36A2EB', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Download PDF Report
      </button>
    </div>
  );
};

export default ReportPage;
