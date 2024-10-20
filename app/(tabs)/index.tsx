import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Please Login</Text>
      <Text style={styles.text}>If you have not signed up yet, please<Link style={styles.button} href="/register"> register</Link>!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize:18
  },
  button: {
    fontSize:20,
    textDecorationLine: "underline",
    color: "blue"
  }
});

