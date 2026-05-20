import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { CustomCard, CustomButton } from '../components/Shared';

export default function DetailBarang({ route, navigation }) {
  const { itemData } = route.params; 

  const statusColor = (itemData.status || 'Hilang').toLowerCase() === 'hilang' ? 'red' : 'green';

  return (
    <ScrollView style={styles.container}>
      <CustomCard>
        {itemData.foto && (
          <Image 
            source={{ uri: itemData.foto }} 
            style={styles.image} 
          />
        )}
        
        <Text style={styles.title}>{itemData.namaBarang}</Text>
        
        <Text style={styles.text}>Pelapor: {itemData.namaPelapor || '-'}</Text>
        <Text style={styles.text}>Kategori: {itemData.kategori || '-'}</Text>
        <Text style={styles.text}>Lokasi: {itemData.lokasi || '-'}</Text>
        <Text style={styles.text}>Deskripsi: {itemData.deskripsi || '-'}</Text>
        
        <Text style={[styles.text, { color: statusColor, fontWeight: 'bold', marginTop: 10 }]}>
          Status: {itemData.status || 'Hilang'}
        </Text>
      </CustomCard>

      <CustomButton 
        title="Kembali" 
        onPress={() => navigation.goBack()} 
        color="#6c757d"
      />
      
      <View style={{ height: 40 }} /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#f4f4f4' },

  image: { 
    width: '100%', 
    height: 200, 
    borderRadius: 10, 
    marginBottom: 15, 
    resizeMode: 'cover' },

  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    borderBottomWidth: 1, 
    paddingBottom: 5 },

  text: { 
    fontSize: 16, 
    marginBottom: 8 }
});