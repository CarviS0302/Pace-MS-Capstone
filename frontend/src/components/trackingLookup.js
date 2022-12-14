import React from 'react';

export default function FindTrackingStatus() {
  // state variable to store the input string
  const [input, setInput] = React.useState('');


  //function to use RegEx to find carrier and lookup status
    function findStatus(){
    const trackingNo = input;
    const regexUPS = /^1Z/;
    const matchUPS = regexUPS.exec(trackingNo);

    if (matchUPS==true){
        const status = lookupUpsTrackingNumber(trackingNo);
        alert(`The shipping status is: ${status}.`);
        return status;
    }
    else
        alert('the shipping status could not be found');

    
    function lookupUpsTrackingNumber(trackingNo) {
        // Set the URL for the UPS tracking API
        const trackingApiUrl = 'https://www.ups.com/track/api/Track/GetStatus?loc=en_US';
      
        // Send the request to UPS API
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Locale: 'en_US',
            Requester: 'UPSHome',
            TrackingNumber: [trackingNo]
          })
        };
      
        // Make a request to the UPS tracking API to get the tracking information
        const response = fetch(trackingApiUrl, requestOptions);
      
        // Process the response to extract the tracking information
        const trackingInfo = response.trackingInfo;
      
        // Return the tracking information
        return trackingInfo;

    }

  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={event => setInput(event.target.value)}
      />
      <button onClick={findStatus}>Lookup Shipment</button>
    </div>
  );
}
