import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

type Ingredient = {
  id: string;
  name: string;
};

export default function IngredientsScreen() {
  const params = useLocalSearchParams();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Process detected ingredients from URL params
  useEffect(() => {
    // Reset ingredients list if reset parameter is true
    if (params.reset === 'true') {
      setIngredients([]);
    }
    
    if (params.detected && typeof params.detected === 'string') {
      const detectedNames = params.detected.split(',');
      const detectedIngredients = detectedNames.map((name, index) => ({
        id: `detected-${index}`,
        name: name.trim()
      }));
      setIngredients(detectedIngredients);
    }
    setIsLoading(false);
  }, [params.detected, params.reset]);

  const addIngredient = () => {
    if (newIngredient.trim() !== '') {
      setIngredients([
        ...ingredients,
        { id: Date.now().toString(), name: newIngredient.trim() },
      ]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const goToRecipes = () => {
    // Pass ingredients as parameters
    const ingredientParams = ingredients.map(ing => ing.name).join(',');
    router.push(`/recipes?ingredients=${ingredientParams}`);
  };

  // Add function to go back to camera screen
  const goBackToCameraScreen = () => {
    router.push("/");
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6b6b" />
        <Text style={styles.loadingText}>Processing ingredients...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Ingredients</Text>
      
      {ingredients.length > 0 && (
        <Text style={styles.subtitle}>
          We detected {ingredients.length} ingredients. 
          Add more or remove any that aren't correct.
        </Text>
      )}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newIngredient}
          onChangeText={setNewIngredient}
          placeholder="Add ingredient..."
          onSubmitEditing={addIngredient}
        />
        <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ingredientItem}>
            <Text style={styles.ingredientText}>{item.name}</Text>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => removeIngredient(item.id)}
            >
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.list}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            No ingredients detected. Add ingredients manually.
          </Text>
        )}
      />
      
      <TouchableOpacity 
        style={[
          styles.findButton, 
          ingredients.length < 3 && styles.disabledButton
        ]}
        onPress={goToRecipes}
        disabled={ingredients.length < 3}
      >
        <Text style={styles.findButtonText}>
          {ingredients.length < 3 
            ? `Add at least ${3 - ingredients.length} more ingredient${ingredients.length === 2 ? '' : 's'}` 
            : 'Find Recipes'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={goBackToCameraScreen}
      >
        <Text style={styles.backButtonText}>Take New Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  ingredientText: {
    flex: 1,
    fontSize: 16,
  },
  removeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    borderRadius: 15,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  findButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#ffb5b5',
  },
  findButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 