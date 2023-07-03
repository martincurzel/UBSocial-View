import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { callApiNoRead } from '../helpers/apiCallNoRead';


const ActLista = (props) => {

  const BASE_PATH = process.env.REACT_APP_CONTROLLER_API_BASE_PATH;

  const handleJoin = (act) => {
    callApiNoRead("POST", "Activity/join/" + act.id, null)
      .then(response => {
        const updatedisJoined = act.isJoined === null ? true : !act.isJoined;
        props.handleJoin(act.id, updatedisJoined);
      })
      .catch(error => {
        // Handle any errors from the API
        console.error('Error:', error);
      });

  };


  return (
    <section className="row">
      {
         props.acts ? (
        props.acts.map((act) => (

          <div key={act.id} className="col-md-3 mt-5">
            <Card className=""  sx={{ maxWidth: 345 }}>
              <CardActionArea component={Link} to={"/actividades/" + act.id}>
                <CardMedia
                  component="img"
                  height="140"
                  image={BASE_PATH + act.URLPhotos}
                  alt="Foto"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {act.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha de finalizacion: {act.dateFinishActivity}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button component={Link} to={"/actividades/" + act.id} size="small" color="primary">
                  ver
                </Button>
                {act.isJoined === null ? (
                <>
                </>
                ) : act.isJoined === false ? (
                <>
                  <Button onClick={() => handleJoin(act)} size="small" color="primary">
                    unirme
                  </Button>
                </>
                ) : (
                <>
                  <Button onClick={() => handleJoin(act)} size="small" color="primary">
                    dejar
                  </Button>
                </>
                )}
                
              </CardActions>
            </Card>
          </div>

        ))) : (
            <h4 className="text-center mt-5">No hay actividades por el momento Xd</h4>
        )}
      

    </section>

  )
}

export default ActLista;
