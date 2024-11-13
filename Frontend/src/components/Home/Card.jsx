// components/Card.js
export default function Card({ title, image, price, location, badgeText, timeAgo, onClick }) {
    return (
      <div className="w-[350px] rounded-lg shadow-md border border-gray-200">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">{title}</h2>
            {badgeText && (
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {badgeText}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">{timeAgo}</span>
        </div>
        <img src={image} alt={title} className="w-full h-32 object-cover rounded-b-lg" />
        <div className="p-4 flex justify-between items-center">
          <p className="text-2xl font-bold">Rs {price}/kg</p>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {location}
          </span>
        </div>
        <div className="p-4">
          <button
            onClick={onClick}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
  