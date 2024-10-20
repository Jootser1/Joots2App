import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios, { AxiosError } from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import PhoneInput from '@/components/auth/PhoneInput';



// Define a type for the error state
type ErrorState = {
  email?: string;
  phone?: string;
  password?: string;
};

type Props = {
  navigation: StackNavigationProp<any, any>;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  // État local pour stocker les valeurs saisies par l'utilisateur
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+33');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ErrorState>({});

  // Fonction pour gérer la soumission du formulaire d'enregistrement de l'utilisateur
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.1.29:8000/auth/register', {
        email,
        countryCode,
        phone,
        password
      });

      // Vérifier si la réponse indique un succès
      if (response.status === 200) {
        // Naviguer vers l'écran de confirmation
        navigation.navigate('ConfirmationScreen');
      }

      // Clear errors on successful registration
      setErrors({});
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Extract and set the error messages for specific fields
        const errorData = error.response?.data?.detail || {};
        const newErrors: ErrorState = {};

        Object.keys(errorData).forEach((key) => {
          const err = errorData[key];
          const field = err.loc[1] as keyof ErrorState; // loc[1] contains the field name
          let message = err.msg;

          if (field === 'email') {
            message = 'Une adresse valide doit contenir un @.';
          } else if (field === 'phone') {
            message = 'Un numéro de télephone valide doit contenir au moins 10 chiffres.';
          } else if (field === 'password') {
            message = 'Please enter a valid password.';
          } else
            setErrors({ email: 'An unexpected error occurred' });

          newErrors[field] = message;
        });
        setErrors(newErrors);
      }
      console.log('Error response:', errors);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <View style={styles.phoneSection}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={countryCode}
              onValueChange={(itemValue) => setCountryCode(itemValue)}
              mode={'dropdown'}
              style={styles.picker}
            >
              <Picker.Item label="+1 (USA)" value="+1" />
              <Picker.Item label="+44 (UK)" value="+44" />
              <Picker.Item label="+91 (India)" value="+91" />
              <Picker.Item label="+33 (France)" value="+33" />
              <Picker.Item label="+994 (Azerbaijan)" value="+994" />
            </Picker>
          </View>

          <TextInput
            placeholder="Téléphone"
            value={phone}
            onChangeText={setPhone}
            style={[styles.input, styles.phoneInput]}
          />
        </View>
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.input}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <Button title="S'inscrire" onPress={handleRegister} />
      </View>
    </View>
  );
};

// Styles de l'écran
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    flexDirection:'column',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: "black",
    marginBottom: 5,
    marginTop: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  phoneSection: {
    flexDirection: 'row',
    marginVertical:5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    flex: 3,  // Take up full width on mobile
    alignSelf: 'center', // Center on the screen
    fontSize:10,
    marginTop: 5,
    marginBottom: 5,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
  },
  phoneInput: {
    flex: 3,
    marginLeft: 10
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterScreen;
