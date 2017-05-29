import EventOverview from '../containers/EventOverview/EventOverview';
import EventDetails from '../containers/EventDetails/EventDetails';
import HomeScreen from '../containers/HomeScreen/HomeScreen';
import UserRegistration from '../components/UserArea/UserRegistration';
import UserAuthentication from '../components/UserArea/UserAuthentication';
import EventRegistration from '../components/EventRegistration/EventRegistration';
import LocationRegistration from '../components/EventRegistration/LocationRegistration';
import PerformerRegistration from '../components/EventRegistration/PerformerRegistration';
import EventRegContainer from '../containers/EventRegContainer/EventRegContainer';

const Routes = {
  Home: { screen: HomeScreen },
  EventOverview: { screen: EventOverview },
  EventDetails: { screen: EventDetails },
  UserRegistration: { screen: UserRegistration },
  UserAuthentication: { screen: UserAuthentication },
  EventRegistration: { screen: EventRegistration },
  LocationRegistration: { screen: LocationRegistration },
  PerformerRegistration: { screen: PerformerRegistration },
  EventRegContainer: { screen: EventRegContainer }
};

export default Routes;
