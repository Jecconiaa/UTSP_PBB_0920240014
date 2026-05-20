import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from './screens/Dashboard';
import TambahLaporan from './screens/TambahLaporan';
import ListBarang from './screens/ListBarang';
import DetailBarang from './screens/DetailBarang';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Find It Kampus' }} />
        <Stack.Screen name="TambahLaporan" component={TambahLaporan} options={{ title: 'Buat Laporan' }} />
        <Stack.Screen name="ListBarang" component={ListBarang} options={{ title: 'Daftar Laporan' }} />
        <Stack.Screen name="DetailBarang" component={DetailBarang} options={{ title: 'Detail Laporan' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}