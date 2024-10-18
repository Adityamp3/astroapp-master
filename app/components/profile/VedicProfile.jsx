import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

// export async function getServerSideProps(context) {
//     // const { values, info } = cookies(context);
   
  
//     return {
//       props: {
//         values: values ? JSON.parse(values) : {},
//         info: info ? JSON.parse(info) : {},
//       },
//     };
// }

const VedicProfile = () => {
    let values = Cookies.get('values');
    let info = Cookies.get('info');
    values = values ? JSON.parse(values) : {},
    info = info ? JSON.parse(info) : {},
    console.log('Values in VedicProfile:', values);
    console.log('Info in VedicProfile:', info);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-2">{values?.name1}</h2>
      <div className="border-b my-2"></div> {/* Divider */}
      <p className="text-gray-600">DOB: {values.dob}</p>
      <div className="border-b my-2"></div>
      <p className="text-gray-600">
        Location: {values.lat}, {values.long}
      </p>
      <div className="border-b my-2"></div>
      <p className="text-gray-600">Gender: {values.gender}</p>
      <div className="border-b my-2"></div>
      <p className="text-gray-600">
        Birth Time: {values.hour} : {values.minute}
      </p>
      <div className="border-b my-2"></div>
      <p className="text-gray-600">Rasi: {info?.rasi}</p>
      <div className="border-b my-2"></div>
      <p className="text-gray-600">Rasi Lord: {info?.rasiLord}</p>
      <div className="border-b my-2"></div>
      <p className="text-gray-600">
        Tithi Info: tithi - {info?.tithi?.tithi}, tithiHalf - {info?.tithi?.tithiHalf}, 
        tithiPercentageLeft - {info?.tithi?.tithiPercentageLeft}
      </p>
    </div>
  );
};

VedicProfile.propTypes = {
  values: PropTypes.shape({
    name1: PropTypes.string.isRequired,
    dob: PropTypes.string.isRequired,
    lat: PropTypes.string,
    long: PropTypes.string,
    gender: PropTypes.string.isRequired,
    hour: PropTypes.number.isRequired,
    minute: PropTypes.number.isRequired,
  }).isRequired,
  info: PropTypes.shape({
    rasi: PropTypes.string,
    rasiLord: PropTypes.string,
    tithi: PropTypes.shape({
      tithi: PropTypes.string,
      tithiHalf: PropTypes.string,
      tithiPercentageLeft: PropTypes.string,
    }),
  }),
};

export default VedicProfile;
