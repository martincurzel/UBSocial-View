import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography  } from '@mui/material';
import MiPefil from '../components/MiPerfil';
import MisActividades from '../components/MisActividades';
import MisPropuestas from '../components/MisPropuestas';
import MiContenidoDescargable from '../components/MiContenidoDescargable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style= {{ width: "100%" }}
    >
      {value === index && (
        <Box sx={{ pl: 5, pt: 3, pr: 5, maxWidth: "100%" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function UserPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {localStorage.getItem("jwtToken") === null ? (
              <div className="Crear mt-5">
                  <Typography className="mb-4" variant="p">Porfavor accede a tu cuenta para acceder a esta página.</Typography>
              </div>
              ) : (
              <Box 
                  sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
                >
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    sx={{ borderRight: 1, borderColor: 'divider', height: '100vh'}}
                  >
                    <Tab label="Mi Perfil" {...a11yProps(0)} />
                    <Tab label="Mis Actividades" {...a11yProps(1)} />
                    <Tab label="Mis Propuestas" {...a11yProps(2)} />
                    <Tab label="Mi Contenido Descargable" {...a11yProps(3)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <MiPefil/>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <MisActividades/>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <MisPropuestas/>
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <MiContenidoDescargable/>
                  </TabPanel>
                </Box>
              )}
    </>
  );
}