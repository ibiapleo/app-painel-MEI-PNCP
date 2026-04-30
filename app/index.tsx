import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "@/app/pages/home/HomeScreen";

const Tab = createBottomTabNavigator();

export default function App(){
  return(
      <Tab.Navigator>
        <Tab.Screen name={"Explore"} component={HomeScreen}/>
      </Tab.Navigator>
  )
}