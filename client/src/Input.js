import React, { useState } from 'react';
import styles from './Input.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import usericon from './usericon.png';

const Input = () => {
    const [formData, setFormData] = useState({
        mineName: '',
        mineType: '',
        mineSize: '',
        location: '',
        coalType: '',
        fuelConsum:0,
        excavationAmount: '',  // Amount of coal extracted
        equipment: [{ type: '', quantity: '', fuelConsumedPerHr: '', hours: '', yearsWorked: '' }],
        transport: [{ 
            vehicleType: '', 
            fuelConsumptionPerKm: '', 
            distanceTraveled: '', 
            electricityConsumed: '',
            numberOfVehicles: '',
            workingDaysPerYear:''  // Add this field
        }]
    });

    const navigate = useNavigate();

    // Handle generic form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle specific transport-related changes
    const handleTransportChange = (index, e) => {
        const { name, value } = e.target;
        const updatedTransport = [...formData.transport];
        updatedTransport[index] = { ...updatedTransport[index], [name]: value };
        setFormData((prevData) => ({
            ...prevData,
            transport: updatedTransport,
        }));
    };

    // Add new transport entry
    const handleAddTransport = () => {
        if (formData.transport.length < 3) {
            setFormData((prevData) => ({
                ...prevData,
                transport: [...prevData.transport, { 
                    vehicleType: '', 
                    fuelConsumptionPerKm: '', 
                    distanceTraveled: '', 
                    electricityConsumed: '',
                    numberOfVehicles: '',
                    workingDaysPerYear: ''
                }],
            }));
        } else {
            alert('You can only add up to 3 transport entries.');
        }
    };

    // Remove a transport entry
    const handleRemoveTransport = (index) => {
        const updatedTransport = formData.transport.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            transport: updatedTransport,
        }));
    };

    // Handle specific equipment-related changes
    const handleEquipmentChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEquipment = [...formData.equipment];
        updatedEquipment[index] = { ...updatedEquipment[index], [name]: value };
        setFormData((prevData) => ({
            ...prevData,
            equipment: updatedEquipment,
        }));
    };

    // Add new equipment entry
    const handleAddEquipment = () => {
        setFormData((prevData) => ({
            ...prevData,
            equipment: [...prevData.equipment, { type: '', quantity: '', fuelConsumedPerHr: '', hours: '', yearsWorked: '' }],
        }));
    };

    // Remove an equipment entry
    const handleRemoveEquipment = (index) => {
        const updatedEquipment = formData.equipment.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            equipment: updatedEquipment,
        }));
    };

    // Calculate emissions and return the calculated data
    const calculateEmissions = (data) => {
        let coal = 0;
        let transportEmissions = 0;
        let transGD=0;
        let equipmentEmissions = 0;
        let fuelConsum1=0;

        // Constants for emission factors
        const dieselEmissionFactor = 2.68; // Emission factor in kg CO2/liter for Diesel
        const electricEmissionFactor = 0.475; // Emission factor in kg CO2/kWh for Electric

        // Calculate coal emissions based on mine type
        coal = data.excavationAmount * (data.mineType === 'Open-cast' ? 300 : 500);

        // Calculate transport emissions
        data.transport.forEach(trans => {
            const fuelConsumed = trans.fuelConsumptionPerKm * trans.distanceTraveled;
            
            fuelConsum1+=fuelConsumed*trans.workingDaysPerYear;
            const numberOfVehicles = trans.numberOfVehicles || 1;
            const k = trans.electricityConsumed * trans.distanceTraveled *trans.workingDaysPerYear;
            if (trans.vehicleType === 'Gasoline') {
                transportEmissions += 2.31 * fuelConsumed * numberOfVehicles *trans.workingDaysPerYear ;
                transGD+=2.31 * fuelConsumed * numberOfVehicles *trans.workingDaysPerYear;
            } else if (trans.vehicleType === 'Diesel') {
                transportEmissions += dieselEmissionFactor * fuelConsumed * numberOfVehicles *trans.workingDaysPerYear;
                transGD+=dieselEmissionFactor * fuelConsumed * numberOfVehicles *trans.workingDaysPerYear;  
            } else if (trans.vehicleType === 'Electric') {
                transportEmissions += electricEmissionFactor * k * numberOfVehicles;
            }
        });
        data.equipment.forEach(eq => {
            const fuelConsumed = eq.fuelConsumedPerHr * eq.hours * eq.yearsWorked * eq.quantity;
            equipmentEmissions += dieselEmissionFactor * fuelConsumed;
        });
        transportEmissions /= 1000;
        equipmentEmissions /= 1000;
        coal /= 1000;
        transGD/=1000;
        return {
            excavationEmissions: coal,
            transportEmissions,
            equipmentEmissions,
            transGD,
            fuelConsum1,
            totalEmissions: parseFloat((coal + transportEmissions + equipmentEmissions)).toFixed(2) // Total in tonnes
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emissionsData = calculateEmissions(formData);

        try {
            const response = await axios.post('/inputfromuser', formData);
            alert(response.data.message);
            navigate('/emission', { state: { emissionData: emissionsData ,data: formData} });
        } 
        catch (error) {
            console.error('Error during form submission:', error);
            alert('An error occurred: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className={styles.box}>
        <nav className={styles.navbar}>
        <div className={styles.navbarBrand}>Carbon Emission Neutralizer
        <img src={logo} height={90} width={90}></img>
        </div>
        <div className={styles.navbarLinks}>
        <Link to="/home">Home</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/about">About Us</Link>
          <a href='#contact'>Contact Us</a>
          <a href='/login'>Log Out</a>

          <Link to="/my-account">
            <img className={styles.usericon} src={usericon} alt='user-icon' height={40} width={40} />
          </Link>
        </div>
      </nav>
            <h1 className={styles.headtitle}>
            Carbon Footprint Calculator
            </h1>
            <h4 className={styles.contentcalu}>Calculate your Carbon Footprint credit amount using the following calculator, Provide all the details and get an idea about how much worth of carbon are you producing every year.</h4>
            <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h2 className={styles.head2}>Mine Details</h2>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Mine Name:</label>
                    <input type="text" name="mineName" value={formData.mineName} onChange={handleChange} />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Mine Type:</label>
                    <div className={styles.radiobutton}>
                        <label>
                            <input type="radio" name="mineType" value="Underground" checked={formData.mineType === "Underground"} onChange={handleChange} />
                            Underground
                        </label>
                        <label>
                            <input type="radio" name="mineType" value="Open-cast" checked={formData.mineType === "Open-cast"} onChange={handleChange} />
                            Open-cast
                        </label>
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Mine Size:</label>
                    <select
                        name="mineSize"
                        value={formData.mineSize}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Select Mine Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                </select>
                </div>
                <div className={styles.inputGroup}>
    <label className={styles.label}>Location (State or Region):</label>
    <select
        name="location"
        value={formData.location}
        onChange={handleChange}
        className={styles.select}
    >
        <option value="">Select Location</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
        <option value="Assam">Assam</option>
        <option value="Bihar">Bihar</option>
        <option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Delhi">Delhi</option>
        <option value="Goa">Goa</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Haryana">Haryana</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Kerala">Kerala</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
        <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
        <option value="Punjab">Punjab</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Sikkim">Sikkim</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="West Bengal">West Bengal</option>
        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
        <option value="Chandigarh">Chandigarh</option>
        <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
        <option value="Ladakh">Ladakh</option>
        <option value="Lakshadweep">Lakshadweep</option>
        <option value="Puducherry">Puducherry</option>
    </select>
</div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Coal Type:</label>
                    <select
                        name="coalType"
                        value={formData.coalType}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Select Coal Type</option>
                        <option value="Bituminous Coal">Bituminous Coal</option>
                        <option value="Sub-bituminous Coal">Sub-bituminous Coal</option>
                        <option value="Anthracite Coal">Anthracite Coal</option>
                        <option value="Lignite">Lignite(BrownCoal)</option>
                    </select>
                </div>

                <h2 className={styles.head2}>Activity-wise Data</h2>
                <h3 className={styles.head2}>Excavation</h3>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Amount of coal extracted in tons:</label>
                    <input type="number" name="excavationAmount" value={formData.excavationAmount} onChange={handleChange} />
                </div>

                <h3 className={styles.head2}>Transportation</h3>
                {formData.transport.map((trans, index) => (
                    <div key={index} className={styles.transportGroup}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Vehicle Type:</label>
                            <select name="vehicleType" value={trans.vehicleType} onChange={(e) => handleTransportChange(index, e)} className={styles.select}>
                                <option value="">Select Vehicle Type</option>
                                <option value="Gasoline">Gasoline</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                            </select>
                        </div>
                        {trans.vehicleType === 'Electric' ? (
                            <>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Electricity Consumed (in kWh):</label>
                                <input type="number" name="electricityConsumed" value={trans.electricityConsumed} onChange={(e) => handleTransportChange(index, e)} />
                            </div>
                            <div className={styles.inputGroup}>
                            <label className={styles.label}>Distance Travelled (in km):</label>
                            <input type="number" name="distanceTraveled" value={trans.distanceTraveled} onChange={(e) => handleTransportChange(index, e)} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Working Days (per year):</label>
                            <input type="number" name="workingDaysPerYear" value={trans.workingDaysPerYear} onChange={(e) => handleTransportChange(index, e)} />
                        </div>
                        </>
                        ) : (
                            <>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Fuel Consumption per km (in liters):</label>
                                    <input type="number" name="fuelConsumptionPerKm" value={trans.fuelConsumptionPerKm} onChange={(e) => handleTransportChange(index, e)} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Distance Travelled (in km):</label>
                                    <input type="number" name="distanceTraveled" value={trans.distanceTraveled} onChange={(e) => handleTransportChange(index, e)} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Working Days (per year):</label>
                                    <input type="number" name="workingDaysPerYear" value={trans.workingDaysPerYear} onChange={(e) => handleTransportChange(index, e)} />
                                </div>
                            </>
                        )}

                        <button type="button" className={styles.removeButton} onClick={() => handleRemoveTransport(index)}>
                            Remove Transport
                        </button>
                    </div>
                ))}
                <button type="button" className={styles.addButton} onClick={handleAddTransport}>
                    Add Transport Entry
                </button>

                <h3 className={styles.head2}>Equipment Usage</h3>
                {formData.equipment.map((eq, index) => (
                    <div key={index} className={styles.equipmentGroup}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Equipment Type:</label>
                            <input type="text" name="type" value={eq.type} onChange={(e) => handleEquipmentChange(index, e)} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Quantity:</label>
                            <input type="number" name="quantity" value={eq.quantity} onChange={(e) => handleEquipmentChange(index, e)} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Fuel Consumed per Hour (in liters):</label>
                            <input type="number" name="fuelConsumedPerHr" value={eq.fuelConsumedPerHr} onChange={(e) => handleEquipmentChange(index, e)} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Hours of Usage per Day:</label>
                            <input type="number" name="hours" value={eq.hours} onChange={(e) => handleEquipmentChange(index, e)} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Days Worked Per Year:</label>
                            <input type="number" name="yearsWorked" value={eq.yearsWorked} onChange={(e) => handleEquipmentChange(index, e)} />
                        </div>

                        <button type="button" className={styles.removeButton} onClick={() => handleRemoveEquipment(index)}>
                            Remove Equipment
                        </button>
                    </div>
                ))}
                <button type="button" className={styles.addButton} onClick={handleAddEquipment}>
                    Add Equipment Entry
                </button>

                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
        </div>
    );
};

export default Input;
