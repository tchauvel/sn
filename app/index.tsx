import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

// Simulated ingredients that would be detected from photos
const SIMULATED_INGREDIENTS = [
  { id: '1', name: 'Chicken' },
  { id: '2', name: 'Potatoes' },
  { id: '3', name: 'Onions' },
  { id: '4', name: 'Garlic' },
  { id: '5', name: 'Tomatoes' },
  { id: '6', name: 'Bell Peppers' },
  { id: '7', name: 'Carrots' }
];

export default function CameraScreen() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean | null>(null);
  
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryPermission.status === 'granted');
      }
    })();
  }, []);

  // Simulate detecting ingredients from an image
  const simulateIngredientDetection = () => {
    // Randomly select 5-7 ingredients from the predefined list
    const numIngredients = Math.floor(Math.random() * 3) + 5; // 5 to 7 ingredients
    const shuffled = [...SIMULATED_INGREDIENTS].sort(() => 0.5 - Math.random());
    const detectedIngredients = shuffled.slice(0, numIngredients);
    
    // Store detected ingredients in global state (for this demo, we'll use URL params)
    const ingredientParams = detectedIngredients.map(ing => ing.name).join(',');
    router.push(`/ingredients?detected=${ingredientParams}&reset=true`);
  };

  const handleTakePhoto = async () => {
    if (Platform.OS === 'web') {
      simulateIngredientDetection();
      return;
    }
    
    try {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      
      if (cameraPermission.status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable camera access in your device settings');
        return;
      }
      
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      
      if (!result.canceled) {
        // Simulate analyzing the image for ingredients
        Alert.alert('Analyzing Image', 'Detecting ingredients...');
        setTimeout(simulateIngredientDetection, 1500);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture');
    }
  };

  const handleSelectPhoto = async () => {
    if (Platform.OS === 'web') {
      simulateIngredientDetection();
      return;
    }
    
    if (hasGalleryPermission === false) {
      Alert.alert('Permission Denied', 'Please enable photo library access in your device settings');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Simulate analyzing the image for ingredients
        Alert.alert('Analyzing Image', 'Detecting ingredients...');
        setTimeout(simulateIngredientDetection, 1500);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Snap & Cook</Text>
        <Text style={styles.subtitle}>Take a photo of your ingredients</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleTakePhoto}
        >
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={handleSelectPhoto}
        >
          <Text style={styles.buttonText}>Select from Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ff6b6b',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#ff6b6b',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
