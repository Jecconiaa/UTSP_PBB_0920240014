import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomCard } from '../components/Shared';

export default function ListBarang({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try { 
      const savedData = await AsyncStorage.getItem('@laporan_list');
      const parsedData = savedData ? JSON.parse(savedData) : [];
      
      setTimeout(() => {
        setData(parsedData);
        setLoading(false);
        setRefreshing(false);
      }, 1000);

    } catch (err) {
      setError(true); 
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const filteredData = data.filter(item => 
    item.namaBarang && item.namaBarang.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const statusColor = item.status.toLowerCase() === 'hilang' ? 'red' : 'green';

    return (
      <TouchableOpacity onPress={() => navigation.navigate('DetailBarang', { itemData: item })}>
        <CustomCard>
          <Text style={styles.itemName}>{item.namaBarang}</Text>
          <Text style={{ color: statusColor, fontWeight: 'bold', marginBottom: 5 }}>Status: {item.status}</Text>
          <Text>Lokasi: {item.lokasi || 'Tidak tahu'}</Text>
        </CustomCard>
      </TouchableOpacity>
    );
  };

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} animating={true} />;
  }
  
  if (error) {
    return <Text style={styles.centerText}>Gagal mengambil data dari penyimpanan :(</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchBar} 
        placeholder="Cari nama barang..." 
        value={search}
        onChangeText={setSearch}
      />
      
      {filteredData.length === 0 && !loading ? (
        <Text style={styles.centerText}>Data barang kosong / tidak ditemukan.</Text>
      ) : (
        <FlatList 
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 15, 
    backgroundColor: '#f4f4f4' },

  searchBar: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 15, 
    backgroundColor: '#fff' },

  itemName: { 
    fontSize: 18, 
    fontWeight: 'bold' },

  centerText: { 
    textAlign: 'center', 
    marginTop: 20, color: 'gray' }
});