import React ,{useState} from 'react'
import SideBar from '../../components/Admin SideBar/SideBar'
import './Stores.css'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


function Stores() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };
  return (
    
    <div className='Admin'>
<SideBar/>
      <div className="AdminStores-container">
      {!isMapLoaded && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}  style={{position: 'relative', top: '45%'}}>
            <CircularProgress />
          </Box>
        )}
      {/* <iframe src="https://my.atlistmaps.com/map/57300651-69d2-4636-a136-26f0e47cd1a8?share=true" allow="geolocation 'self' https://my.atlistmaps.com" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen onLoad={handleMapLoad}></iframe> */}
      <iframe src="https://my.atlistmaps.com/map/a98c682c-6002-4468-9c30-bb80727eb788?share=true" allow="geolocation 'self' https://my.atlistmaps.com" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen onLoad={handleMapLoad}></iframe>
      
      </div>

    </div>
  )
}

export default Stores