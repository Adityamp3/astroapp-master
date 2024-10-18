'use client'
const bing_api_key = 'Am-OINBmBYdnEx3I-7nRGg2uVsvR9HzzaiYzlOmD4qgmJj8FlSBPs9skFyds1D72'
import React, { useState, useEffect } from 'react';

const AddressSearch = ({ inputValue, onInputChange, onListItemClick }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        if (inputValue.trim() !== '' && !clicked) {
            fetchSuggestions(inputValue);
        } else {
            setSuggestions([]);
            setClicked(false)
        }
    }, [inputValue]);

    const fetchSuggestions = async (query) => {
        try {
            const response = await fetch(`https://dev.virtualearth.net/REST/v1/Locations?q=${query}&key=${bing_api_key}`);
            if (!response.ok) {
                throw new Error('Failed to fetch suggestions');
            }
            const data = await response.json();
            const suggestions = data.resourceSets[0].resources.map((resource) => ({
                address: getAddressString(resource.address),
                coordinates: resource.point.coordinates,
            }));
            setSuggestions(suggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const getAddressString = (address) => {
        let addressString = '';
        for (const key in address) {
            if (address[key] && typeof address[key] === 'string') {
                addressString += `${address[key]}, `;
            }
        }
        return addressString.slice(0, -2);
    };

    const handleListItemClick = (address, coordinates) => {
        setClicked(true)
        onListItemClick(address, coordinates);
        setSuggestions([]);
    };

    return (
        <div className="screen">
            <input
                type="text"
                value={inputValue}
                onChange={onInputChange}
                placeholder="Type an address..."
                className='input w-full border rounded p-1'
            />
            {suggestions.length > 0 && (
                <div className="dropdown">
                    {suggestions.map((suggestion, index) => (
                        <button className="resultButton" key={index} onClick={() => handleListItemClick(suggestion.address, suggestion.coordinates)}>
                            {suggestion.address}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddressSearch;
