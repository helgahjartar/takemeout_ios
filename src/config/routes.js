import EventOverview from '../containers/EventOverview/EventOverview';
import HomeScreen from '../containers/HomeScreen/HomeScreen';
import UserRegistration from '../components/UserArea/UserRegistration';
import UserAuthentication from '../components/UserArea/UserAuthentication';

const Routes = {
  Home: { screen: HomeScreen },
  EventOverview: { screen: EventOverview },
  UserRegistration: { screen: UserRegistration },
  UserAuthentication: { screen: UserAuthentication }
};

export default Routes;
