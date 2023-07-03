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
        const updatedAreuJoined = act.AreuJoined === null ? true : !act.AreuJoined;
        props.handleJoin(act.id, updatedAreuJoined);
      })
      .catch(error => {
        // Handle any errors from the API
        console.error('Error:', error);
      });

  };


  return (
    <section className="row">
      {
        props.acts.map((act) => (

          <div className="col-md-3 mt-5">
            <Card className="" key={act.id} sx={{ maxWidth: 345 }}>
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
                {act.AreuJoined == null ? (
                <>
                </>
                ) : act.AreuJoined == false ? (
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

        ))
      }

    </section>

  )
}

export default ActLista;
