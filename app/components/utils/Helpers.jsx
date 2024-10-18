export const calculatorList = [

    "Baby Name Suggestions", //0
    "Lucky Rudraksh Calculator", //1
    "Lucky Date Calculator",//2
    "Lucky Vehicle Number Checker",//3
    "Personal Year Calculator",//4
    "Lucky Colour Calculator",//5
    "Lucky Alphabet & Number Calculator",//6
    "Name Match Calculator",//7
    "Numerology Calculator",//8
];


export const paramsGeneratorForCalculators = (values = {}, calcKey = 0) => {

    const keyMappings = {
        0: {
            key: "baby_names_suggestions",
            meaning: values?.name1,
            start: values?.firstAlphabet,
            birthdate: values?.dob,
        },
        1: {
            key: 'get-rudraksh',
            dob: values?.dob,
            time: `${values?.hour}:${values?.minute}`,
            latitude: values?.lat,
            longitude: values?.long,
        },
        2: {
            key: "lucky_dates",
            birthdate: values?.dob,
        },
        3: {
            key: "check_vehicle_comp",
            vehicle: values?.vehicleNo,
            birthdate: values?.dob,
        },
        4: {
            key: "get_personal_year",
            year: values?.personalYear,
            birthdate: values?.dob,
        },
        5: {
            key: "get_your_colors",
            birthdate: values?.dob,
        },
        6: {
            key: "get_favourable_alphabets_and_numbers",
            name: values?.name1,
            birthdate: values?.dob,
            gender: values?.gender,
        },
        7: {
            key: "calculate_chaldean_name_match_view",
            name1: values?.name1,
            name2: values?.name2,
            birthdate: values?.dob
        },
        8: {
            key: "calculate_numbers",
            name: values?.name1,
            gender: values?.gender,
            birthdate: values?.dob
        },
        9: {
            key: "overall",
            name: values?.name1,
            gender: values?.gender,
            dob: values?.dob,
            type  :'Pythagorean'
        }
    };

    return keyMappings[calcKey] || {};
};


export function convertDateFormat(dateString) {
    var parts = dateString.split('-');
    
    var formattedDate = parts[2] + '/' + parts[1] + '/' + parts[0];
    
    return formattedDate;
  }