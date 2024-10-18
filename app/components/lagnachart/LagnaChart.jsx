import React, { useEffect } from 'react';
import { generatePlanetData, generatePlanetDataChandra } from './utils';

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const LagnaChart = ({ arr, title, chandra = false }) => {
  const canvasId = 'canvas_' + generateRandomString(8);

  useEffect(() => {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    var x = 0; 
    var y = 0; 
    var width = 500; 
    var height = 375; 

    var fontSize = (width + height) / 100;
    var SubfontSize = fontSize - (fontSize * 0.3);

    fontSize = String(fontSize) + "px";
    SubfontSize = String(SubfontSize) + "px";
    ctx.fillStyle = "#FFFFE0"; // Set fill color to light yellow
    ctx.fillRect(x, y, width, height); // Draw the filled rectangle

    // Draw diagonals
    ctx.strokeStyle = "#000000"; // Set stroke color to black
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y + height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + width, y);
    ctx.lineTo(x, y + height);
    ctx.stroke();

    var midX = x + width / 2;
    var midY = y + height / 2;

    ctx.strokeStyle = "#000000"; 
    ctx.beginPath();
    ctx.moveTo(midX, y);
    ctx.lineTo(x + width, midY);
    ctx.lineTo(midX, y + height);
    ctx.lineTo(x, midY);
    ctx.lineTo(midX, y);
    ctx.stroke();

    ctx.strokeStyle = "#1111"; 
    ctx.font = fontSize + " Arial";
    ctx.fillStyle = "#000000"; 
    
    var shiftX = {
      1: [0.10, 0.16, .21, 0.26, .31, 0.16, .21, 0.26],
      0: [0.35, 0.41, .47, 0.53, .59, 0.35, .41, 0.47, 0.53, 0.59],
      11: [0.62, 0.68, .74, 0.80, 0.86, 0.67, 0.73, 0.79],
      2: [0.02, 0.02, 0.02, 0.02, .02, 0.08, .08, 0.08],
      3: [0.11, 0.17, .23, 0.29, .35, 0.11, 0.17, .23, 0.29, .35],
      6: [0.35, 0.41, .47, 0.53, .59, 0.35, 0.41, .47, 0.53, 0.59],
      9: [0.60, 0.67, .74, 0.81, .87, 0.60, 0.67, .74, 0.81, .87],
      10: [0.93, 0.93, 0.93, 0.93, 0.93, 0.88, .88, .88],
      4: [0.02, 0.02, 0.02, 0.02, .02, 0.08, .08, .08],
      5: [0.10, 0.17, .24, .31, .37, 0.17, .24, .30],
      7: [0.62, 0.68, .74, 0.80, 0.86, 0.67, 0.73, 0.79],
      8: [0.93, 0.93, 0.93, 0.93, 0.93, 0.88, .88, .88],
    };

    var shiftY = {
      1: [0.080, 0.080, 0.080, 0.080, 0.080, 0.15, 0.15, 0.15],
      0: [0.20, 0.20, 0.20, 0.20, 0.20, 0.30, 0.30, 0.30, 0.30, 0.30],
      11: [0.080, 0.080, 0.080, 0.080, 0.080, 0.15, 0.15, 0.15],
      2: [0.13, 0.20, 0.27, 0.34, 0.42, 0.20, 0.27, 0.34],
      3: [0.45, 0.45, 0.45, 0.45, 0.45, 0.55, 0.55, 0.55, 0.55, 0.55],
      6: [0.71, 0.71, 0.71, 0.71, 0.71, 0.80, 0.80, 0.80, 0.80, 0.80],
      9: [0.45, 0.45, 0.45, 0.45, 0.45, 0.55, 0.55, 0.55, 0.55, 0.55],
      10: [0.13, 0.20, 0.27, 0.34, 0.42, 0.20, 0.27, 0.34],
      4: [0.65, 0.72, 0.78, 0.85, 0.92, 0.72, 0.78, 0.84],
      5: [0.94, 0.94, 0.94, 0.94, 0.94, 0.87, 0.87, 0.87, 0.87, 0.87],
      7: [0.94, 0.94, 0.94, 0.94, 0.94, 0.87, 0.87, 0.87, 0.87, 0.87],
      8: [0.65, 0.72, 0.78, 0.85, 0.92, 0.72, 0.78, 0.84],
    };

    var itemNumber = Array(12).fill(0);

    function displaySign(superText, house, itemNumber) {
      const itr = itemNumber[house];
      itemNumber[house]++;
      const firstHouseX = width * shiftX[house][itr];
      const firstHouseY = height * shiftY[house][itr];
      ctx.font = fontSize + " Arial";
      ctx.fillText(superText, x + firstHouseX, y + firstHouseY);
    }

    function displaySubSign(superText, house, itemNumber) {
      const itr = itemNumber[house];
      const firstHouseX = width * shiftX[house][itr - 1];
      const firstHouseY = height * shiftY[house][itr - 1];
      const firstHouseXSub = firstHouseX + (width * 0.025);
      const firstHouseYSub = firstHouseY - (height * 0.015);

      ctx.font = String(SubfontSize) + " Arial";
      ctx.fillText(superText, x + firstHouseXSub, y + firstHouseYSub);
    }

    let data = generatePlanetData(arr);
    if (chandra === true) {
      data = generatePlanetDataChandra(data, arr);
    }

    for (var i = 0; i <= 11; i++) {
      for (var itr in data[i]) {
        const info = data[i][itr];
        displaySign(info?.name, i, itemNumber);
        displaySubSign(info?.degree, i, itemNumber);
      }
    }
    return () => { };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <canvas
        id={canvasId}
        width="450"
        height="325"
        className="border border-gray-400 rounded-lg shadow-lg"
      ></canvas>
    </div>
  );
};

export default LagnaChart;
