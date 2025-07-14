import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    problem: '',
    address: '',
    message: '',
    quality_rating: '0',
    service_rating: '0',
    delivery_rating: '0'
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: 20.5937, lng: 78.9629 });

  useEffect(() => {
    const map = L.map('map').setView([coordinates.lat, coordinates.lng], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    const marker = L.marker([coordinates.lat, coordinates.lng]).addTo(map);

    map.on('click', function (e) {
      marker.setLatLng(e.latlng);
      setCoordinates(e.latlng);
      setFormData(prev => ({
        ...prev,
        address: `Lat: ${e.latlng.lat.toFixed(5)}, Lng: ${e.latlng.lng.toFixed(5)}`
      }));
    });

    navigator.geolocation?.getCurrentPosition(position => {
      const userLoc = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setView(userLoc, 13);
      marker.setLatLng(userLoc);
      setCoordinates(userLoc);
      setFormData(prev => ({
        ...prev,
        address: `Lat: ${userLoc.lat.toFixed(5)}, Lng: ${userLoc.lng.toFixed(5)}`
      }));
    });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = {};
    ['name', 'email', 'phone', 'problem', 'message'].forEach(field => {
      if (!formData[field]) newErrors[field] = 'Required';
    });
    if (formData.problem === 'Feedback') {
      ['quality_rating', 'service_rating', 'delivery_rating'].forEach(field => {
        if (formData[field] === '0') newErrors[field] = 'Rate this';
      });
    }
    if (Object.keys(newErrors).length) return setErrors(newErrors);

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setFormData({
          name: '', email: '', phone: '', problem: '', address: '', message: '',
          quality_rating: '0', service_rating: '0', delivery_rating: '0'
        });
      }
    } catch {
      alert('Error submitting form');
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
        Contact Zorvac
      </h1>
      <p className="text-center mb-12 max-w-2xl mx-auto">
        Have questions or feedback? We'd love to hear from you.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur p-8 rounded-xl">
          {['name', 'email', 'phone', 'message'].map(field => (
            <div key={field} className="mb-4">
              <label className="block text-sm mb-2 capitalize">{field} *</label>
              <input
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full p-3 rounded bg-white/10 ${errors[field] ? 'border-red-500' : ''}`}
              />
              {errors[field] && <p className="text-red-400 text-sm">{errors[field]}</p>}
            </div>
          ))}

          <div className="mb-4">
            <label className="block mb-2">Issue *</label>
            <select name="problem" value={formData.problem} onChange={handleChange} className="w-full p-3 rounded bg-white/10">
              <option value="">Select an option</option>
              <option>Order Issue</option>
              <option>Product Question</option>
              <option>Return/Exchange</option>
              <option>Payment Problem</option>
              <option>Feedback</option>
              <option>Other</option>
            </select>
            {errors.problem && <p className="text-red-400 text-sm">{errors.problem}</p>}
          </div>

          {formData.problem === 'Feedback' && (
            ['quality_rating', 'service_rating', 'delivery_rating'].map(r => (
              <div key={r} className="mb-4">
                <label className="block mb-1 capitalize">{r.replace('_', ' ')}</label>
                <select name={r} value={formData[r]} onChange={handleChange} className="w-full p-3 rounded bg-white/10">
                  <option value="0">Rate from 1 to 5</option>
                  {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
                </select>
                {errors[r] && <p className="text-red-400 text-sm">{errors[r]}</p>}
              </div>
            ))
          )}

          <button disabled={submitting} className="w-full bg-purple-700 hover:bg-purple-800 py-3 mt-4 rounded text-white">
            {submitting ? 'Submitting...' : 'Submit'}
          </button>

          {success && (
            <div className="mt-4 p-4 text-green-300 border-l-4 border-green-500 bg-green-900/30">
              Thank you! Your message has been sent.
            </div>
          )}
        </form>

        <div>
          <h2 className="text-xl font-bold mb-2">Set Your Location</h2>
          <div id="map" className="rounded-lg h-96 border border-purple-400"></div>
          <div className="mt-2 text-sm text-purple-300">Latitude: {coordinates.lat.toFixed(5)}, Longitude: {coordinates.lng.toFixed(5)}</div>
        </div>
      </div>
    </div>
  );
}