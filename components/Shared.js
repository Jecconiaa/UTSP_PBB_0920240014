import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export const CustomButton = ({ title, onPress, disabled, color = '#007bff' }) => (
  <TouchableOpacity 
    style={[styles.button, { backgroundColor: disabled ? '#ccc' : color }]} 
    onPress={onPress}
    disabled={!!disabled} 
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export const CustomCard = ({ children }) => (
  <View style={styles.card}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 5,
  }
});