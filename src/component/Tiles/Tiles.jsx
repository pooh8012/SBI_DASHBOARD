import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ title, value }) => {
  return (
    <div className="tile p-4 bg-white border border-gray-300 rounded-md">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-xl">{value}</p>
    </div>
  );
};

Tile.propTypes = {
  title: PropTypes.string.isRequired, 
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
};

export default Tile;
