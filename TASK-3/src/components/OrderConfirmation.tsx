import React from 'react';
import { CheckCircle, Package, Truck, Calendar } from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationProps {
  order: Order;
  onContinueShopping: () => void;
}

export function OrderConfirmation({ order, onContinueShopping }: OrderConfirmationProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-left">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="font-semibold">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-semibold text-green-600">${order.total.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <Package className="h-5 w-5 text-blue-600" />
            <span className="text-sm">Order Confirmed</span>
          </div>
          <div className="flex items-center space-x-3">
            <Truck className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Preparing for Shipment</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">
              Est. {order.estimatedDelivery.toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold mb-4">Order Items</h3>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.product.id} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="text-left">
                  <p className="font-medium text-sm">{item.product.name}</p>
                  <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-semibold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold mb-4">Shipping Address</h3>
        <div className="text-left text-sm text-gray-600">
          <p>{order.customer.firstName} {order.customer.lastName}</p>
          <p>{order.customer.address}</p>
          <p>{order.customer.city}, {order.customer.zipCode}</p>
          <p>{order.customer.country}</p>
          <p className="mt-2">{order.customer.email}</p>
          <p>{order.customer.phone}</p>
        </div>
      </div>

      <button
        onClick={onContinueShopping}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
}