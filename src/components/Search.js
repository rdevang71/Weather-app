import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const popularCities = [
  "Port Blair", "Adoni", "Amaravati", "Anantapur", "Chandragiri", "Chittoor", 
  "Dowlaiswaram", "Eluru", "Guntur", "Kadapa", "Kakinada", "Kurnool", "Machilipatnam", 
  "Nagarjunakoṇḍa", "Rajahmundry", "Srikakulam", "Tirupati", "Vijayawada", "Visakhapatnam", 
  "Vizianagaram", "Yemmiganur", "Itanagar", "Dhuburi", "Dibrugarh", "Dispur", "Guwahati", 
  "Jorhat", "Nagaon", "Sivasagar", "Silchar", "Tezpur", "Tinsukia", "Ara", "Barauni", 
  "Begusarai", "Bettiah", "Bhagalpur", "Bihar Sharif", "Bodh Gaya", "Buxar", "Chapra", 
  "Darbhanga", "Dehri", "Dinapur Nizamat", "Gaya", "Hajipur", "Jamalpur", "Katihar", 
  "Madhubani", "Motihari", "Munger", "Muzaffarpur", "Patna", "Purnia", "Pusa", "Saharsa", 
  "Samastipur", "Sasaram", "Sitamarhi", "Siwan", "Chandigarh", "Ambikapur", "Bhilai", 
  "Bilaspur", "Dhamtari", "Durg", "Jagdalpur", "Raipur", "Rajnandgaon", "Daman", "Diu", 
  "Silvassa", "Delhi", "New Delhi", "Madgaon", "Panaji", "Ahmadabad", "Amreli", "Bharuch", 
  "Bhavnagar", "Bhuj", "Dwarka", "Gandhinagar", "Godhra", "Jamnagar", "Junagadh", "Kandla", 
  "Khambhat", "Kheda", "Mahesana", "Morbi", "Nadiad", "Navsari", "Okha", "Palanpur", 
  "Patan", "Porbandar", "Rajkot", "Surat", "Surendranagar", "Valsad", "Veraval", "Ambala", 
  "Bhiwani", "Chandigarh", "Faridabad", "Firozpur Jhirka", "Gurugram", "Hansi", "Hisar", 
  "Jind", "Kaithal", "Karnal", "Kurukshetra", "Panipat", "Pehowa", "Rewari", "Rohtak", 
  "Sirsa", "Sonipat", "Bilaspur", "Chamba", "Dalhousie", "Dharmshala", "Hamirpur", "Kangra", 
  "Kullu", "Mandi", "Nahan", "Shimla", "Una", "Anantnag", "Baramula", "Doda", "Gulmarg", 
  "Jammu", "Kathua", "Punch", "Rajouri", "Srinagar", "Udhampur", "Bokaro", "Chaibasa", 
  "Deoghar", "Dhanbad", "Dumka", "Giridih", "Hazaribag", "Jamshedpur", "Jharia", "Rajmahal", 
  "Ranchi", "Saraikela", "Badami", "Ballari", "Bengaluru", "Belagavi", "Bhadravati", 
  "Bidar", "Chikkamagaluru", "Chitradurga", "Davangere", "Halebid", "Hassan", "Hubballi-Dharwad", 
  "Kalaburagi", "Kolar", "Madikeri", "Mandya", "Mangaluru", "Mysuru", "Raichur", "Shivamogga", 
  "Shravanabelagola", "Shrirangapattana", "Tumakuru", "Vijayapura", "Alappuzha", "Vatakara", 
  "Idukki", "Kannur", "Kochi", "Kollam", "Kottayam", "Kozhikode", "Mattancheri", "Palakkad", 
  "Thalassery", "Thiruvananthapuram", "Thrissur", "Kargil", "Leh", "Balaghat", "Barwani", 
  "Betul", "Bharhut", "Bhind", "Bhojpur", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", 
  "Damoh", "Datia", "Dewas", "Dhar", "Dr. Ambedkar Nagar (Mhow)", "Guna", "Gwalior", 
  "Hoshangabad", "Indore", "Itarsi", "Jabalpur", "Jhabua", "Khajuraho", "Khandwa", "Khargone", 
  "Maheshwar", "Mandla", "Mandsaur", "Morena", "Murwara", "Narsimhapur", "Narsinghgarh", 
  "Narwar", "Neemuch", "Nowgong", "Orchha", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", 
  "Sagar", "Sarangpur", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", 
  "Ujjain", "Vidisha", "Ahmadnagar", "Akola", "Amravati", "Aurangabad", "Bhandara", "Bhusawal", 
  "Bid", "Buldhana", "Chandrapur", "Daulatabad", "Dhule", "Jalgaon", "Kalyan", "Karli", "Kolhapur", 
  "Mahabaleshwar", "Malegaon", "Matheran", "Mumbai", "Nagpur", "Nanded", "Nashik", "Osmanabad", 
  "Pandharpur", "Parbhani", "Pune", "Ratnagiri", "Sangli", "Satara", "Sevagram", "Solapur", 
  "Thane", "Ulhasnagar", "Vasai-Virar", "Wardha", "Yavatmal", "Imphal", "Cherrapunji", "Shillong", 
  "Aizawl", "Lunglei", "Kohima", "Mon", "Phek", "Wokha", "Zunheboto", "Balangir", "Baleshwar", 
  "Baripada", "Bhubaneshwar", "Brahmapur", "Cuttack", "Dhenkanal", "Kendujhar", "Konark", 
  "Koraput", "Paradip", "Phulabani", "Puri", "Sambalpur", "Udayagiri", "Karaikal", "Mahe", 
  "Puducherry", "Yanam", "Amritsar", "Batala", "Chandigarh", "Faridkot", "Firozpur", "Gurdaspur", 
  "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Nabha", "Patiala", "Rupnagar", "Sangrur", 
  "Abu", "Ajmer", "Alwar", "Amer", "Barmer", "Beawar", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", 
  "Chittaurgarh", "Churu", "Dhaulpur", "Dungarpur", "Ganganagar", "Hanumangarh", "Jaipur", 
  "Jaisalmer", "Jalor", "Jhalawar", "Jhunjhunu", "Jodhpur", "Kishangarh", "Kota", "Merta", 
  "Nagaur", "Nathdwara", "Pali", "Phalodi", "Pushkar", "Sawai Madhopur", "Shahpura", "Sikar", 
  "Sirohi", "Tonk", "Udaipur", "Gangtok", "Gyalshing", "Lachung", "Mangan", "Arcot", "Chengalpattu", 
  "Chennai", "Chidambaram", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", 
  "Kanchipuram", "Kanniyakumari", "Kodaikanal", "Kumbakonam", "Madurai", "Mamallapuram", 
  "Nagappattinam", "Nagercoil", "Palayamkottai", "Pudukkottai", "Rajapalayam", "Ramanathapuram", 
  "Salem", "Thanjavur", "Tiruchchirappalli", "Tirunelveli", "Tiruppur", "Thoothukudi", "Udhagamandalam", 
  "Vellore", "Hyderabad", "Karimnagar", "Khammam", "Mahbubnagar", "Nizamabad", "Sangareddi", 
  "Warangal", "Agartala", "Agra", "Aligarh", "Amroha", "Ayodhya", "Azamgarh", "Bahraich", "Ballia", 
  "Banda", "Bara Banki", "Bareilly", "Basti", "Bijnor", "Bithur", "Budaun", "Bulandshahr", "Deoria", 
  "Etah", "Etawah", "Faizabad", "Farrukhabad-cum-Fatehgarh", "Fatehpur", "Fatehpur Sikri", "Ghaziabad", 
  "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", 
  "Kannauj", "Kanpur", "Lakhimpur", "Lalitpur", "Lucknow", "Mainpuri", "Mathura", "Meerut", 
  "Mirzapur-Vindhyachal", "Moradabad", "Muzaffarnagar", "Partapgarh", "Pilibhit", "Prayagraj", 
  "Rae Bareli", "Rampur", "Saharanpur", "Sambhal", "Shahjahanpur", "Sitapur", "Sultanpur", "Tehri", 
  "Varanasi", "Almora", "Dehra Dun", "Haridwar", "Mussoorie", "Nainital", "Pithoragarh", "Alipore", 
  "Alipur Duar", "Asansol", "Baharampur", "Bally", "Balurghat", "Bankura", "Baranagar", "Barasat", 
  "Barrackpore", "Basirhat", "Bhatpara", "Bishnupur", "Budge Budge", "Burdwan", "Chandernagore", 
  "Darjeeling", "Diamond Harbour", "Dum Dum", "Durgapur", "Halisahar", "Haora", "Hugli", 
  "Ingraj Bazar", "Jalpaiguri", "Kalimpong", "Kamarhati", "Kanchrapara", "Kharagpur", "Cooch Behar", 
  "Kolkata", "Krishnanagar", "Malda", "Midnapore", "Murshidabad", "Nabadwip", "Palashi", "Panihati", 
  "Purulia", "Raiganj", "Santipur", "Shantiniketan", "Shrirampur", "Siliguri", "Siuri", "Tamluk", "Titagarh"
];

const Search = () => {
  const [searchMode, setSearchMode] = useState('city');
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [userCity, setUserCity] = useState('');

  const navigate = useNavigate();

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser');
    } else {
      setLocationStatus('Locating…');
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lon = position.coords.longitude.toFixed(6);
          setLatitude(lat);
          setLongitude(lon);

          try {
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=YOUR_API_KEY`);
            const data = await response.json();
            if (data.results && data.results[0]) {
              const cityName = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village;
              setUserCity(cityName || 'Unknown City');
              setLocationStatus('Location retrieved successfully ✅');
            } else {
              setLocationStatus('Unable to retrieve city name ❌ Please search by Co-ordinates');
            }
          } catch (error) {
            setLocationStatus('Error retrieving city name ❌');
          }
        },
        () => {
          setLocationStatus('Unable to retrieve your location ❌');
        }
      );
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    if (value.length > 0) {
      const filtered = popularCities.filter((c) =>
        c.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestedCity) => {
    setCity(suggestedCity);
    setSuggestions([]);
  };

  const handleCitySearch = () => {
    if (city.trim()) {
      navigate(`/weather?city=${encodeURIComponent(city.trim())}`);
    } else {
      alert('Please enter a valid city name.');
    }
  };

  

  return (
     <div
    className="d-flex justify-content-center align-items-center"
    style={{
      minHeight: 'calc(100vh - 56px)', // Adjust if your navbar height is different
      background: 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)',
      padding: 0,
      margin: 0,
    }}
  >
    <div
      className="p-4 rounded shadow"
      style={{
        backgroundColor: '#1e1e1e',
        color: '#fff',
        width: '100%',
        maxWidth: '700px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      }}
    >
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-light">
            <i className="fas fa-cloud-sun-rain me-2"></i>Weather Lookup
          </h1>
          <p className="text-white-50 fs-5">Search weather by city name or geographic coordinates</p>
        </div>

        <div className="bg-dark text-white rounded-4 shadow-lg p-4 p-md-5">
          {/* Location Section */}
          <div className="mb-4 border-bottom pb-3">
            <h4 className="mb-3"><i className="fas fa-crosshairs me-2 text-info"></i>Get Your Current Location</h4>
            <button className="btn btn-outline-info me-3" onClick={getLocation}>
              <i className="fas fa-location-arrow me-2"></i>Detect My Location
            </button>
            {locationStatus && <span className="text-warning">{locationStatus}</span>}
            {userCity && (
              <div className="mt-2 alert alert-success bg-opacity-25 border-0">
                <strong>Detected City: </strong> {userCity}
              </div>
            )}
          </div>

          {/* Search Mode Switch */}
          <div className="mb-4 border-bottom pb-3">
            <h4><i className="fas fa-sliders-h me-2 text-info"></i>Choose Search Method</h4>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="searchMode"
                id="searchByCity"
                value="city"
                checked={searchMode === 'city'}
                onChange={() => setSearchMode('city')}
              />
              <label className="form-check-label" htmlFor="searchByCity">By City</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="searchMode"
                id="searchByCoords"
                value="coords"
                checked={searchMode === 'coords'}
                onChange={() => setSearchMode('coords')}
              />
              <label className="form-check-label" htmlFor="searchByCoords">By Coordinates</label>
            </div>
          </div>

          {/* Conditional Rendering */}
          {searchMode === 'city' ? (
            <div className="mb-3 position-relative">
              <label className="form-label fs-5">Enter City Name</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., Jaipur"
                  value={city}
                  onChange={handleCityChange}
                />
                <button className="btn btn-info text-white" onClick={handleCitySearch}>
                  <i className="fas fa-search me-1"></i>Search
                </button>
              </div>
              {suggestions.length > 0 && (
                <ul className="list-group position-absolute w-100 mt-1 z-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {suggestions.map((suggestedCity, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleSuggestionClick(suggestedCity)}
                    >
                      {suggestedCity}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="mb-3">
              <label className="form-label fs-5">Enter Latitude and Longitude</label>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="number"
                    step="any"
                    className="form-control"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    step="any"
                    className="form-control"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </div>
              </div>
              <button
                className={`btn mt-3 ${latitude && longitude ? 'btn-success' : 'btn-outline-secondary'}`}
                onClick={() => navigate(`/weather?lat=${latitude}&lon=${longitude}`)}
                disabled={!latitude || !longitude}
              >
                <i className="fas fa-map-marker-alt me-1"></i>Search by Coordinates
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;