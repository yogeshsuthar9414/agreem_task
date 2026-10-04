import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../../features/dashboard/screens/Home';
import { ROUTES } from '../routes';
import BottomTab from '../../components/bottomTab/BottomTab';
import Header from '../../components/header/Header';
import Listing from '../../features/listing/screens/Listing';
import Settings from '../../features/settings/screens/Settings';

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
    return (
        <Tab.Navigator
            initialRouteName={ROUTES.HOME}
            screenOptions={{
                header: () => (
                    <Header />
                ),
            }}
            tabBar={(props) => <BottomTab {...props} />}
        >
            <Tab.Screen name={ROUTES.HOME} component={Dashboard} />

            <Tab.Screen
                name={ROUTES.LISTING}
                component={Listing}
            />

            <Tab.Screen
                name={ROUTES.SETTING}
                component={Settings}
            />
        </ Tab.Navigator>
    );
}