import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PeopleIcon from '@material-ui/icons/People';
import TimelineIcon from '@material-ui/icons/Timeline';
import MoodIcon from '@material-ui/icons/Mood';
import CityIcon from '@material-ui/icons/LocationCity';

import { Link } from 'react-router-dom'

export const mainListItems = (
  <div>
    
    <Link to="/participants">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
          <ListItemText primary="Teilnehmende" />
      </ListItem>
    </Link>
    <Link to="/crews">
      <ListItem button>
        <ListItemIcon>
          <CityIcon />
        </ListItemIcon>
          <ListItemText primary="Crews" />
      </ListItem>
    </Link>
    <Link to="/moodpictures">
      <ListItem button>
        <ListItemIcon>
          <MoodIcon />
        </ListItemIcon>
          <ListItemText primary="Stimmungsbilder" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Stimmungen</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <TimelineIcon />
      </ListItemIcon>
      <ListItemText primary="Persönliche Stimmung" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <TimelineIcon />
      </ListItemIcon>
      <ListItemText primary="Letzte Aktion" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <TimelineIcon />
      </ListItemIcon>
      <ListItemText primary="Crew" />
    </ListItem>
    <Link  to="/moodoverview">
    <ListItem button>
    <ListItemIcon>
        <TimelineIcon />
      </ListItemIcon>
      <ListItemText primary="Zusammenfassung" />
    </ListItem>
    </Link>
  </div>
);