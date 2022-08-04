import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import alimentationScreen from './alimentationScreen';
import photosScreen from './photosScreen';
import servicesScreen from './servicesScreen';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
        tabBarOptions={{
            style: {
                marginTop: 10,
                backgroungColor: 'white'
            },
            indicatorStyle: {
                backgroundColor: 'black'
            }
        }}
    >
      <Tab.Screen name="Photos" component={photosScreen} />
      <Tab.Screen name="Alimentation" component={alimentationScreen} />
      <Tab.Screen name="Services" component={servicesScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;