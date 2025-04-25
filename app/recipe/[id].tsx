import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { getRecipeDetails, RecipeDetails, ingredientsMatch } from '../../services/recipeService';

// Get user ingredients from the global state or storage
const getUserIngredients = async (): Promise<string[]> => {
  // In a real app, this would come from context or storage
  // For now, we'll return a hard-coded list
  return ['chicken', 'rice', 'garlic', 'onion', 'tomato'];
};

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userIngredients, setUserIngredients] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      if (id) {
        try {
          // Fetch recipe details
          const recipeData = await getRecipeDetails(id.toString());
          setRecipe(recipeData);
          
          // Get user ingredients
          const ingredients = await getUserIngredients();
          setUserIngredients(ingredients);
        } catch (error) {
          console.error('Failed to fetch recipe:', error);
        }
      }
      
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6b6b" />
        <Text style={styles.loadingText}>Loading recipe...</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Recipe not found</Text>
      </View>
    );
  }

  // Check which ingredients match
  const isIngredientMatched = (ingredient: string): boolean => {
    return userIngredients.some(userIng => ingredientsMatch(userIng, ingredient));
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: recipe.title,
          headerBackTitle: "Recipes",
        }}
      />
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: recipe.imageUrl }}
          style={styles.recipeImage}
          resizeMode="cover"
        />
        
        <View style={styles.recipeContent}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          
          <View style={styles.timeInfo}>
            <View style={styles.timeItem}>
              <Text style={styles.timeLabel}>Prep Time</Text>
              <Text style={styles.timeValue}>{recipe.prepTime}</Text>
            </View>
            <View style={styles.timeItem}>
              <Text style={styles.timeLabel}>Cook Time</Text>
              <Text style={styles.timeValue}>{recipe.cookTime}</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientRow}>
                <Text style={styles.ingredientText}>• {ingredient}</Text>
                {isIngredientMatched(ingredient) && (
                  <View style={styles.matchBadge}>
                    <Text style={styles.matchText}>✓</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {recipe.steps.map((step, index) => (
              <View key={index} style={styles.stepContainer}>
                <View style={styles.stepNumberContainer}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  recipeImage: {
    width: '100%',
    height: 240,
  },
  recipeContent: {
    padding: 16,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timeInfo: {
    flexDirection: 'row',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 16,
  },
  timeItem: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  ingredientText: {
    fontSize: 16,
    flex: 1,
  },
  matchBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  matchText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumber: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: '#ff6b6b',
  },
}); 