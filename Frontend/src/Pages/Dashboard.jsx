import React, { useEffect, useState } from 'react';
// Assuming Navbar, Footer, and logo are correctly imported and available
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import logo from '../assets/Zarvoc2.png'; // Make sure this path is correct

/**
 * Loader Component
 * Displays a simple spinning loader.
 */
const Loader = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-white">
    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
    <p className="mt-4 text-lg text-gray-700">Loading products...</p>
  </div>
);

/**
 * ConfirmModal Component
 * A custom modal for confirmation messages, replacing browser's confirm/alert.
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {string} props.message - The message to display in the modal.
 * @param {function} props.onConfirm - Callback function when 'Confirm' is clicked.
 * @param {function} props.onCancel - Callback function when 'Cancel' is clicked or modal is closed.
 * @param {string} props.title - Optional title for the modal.
 */
const ConfirmModal = ({ isOpen, message, onConfirm, onCancel, title = "Confirm Action" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// CSS for the modal animation (add this to your main CSS file or a style block if not using a separate CSS file)
// @keyframes scale-in {
//   from { transform: scale(0.95); opacity: 0; }
//   to { transform: scale(1); opacity: 1; }
// }
// .animate-scale-in {
//   animation: scale-in 0.3s ease-out forwards;
// }


/**
 * Dashboard Component
 * Displays a list of products fetched from a local API, with options to delete.
 */
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [message, setMessage] = useState(''); // For success/error messages

  /**
   * Fetches products from the API on component mount.
   */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/products');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setMessage('❌ Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  /**
   * Handles the initiation of a product deletion.
   * Opens the confirmation modal.
   * @param {string} id - The ID of the product to be deleted.
   */
  const handleDeleteInitiate = (id) => {
    setProductIdToDelete(id);
    setShowConfirmModal(true);
  };

  /**
   * Executes the product deletion after user confirmation.
   */
  const handleDeleteConfirm = async () => {
    setShowConfirmModal(false); // Close modal immediately
    if (!productIdToDelete) return; // Should not happen if modal was opened correctly

    try {
      const res = await fetch(`http://localhost:3000/products/${productIdToDelete}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // No need to parse JSON if the backend doesn't return anything on delete
      // await res.json(); // Uncomment if your backend sends a JSON response on DELETE

      setMessage('✅ Product deleted successfully!');
      // Update the state to remove the deleted product
      setProducts(prev => prev.filter(product => product._id !== productIdToDelete));
    } catch (err) {
      console.error("Failed to delete product:", err);
      setMessage('❌ Failed to delete product. Please try again.');
    } finally {
      setProductIdToDelete(null); // Clear the ID after operation
      // Optionally, clear message after some time
      setTimeout(() => setMessage(''), 3000);
    }
  };

  /**
   * Cancels the product deletion process.
   */
  const handleDeleteCancel = () => {
    setShowConfirmModal(false);
    setProductIdToDelete(null);
  };

  // Display loader while data is being fetched
  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className={`flex flex-col min-h-screen bg-gray-50 ${
        products.length === 0 ? 'overflow-hidden' : 'overflow-y-auto'
      }`}
    >
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto w-full">
          {/* Display general messages (success/error) */}
          {message && (
            <div className={`p-3 mb-4 rounded-md text-center ${
              message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {products.length > 0 ? (
            products.map(product => (
              <div
                key={product._id}
                className="flex flex-col md:flex-row items-start bg-white border border-gray-300 rounded-xl shadow-sm p-6 mb-6"
              >
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden mr-6 flex-shrink-0">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 font-medium text-sm text-center p-2">🚫 No Image Available</span>
                  )}
                </div>
                <div className="flex-1 mt-4 md:mt-0">
                  <p className="text-gray-800 font-semibold mb-2 text-lg">
                    📝 {product.description}
                  </p>
                  <p className="text-green-600 font-bold mb-1 text-xl">💰 ₹{product.price}</p>
                  <p className="text-gray-500 mb-2 text-base">📦 Amount: {product.amount}</p>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleDeleteInitiate(product._id)}
                      className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 text-sm rounded-md font-medium transition-colors duration-200"
                    >
                      🗑 Delete
                    </button>
                    <button className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 text-sm rounded-md font-medium transition-colors duration-200">
                      🔗 Share
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-red-600 font-medium text-lg py-20">
              😔 No products available.
            </p>
          )}

          <button
            className="w-full bg-gray-300 text-white text-lg font-semibold py-3 rounded-md opacity-70 cursor-not-allowed mt-4"
            disabled
          >
            ➕ Add more item
          </button>
        </div>
      </main>
      <Footer />

      {/* Custom Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default Dashboard;
