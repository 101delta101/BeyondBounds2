import { useFonts } from 'expo-font';

export function loadFonts() {
  return useFonts({
    'outfit': require('./../../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../../assets/fonts/Outfit-Bold.ttf')
  });
}
