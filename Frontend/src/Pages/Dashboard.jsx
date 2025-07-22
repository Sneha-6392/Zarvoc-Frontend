// src/pages/Dashboard.jsx (SellerDashboard.jsx)

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaBoxOpen, FaTruck, FaUndoAlt, FaSpinner, FaStar, FaArrowDown, FaSearch, FaTrash, FaEye, FaUpload, FaTimes } from 'react-icons/fa';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// --- Cloudinary Configuration ---
// IMPORTANT: REPLACE WITH YOUR ACTUAL CLOUD VALUES
const CLOUDINARY_CLOUD_NAME = 'dkhj3605k'; // Example: 'your_cloud_name'
const CLOUDINARY_UPLOAD_PRESET = 'zarvoc_products'; // Example: 'your_unsigned_upload_preset'

// Cloudinary URL for unsigned uploads
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;


// --- CSS Styles ---
const styles = `
/* General Body and Layout */
body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f0f2f5;
    color: #333;
}

.seller-dashboard {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Welcome Banner */
.welcome-banner {
    background-color: #070A52; /* Dark blue background */
    color: white;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15); /* Stronger shadow */
    padding: 30px 40px; /* More padding */
    margin: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    position: relative; /* For the profile image positioning */
}

.welcome-banner-content {
    flex: 1;
    padding-right: 20px;
    z-index: 1; /* Ensure text is above image */
}

.welcome-banner .seller-info-integrated {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px; /* Space below seller info */
}

.welcome-banner .seller-info-integrated img {
    width: 70px; /* Larger profile image */
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #FFCC00; /* Thicker yellow border */
}

.welcome-banner .seller-name-details-integrated {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.welcome-banner .seller-name-details-integrated h2 {
    margin: 0;
    font-size: 1.8em; /* Larger welcome text */
    font-weight: 700;
}

.seller-name-highlight {
    color: #FFCC00; /* Yellow color for the seller's name */
}

.welcome-banner .seller-name-details-integrated p {
    margin: 0;
    font-size: 1em;
    color: #ccc;
}

.welcome-banner .edit-seller-button-integrated {
    background: none;
    border: 1px solid #FFCC00;
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    margin-left: 15px; /* Space from text */
}

.welcome-banner .edit-seller-button-integrated:hover {
    background-color: #FFCC00;
    color: #070A52;
}

.welcome-banner h1.main-heading {
    font-size: 2.8em; /* Even larger main heading */
    color: white; /* White text for main heading */
    margin-bottom: 10px;
    font-weight: 800;
}

.welcome-banner p.description {
    font-size: 1.2em; /* Larger description */
    color: #e0e0e0; /* Lighter grey for description */
    margin-bottom: 25px;
    line-height: 1.5;
}

.welcome-banner .add-product-main-btn {
    background-color: #FFCC00; /* Yellow for main add button */
    color: #070A52; /* Blue text */
    border: none;
    padding: 15px 30px; /* Larger button */
    border-radius: 10px; /* More rounded */
    cursor: pointer;
    font-size: 1.2em; /* Larger font */
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.welcome-banner .add-product-main-btn:hover {
    background-color: #e6b800;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* Add shadow on hover */
}

.welcome-banner-image {
    width: 350px; /* Larger illustration */
    height: 250px;
    object-fit: contain;
    margin-left: 30px;
    opacity: 0.8; /* Slightly transparent */
    position: absolute;
    right: 40px;
    bottom: 0;
    pointer-events: none; /* Allow clicks through image */
}


/* Main Content Area */
.dashboard-content {
    padding: 0px 30px 30px 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 25px;
    flex-grow: 1;
}

/* Specific card sizes */
.order-status-card {
    grid-column: span 2;
}

/* Sales Analytics Card (for larger display) */
.sales-analytics-card {
    grid-column: 1 / -1; /* Spans full width */
}

/* Card Styling (shared) */
.card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    padding: 25px;
    transition: transform 0.2s ease-in-out;
}

.card:hover {
    transform: translateY(-5px);
}

.card h2 {
    color: #070A52;
    margin-top: 0;
    border-bottom: 2px solid #f0f2f5;
    padding-bottom: 15px;
    margin-bottom: 20px;
    font-size: 1.6em;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
}

/* Product List Table */
.product-list-section {
    grid-column: 1 / -1;
    padding: 25px;
}

.product-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
    align-items: center;
}

.product-filters select,
.product-filters .search-input-container input {
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 0.95em;
    flex: 1;
    min-width: 150px;
}

.product-filters .search-input-container {
    position: relative;
    flex: 2;
}

.product-filters .search-input-container input {
    padding-right: 40px;
}

.product-filters .search-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
}


.product-table-container {
    overflow-x: auto;
}

.product-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.product-table th,
.product-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.product-table th {
    background-color: #f8f8f8;
    color: #555;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.85em;
}

.product-table tbody tr:hover {
    background-color: #f5f5f5;
}

.product-table td {
    color: #444;
    font-size: 0.9em;
}

.product-table .product-cell {
    display: flex;
    align-items: center;
    gap: 10px;
}

.product-table .product-cell img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
}

.product-table .product-price-old {
    text-decoration: line-through;
    color: #888;
    font-size: 0.8em;
    margin-right: 5px;
}
.product-table .product-price-new {
    font-weight: bold;
    color: #070A52;
}
.product-table .product-sales {
    white-space: nowrap;
}

.product-table .product-rating .star {
    color: #FFCC00;
}
.product-table .product-rating .empty-star {
    color: #ccc;
}

.product-table .action-cell {
    white-space: nowrap;
}

.product-table .action-cell button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1em;
    color: #070A52;
    margin-left: 8px;
    transition: color 0.2s ease;
}

.product-table .action-cell button:hover {
    color: #FFCC00;
}

/* Pagination */
.product-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 10px 0;
    border-top: 1px solid #eee;
    font-size: 0.9em;
    color: #666;
}

.product-pagination select {
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

.product-pagination button {
    background: none;
    border: 1px solid #ddd;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.product-pagination button:hover:not(:disabled) {
    background-color: #eee;
}

.product-pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}


/* Recent Orders Table */
.recent-orders-section {
    grid-column: 1 / -1;
    padding: 25px;
}

.recent-orders-table-container {
    overflow-x: auto;
}

.recent-orders-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.recent-orders-table th,
.recent-orders-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.recent-orders-table th {
    background-color: #f8f8f8;
    color: #555;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.85em;
}

.recent-orders-table tbody tr:hover {
    background-color: #f5f5f5;
}

.recent-orders-table td {
    color: #444;
    font-size: 0.9em;
}

.recent-orders-table .order-id-cell {
    font-weight: bold;
    color: #070A52;
}

/* Clickable status cell */
.recent-orders-table .status-cell {
    cursor: pointer;
    font-weight: bold;
    transition: color 0.3s ease;
}

.recent-orders-table .status-cell:hover {
    color: #FFCC00;
}

/* Modal Styling */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
}

.modal-content {
    background: white;
    padding: 35px;
    border-radius: 12px;
    width: 95%;
    max-width: 600px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    position: relative;
    animation: fadeIn 0.3s ease-out;
    max-height: 90vh; /* Allow modal to take up to 90% of viewport height */
    overflow-y: auto; /* Add scrollbar if content overflows vertically */
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

.modal-content h2 {
    margin-top: 0;
    margin-bottom: 25px;
    color: #070A52;
    font-size: 1.8em;
    font-weight: 600;
    text-align: center;
}

.modal-content label {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
    color: #444;
}

.modal-content input[type="text"],
.modal-content input[type="number"],
.modal-content textarea,
.modal-content input[type="file"],
.modal-content input[type="email"],
.modal-content select
{
    width: calc(100% - 24px);
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #dcdcdc;
    border-radius: 6px;
    font-size: 1em;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.modal-content input:focus,
.modal-content textarea:focus,
.modal-content select:focus {
    border-color: #070A52;
    box-shadow: 0 0 0 3px rgba(7, 10, 82, 0.1);
    outline: none;
}

.modal-content textarea {
    resize: vertical;
    min-height: 100px;
}

.modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 25px;
}

.modal-buttons button {
    padding: 12px 25px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.05em;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.modal-buttons .submit-button {
    background-color: #FFCC00;
    color: #070A52;
}

.modal-buttons .submit-button:hover {
    background-color: #e6b800;
    transform: translateY(-1px);
}

.modal-buttons .cancel-button {
    background-color: #e0e0e0;
    color: #555;
}

.modal-buttons .cancel-button:hover {
    background-color: #cccccc;
    transform: translateY(-1px);
}

.close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    font-size: 1.8em;
    cursor: pointer;
    color: #666;
    transition: color 0.3s ease;
}

.close-button:hover {
    color: #333;
}

/* Image Preview in Modal */
.image-preview-container {
    margin-top: 15px;
    text-align: center;
    border: 1px dashed #dcdcdc;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 120px;
}

.image-preview-container img {
    max-width: 100px;
    max-height: 100px;
    border-radius: 5px;
    object-fit: cover;
}

/* Image upload area in modal */
.modal-image-upload-area {
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.3s ease;
    margin-bottom: 20px;
    background-color: #f9f9f9; /* Slightly different background for drag area */
}

.modal-image-upload-area.dragging {
    border-color: #070A52;
    background-color: #e0e6f3;
}

.modal-image-upload-area p {
    color: #666;
    margin: 10px 0;
}

.modal-image-upload-area .upload-icon {
    font-size: 2em;
    color: #999;
}

.modal-image-preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 15px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.modal-image-preview-item {
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
}

.modal-image-preview-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.modal-image-preview-item .remove-image-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color 0.2s ease;
}

.modal-image-preview-item .remove-image-btn:hover {
    background-color: red;
}


/* No data message */
.no-data-message {
    text-align: center;
    color: #666;
    font-style: italic;
    padding: 20px;
}

/* Basic Form Error */
.form-error {
    color: #D32F2F;
    background-color: #FFEBEE;
    border: 1px solid #FFCDD2;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 0.9em;
    text-align: center;
}

/* Chart Styling */
.chart-container {
    width: 100%;
    max-height: 350px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.chart-container canvas {
    max-width: 100%;
    max-height: 100%;
}

/* Confirmation Modal */
.confirm-modal-content {
    background: white;
    padding: 30px;
    border-radius: 12px;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.confirm-modal-content p {
    font-size: 1.1em;
    margin-bottom: 25px;
    color: #333;
}

.confirm-modal-content .modal-buttons {
    justify-content: center;
}


/* Responsive adjustments */
@media (max-width: 768px) {
    .welcome-banner {
        flex-direction: column;
        text-align: center;
        padding: 20px;
        margin: 20px;
    }
    .welcome-banner .seller-info-integrated {
        flex-direction: column;
        margin-bottom: 15px;
    }
    .welcome-banner .seller-info-integrated img {
        margin-bottom: 10px;
    }
    .welcome-banner .edit-seller-button-integrated {
        margin-left: 0;
        margin-top: 10px;
    }
    .welcome-banner-content {
        padding-right: 0;
        margin-bottom: 20px;
    }
    .welcome-banner h1.main-heading {
        font-size: 2em;
    }
    .welcome-banner p.description {
        font-size: 1em;
    }
    .welcome-banner-image {
        width: 200px;
        height: 150px;
        margin-left: 0;
        position: static;
        opacity: 1;
    }

    .dashboard-content {
        grid-template-columns: 1fr;
        padding: 20px;
    }

    .card {
        padding: 20px;
    }

    .card h2 {
        font-size: 1.4em;
        padding-bottom: 10px;
        margin-bottom: 15px;
    }

    .order-status-card {
        grid-column: span 1;
    }

    .sales-analytics-card {
        grid-column: span 1;
    }

    .product-filters {
        flex-direction: column;
        align-items: stretch;
    }
    .product-filters select,
    .product-filters .search-input-container input {
        width: 100%;
        min-width: unset;
    }

    .modal-content {
        padding: 25px;
        max-height: 90vh; /* Reapply for mobile */
        overflow-y: auto;
    }

    .modal-content h2 {
        font-size: 1.5em;
    }

    .modal-buttons {
        flex-direction: column;
        gap: 10px;
    }

    .modal-buttons button {
        width: 100%;
    }
}
`;

// Inject styles into the head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

// --- Mock API ---
// IMPORTANT: In a real application, these mock data and API functions
// would be replaced by actual API calls to your backend.
// For client-side demonstration, these are mutable global arrays.
let mockProducts = [
  {
    id: 'prod_001',
    name: 'Motorola Edge 50 Fusion 5G (Hot Pink, 256 GB)',
    description: '(12 ...)',
    category: 'Electronics',
    subCategory: 'Mobiles',
    thirdLevelSubCategory: 'Smartphones',
    imageUrl: 'https://placehold.co/50x50/E91E63/ffffff?text=M',
    imageUrls: ['https://placehold.co/150x150/E91E63/ffffff?text=M1', 'https://placehold.co/150x150/E91E63/ffffff?text=M2'], // Example array
    originalPrice: 15600.00,
    price: 1800.00,
    cost: 1000.00,
    sales: 0,
    stock: 1499,
    rating: 5,
    delivery: 'Standard'
  },
  {
    id: 'prod_002',
    name: 'Cotton Co Ord Set-Tie & Dye Tracksuit with Insert ...',
    description: 'Altecia',
    category: 'Fashion',
    subCategory: 'Women',
    thirdLevelSubCategory: 'Apparel',
    imageUrl: 'https://placehold.co/50x50/F44336/ffffff?text=T',
    imageUrls: ['https://placehold.co/150x150/F44336/ffffff?text=T1', 'https://placehold.co/150x150/F44336/ffffff?text=T2'],
    originalPrice: 1560.00,
    price: 1750.00,
    cost: 800.00,
    sales: 1,
    stock: 1497,
    rating: 4,
    delivery: 'Express'
  },
  {
    id: 'prod_003',
    name: 'VNEED Women Embroidered Rayon Kurta Pant Set | Kur...',
    description: 'VNEED',
    category: 'Fashion',
    subCategory: 'Women',
    thirdLevelSubCategory: 'Ethnic Wear',
    imageUrl: 'https://placehold.co/50x50/9C27B0/ffffff?text=K',
    imageUrls: ['https://placehold.co/150x150/9C27B0/ffffff?text=K1', 'https://placehold.co/150x150/9C27B0/ffffff?text=K2'],
    originalPrice: 1600.00,
    price: 2200.00,
    cost: 1100.00,
    sales: 1,
    stock: 249,
    rating: 4,
    delivery: 'Standard'
  },
  {
    id: 'prod_004',
    name: 'Buy New Trend Women Black Cotton Blend Top | top f...',
    description: 'Trilok Fab',
    category: 'Fashion',
    subCategory: 'Women',
    thirdLevelSubCategory: 'Western Wear',
    imageUrl: 'https://placehold.co/50x50/2196F3/ffffff?text=B',
    imageUrls: ['https://placehold.co/150x150/2196F3/ffffff?text=B1'],
    originalPrice: 1500.00,
    price: 2200.00,
    cost: 900.00,
    sales: 0,
    stock: 149,
    rating: 5,
    delivery: 'Free'
  },
  {
    id: 'prod_005',
    name: 'Deel Band Women Rayon Embroidered Kurta Pant Dupat...',
    description: 'Deel band',
    category: 'Fashion',
    subCategory: 'Women',
    thirdLevelSubCategory: 'Ethnic Wear',
    imageUrl: 'https://placehold.co/50x50/FF9800/ffffff?text=D',
    imageUrls: ['https://placehold.co/150x150/FF9800/ffffff?text=D1', 'https://placehold.co/150x150/FF9800/ffffff?text=D2'],
    originalPrice: 1500.00,
    price: 1800.00,
    cost: 750.00,
    sales: 0,
    stock: 1491,
    rating: 4,
    delivery: 'Standard'
  },
];

let mockOrders = [
    {
        orderId: '67cc48ea97alb9d88559295d',
        paymentId: 'pay_Q4jew558X096E3',
        name: 'Rinku Verma',
        phoneNumber: '91854754545',
        address: 'H No 222 Street No 6 Adarsh Mohalla Delhi India 91854754545',
        status: 'Delivered',
    },
    {
        orderId: '67cc48ea97alb9d88559293f',
        paymentId: 'CASH ON DELIVERY',
        name: 'Rinku Verma',
        phoneNumber: '91855555555',
        address: 'H No 222 Street No 6 Adarsh Mohalla Delhi new Delhi India 91855555555',
        status: 'Pending',
    },
    {
        orderId: '67cb16fa97alb9d885590a25',
        paymentId: 'CASH ON DELIVERY',
        name: 'van an nguyen',
        phoneNumber: '91111191',
        address: 'Home ewrty ewrty ewrty uerty 84038288582',
        status: 'Delivered',
    },
    {
        orderId: '67caa24d1ac8ea442207df',
        paymentId: 'CASH ON DELIVERY',
        name: 'Vo Van Truong',
        phoneNumber: '84038288582',
        address: 'Home ewrty ewrty ewrty uerty 84038288582',
        status: 'On Track',
    },
    {
        orderId: '67c85c342b8735340da3cf99',
        paymentId: 'CASH ON DELIVERY',
        name: 'kim toan',
        phoneNumber: '91855555555',
        address: 'undefined undefined undefined undefined undefined',
        status: 'Returned',
    },
];


let sellerInfo = {
  name: "Rinku Verma",
  email: "rinku.verma@example.com",
  imageUrl: "https://placehold.co/80x80/070A52/FFCC00?text=RV",
};

// Helper to calculate analytics data dynamically from products and orders
const calculateAnalyticsData = () => {
    let totalProductsSold = 0;
    let totalRevenue = 0;
    let totalProfit = 0;
    let deliveredCount = 0;
    let pendingCount = 0;
    let returnedCount = 0;

    mockProducts.forEach(p => {
        totalProductsSold += p.sales;
        totalRevenue += p.sales * p.price;
        totalProfit += p.sales * (p.price - p.cost);
    });

    mockOrders.forEach(o => {
        if (o.status === 'Delivered') deliveredCount++;
        if (o.status === 'Pending' || o.status === 'On Track' || o.status === 'Shipped') pendingCount++;
        if (o.status === 'Returned') returnedCount++;
    });


    const monthlySales = [
        { month: 'JAN', sales: 0 },
        { month: 'FEB', sales: 32000 },
        { month: 'MAR', sales: 100000 },
        { month: 'APR', sales: 40000 },
        { month: 'MAY', sales: 60000 },
        { month: 'JUNE', sales: 50000 },
        { month: 'JULY', sales: totalRevenue * 0.2 > 0 ? totalRevenue * 0.2 : 25000 },
        { month: 'AUG', sales: 0 },
        { month: 'SEP', sales: 0 },
        { month: 'OCT', sales: 0 },
        { month: 'NOV', sales: 0 },
        { month: 'DEC', sales: 0 },
    ];

    const sortedProductsBySales = [...mockProducts].sort((a, b) => b.sales - a.sales);
    const bestSellingProducts = sortedProductsBySales.slice(0, 3);
    const worstSellingProducts = sortedProductsBySales.slice(-3).reverse();

    return {
        totalProductsSold,
        totalRevenue,
        totalProfit,
        delivered: deliveredCount,
        pending: pendingCount,
        returned: returnedCount,
        monthlySales: monthlySales,
        bestSellingProducts,
        worstSellingProducts,
    };
};

// Mock API functions returning Promises to simulate async network requests
const getSellerInfo = () => new Promise(resolve => setTimeout(() => resolve({...sellerInfo}), 300));
const updateSellerInfo = (newInfo) => new Promise(resolve => setTimeout(() => { sellerInfo = { ...sellerInfo, ...newInfo }; resolve({ success: true, seller: sellerInfo }); }, 500));
const getProducts = () => new Promise(resolve => setTimeout(() => resolve([...mockProducts]), 500));

// Updated addProduct mock API to handle imageUrls array
const addProduct = (newProduct) => new Promise(resolve => setTimeout(() => {
    const productWithId = {
        ...newProduct,
        id: `prod_${Date.now()}`,
        imageUrl: newProduct.imageUrls[0] || 'https://placehold.co/50x50/cccccc/ffffff?text=No+Img', // Use first image as main
        sales: 0, // Ensure new products start with 0 sales
        rating: 0 // Ensure new products start with 0 rating
    };
    mockProducts.push(productWithId);
    resolve({ success: true, product: productWithId });
}, 700));

const deleteProduct = (productId) => new Promise((resolve, reject) => setTimeout(() => {
    const initialLength = mockProducts.length;
    mockProducts = mockProducts.filter(p => p.id !== productId);
    if (mockProducts.length < initialLength) {
        resolve({ success: true, message: 'Product deleted successfully.' });
    } else {
        // Reject with an Error object
        reject(new Error('Product not found.'));
    }
}, 500));

const getOrders = () => new Promise(resolve => setTimeout(() => resolve([...mockOrders]), 400));

const updateOrder = (updatedOrder) => new Promise((resolve, reject) => setTimeout(() => {
    const index = mockOrders.findIndex(o => o.orderId === updatedOrder.orderId);
    if (index !== -1) {
        mockOrders[index] = { ...mockOrders[index], ...updatedOrder };
        resolve({ success: true, order: mockOrders[index] });
    } else {
        // Reject with an Error object
        reject(new Error('Order not found'));
    }
}, 500));


const getAnalyticsData = () => new Promise(resolve => setTimeout(() => resolve(calculateAnalyticsData()), 400));


// --- Shared Components ---
function Card({ title, children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}
Card.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

// --- Modals ---
function EditSellerModal({ seller, onClose, onSave }) {
  const [currentSeller, setCurrentSeller] = useState(seller);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setCurrentSeller(seller);
  }, [seller]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSeller(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentSeller(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!currentSeller.name || !currentSeller.email) {
      setError("Name and Email are required.");
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(currentSeller.email)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
    }

    try {
      const response = await updateSellerInfo(currentSeller);
      if (response.success) {
        onSave(response.seller);
        onClose();
      } else {
        setError(response.message || "Failed to update seller info.");
      }
    } catch (err) {
      setError("An error occurred while updating seller info.");
      console.error("Error updating seller info:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Edit Seller Details</h2>
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="sellerName">Seller Name:</label>
          <input
            type="text"
            id="sellerName"
            name="name"
            value={currentSeller.name || ''}
            onChange={handleChange}
            required
          />

          <label htmlFor="sellerEmail">Email:</label>
          <input
            type="email"
            id="sellerEmail"
            name="email"
            value={currentSeller.email || ''}
            onChange={handleChange}
            required
          />

          <label htmlFor="sellerImage">Profile Image:</label>
          <input
            type="file"
            id="sellerImage"
            name="imageUrl"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          {currentSeller.imageUrl && (
            <div className="image-preview-container">
              <img src={currentSeller.imageUrl} alt="Seller Profile Preview" />
            </div>
          )}

          <div className="modal-buttons">
            <button type="button" className="cancel-button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
EditSellerModal.propTypes = {
    seller: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        imageUrl: PropTypes.string,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

// NEW: Add Product Modal - Enhanced with ProductDetails fields and Drag & Drop
function AddProductModal({ onClose, onAddProduct }) {
    const fileInputRef = useRef(null);
    const [product, setProduct] = useState({
        name: '',
        category: '',
        description: '',
        stock: '', // Corresponds to 'amount'
        price: '',
        originalPrice: '', // New field, could default to price or be separate
        cost: '', // New field, could default to price or be separate
        delivery: '', // Corresponds to 'delivery'
        imageUrls: [], // This will store Cloudinary URLs
    });

    const [selectedFiles, setSelectedFiles] = useState([]); // Stores File objects for new uploads
    const [previewImages, setPreviewImages] = useState([]); // Stores blob URLs for local preview
    const [uploadingImages, setUploadingImages] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDragging, setIsDragging] = useState(false); // State for drag and drop visual feedback

    const requiredFields = ["name", "category", "description", "stock", "price"];

    // Use useCallback to memoize this function, preventing unnecessary re-renders
    const checkFormValidity = useCallback(() => {
        const filled = requiredFields.every((field) => String(product[field]).trim() !== "");
        return filled && (selectedFiles.length > 0 || product.imageUrls.length > 0);
    }, [product, selectedFiles.length, product.imageUrls.length]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleFiles = (files) => {
        const newFiles = Array.from(files);
        const totalImages = selectedFiles.length + product.imageUrls.length + newFiles.length;

        if (totalImages > 4) {
            setError(`You can upload a maximum of 4 images. You are trying to add ${totalImages - (selectedFiles.length + product.imageUrls.length)} more.`);
            return;
        }

        setSelectedFiles(prev => [...prev, ...newFiles]);

        const newPreviews = newFiles.map(file => ({
            id: URL.createObjectURL(file),
            src: URL.createObjectURL(file)
        }));
        setPreviewImages(prev => [...prev, ...newPreviews]);
        setError(null);
    };

    const handleFileChange = (e) => {
        handleFiles(e.target.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const removeNewImage = (idToRemove) => {
        const indexToRemove = previewImages.findIndex(p => p.id === idToRemove);
        if (indexToRemove !== -1) {
            URL.revokeObjectURL(previewImages[indexToRemove].src);
            setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
            setPreviewImages(prev => prev.filter(p => p.id !== idToRemove));
        }
    };

    const removeUploadedImage = (urlToRemove) => {
        setProduct(prev => ({
            ...prev,
            imageUrls: prev.imageUrls.filter(url => url !== urlToRemove)
        }));
    };

    const uploadImagesToCloudinary = async () => {
        if (selectedFiles.length === 0) return [];

        setUploadingImages(true);
        setError(null);
        const uploadedUrls = [];

        try {
            for (const file of selectedFiles) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

                const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data && response.data.secure_url) {
                    uploadedUrls.push(response.data.secure_url);
                } else {
                    throw new Error("Cloudinary upload failed for a file.");
                }
            }
            return uploadedUrls;
        } catch (err) {
            console.error("Cloudinary upload error:", err);
            setError("Failed to upload images to Cloudinary. Please try again.");
            return [];
        } finally {
            setUploadingImages(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!checkFormValidity()) {
            setError("Please fill in all required fields and upload at least one image.");
            setLoading(false);
            return;
        }

        let finalImageUrls = [...product.imageUrls];

        if (selectedFiles.length > 0) {
            const newUploadedUrls = await uploadImagesToCloudinary();
            if (newUploadedUrls.length === 0 && selectedFiles.length > 0) {
                setLoading(false);
                return;
            }
            finalImageUrls = [...finalImageUrls, ...newUploadedUrls];
        }

        if (finalImageUrls.length === 0) {
            setError("No images could be uploaded or selected for the product. Please check your image files.");
            setLoading(false);
            return;
        }

        try {
            const productToSave = {
                ...product,
                originalPrice: parseFloat(product.originalPrice) || parseFloat(product.price) || 0, // Default if not provided
                price: parseFloat(product.price) || 0,
                cost: parseFloat(product.cost) || parseFloat(product.price) * 0.5 || 0, // Default to 50% of price
                stock: parseInt(product.stock, 10) || 0,
                sales: 0,
                rating: 0,
                imageUrl: finalImageUrls[0], // Set the first image as the main imageUrl
                imageUrls: finalImageUrls,
            };

            const response = await addProduct(productToSave); // Call your mock API
            if (response.success) {
                alert('Product added successfully!');
                onAddProduct();
                onClose();
            } else {
                setError(response.message || "Failed to add product.");
            }
        } catch (err) {
            setError("An error occurred while adding the product.");
            console.error("Error adding product:", err);
        } finally {
            setLoading(false);
            previewImages.forEach(p => URL.revokeObjectURL(p.src));
        }
    };

    // Derived state for button disabled status
    const isAddBtnDisabled = !checkFormValidity() || loading || uploadingImages;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Add New Product</h2>
                {error && <p className="form-error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Product Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Category --</option>
                        <option value="fashion">Fashion</option>
                        <option value="electronic">Electronic</option>
                        <option value="furniture">Furniture</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="toys">Toys</option>
                        <option value="cosmetic">Cosmetic</option>
                        <option value="food">Food</option>
                        <option value="sports">Sports</option>
                        <option value="appliances">Appliances</option>
                    </select>

                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="stock">Stock Quantity (Amount):</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        min="1"
                        step="1"
                        required
                    />

                    <label htmlFor="price">Selling Price (₹):</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />

                    <label htmlFor="originalPrice">Original Price (₹) (Optional):</label>
                    <input
                        type="number"
                        id="originalPrice"
                        name="originalPrice"
                        value={product.originalPrice}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                    />

                    <label htmlFor="cost">Cost Price (₹) (Optional):</label>
                    <input
                        type="number"
                        id="cost"
                        name="cost"
                        value={product.cost}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                    />

                    <label htmlFor="delivery">Delivery Charge/Type:</label>
                    <input
                        type="text"
                        id="delivery"
                        name="delivery"
                        value={product.delivery}
                        onChange={handleChange}
                    />

                    {/* Image Upload Section - Semantic and Accessible */}
                    <label htmlFor="imageInput">Product Images (Max 4 images):</label>
                    <button
                        type="button"
                        className={`modal-image-upload-area ${isDragging ? 'dragging' : ''}`}
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        disabled={product.imageUrls.length + selectedFiles.length >= 4 || uploadingImages || loading}
                    >
                        <FaUpload className="upload-icon" />
                        <p>Drag & Drop images here, or Click to Select</p>
                        <p>(Max 4 images)</p>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            id="imageInput"
                            style={{ display: 'none' }}
                            disabled={product.imageUrls.length + selectedFiles.length >= 4 || uploadingImages || loading}
                        />
                    </button>


                    {(product.imageUrls.length > 0 || previewImages.length > 0) && (
                        <div className="modal-image-preview-grid">
                            {product.imageUrls.map((src, index) => (
                                <div key={src} className="modal-image-preview-item">
                                    <img src={src} alt={`Product Image ${index + 1}`} />
                                    <button
                                        type="button"
                                        className="remove-image-btn"
                                        onClick={(e) => { e.stopPropagation(); removeUploadedImage(src); }}
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ))}
                            {previewImages.map((p, index) => (
                                <div key={p.id} className="modal-image-preview-item">
                                    <img src={p.src} alt={`Product Image ${index + 1}`} />
                                    <button
                                        type="button"
                                        className="remove-image-btn"
                                        onClick={(e) => { e.stopPropagation(); removeNewImage(p.id); }}
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}


                    <div className="modal-buttons">
                        <button type="button" className="cancel-button" onClick={onClose} disabled={loading || uploadingImages}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-button" disabled={isAddBtnDisabled}>
                            {(loading || uploadingImages) ? 'Adding Product...' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
AddProductModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddProduct: PropTypes.func.isRequired,
};


function ViewProductModal({ product, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Product Details</h2>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    {/* Display multiple images if available, otherwise fallback to main imageUrl */}
                    {product.imageUrls && product.imageUrls.length > 0 ? (
                        <div className="modal-image-preview-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
                            {product.imageUrls.map((imgUrl, index) => (
                                <div key={imgUrl} className="modal-image-preview-item" style={{ width: '100px', height: '100px' }}>
                                    <img src={imgUrl} alt={`${product.name} image ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '8px', objectFit: 'cover' }} />
                    )}
                </div>
                <p><strong>Name:</strong> {product.name}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Sub Category:</strong> {product.subCategory}</p>
                <p><strong>Third Level Sub Category:</strong> {product.thirdLevelSubCategory || 'N/A'}</p>
                <p><strong>Original Price:</strong> ₹{product.originalPrice ? product.originalPrice.toFixed(2) : 'N/A'}</p>
                <p><strong>Selling Price:</strong> ₹{product.price.toFixed(2)}</p>
                <p><strong>Cost:</strong> ₹{product.cost ? product.cost.toFixed(2) : 'N/A'}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Sales:</strong> {product.sales}</p>
                <p><strong>Rating:</strong> {product.rating} ★</p>
                <p><strong>Delivery:</strong> {product.delivery || 'N/A'}</p>
                <div className="modal-buttons">
                    <button type="button" className="cancel-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
ViewProductModal.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        subCategory: PropTypes.string, // Made optional as per updated mock
        thirdLevelSubCategory: PropTypes.string,
        imageUrl: PropTypes.string.isRequired,
        imageUrls: PropTypes.arrayOf(PropTypes.string),
        originalPrice: PropTypes.number, // Can be optional now
        price: PropTypes.number.isRequired,
        cost: PropTypes.number, // Can be optional now
        stock: PropTypes.number.isRequired,
        sales: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        delivery: PropTypes.string,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

function ConfirmationModal({ message, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay">
            <div className="confirm-modal-content">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className="cancel-button" onClick={onCancel}>Cancel</button>
                    <button className="submit-button" onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
}
ConfirmationModal.propTypes = {
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

function EditOrderStatusModal({ order, onClose, onSave }) {
    const [currentStatus, setCurrentStatus] = useState(order.status);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const statusOptions = ['Pending', 'On Track', 'Shipped', 'Delivered', 'Returned', 'Cancelled'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await updateOrder({ ...order, status: currentStatus });
            if (response.success) {
                onSave(response.order);
                onClose();
            } else {
                setError(response.message || "Failed to update order status.");
            }
        } catch (err) {
            setError("An error occurred while updating order status.");
            console.error("Error updating order status:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Edit Order Status</h2>
                {error && <p className="form-error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <p><strong>Order ID:</strong> {order.orderId}</p>
                    <p><strong>Customer:</strong> {order.name}</p>
                    <label htmlFor="orderStatus">Select New Status:</label>
                    <select
                        id="orderStatus"
                        name="status"
                        value={currentStatus}
                        onChange={(e) => setCurrentStatus(e.target.value)}
                        required
                        disabled={loading}
                    >
                        {statusOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>

                    <div className="modal-buttons">
                        <button type="button" className="cancel-button" onClick={onClose} disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-button" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
EditOrderStatusModal.propTypes = {
    order: PropTypes.shape({
        orderId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};


// --- Dashboard Section Components ---

function WelcomeBanner({ sellerInfo, onAddProductClick, onEditSellerClick }) {
    return (
        <div className="welcome-banner">
            <div className="welcome-banner-content">
                <div className="seller-info-integrated">
                    <img src={sellerInfo.imageUrl} alt="Seller Profile" />
                    <div className="seller-name-details-integrated">
                        <h2>Hello, <span className="seller-name-highlight">{sellerInfo.name}!</span></h2>
                        <p>{sellerInfo.email}</p>
                    </div>
                    <button className="edit-seller-button-integrated" onClick={onEditSellerClick}>
                        Edit Info
                    </button>
                </div>
                <h1 className="main-heading">Welcome to Your Seller Dashboard!</h1>
                <p className="description">Here's what's happening on your store today. See the statistics at once.</p>
                <button className="add-product-main-btn" onClick={onAddProductClick}>
                    <FaPlus /> Add Product
                </button>
            </div>
            <img
                src="https://placehold.co/350x250/070A52/FFCC00?text=Store+Illustration"
                alt="Store Illustration"
                className="welcome-banner-image"
            />
        </div>
    );
}
WelcomeBanner.propTypes = {
    sellerInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
    }).isRequired,
    onAddProductClick: PropTypes.func.isRequired,
    onEditSellerClick: PropTypes.func.isRequired,
};


function ProductList({ refreshKey, onDeleteProduct, onViewProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [refreshKey]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star' : 'empty-star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) return <Card title="Products">Loading products...</Card>;
  if (error) return <Card title="Products" className="form-error">{error}</Card>;

  return (
    <Card title="Products" className="product-list-section">
        <div className="product-filters">
            <select>
                <option>Category By</option>
                <option>Electronics</option>
                <option>Fashion</option>
            </select>
            <select>
                <option>Sub Category By</option>
                <option>Mobiles</option>
                <option>Women</option>
            </select>
            <select>
                <option>Third Level Sub Category By</option>
                <option>Smartphones</option>
                <option>Apparel</option>
                <option>Ethnic Wear</option>
                <option>Western Wear</option>
            </select>
            <div className="search-input-container">
                <input type="text" placeholder="Search here..." />
                <FaSearch className="search-icon" />
            </div>
        </div>

      {products.length === 0 ? (
        <p className="no-data-message">No products added yet. Click "Add Product" to get started!</p>
      ) : (
        <div className="product-table-container">
            <table className="product-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>PRODUCT</th>
                        <th>CATEGORY</th>
                        <th>SUB CATEGORY</th>
                        <th>PRICE</th>
                        <th>SALES</th>
                        <th>STOCK</th>
                        <th>RATING</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td><input type="checkbox" /></td>
                            <td className="product-cell">
                                {/* Use the first imageUrl for display in the list */}
                                <img src={product.imageUrls[0] || product.imageUrl} alt={product.name} />
                                <div>
                                    <div>{product.name}</div>
                                    <div style={{ fontSize: '0.8em', color: '#777' }}>{product.description}</div>
                                </div>
                            </td>
                            <td>{product.category}</td>
                            <td>{product.subCategory}</td>
                            <td>
                                <span className="product-price-old">₹{product.originalPrice ? product.originalPrice.toFixed(2) : product.price.toFixed(2)}</span>
                                <span className="product-price-new">₹{product.price.toFixed(2)}</span>
                            </td>
                            <td className="product-sales">{product.sales} sales</td>
                            <td>{product.stock}</td>
                            <td className="product-rating">{renderStars(product.rating)}</td>
                            <td className="action-cell">
                                <button onClick={() => onViewProduct(product)} title="View Product Details">
                                    <FaEye />
                                </button>
                                <button onClick={() => onDeleteProduct(product.id)} title="Delete Product" style={{ color: '#D32F2F' }}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}
      <div className="product-pagination">
        <div>
            Rows per page:
            <select>
                <option>50</option>
                <option>100</option>
                <option>200</option>
            </select>
        </div>
        <div>1-50 of {products.length}</div>
        <div>
            <button>&lt;</button>
            <button>&gt;</button>
        </div>
      </div>
    </Card>
  );
}
ProductList.propTypes = {
    refreshKey: PropTypes.number.isRequired,
    onDeleteProduct: PropTypes.func.isRequired,
    onViewProduct: PropTypes.func.isRequired,
};

function SalesAnalytics({ refreshKey }) {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const data = await getAnalyticsData();
        setAnalyticsData(data);
      } catch (err) {
        setError("Failed to fetch sales data.");
        console.error("Error fetching sales data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyticsData();
  }, [refreshKey]);

  if (loading) return <Card title="Sales Overview">Loading sales data...</Card>;
  if (error) return <Card title="Sales Overview" className="form-error">{error}</Card>;
  if (!analyticsData) return null;

  const salesChartData = {
    labels: analyticsData.monthlySales.map(d => d.month),
    datasets: [
      {
        label: 'Total Sales',
        data: analyticsData.monthlySales.map(d => d.sales),
        backgroundColor: '#070A52',
        borderColor: '#070A52',
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const salesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
            color: '#333',
            font: {
                size: 14
            }
        }
      },
      title: {
        display: true,
        text: 'Monthly Sales Trend',
        color: '#070A52',
        font: {
            size: 16,
            weight: 'bold'
        }
      }
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: '#555'
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                color: '#eee'
            },
            ticks: {
                color: '#555'
            }
        }
    }
  };


  return (
    <>
      <Card title="Sales Overview">
        <p><strong>Total Products Sold:</strong> {analyticsData.totalProductsSold}</p>
        <p><strong>Total Revenue:</strong> ₹{analyticsData.totalRevenue.toFixed(2)}</p>
        <p><strong>Total Profit:</strong> ₹{analyticsData.totalProfit.toFixed(2)}</p>
      </Card>
      <Card title="Best Selling Products">
        {analyticsData.bestSellingProducts.length === 0 ? (
            <p className="no-data-message">No sales data to show best sellers.</p>
        ) : (
            <ul>
                {analyticsData.bestSellingProducts.map(p => (
                    <li key={p.id} style={{ marginBottom: '8px' }}>
                        <FaStar style={{ color: '#FFCC00', marginRight: '5px' }} />
                        {p.name} ({p.sales} sales)
                    </li>
                ))}
            </ul>
        )}
      </Card>
      <Card title="Worst Selling Products">
        {analyticsData.worstSellingProducts.length === 0 ? (
            <p className="no-data-message">No sales data to show worst sellers.</p>
        ) : (
            <ul>
                {analyticsData.worstSellingProducts.map(p => (
                    <li key={p.id} style={{ marginBottom: '8px' }}>
                        <FaArrowDown style={{ color: '#D32F2F', marginRight: '5px' }} />
                        {p.name} ({p.sales} sales)
                    </li>
                ))}
            </ul>
        )}
      </Card>
      {/* Moved to the end and made full width */}
      <Card title="Monthly Sales Trend" className="sales-analytics-card">
        <div className="chart-container">
          <Bar data={salesChartData} options={salesChartOptions} />
        </div>
      </Card>
    </>
  );
}
SalesAnalytics.propTypes = {
    refreshKey: PropTypes.number.isRequired,
};

function OrderStatus({ refreshKey }) {
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        setLoading(true);
        const data = await getAnalyticsData();
        setOrderStatus(data);
      } catch (err) {
        setError("Failed to fetch order status.");
        console.error("Error fetching order status:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderStatus();
  }, [refreshKey]);

  if (loading) return <Card title="Order Status" className="order-status-card">Loading order status...</Card>;
  if (error) return <Card title="Order Status" className="form-error order-status-card">{error}</Card>;
  if (!orderStatus) return null;

  return (
    <Card title="Order Status" className="order-status-card">
      <p><strong><FaBoxOpen /> Total Products Sold:</strong> {orderStatus.totalProductsSold}</p>
      <p><strong><FaTruck /> Products Delivered:</strong> {orderStatus.delivered}</p>
      <p><strong><FaSpinner className="inline-block animate-spin" /> Products Pending Delivery:</strong> {orderStatus.pending}</p>
      <p><strong><FaUndoAlt /> Products Returned:</strong> {orderStatus.returned}</p>
    </Card>
  );
}
OrderStatus.propTypes = {
    refreshKey: PropTypes.number.isRequired,
};

function RecentOrders({ refreshKey, onEditOrderStatus }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const data = await getOrders();
                setOrders(data);
            } catch (err) {
                setError("Failed to fetch recent orders.");
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [refreshKey]);

    if (loading) return <Card title="Recent Orders">Loading orders...</Card>;
    if (error) return <Card title="Recent Orders" className="form-error">{error}</Card>;

    return (
        <Card title="Recent Orders" className="recent-orders-section">
            <div className="product-filters">
                <div className="search-input-container">
                    <input type="text" placeholder="Search here..." />
                    <FaSearch className="search-icon" />
                </div>
            </div>
            {orders.length === 0 ? (
                <p className="no-data-message">No recent orders.</p>
            ) : (
                <div className="recent-orders-table-container">
                    <table className="recent-orders-table">
                        <thead>
                            <tr>
                                <th>ORDER ID</th>
                                <th>PAYMENT ID</th>
                                <th>NAME</th>
                                <th>PHONE NUMBER</th>
                                <th>ADDRESS</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.orderId}>
                                    <td className="order-id-cell">{order.orderId}</td>
                                    <td>{order.paymentId}</td>
                                    <td>{order.name}</td>
                                    <td>{order.phoneNumber}</td>
                                    <td>{order.address}</td>
                                    <td className="status-cell" onClick={() => onEditOrderStatus(order)}>
                                        {order.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Card>
    );
}
RecentOrders.propTypes = {
    refreshKey: PropTypes.number.isRequired,
    onEditOrderStatus: PropTypes.func.isRequired,
};

// --- Main Seller Dashboard Page Component ---
export default function SellerDashboard() {
  const [sellerData, setSellerData] = useState({ name: "Loading...", email: "", imageUrl: "https://placehold.co/80x80/070A52/FFCC00?text=RV" });
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditSellerModalOpen, setIsEditSellerModalOpen] = useState(false);
  const [isViewProductModalOpen, setIsViewProductModalOpen] = useState(false);
  const [productToView, setProductToView] = useState(null);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [isEditOrderStatusModalOpen, setIsEditOrderStatusModalOpen] = useState(false);
  const [orderToEditStatus, setOrderToEditStatus] = useState(null);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      try {
        const info = await getSellerInfo();
        setSellerData(info);
      } catch (error) {
        console.error("Failed to fetch seller info:", error);
        setSellerData({ name: "Seller", email: "info@example.com", imageUrl: "https://placehold.co/80x80/070A52/FFCC00?text=Seller" });
      }
    };
    fetchSellerDetails();
  }, []);

  const handleAddProductClick = () => {
      setIsAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
      setIsAddProductModalOpen(false);
      handleDataChange();
  };

  const handleEditSellerClick = () => setIsEditSellerModalOpen(true);
  const closeEditSellerModal = () => {
      setIsEditSellerModalOpen(false);
      handleDataChange();
  };

  const handleViewProduct = (product) => {
      setProductToView(product);
      setIsViewProductModalOpen(true);
  };
  const closeViewProductModal = () => {
      setIsViewProductModalOpen(false);
      setProductToView(null);
  };

  const handleDeleteProductClick = (productId) => {
      setProductIdToDelete(productId);
      setIsConfirmDeleteModalOpen(true);
  };

  const confirmDeleteProduct = async () => {
      setIsConfirmDeleteModalOpen(false);
      if (productIdToDelete) {
          try {
              await deleteProduct(productIdToDelete);
              alert('Product deleted successfully!');
              handleDataChange();
          } catch (error) {
              console.error("Error deleting product:", error.message);
              alert('Failed to delete product: ' + error.message);
          } finally {
              setProductIdToDelete(null);
          }
      }
  };

  const cancelDeleteProduct = () => {
      setIsConfirmDeleteModalOpen(false);
      setProductIdToDelete(null);
  };

  const handleEditOrderStatusClick = (order) => {
      setOrderToEditStatus(order);
      setIsEditOrderStatusModalOpen(true);
  };

  const closeEditOrderStatusModal = () => {
      setIsEditOrderStatusModalOpen(false);
      setOrderToEditStatus(null);
  };

  const handleSaveOrderStatus = (updatedOrder) => {
      handleDataChange();
  };

  const handleDataChange = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="seller-dashboard">
      <WelcomeBanner
        sellerInfo={sellerData}
        onAddProductClick={handleAddProductClick}
        onEditSellerClick={handleEditSellerClick}
      />

      <main className="dashboard-content">
        <OrderStatus key={`orders-summary-${refreshKey}`} />
        <ProductList
            key={`products-${refreshKey}`}
            onDeleteProduct={handleDeleteProductClick}
            onViewProduct={handleViewProduct}
        />
        <RecentOrders
            key={`recent-orders-${refreshKey}`}
            onEditOrderStatus={handleEditOrderStatusClick}
        />
        <SalesAnalytics key={`sales-${refreshKey}`} />
      </main>

      {isAddProductModalOpen && (
        <AddProductModal onClose={closeAddProductModal} onAddProduct={handleDataChange} />
      )}

      {isEditSellerModalOpen && (
        <EditSellerModal seller={sellerData} onClose={closeEditSellerModal} onSave={setSellerData} />
      )}

      {isViewProductModalOpen && productToView && (
          <ViewProductModal product={productToView} onClose={closeViewProductModal} />
      )}

      {isConfirmDeleteModalOpen && (
          <ConfirmationModal
              message="Are you sure you want to delete this product?"
              onConfirm={confirmDeleteProduct}
              onCancel={cancelDeleteProduct}
          />
      )}

      {isEditOrderStatusModalOpen && orderToEditStatus && (
          <EditOrderStatusModal
              order={orderToEditStatus}
              onClose={closeEditOrderStatusModal}
              onSave={handleSaveOrderStatus}
          />
      )}
    </div>
  );
}
