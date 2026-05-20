import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomButton } from '../components/Shared';

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang di Find it Kampus!</Text>
      <Text style={styles.subtitle}>Aplikasi Lost & Found Kampus</Text>

      <CustomButton 
        title="Buat Laporan Baru" 
        onPress={() => navigation.navigate('TambahLaporan')} 
        color="#28a745"
        disabled={false} 
      />
      <CustomButton 
        title="Lihat Daftar Laporan" 
        onPress={() => navigation.navigate('ListBarang')} 
        disabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center' },

  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center' },

  subtitle: { 
    fontSize: 16, 
    textAlign: 'center', 
    marginBottom: 40, color: 'gray' },
});