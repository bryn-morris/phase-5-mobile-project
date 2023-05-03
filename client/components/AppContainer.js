import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IndexStack from "./IndexStack/IndexStack";
import Compendium from "./Compendium.js";
import MyProfile from "./ProfileStack/MyProfile";
import { PlantProvider } from "../context/PlantContext";

function AppContainer() {

    const Tab = createBottomTabNavigator()

    return(
        <PlantProvider>
            <Tab.Navigator>
                <Tab.Screen name = 'Profile' component={MyProfile} />
                <Tab.Screen 
                    name = 'IndexStack'
                    component={IndexStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen name = 'Compendium' component={Compendium} />
            </Tab.Navigator>  
        </PlantProvider>
    )
}

export default AppContainer