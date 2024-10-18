import React from 'react';
import PropTypes from 'prop-types';

const NakTable = ({ planets = [], planetsPoints = [] }) => {
  return (
    <div className="p-4"> 
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Zodiac Sign</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nakshatra</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Pada</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {planets.map((planet) => (
              <tr key={planet.key} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{planet.sign}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{planet.nak}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{planet.nakPada}</td>
              </tr>
            ))}
            {planetsPoints.map((point) => (
              <tr key={point.key} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{point.sign}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{point.nak}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{point.nakPada}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

NakTable.propTypes = {
  planetsPoints: PropTypes.array,
  planets: PropTypes.array,
};

export default NakTable;
