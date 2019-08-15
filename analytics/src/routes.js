import React      from 'react';
import Loadable   from 'react-loadable'
import ParticipantsView from './views/ParticipantsView'
import CrewsView from './views/CrewsView'
import MoodPicturesView from './views/MoodPicturesView'
import MoodOverviewView from './views/MoodOverviewView'
import PersonalMoodView from './views/MoodPersonalView'
import ActionMoodView from './views/MoodActionView'
import CrewMoodView from './views/MoodCrewView'
 
function Loading() {
  return <div>Loading...</div>;
}

const Home = Loadable({
    loader : () => import('./views/HomeView'),
    loading: Loading
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
   // { path: '/',                   name: 'Portal',           component: DefaultLayout, exact: true },
  { path: '/home',        name: 'Home', component: Home},
  { path: '/participants',name: 'Participants',     component: ParticipantsView      },
  { path: '/crews',       name: 'Crews', component: CrewsView},
  { path: '/moodpictures',name: 'Mood Pictures', component: MoodPicturesView},
  { path: '/moodoverview',name: 'Mood Overview', component: MoodOverviewView},
  { path: '/personalmood',name: 'Personal Mood', component: PersonalMoodView},
  { path: '/actionmood', name: 'Action Mood', component: ActionMoodView},
  { path: '/crewmood', name: 'Crew Mood', component: CrewMoodView}
];

export default routes;