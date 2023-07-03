import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


const ActLista = (props) => {

  const BASE_PATH = process.env.REACT_APP_CONTROLLER_API_BASE_PATH;


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
