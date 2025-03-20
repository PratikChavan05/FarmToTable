import React, { useState, useEffect } from 'react';
import {
  Truck, Package, CheckCircle, XCircle, MapPin,
  DollarSign, Navigation
} from 'lucide-react';
import axios from 'axios';
import {
  GoogleMap, LoadScript, DirectionsRenderer, Marker
} from '@react-google-maps/api';

const Deliveryboy = () => {
  const [assignedOrders, setAssignedOrders] = useState([
    {
      orderId: {
        _id: 'ORD12345',
        location: {
          address: '123 Main St, Springfield',
          coordinates: [77.5946, 12.9716],
        },
        totalPrice: 250,
        deliveryStatus: 'OUT_FOR_DELIVERY',
      }
    },
    {
      orderId: {
        _id: 'ORD67890',
        location: {
          address: '456 Elm St, Shelbyville',
          coordinates: [78.9629, 20.5937],
        },
        totalPrice: 150,
        deliveryStatus: 'DELIVERED',
      }
    }
  ]);
  const [directions, setDirections] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error('Error getting location:', error.message),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
      );
    }
  }, []);

  const calculateRoute = async (destination) => {
    if (!currentLocation) return;
    const directionsService = new google.maps.DirectionsService();
    const result = await directionsService.route({
      origin: new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
      destination: new google.maps.LatLng(destination.coordinates[1], destination.coordinates[0]),
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirections(result);
  };

  const updateOrderStatus = async (orderId) => {
    try {
      console.log(`Order ${orderId} marked as DELIVERED with OTP ${otp}`);
      setShowOtpField(null);
      setOtp("");
    } catch (error) {
      console.error('Error updating order status', error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold flex items-center">
        <Truck className="mr-2" /> Delivery Dashboard
      </h1>

      <div className="border rounded-lg p-4">
        <div className="flex items-center mb-4">
          <Package className="mr-2" />
          <h2 className="text-xl font-semibold">Assigned Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Order ID</th>
                <th className="py-2 text-left">Delivery Address</th>
                <th className="py-2 text-left">Total Price</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedOrders.map(assignment => {
                const order = assignment.orderId;
                return (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{order._id}</td>
                    <td className="py-2 flex items-center">
                      <MapPin className="mr-2 text-gray-500" />
                      {order.location.address}
                      <button
                        onClick={() => calculateRoute(order.location)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        <Navigation size={16} /> Show Route
                      </button>
                    </td>
                    <td className="py-2 flex items-center">
                      <DollarSign className="mr-1 text-green-500" />
                      {order.totalPrice}
                    </td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        order.deliveryStatus === 'OUT_FOR_DELIVERY' ? 'bg-blue-100 text-blue-800' :
                        order.deliveryStatus === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.deliveryStatus}
                      </span>
                    </td>
                    <td className="py-2 space-x-2">
                      {showOtpField === order._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="border rounded px-2 py-1 mr-2"
                            placeholder="Enter OTP"
                          />
                          <button
                            onClick={() => updateOrderStatus(order._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Confirm
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowOtpField(order._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded flex items-center"
                          disabled={order.deliveryStatus !== 'OUT_FOR_DELIVERY'}
                        >
                          <CheckCircle className="mr-1" /> Deliver
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Deliveryboy;

