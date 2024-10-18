import React from 'react';
import PropTypes from 'prop-types';

const TableC = ({ planets = [], planetsPoints = [] }) => {
  return (
    <div className="p-4"> {/* Padding around the table */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-black text-white">
            <th className="py-2 px-4 border-b">Planet</th>
            <th className="py-2 px-4 border-b">Zodiac Sign</th>
            <th className="py-2 px-4 border-b">Latitude</th>
            <th className="py-2 px-4 border-b">Longitude</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
            <tr key={planet.key} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{planet.key}</td>
              <td className="py-2 px-4 border-b">{planet.sign}</td>
              <td className="py-2 px-4 border-b">{planet.latitude}</td>
              <td className="py-2 px-4 border-b">{planet.longitude}</td>
            </tr>
          ))}
          {planetsPoints.map((point) => (
            <tr key={point.key} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{point.key}</td>
              <td className="py-2 px-4 border-b">{point.sign}</td>
              <td className="py-2 px-4 border-b">{point.latitude}</td>
              <td className="py-2 px-4 border-b">{point.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TableC.propTypes = {
  planetsPoints: PropTypes.array,
  planets: PropTypes.array,
};

export default TableC;
