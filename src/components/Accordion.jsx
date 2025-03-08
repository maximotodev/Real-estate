import React, { useState } from 'react';

const Accordion = ({ items = [], defaultOpen = null }) => {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggle(index)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left bg-white"
          >
            <span className="font-semibold text-gray-900">{item.title}</span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {openIndex === index && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              {typeof item.content === 'string' ? (
                <p className="text-gray-700 leading-relaxed">{item.content}</p>
              ) : (
                item.content
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
