export type RecipeData = {
  id: string;
  title: string;
  imageUrl: string;
  cookTime: string;
  ingredients: string[];
};

// Database of potential recipes
export const RECIPE_DATABASE: RecipeData[] = [
  {
    id: '654959',
    title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
    imageUrl: 'https://spoonacular.com/recipeImages/654959-312x231.jpg',
    cookTime: '45 min',
    ingredients: ['Pasta', 'Garlic', 'Onions', 'Cauliflower', 'Breadcrumbs', 'Cheese']
  },
  {
    id: '637876',
    title: 'Chicken 65',
    imageUrl: 'https://spoonacular.com/recipeImages/637876-312x231.jpg',
    cookTime: '30 min',
    ingredients: ['Chicken', 'Yogurt', 'Garlic', 'Chili', 'Lemon']
  },
  {
    id: '716426',
    title: 'Cauliflower, Brown Rice, and Vegetable Fried Rice',
    imageUrl: 'https://spoonacular.com/recipeImages/716426-312x231.jpg',
    cookTime: '30 min',
    ingredients: ['Cauliflower', 'Brown Rice', 'Carrots', 'Peas', 'Garlic', 'Onions']
  },
  {
    id: '716408',
    title: 'Greek-Style Baked Fish: Fresh, Simple, and Delicious',
    imageUrl: 'https://spoonacular.com/recipeImages/716408-312x231.jpg',
    cookTime: '35 min',
    ingredients: ['Fish', 'Tomatoes', 'Garlic', 'Lemon', 'Olive Oil']
  },
  {
    id: '654883',
    title: 'Pasta with Tuna',
    imageUrl: 'https://spoonacular.com/recipeImages/654883-312x231.jpg',
    cookTime: '20 min',
    ingredients: ['Pasta', 'Tuna', 'Tomatoes', 'Olive Oil', 'Garlic']
  },
  {
    id: '654905',
    title: 'Pasta With Tuna and Tomato Sauce',
    imageUrl: 'https://spoonacular.com/recipeImages/654905-312x231.jpg',
    cookTime: '25 min',
    ingredients: ['Pasta', 'Tuna', 'Tomatoes', 'Garlic', 'Onions']
  },
  {
    id: '511728',
    title: 'Pasta Margherita',
    imageUrl: 'https://spoonacular.com/recipeImages/511728-312x231.jpg',
    cookTime: '15 min',
    ingredients: ['Pasta', 'Tomatoes', 'Basil', 'Mozzarella', 'Garlic']
  },
  {
    id: '654944',
    title: 'Pasta With Spinach and Chickpeas',
    imageUrl: 'https://spoonacular.com/recipeImages/654944-312x231.jpg',
    cookTime: '30 min',
    ingredients: ['Pasta', 'Spinach', 'Chickpeas', 'Garlic', 'Olive Oil']
  },
  {
    id: '654928',
    title: 'Pasta with Peas and Italian Sausage',
    imageUrl: 'https://spoonacular.com/recipeImages/654928-312x231.jpg',
    cookTime: '40 min',
    ingredients: ['Pasta', 'Peas', 'Sausage', 'Onions', 'Garlic']
  },
  {
    id: '648279',
    title: 'Italian Steak With Roasted Zucchini',
    imageUrl: 'https://spoonacular.com/recipeImages/648279-312x231.jpg',
    cookTime: '50 min',
    ingredients: ['Steak', 'Zucchini', 'Tomatoes', 'Garlic', 'Rosemary']
  },
  {
    id: '633338',
    title: 'Bacon Wrapped Filet Mignon',
    imageUrl: 'https://spoonacular.com/recipeImages/633338-312x231.jpg',
    cookTime: '35 min',
    ingredients: ['Filet Mignon', 'Bacon', 'Garlic', 'Butter', 'Herbs']
  },
  {
    id: '641908',
    title: 'Easy Chicken Curry',
    imageUrl: 'https://spoonacular.com/recipeImages/641908-312x231.jpg',
    cookTime: '30 min',
    ingredients: ['Chicken', 'Curry Powder', 'Coconut Milk', 'Onions', 'Garlic']
  },
  {
    id: '643450',
    title: 'Fresh Herb Omelette',
    imageUrl: 'https://spoonacular.com/recipeImages/643450-312x231.jpg',
    cookTime: '15 min',
    ingredients: ['Eggs', 'Herbs', 'Butter', 'Cheese', 'Salt']
  },
  {
    id: '632583',
    title: 'Apple Pie',
    imageUrl: 'https://spoonacular.com/recipeImages/632583-312x231.jpg',
    cookTime: '60 min',
    ingredients: ['Apples', 'Sugar', 'Cinnamon', 'Flour', 'Butter']
  },
  {
    id: '632660',
    title: 'Asparagus and Pea Soup',
    imageUrl: 'https://spoonacular.com/recipeImages/632660-312x231.jpg',
    cookTime: '25 min',
    ingredients: ['Asparagus', 'Peas', 'Onions', 'Garlic', 'Broth']
  }
]; 