import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomButton } from '../components/Shared';

export default function TambahLaporan() {
  const [namaPelapor, setNamaPelapor] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [status, setStatus] = useState('Hilang');
  const [deskripsi, setDeskripsi] = useState('');
  const [foto, setFoto] = useState(null);
  
  // 1. Tambah State Kategori (Default: Elektronik)
  const [kategori, setKategori] = useState('Elektronik');

  // Daftar pilihan kategori sesuai soal
  const opsiKategori = ['Elektronik', 'Aksesoris', 'Dokumen', 'Lainnya'];

  const isButtonActive = namaBarang.length >= 3 && deskripsi.length >= 20;

  const bukaKamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Error", "Kasih izin kamera dulu Ya!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const submitLaporan = async () => {
    try {
      const existingData = await AsyncStorage.getItem('@laporan_list');
      let laporanBaru = existingData ? JSON.parse(existingData) : [];

      const dataBaru = {
        id: Date.now().toString(),
        namaPelapor,
        namaBarang,
        kategori,
        status,
        lokasi,
        deskripsi,
        foto
      };

      laporanBaru.push(dataBaru);
      await AsyncStorage.setItem('@laporan_list', JSON.stringify(laporanBaru));

      Alert.alert("Sukses!", "Laporan berhasil disimpan!");
      
      setNamaPelapor('');
      setNamaBarang('');
      setKategori('Elektronik'); 
      setLokasi('');
      setStatus('Hilang');
      setDeskripsi('');
      setFoto(null);
    } catch (err) {
      Alert.alert("Error", "Gagal menyimpan data.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nama Pelapor</Text>
      <TextInput style={styles.input} value={namaPelapor} onChangeText={setNamaPelapor} placeholder="Nama" />

      <Text style={styles.label}>Nama Barang </Text>
      <TextInput style={styles.input} value={namaBarang} onChangeText={setNamaBarang} placeholder="Contoh: Dompet" />

      <Text style={styles.label}>Kategori Barang</Text>
      <View style={styles.kategoriContainer}>
        {opsiKategori.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.kategoriChip,
              kategori === item && styles.kategoriChipActive
            ]}
            onPress={() => setKategori(item)}
          >
            <Text style={[
              styles.kategoriText,
              kategori === item && styles.kategoriTextActive
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Lokasi Hilang/Ditemukan</Text>
      <TextInput style={styles.input} value={lokasi} onChangeText={setLokasi} placeholder="Contoh: Gedung B" />

      <Text style={styles.label}>Status</Text>
      <TextInput style={styles.input} onChangeText={setStatus} placeholder="Hilang/Ditemukan" />

      <Text style={styles.label}>Deskripsi (Min 20 Karakter)</Text>
      <TextInput 
        style={[styles.input, { height: 80 }]} 
        value={deskripsi} 
        onChangeText={setDeskripsi} 
        multiline={true}
        placeholder="Bagaimana Ciri Ciri Barang Tersebut..." />

      <Text style={{ textAlign: 'right', color: 'gray', marginBottom: 10 }}>
        {deskripsi.length} karakter
      </Text>

      <CustomButton title="Foto Barang" onPress={bukaKamera} color="#17a2b8" />
      
      {foto && (
        <Image source={{ uri: foto }} style={{ width: 100, height: 100, alignSelf: 'center', marginVertical: 10 }} />
      )}

      <CustomButton 
        title="Simpan Laporan" 
        onPress={submitLaporan} 
        disabled={!isButtonActive} 
        color="#28a745"
      />
      <View style={{ height: 40 }} /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
    label: { fontWeight: 'bold', marginBottom: 5, marginTop: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, backgroundColor: '#fff' },
    
    kategoriContainer: { 
      flexDirection: 'row', 
      flexWrap: 'wrap', 
      marginVertical: 5 
    },
    kategoriChip: { 
      backgroundColor: '#e0e0e0', 
      paddingHorizontal: 12, 
      paddingVertical: 8, 
      borderRadius: 20, 
      marginRight: 8, 
      marginBottom: 8 
    },
    kategoriChipActive: { 
      backgroundColor: '#000000' 
    },
    kategoriText: { 
      color: '#333', 
      fontWeight: '500' 
    },
    kategoriTextActive: { 
      color: '#fff', 
      fontWeight: 'bold' 
    }
});