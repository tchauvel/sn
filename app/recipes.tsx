import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { findMatchingRecipes, Recipe } from '../services/recipeService';

export default function RecipesScreen() {
  const params = useLocalSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [seenRecipeIds, setSeenRecipeIds] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    
    // Get ingredients from context or params
    let ingredientsList: string[] = [];
    
    if (params.ingredients && typeof params.ingredients === 'string') {
      ingredientsList = params.ingredients.split(',');
      setIngredients(ingredientsList);
    }
    
    // Generate recipes based on ingredients
    const newRecipes = findMatchingRecipes(ingredientsList, seenRecipeIds);
    setRecipes(newRecipes);
    
    // Add these recipes to seen list
    setSeenRecipeIds(prev => [...prev, ...newRecipes.map(r => r.id)]);
    
    setIsLoading(false);
  }, [params.ingredients]);
  
  const handleRecipePress = (id: string) => {
    router.navigate(`/recipe/${id}`);
  };
  
  const handleRefresh = () => {
    setRefreshing(true);
    console.log('Refreshing recipes');
    
    // Find new recipes
    const newRecipes = findMatchingRecipes(ingredients, seenRecipeIds);
    setRecipes(newRecipes);
    
    // Add these recipes to seen list
    setSeenRecipeIds(prev => [...prev, ...newRecipes.map(r => r.id)]);
    
    setRefreshing(false);
  };
  
  const handleEditIngredients = () => {
    router.back();
  };
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6b6b" />
        <Text style={styles.loadingText}>Finding recipes...</Text>
      </View>
    );
  }
  
  const renderMatchInfo = (recipe: Recipe) => {
    if (!recipe.matchedIngredients || recipe.matchedIngredients.length === 0) {
      return <Text style={styles.noMatchText}>Suggested recipe</Text>;
    }
    
    const percent = Math.round((recipe.matchScore || 0) * 100);
    return (
      <View>
        <Text style={styles.matchScore}>{percent}% match</Text>
        <Text style={styles.matchedIngredients}>
          {recipe.matchedIngredients.join(', ')}
        </Text>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Your Recipes</Text>
        
        {ingredients.length > 0 && (
          <View style={styles.ingredientsContainer}>
            <View style={styles.ingredientsWrapper}>
              <Text style={styles.ingredientsLabel}>Using: </Text>
              <Text style={styles.ingredientsList}>{ingredients.join(', ')}</Text>
            </View>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={handleEditIngredients}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <FlatList
        data={recipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.recipeCard}
            onPress={() => handleRecipePress(item.id)}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.recipeImage}
              resizeMode="cover"
            />
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.detailsRow}>
                <Text style={styles.recipeCookTime}>{item.cookTime}</Text>
                {renderMatchInfo(item)}
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#ff6b6b"]}
            tintColor="#ff6b6b"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  ingredientsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  ingredientsWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredientsLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  ingredientsList: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
  editButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  list: {
    paddingBottom: 16,
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeImage: {
    width: '100%',
    height: 180,
  },
  recipeInfo: {
    padding: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  recipeCookTime: {
    fontSize: 14,
    color: '#666',
  },
  matchScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff6b6b',
    textAlign: 'right',
  },
  matchedIngredients: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    flexWrap: 'wrap',
    maxWidth: 200,
  },
  noMatchText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'right',
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
}); 