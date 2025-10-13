// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// const LiveMetalPrice = () => {
//     const [rate, setRate] = useState([])

//     useEffect(() => {
//         fetchLiveRate()
//     }, [])

//     async function fetchLiveRate() {
//         try {
//             const response = await axios.get('https://api.metalpriceapi.com/v1/latest', {
//                 params: {
//                     api_key: 'bd1710c303901ad5dfe344c5ad3f8ab9',
//                     currency: 'INR',
//                     metals: 'gold,silver',
//                 },
//             });
//             console.log(response.data.rates, "rates")
//             console.log(response.data.rates.XAU, "gold") //result : undefined
//             setRate(response.data.rates);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     }


//     return (
//         <>
//             <div style={{ marginTop: '200px' }} className='bg-danger'>
//                 <h1>Live Gold and Silver Prices</h1>
//                 <p>Gold Price (INR): {rate.XAU}</p>
//                 <p>Silver Price (INR): {rate.XAG}</p>
//             </div>
//         </>
//     )
// }

// export default LiveMetalPrice

// // 2:
import React, { useEffect, useState } from 'react'

const LiveMetalPrice = () => {
    const [rates, setRates] = useState({
        gold: null,
        silver: null,
        loading: true,
        error: null,
        timestamp: null
    })

    useEffect(() => {
        fetchLiveRate()
        // Refresh every 5 minutes
        const interval = setInterval(fetchLiveRate, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    async function fetchLiveRate() {
        try {
            const response = await fetch('https://api.metalpriceapi.com/v1/latest?api_key=bd1710c303901ad5dfe344c5ad3f8ab9&base=INR&currencies=XAU,XAG');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Full Response:', data)

            const TROY_OUNCE_TO_GRAM = 31.1035; // 1 troy ounce = 31.1035 grams

            // The API returns how much of the metal (XAU/XAG) you get for 1 INR
            // So we need to invert it and convert to per gram
            const goldPerOunce = data.rates.XAU ? (1 / data.rates.XAU) : null;
            const silverPerOunce = data.rates.XAG ? (1 / data.rates.XAG) : null;

            setRates({
                gold: goldPerOunce ? (goldPerOunce / TROY_OUNCE_TO_GRAM).toFixed(2) : null,
                silver: silverPerOunce ? (silverPerOunce / TROY_OUNCE_TO_GRAM).toFixed(2) : null,
                loading: false,
                error: null,
                timestamp: new Date(data.timestamp * 1000).toLocaleString('en-IN')
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            setRates(prev => ({
                ...prev,
                loading: false,
                error: error.message
            }));
        }
    }

    return (
        <div className='bg-primar y pt-3 '>
            <p className='text-center primary_Bgclr text-white  '>
                Gold: ₹{rates.gold || 'N/A'}, Silver: ₹{rates.silver || 'N/A'},
                Last updated: {rates.timestamp}
            </p>
        </div>
    )
}

export default LiveMetalPrice



// //3:
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const LiveMetalPrice = () => {
//     const [rate, setRate] = useState({});

//     useEffect(() => {
//         fetchLiveRate();
//     }, []);

//     async function fetchLiveRate() {
//         try {
//             // const response = await axios.get('https://api.indiagoldrate.com/v1/latest', {
//             //     params: {
//             //         currency: 'INR',  // Specify INR as the currency.
//             //         metals: 'gold,silver',
//             //     },
//             // });

//             const response = await axios.get('https://ibjarates.com/API/GoldRates/')

//             console.log(response.data, "Rates in INR");

//             setRate({
//                 gold: response.data.gold,  // Gold price per gram in INR
//                 silver: response.data.silver,  // Silver price per gram in INR
//             });
//         } catch (error) {
//             if (error.response) {
//                 // The request was made and the server responded with a status code
//                 console.error('API Error:', error.response.data);
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 console.error('No response received from API:', error.request);
//             } else {
//                 // Something happened in setting up the request
//                 console.error('Error setting up request:', error.message);
//             }
//         }
//     }


//     return (
//         <>
//             <div style={{ marginTop: '200px' }} className='bg-danger'>
//                 <h1>Live Gold and Silver Prices</h1>
//                 <p>Gold Price (INR): {rate.gold ? rate.gold : 'Loading...'}</p>
//                 <p>Silver Price (INR): {rate.silver ? rate.silver : 'Loading...'}</p>
//             </div>
//         </>
//     );
// }

// export default LiveMetalPrice;
