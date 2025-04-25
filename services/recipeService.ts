import { RECIPE_DATABASE, RecipeData } from './recipeDatabase';

export type RecipeDetails = {
  id: string;
  title: string;
  imageUrl: string;
  ingredients: string[];
  steps: string[];
  prepTime: string;
  cookTime: string;
};

export type Recipe = {
  id: string;
  title: string;
  imageUrl: string;
  cookTime: string;
  matchedIngredients?: string[];
  matchScore?: number;
};

// Sample recipe steps for mock data
const SAMPLE_STEPS = [
  "Preheat the oven to 350°F (175°C).",
  "Prepare all ingredients by measuring and chopping as needed.",
  "Heat oil in a large pan over medium heat.",
  "Cook the main ingredients until golden brown.",
  "Add the sauce ingredients and simmer for 5 minutes.",
  "Transfer to a baking dish and bake for 20 minutes or until done.",
  "Let rest for 5 minutes before serving."
];

// Generate random prep time between 10-20 minutes
const getRandomPrepTime = (): string => {
  return `${Math.floor(Math.random() * 11) + 10} min`;
};

/**
 * Get recipe details by ID
 * @param id Recipe ID to fetch
 * @returns Recipe details object
 */
export const getRecipeDetails = async (id: string): Promise<RecipeDetails> => {
  try {
    // Find the recipe in our database
    const recipe = RECIPE_DATABASE.find((recipe: RecipeData) => recipe.id === id);
    
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    
    // Return recipe details with real data plus mock data for steps
    return {
      id: recipe.id,
      title: recipe.title,
      imageUrl: recipe.imageUrl,
      ingredients: recipe.ingredients,
      // Generate random number of steps between 4-7
      steps: SAMPLE_STEPS.slice(0, Math.floor(Math.random() * 4) + 4),
      prepTime: getRandomPrepTime(),
      cookTime: recipe.cookTime
    };
  } catch (error) {
    console.error('Error getting recipe details:', error);
    
    // Return mock data if there's an error
    return {
      id: id,
      title: 'Delicious Recipe',
      imageUrl: 'https://spoonacular.com/recipeImages/654959-312x231.jpg',
      ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
      steps: SAMPLE_STEPS.slice(0, 5),
      prepTime: '15 min',
      cookTime: '30 min'
    };
  }
};

/**
 * Helper function to check if two ingredients match
 * Exposed for use in other components
 */
export const ingredientsMatch = (userIng: string, recipeIng: string): boolean => {
  userIng = userIng.toLowerCase().trim();
  recipeIng = recipeIng.toLowerCase().trim();
  
  // Exact match
  if (userIng === recipeIng) return true;
  
  // Check if one is a substring of the other, but only if it's a full word
  const userWords = userIng.split(' ');
  const recipeWords = recipeIng.split(' ');
  
  // Check if any user word exactly matches any recipe word
  return userWords.some(userWord => 
    recipeWords.some(recipeWord => 
      userWord === recipeWord || 
      (userWord.length > 3 && recipeWord.includes(userWord)) || 
      (recipeWord.length > 3 && userWord.includes(recipeWord))
    )
  );
};

/**
 * Find recipes that match given ingredients
 * @param ingredients List of ingredients to match
 * @param seenRecipeIds List of recipe IDs that have already been seen
 * @returns List of recipes with match scores
 */
export const findMatchingRecipes = (ingredients: string[], seenRecipeIds: string[] = []): Recipe[] => {
  if (!ingredients.length) {
    // Return random recipes if no ingredients provided
    return RECIPE_DATABASE
      .filter(recipe => !seenRecipeIds.includes(recipe.id))
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        imageUrl: recipe.imageUrl,
        cookTime: recipe.cookTime,
        matchedIngredients: [],
        matchScore: 0
      }));
  }
  
  // Calculate match scores for each recipe
  const matchedRecipes = RECIPE_DATABASE.map(recipe => {
    const matchedIngredients: string[] = [];
    
    // Find matching ingredients
    recipe.ingredients.forEach(recipeIng => {
      if (ingredients.some(userIng => ingredientsMatch(userIng, recipeIng))) {
        matchedIngredients.push(recipeIng);
      }
    });
    
    // Calculate match score (percentage of recipe ingredients that match)
    const matchScore = matchedIngredients.length / recipe.ingredients.length;
    
    return {
      recipe,
      matchedIngredients,
      matchScore
    };
  });
  
  // Sort by match score and filter out recipes we've seen before
  const sortedRecipes = matchedRecipes
    .filter(item => !seenRecipeIds.includes(item.recipe.id))
    .sort((a, b) => b.matchScore - a.matchScore);
  
  // Get top 5 recipes
  let selectedRecipes = sortedRecipes.slice(0, 5).map(item => ({
    id: item.recipe.id,
    title: item.recipe.title,
    imageUrl: item.recipe.imageUrl,
    cookTime: item.recipe.cookTime,
    matchedIngredients: item.matchedIngredients,
    matchScore: item.matchScore
  }));
  
  // If we don't have enough recipes, fill with random ones we haven't seen
  if (selectedRecipes.length < 5) {
    const remainingRecipes = RECIPE_DATABASE
      .filter(recipe => !seenRecipeIds.includes(recipe.id) && 
                        !selectedRecipes.some(r => r.id === recipe.id))
      .sort(() => 0.5 - Math.random())
      .slice(0, 5 - selectedRecipes.length)
      .map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        imageUrl: recipe.imageUrl,
        cookTime: recipe.cookTime,
        matchedIngredients: [],
        matchScore: 0
      }));
    
    selectedRecipes = [...selectedRecipes, ...remainingRecipes];
  }
  
  return selectedRecipes;
}; 