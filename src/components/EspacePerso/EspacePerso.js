// import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './styles.scss';

function EspacePerso() {
  return (
    <div className="EspacePerso">
      <h1 className="EspacePerso-title">Mon Espace Perso</h1>
      <div className="EspacePerso-AllCards">
        <Card className="EspacePerso-Card">
          <CardActionArea>
            <CardMedia
              className="EspacePerso-Card-CardMedia"
              component="img"
              image="https://cdn.pixabay.com/photo/2020/01/08/03/56/man-4749237_1280.jpg"
              alt="mon profil"
            />
            <CardContent>
              <Typography gutterBottom variant="h7" component="div">
                Mon profil
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="EspacePerso-Card">
          <CardActionArea>
            <CardMedia
              className="EspacePerso-Card-CardMedia"
              component="img"
              image="https://cdn.pixabay.com/photo/2016/11/19/17/25/furniture-1840463_1280.jpg"
              alt="mon profil"
            />
            <CardContent>
              <Typography gutterBottom variant="h7" component="div">
                Mon espace co-worker
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="EspacePerso-Card">
          <CardActionArea>
            <CardMedia
              className="EspacePerso-Card-CardMedia"
              component="img"
              image="https://cdn.pixabay.com/photo/2017/03/28/12/10/chairs-2181947_1280.jpg"
              alt="mon profil"
            />
            <CardContent>
              <Typography gutterBottom variant="h7" component="div">
                Mon espace hôte
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default EspacePerso;