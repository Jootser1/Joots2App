// ConfirmationScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  ConfirmationScreen: undefined;
  RegisterScreen: undefined;
};

type ConfirmationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ConfirmationScreen'
>;

type ConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmationScreen'>;

type Props = {
  navigation: ConfirmationScreenNavigationProp;
  route: ConfirmationScreenRouteProp;
};

const ConfirmationScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration Successful!</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('LoginScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ConfirmationScreen;