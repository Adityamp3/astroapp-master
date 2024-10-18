function getHouseIndex(houseName) {
    const houseIndexMap = {
        "First": 0,
        "Second": 1,
        "Third": 2,
        "Fourth": 3,
        "Fifth": 4,
        "Sixth": 5,
        "Seventh": 6,
        "Eighth": 7,
        "Ninth": 8,
        "Tenth": 9,
        "Eleventh": 10,
        "Twelfth": 11
    };
    return houseIndexMap[houseName] !== undefined ? houseIndexMap[houseName] : 0; 
}

function generatePlanetData(planets) {
    const planetData = new Array(12).fill().map(() => []);
  
    const planetShortNames = {
      sun: 'Su',
      moon: 'Mo',
      mercury: 'Me',
      venus: 'Ve',
      mars: 'Ma',
      jupiter: 'Ju',
      saturn: 'Sa',
      uranus: 'Ur',
      neptune: 'Ne',
      pluto: 'Pl',
      chiron: 'Ch',
      sirius: 'Si'
    };
  
    planets.forEach((planet) => {
      const { key, degrees , house } = planet;
      const { degrees: deg, minutes, seconds } = degrees;
      const degreeString = `${Number(deg)%30}°`;
  
      const houseIndex = getHouseIndex(house);
      const shortName = planetShortNames[key] || (key.charAt(0).toUpperCase() + key.slice(1, 3).toLowerCase());
      
      planetData[houseIndex].push({ name: shortName, degree: degreeString });
    });
  
    return planetData;
  }
  
  const getMoonHouse = (planets) => {
    const moonPlanet = planets.find(planet => planet.key === "moon");
    if (moonPlanet) {
      // Extract the house number from the moon planet object
      const houseNo = moonPlanet.house;
      return houseNo;
    } else {
      return "Moon not found";
    }
  }

  function generatePlanetDataChandra(data,planets){

    let moonHouse = getMoonHouse(planets);
    moonHouse = getHouseIndex(moonHouse)
    
    console.log("moonHouse : ",moonHouse)
    
    const planetData = new Array(12).fill().map(() => []);
     let itr = 0 , j = 0 ;
     for(var i = moonHouse ; i<=11 ; i++){
        planetData[itr] = data[i];
        itr++;
     }
     
     for(var i = itr ; itr<=11 ; itr++){
        planetData[itr] = data[j];
        j++;
     }
     return planetData
  } 
  export {generatePlanetData , generatePlanetDataChandra}