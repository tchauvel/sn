import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ff6b6b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Snap & Cook',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="ingredients" 
        options={{ 
          title: 'Your Ingredients',
        }} 
      />
      <Stack.Screen 
        name="recipes" 
        options={{ 
          title: 'Your Recipes',
        }} 
      />
      <Stack.Screen 
        name="recipe/[id]" 
        options={{ 
          title: 'Recipe Details',
        }} 
      />
    </Stack>
  );
}
