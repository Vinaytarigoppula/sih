import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Slider from 'rc-slider';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, BarElement, PointElement, Tooltip, Legend, DoughnutController, ArcElement } from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup,useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'rc-slider/assets/index.css'; // Import rc-slider styles
import L from 'leaflet';
import axios from 'axios';
import styles from './Afforestation.module.css';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS
import markerIcon from 'leaflet/dist/images/marker-icon.png'; // Marker icon image
import markerShadow from 'leaflet/dist/images/marker-shadow.png'; // Marker shadow image
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'; // Marker icon 2x for retina screens
import logo from './logo.png';
import { Link } from 'react-router-dom';
import usericon from './usericon.png';


ChartJS.register(CategoryScale, LinearScale, LineElement, BarElement, PointElement, Tooltip, Legend, DoughnutController, ArcElement);

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const MapUpdater = ({ userLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (userLocation.lat !== 0 && userLocation.lng !== 0) {
      map.setView([userLocation.lat, userLocation.lng], 14); // Zoom in to user location with level 14
    }
  }, [userLocation, map]);

  return null;
};
const Afforestation = () => {
  let gap;
  const location = useLocation();
  const navigate=useNavigate();
  // Retrieve the formData and emissionData from location.state
  const formData = location.state?.formData;
  const emission = location.state?.emissionData;
  console.log(emission);
  useEffect(() => {
    if (emission) {
      console.log('Emission Data:', emission);
    } else {
      console.log('No emission data available.');
    }
  }, [emission]);
  const [totalcc, setgap] = useState(30);
  const [Sgap, setSgap] = useState(30);
  const [electricPercentage, setElectricPercentage] = useState(30);
  const [solarPercentage, setSolarPercentage] = useState(20);
  const [tottalSeq,setTotalSeq]=useState(0);
  const [methanePercentage, setMethanePercentage] = useState(15);
  const [afforestationPercentage, setAfforestationPercentage] = useState(35);
  const [userLocation, setUserLocation] = useState({ lat: 17.385044, lng: 78.486671 }); // Default to Hyderabad coordinates
  const [mineLocations, setMineLocations] = useState([]);
  const [emissionRate, setEmissionRate] = useState(44316.31); // Updated emission rate
  const [reqLand, setReqLand] = useState(53617.46); // Updated required land
  const [solarNeeded, setSolarNeeded] = useState(9427.25); // Updated solar energy required
  const [electricVehicles, setElectricVehicles] = useState(4); // Updated electric vehicles required
  const [methaneCaptured, setMethaneCaptured] = useState([0, 0, 0, 0]); // State for methane captured
  const absorptionRatePerHectare = 10;

  useEffect(() => {
    const remaining = 100 - (electricPercentage + solarPercentage + methanePercentage);
    setAfforestationPercentage(Math.max(0, remaining)); // Ensure percentage is non-negative
  }, [electricPercentage, solarPercentage, methanePercentage]);
 

  // Fetch user location and mine locations
  useEffect(() => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }, error => {
        console.error("Error getting user location:", error);
      });
    }
    
    axios.get('/Afforestation')
      .then(response => {
        let area_covered = response.data.area.area_covered_sqm / 10000;
        let seq = response.data.area.sequestration_rate;
        const totalSeq = area_covered * seq;
        setTotalSeq(totalSeq);
         gap = emissionRate - totalSeq;
        const Egap = gap * (electricPercentage / 100);
        const Sgap = gap * (solarPercentage / 100);
        const Mgap = gap * (methanePercentage / 100);
        setSgap(Sgap)
        const Agap = gap - (Egap + Sgap + Mgap);
        const noOfElectric = Math.round(Egap / emission.transGD);
        const solarNeeded = Sgap / 0.91; // assuming 0.91 tons per kWh
        const totalMethaneEmitted = formData.excavationAmount * response.data.methaneRate.emission_factor;
        const captured = response.data.methanEfficiency.map(system => totalMethaneEmitted * (system.efficiency_percentage / 100));
        const totalcc=emissionRate-gap;
        
        setgap(totalcc);
        setElectricVehicles(noOfElectric);
        setSolarNeeded(solarNeeded);
        setMethaneCaptured((captured).toFixed(2)); // Update methane captured state
        
        if (gap < 0) {
          const cc = gap * 1;
          const ccRate = cc * 13.68;
        } else {
          const requiredLand = Agap / seq;
          setReqLand(requiredLand); // Update reqLand state
        }
      })
      .catch(error => {
        console.error("Error fetching mine locations:", error);
      });
  }, [formData, emission, electricPercentage, solarPercentage, methanePercentage]); // Added dependencies
  const handleDownloadButton = () => {
    navigate('/report',{ state: { emission ,formData,solarPercentage,methanePercentage,methaneCaptured,Sgap,electricPercentage,reqLand,tottalSeq,totalcc} });
  };
  const lineData = {
    labels: ['Before Afforestation', 'After Afforestation'],
    datasets: [
      {
        label: 'Emission Rates (tons)',
        data: [emissionRate, totalcc],
        borderColor: '#2196F3',
        pointBackgroundColor: '#64B5F6',
        fill: false,
      },
    ],
  };
  
  const barData = {
    labels: ['Before Afforestation', 'After Afforestation'],
    datasets: [
      {
        label: 'Carbon Credits',
        backgroundColor: ['#FFC107', '#03A9F4'],
        borderColor: ['#FFA000', '#0288D1'],
        borderWidth: 1,
        hoverBackgroundColor: ['#FFB300', '#039BE5'],
        hoverBorderColor: ['#FFA000', '#0288D1'],
        data: [50, 100],
      },
    ],
  };
  
  const methaneCaptureData = {
    labels: ['VCC', 'CMM', 'AMM', 'Flaring'],
    datasets: [
      {
        label: 'Methane Captured (tons)',
        data: [80,30,90,50],
        backgroundColor: '#FFEB3B',
        borderColor: '#FBC02D',
        borderWidth: 1,
      },
    ],
  };
  
  const pieData = {
    labels: ['Afforestation', 'Electric Vehicles', 'Solar Energy', 'Methane Capture'],
    datasets: [
      {
        data: [afforestationPercentage, electricPercentage, solarPercentage, methanePercentage],
        backgroundColor: ['#2E8B57', 'red', '#FFEB3B', '#FF5722'],
        borderColor: ['#2E8B57', '#4CAF50', '#FFEB3B', '#FF5722'],
        borderWidth: 1,
      },
    ],
  };
  

  return (
    <div className={styles.container}>
        
       <div className={styles.map}>
          <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={12} style={{ height: '700px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[userLocation.lat, userLocation.lng]} icon={customIcon}>
              <Popup>
                Your current location
              </Popup>
            </Marker>
            {/* Add markers for mine locations */}
            {mineLocations.map((mine, index) => (
              <Marker key={index} position={[mine.lat, mine.lng]} icon={customIcon}>
                <Popup>{mine.mine_name} at {mine.lat}, {mine.lng}</Popup>
              </Marker>
            ))}
            {/* Call the MapUpdater component to center the map on the user's location */}
            <MapUpdater userLocation={userLocation} />
          </MapContainer>
        </div>
        <div className={styles.maincontainer}>
        <nav className={styles.navbar}>
        <div className={styles.navbarBrand}>Carbon Emission Neutralizer
        <img src={logo} height={90} width={90}></img>
        </div>
        <div className={styles.navbarLinks}>
          <Link to="/home">Home</Link>
          <a href='/login'>Log Out</a>          
          <Link to="/my-account">
            <img className={styles.usericon} src={usericon} alt='user-icon' height={40} width={40} />
          </Link>
        </div>
      </nav>
      <h2 className={styles.title}>Afforestation and Carbon Neutrality 
      <button onClick={handleDownloadButton} className={styles.downloadbutton}>Download Report</button></h2>
      <div className={styles.slidersContainer}>
        <div className={styles.sliderSection}>
          <h3>Electric Vehicles: {electricPercentage}%</h3>
          <Slider
            min={0}
            max={100}
            value={electricPercentage}
            onChange={(value) => setElectricPercentage(value)}
            trackStyle={{ backgroundColor: '#4CAF50', height: 10 }}
            handleStyle={{
              borderColor: '#4CAF50',
              height: 24,
              width: 24,
              marginLeft: -12,
              marginTop: -7,
              backgroundColor: '#FFF',
            }}
            railStyle={{ backgroundColor: '#D3D3D3', height: 10 }}
          />
        </div>

        <div className={styles.sliderSection}>
          <h3>Solar Energy: {solarPercentage}%</h3>
          <Slider
            min={0}
            max={100}
            value={solarPercentage}
            onChange={(value) => setSolarPercentage(value)}
            trackStyle={{ backgroundColor: '#FFA500', height: 10 }}
            handleStyle={{
              borderColor: '#FFA500',
              height: 24,
              width: 24,
              marginLeft: -12,
              marginTop: -7,
              backgroundColor: '#FFF',
            }}
            railStyle={{ backgroundColor: '#D3D3D3', height: 10 }}
          />
        </div>

        <div className={styles.sliderSection}>
          <h3>Methane Capture: {methanePercentage}%</h3>
          <Slider
            min={0}
            max={100}
            value={methanePercentage}
            onChange={(value) => setMethanePercentage(value)}
            trackStyle={{ backgroundColor: '#FF6347', height: 10 }}
            handleStyle={{
              borderColor: '#FF6347',
              height: 24,
              width: 24,
              marginLeft: -12,
              marginTop: -7,
              backgroundColor: '#FFF',
            }}
            railStyle={{ backgroundColor: '#D3D3D3', height: 10 }}
          />
        </div>
      </div>

    
        <div className={styles.chart1}>
       
      <div className={styles.infosection2}>
          <h3>Emission Offset Needs</h3>
          <Doughnut data={pieData} />
        </div>
        </div>
        <div className={styles.chartsContainer}>

        <div className={styles.chart}>
          <h3>Methane Capture Systems</h3>
          <Bar data={methaneCaptureData} />
        </div>

        <div className={styles.chart}>
          <h3>Emission Reduction Over Time</h3>
          <Line data={lineData} />
        </div>

        <div className={styles.chart}>
          <h3>Carbon Credits</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Afforestation;