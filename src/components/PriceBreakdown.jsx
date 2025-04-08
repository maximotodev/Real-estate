import React from 'react';

const PriceBreakdown = ({
  pricePerNight = 0,
  nights = 1,
  serviceFeePercent = 5,
  taxPercent = 10,
  discount = 0,
  compact = false
}) => {
  const basePrice = pricePerNight * nights;
  const serviceFee = parseFloat((basePrice * (serviceFeePercent / 100)).toFixed(2));
  const subtotal = basePrice + serviceFee;
  const tax = parseFloat((subtotal * (taxPercent / 100)).toFixed(2));
  const discountAmount = parseFloat((subtotal * (discount / 100)).toFixed(2));
  const total = parseFloat((subtotal + tax - discountAmount).toFixed(2));

  const items = [
    { label: `$${pricePerNight}/night × ${nights} night${nights !== 1 ? 's' : ''}`, value: basePrice },
    { label: 'Service Fee', value: serviceFee, percentage: `${serviceFeePercent}%` },
    { label: 'Tax', value: tax, percentage: `${taxPercent}%` },
    ...(discountAmount > 0 ? [{ label: 'Discount', value: -discountAmount, isDiscount: true }] : []),
  ];

  if (compact) {
    return (
      <div className="space-y-2 text-sm">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between">
            <span className={item.isDiscount ? 'text-green-600' : 'text-gray-600'}>
              {item.label}
              {item.percentage && <span className="text-xs text-gray-500 ml-1">({item.percentage})</span>}
            </span>
            <span className={`font-semibold ${item.isDiscount ? 'text-green-600' : 'text-gray-900'}`}>
              {item.isDiscount ? '-' : ''}${Math.abs(item.value).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-base">
          <span>Total</span>
          <span className="text-blue-600">${total.toFixed(2)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Price Breakdown</h3>

      <div className="space-y-3 mb-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div>
              <p className={item.isDiscount ? 'text-green-600 font-semibold' : 'text-gray-700'}>
                {item.label}
              </p>
              {item.percentage && (
                <p className="text-xs text-gray-500">({item.percentage})</p>
              )}
            </div>
            <span className={`font-semibold text-lg ${item.isDiscount ? 'text-green-600' : 'text-gray-900'}`}>
              {item.isDiscount ? '-' : ''}${Math.abs(item.value).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-gray-300 pt-4 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-900">Total Price</span>
        <span className="text-3xl font-bold text-blue-600">${total.toFixed(2)}</span>
      </div>

      {discount > 0 && (
        <p className="text-sm text-green-600 mt-3 font-semibold">
          ✓ You save ${discountAmount.toFixed(2)} with {discount}% discount
        </p>
      )}

      <p className="text-xs text-gray-600 mt-4">
        * Taxes and service fees calculated at checkout
      </p>
    </div>
  );
};

export default PriceBreakdown;
