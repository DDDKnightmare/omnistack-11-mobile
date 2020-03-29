import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Incidents from './scenes/Incidents';
import Detail from './scenes/Detail';

const Stack = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen 
                    name="Incidents"
                    component={Incidents}
                />
                <Stack.Screen
                    name="Detail"
                    component={Detail}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}