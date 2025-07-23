import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar'; // Assuming this path is correct
import Footer from '../Components/Footer'; // Assuming this path is correct

const TrackOrder = () => {
    // State to store user's geolocation
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);

    // State for order details, initialized with default/empty values
    const [orderDetails, setOrderDetails] = useState({
        orderPlacedDate: 'N/A',
        totalAmount: '₹ 0.00',
        shipTo: 'N/A',
        orderNumber: '#N/A',
        paymentMethod: 'N/A', // Added to display payment method
        currentStatus: 'Order Confirmed', // Default to initial status
        estimatedDelivery: 'Fetching...',
        timeline: [
            { status: 'Order Confirmed', completed: false },
            { status: 'Picked Up', completed: false },
            { status: 'Shipping', completed: false },
            { status: 'Out for Delivery', completed: false },
            { status: 'Delivered', completed: false },
        ]
    });

    // **IMPORTANT: Replace with your actual Google Maps API Key**
    const Maps_API_KEY = 'AIzaSyCNWvc2TPhfLT8QMLdDqUxIaAT9NR-INVA'; // <<<--- Replace this!

    useEffect(() => {
        // Fetch order details from localStorage
        const storedOrder = localStorage.getItem('lastPlacedOrder');
        if (storedOrder) {
            try {
                const parsedOrder = JSON.parse(storedOrder);

                // Update timeline based on payment status or simulated progress
                let updatedTimeline = orderDetails.timeline.map(item => ({ ...item, completed: false }));
                let currentStatusText = 'Order Confirmed'; // Default

                if (parsedOrder.paymentStatus === 'Successful' || parsedOrder.paymentMethod === 'cod') {
                    // Simulate progress after successful payment or COD
                    updatedTimeline[0].completed = true; // Order Confirmed
                    updatedTimeline[1].completed = true; // Picked Up (simulated)
                    updatedTimeline[2].completed = true; // Shipping (simulated)
                    currentStatusText = 'Shipping'; // Set current status
                }

                setOrderDetails(prevDetails => ({
                    ...prevDetails,
                    orderPlacedDate: parsedOrder.orderDate || 'N/A',
                    totalAmount: `₹ ${parseFloat(parsedOrder.totalAmount).toFixed(2)}` || '₹ 0.00',
                    shipTo: parsedOrder.address || 'N/A', // Use the full address
                    orderNumber: parsedOrder.orderId || '#N/A',
                    paymentMethod: getPaymentMethodDisplayName(parsedOrder.paymentMethod) || 'N/A', // Display readable payment name
                    currentStatus: currentStatusText,
                    timeline: updatedTimeline,
                    // You might want a more sophisticated way to calculate estimated delivery
                    estimatedDelivery: 'Approx. 5-7 business days' // This can be dynamic
                }));
            } catch (error) {
                console.error("Error parsing order details from localStorage:", error);
                localStorage.removeItem('lastPlacedOrder'); // Clear invalid data
            }
        } else {
            console.warn("No 'lastPlacedOrder' found in localStorage.");
        }

        // Geolocation fetching logic
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setLocationError(null);
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setLocationError("User denied the request for Geolocation. Map may not show your precise location.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            setLocationError("Location information is unavailable. Map may not show your precise location.");
                            break;
                        case error.TIMEOUT:
                            setLocationError("The request to get user location timed out. Map may not show your precise location.");
                            break;
                        case error.UNKNOWN_ERROR:
                            setLocationError("An unknown error occurred while getting location. Map may not show your precise location.");
                            break;
                        default:
                            setLocationError("An error occurred getting your location.");
                    }
                    setUserLocation(null);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            setLocationError("Geolocation is not supported by your browser. Map may not be fully functional.");
        }
    }, []); // Empty dependency array means this runs once on mount

    // Helper function to get a readable payment method name
    const getPaymentMethodDisplayName = (method) => {
        switch (method) {
            case 'card': return 'Credit/Debit Card';
            case 'netbanking': return 'Net Banking';
            case 'upi': return 'UPI';
            case 'cod': return 'Cash on Delivery';
            default: return method;
        }
    };

    // CSS as a string, to be injected into a <style> tag
    const componentStyles = `
        :root {
            --primary-blue: #070A52;
            --secondary-yellow: #FFCC00;
            --light-grey: #f0f0f0;
            --dark-grey: #333;
            --text-color: #555;
            --border-color: #ddd;
        }

        /* Basic reset */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--light-grey);
        }

        .order-tracking-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-color: #f7f7f7; /* Background matching the image, slightly off-white/light orange */
            padding: 20px;
        }

        /* Removed .tracking-header as it's replaced by Navbar */

        /* Browser Mockup Styles */
        .browser-mockup {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            margin: 0 auto;
            width: 90%;
            max-width: 1200px; /* Adjust max width as needed */
            margin-top: 30px; /* Added space below Navbar */
        }

        .browser-header {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            background-color: #e2e2e2;
            border-bottom: 1px solid #ccc;
        }

        .browser-buttons span {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
        }

        .browser-buttons .close { background-color: #ff5f56; }
        .browser-buttons .minimize { background-color: #ffbd2e; }
        .browser-buttons .maximize { background-color: #27c93f; }

        .browser-address-bar {
            flex-grow: 1;
            margin: 0 15px;
        }

        .browser-address-bar input {
            width: 100%;
            padding: 6px 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 0.9em;
            text-align: center;
            color: #666;
        }

        .browser-search i {
            color: #666;
            font-size: 1.2em;
        }

        .tracking-content {
            padding: 30px;
        }

        .tracking-content h2 {
            color: var(--primary-blue);
            font-size: 1.5em;
            margin-bottom: 20px;
            text-align: center;
            text-transform: uppercase;
        }

        .tracking-content .note {
            font-size: 0.9em;
            color: var(--text-color);
            text-align: center;
            margin-bottom: 30px;
        }

        .order-summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 40px;
            background-color: var(--light-grey);
        }

        .summary-item {
            text-align: center;
            padding: 10px 0;
        }

        .summary-item span {
            display: block;
            font-size: 0.8em;
            color: var(--text-color);
            margin-bottom: 5px;
            text-transform: uppercase;
            font-weight: bold;
        }

        .summary-item strong {
            font-size: 1.1em;
            color: var(--dark-grey);
        }

        .order-status-section {
            margin-bottom: 40px;
        }

        .order-status-section h3 {
            font-size: 1.3em;
            color: var(--primary-blue);
            margin-bottom: 10px;
        }

        .order-status-section .current-status {
            color: var(--secondary-yellow);
            font-weight: bold;
        }

        .order-status-section p {
            font-size: 0.9em;
            color: var(--text-color);
            margin-bottom: 20px;
        }

        .timeline {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            position: relative;
            padding: 20px 0;
            margin-top: 20px;
        }

        .timeline::before {
            content: '';
            position: absolute;
            top: 35px; /* Adjust to align with dots */
            left: 0;
            right: 0;
            height: 4px;
            background-color: var(--border-color);
            z-index: 0;
        }

        .timeline-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            flex: 1;
            position: relative;
            z-index: 1; /* Ensure dots and text are above the line */
        }

        .timeline-dot {
            width: 30px;
            height: 30px;
            background-color: #fff;
            border: 3px solid var(--border-color);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .timeline-item.completed .timeline-dot {
            background-color: var(--secondary-yellow);
            border-color: var(--secondary-yellow);
            color: var(--primary-blue); /* Checkmark color */
        }

        .timeline-item.completed .timeline-dot i {
            color: var(--primary-blue);
        }

        .timeline-dot i {
            font-size: 1.2em;
        }

        .timeline-info {
            font-size: 0.9em;
            color: var(--text-color);
        }

        .timeline-info .status-name {
            font-weight: bold;
            color: var(--dark-grey);
            margin-bottom: 5px;
        }

        .timeline-info .status-date {
            color: var(--text-color);
        }

        .shipping-information {
            margin-top: 40px;
        }

        .shipping-information h3 {
            font-size: 1.3em;
            color: var(--primary-blue);
            margin-bottom: 20px;
        }

        .map-section {
            border: 1px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden; /* Ensures the iframe corners are rounded */
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .map-section iframe {
            display: block; /* Remove extra space below iframe */
        }

        .user-location-info {
            margin-top: 20px;
            padding: 15px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background-color: var(--light-grey);
            text-align: center;
            font-size: 0.9em;
            color: var(--text-color);
        }
        .user-location-info p {
            margin: 5px 0;
        }
        .user-location-info .error {
            color: #d9534f; /* Red for errors */
            font-weight: bold;
        }

        .copyright {
            text-align: center;
            padding: 20px;
            font-size: 0.8em;
            color: var(--text-color);
            margin-top: auto; /* Pushes the copyright to the bottom */
            background-color: #fff;
            border-top: 1px solid var(--border-color);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
            .order-summary {
                grid-template-columns: 1fr;
            }

            .timeline {
                flex-direction: column;
                align-items: flex-start;
                padding-left: 20px;
            }

            .timeline::before {
                left: 30px; /* Adjust for vertical line */
                top: 0;
                bottom: 0;
                width: 4px;
                height: 100%;
            }

            .timeline-item {
                flex-direction: row;
                text-align: left;
                margin-bottom: 20px;
                width: 100%;
                align-items: center;
            }

            .timeline-dot {
                margin-right: 15px;
                margin-bottom: 0;
            }

            .timeline-line {
                display: none; /* Hide horizontal line for vertical layout */
            }
        }
    `;

    // Construct the Google Maps URL dynamically based on userLocation
    const getMapSrc = () => {
        // Default coordinates if userLocation isn't available or there's an error
        const defaultLatitude = 27.1751; // Example: Taj Mahal latitude
        const defaultLongitude = 78.0421; // Example: Taj Mahal longitude
        const zoomLevel = 15; // You can adjust the zoom level

        let lat = defaultLatitude;
        let lng = defaultLongitude;

        if (userLocation) {
            lat = userLocation.latitude;
            lng = userLocation.longitude;
        }

        // Using Google Maps Embed API with view mode
        // The 'q' parameter is for search queries/locations. For specific lat/lng, 'center' and 'zoom' are used with 'view' mode.
        // It's recommended to use the 'q' parameter with an address or place name for the Embed API to ensure a marker is shown.
        // If you specifically want to show just the coordinates, 'q' can be `lat,lng`.
        // Corrected URL: Use embed API with 'q' for location or 'center' and 'zoom' with 'map' mode
        // For a marker at a specific lat/lng, the 'q' parameter is best.
        return `https://www.google.com/maps/embed/v1/view?key=${Maps_API_KEY}&center=${lat},${lng}&zoom=${zoomLevel}`;
    };

    return (
        <div className="order-tracking-container">
            <style dangerouslySetInnerHTML={{ __html: componentStyles }} />

            <Navbar /> {/* Your Navbar component */}

            <div className="browser-mockup">
                <div className="browser-header">
                    <div className="browser-buttons">
                        <span className="close"></span>
                        <span className="minimize"></span>
                        <span className="maximize"></span>
                    </div>
                    <div className="browser-address-bar">
                        <input type="text" value="www.UrbanTales.com/Trackingpage" readOnly />
                    </div>
                    <div className="browser-search">
                        <i className="fas fa-search"></i> {/* For a search icon, you might need Font Awesome */}
                    </div>
                </div>

                <div className="tracking-content">
                    <h2>ORDER TRACKING PAGE</h2>
                    <p className="note">Please note that estimated dates are subject to change without prior notice. For precise updates, refer to the live tracking below.</p>

                    <div className="order-summary">
                        <div className="summary-item">
                            <span>ORDER PLACED ON</span>
                            <strong>{orderDetails.orderPlacedDate}</strong>
                        </div>
                        <div className="summary-item">
                            <span>TOTAL AMOUNT</span>
                            <strong>{orderDetails.totalAmount}</strong> {/* Dynamically rendered */}
                        </div>
                        <div className="summary-item">
                            <span>PAYMENT METHOD</span> {/* New field */}
                            <strong>{orderDetails.paymentMethod}</strong> {/* Dynamically rendered */}
                        </div>
                        <div className="summary-item">
                            <span>SHIPPING TO</span>
                            <strong>{orderDetails.shipTo}</strong> {/* Dynamically rendered */}
                        </div>
                        <div className="summary-item">
                            <span>ORDER ID</span>
                            <strong>{orderDetails.orderNumber}</strong> {/* Dynamically rendered */}
                        </div>
                    </div>

                    <div className="order-status-section">
                        <h3>Current Status: <span className="current-status">{orderDetails.currentStatus}</span></h3>
                        <p>Estimated Delivery: {orderDetails.estimatedDelivery}</p>

                        <div className="timeline">
                            {orderDetails.timeline.map((item, index) => (
                                <div key={index} className={`timeline-item ${item.completed ? 'completed' : ''}`}>
                                    <div className="timeline-dot">
                                        {item.completed && <i className="fas fa-check-circle"></i>} {/* Checkmark icon */}
                                    </div>
                                    <div className="timeline-info">
                                        <p className="status-name">{item.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="shipping-information">
                        <h3>LIVE TRACKING</h3>
                        <p className="note">Get real-time updates on your order's journey.</p>
                        <div className="map-section">
                            <iframe
                                src={getMapSrc()}
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Live Shipping Map"
                            ></iframe>
                        </div>

                        <div className="user-location-info">
                            <h4>Your Current Location (Approximate)</h4>
                            {locationError && <p className="error">{locationError}</p>}
                            {userLocation ? (
                                <>
                                    <p>Latitude: {userLocation.latitude.toFixed(6)}</p>
                                    <p>Longitude: {userLocation.longitude.toFixed(6)}</p>
                                    <p>
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${userLocation.latitude},${userLocation.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#070A52', textDecoration: 'underline' }}
                                        >
                                            View on Google Maps
                                        </a>
                                    </p>
                                </>
                            ) : (
                                !locationError && <p>Fetching your location...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer /> {/* Your Footer component */}
            <div className="copyright">
                <p>© {new Date().getFullYear()} UrbanTales. All rights reserved.</p>
            </div>
        </div>
    );
};

export default TrackOrder;