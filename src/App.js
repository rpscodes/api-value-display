import React, { useEffect, useState } from 'react';

function App() {
  const [values, setValues] = useState({
    'Blue App': '',
    'Red App': '',
    'Green App': '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://3scale-admin.apps.cluster-s6mft.s6mft.sandbox952.opentlc.com/stats/services/4/top_applications.json?access_token=0zHujjIWrulhlj9e&since=2023-05-16&period=month&metric_name=hitshttps://3scale-admin.apps.cluster-wzhhm.wzhhm.sandbox319.opentlc.com/stats/services/4/top_applications.json?access_token=DYLoem9wR5CkDVlN&since=2023-05-16&period=month&metric_name=hits')
      .then((response) => response.json())
      .then((data) => {
        const updatedValues = {};

        data.applications.forEach((application) => {
          const { name, value } = application;
          let adjustedValue = Number(value);

          if (adjustedValue > 10 && adjustedValue <= 20) {
            adjustedValue = 10 + 3 * (adjustedValue - 10);
          } else if (adjustedValue > 20) {
            adjustedValue = 10 + 3 * (20 - 10) + 10 * (adjustedValue - 20);
          }

          updatedValues[name] = adjustedValue;
        });

        setValues(updatedValues);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  const getCircleStyle = (color) => {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      backgroundColor: color,
      margin: '10px',
      color: 'white',
      fontSize: '40px',
    };
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginRight: '30px' }}>
          <div style={getCircleStyle('blue')}>
            <span>{values['Blue App']}</span>
          </div>
          <div style={{ textAlign: 'center' }}>Blue</div>
        </div>
        <div style={{ marginRight: '30px' }}>
          <div style={getCircleStyle('red')}>
            <span>{values['Red App']}</span>
          </div>
          <div style={{ textAlign: 'center' }}>Red</div>
        </div>
        <div>
          <div style={getCircleStyle('green')}>
            <span>{values['Green App']}</span>
          </div>
          <div style={{ textAlign: 'center' }}>Green</div>
        </div>
      </div>
    </div>
  );
}

export default App;
