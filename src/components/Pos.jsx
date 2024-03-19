import { useState } from "react";


   

export const Pos =() => {
    
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] =useState(null)
   
     const getUserLocation1 = () => {   
         if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                 (position) => {
                    const { latitude, longitude } = position.coords;
                        setLatitude(latitude);
                        setLongitude(longitude)
     },
     
     (error) => {
             console.error('Error getting user location:', error);
         }
         
     );   
    }
     
     else {
     console.error('Geolocation is not supported by this browser.');
      }
   
      return (
       <div>
       <h1>Geolocation App</h1>
           <button onClick={getUserLocation1}>Get User Location</button>
               {latitude && longitude && (
       <div>
           <h2>User Location</h2>
               <p>Latitude: {latitude}</p>
               <p>Longitude: {longitude}</p>
       </div>
       )}
       </div>
       )
     };
   }
   
   
   


