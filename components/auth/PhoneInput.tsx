import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function PhoneInput() {
  // State to store selected country code and phone number
  const [countryCode, setCountryCode] = useState('+33'); // Default to USA
  const [phoneNumber, setPhoneNumber] = useState('');

  // Function to handle form submission
  const handleSubmit = () => {
    // Combine country code and phone number into E.164 format
    const e164PhoneNumber = `${countryCode}${phoneNumber}`;
    
    // Validate phone number length (basic validation)
    if (phoneNumber.length < 7 || phoneNumber.length > 15) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
      return;
    }
    
    // Display the formatted E.164 phone number
    Alert.alert('E.164 Phone Number', e164PhoneNumber);
  };

  return (
    <View style={styles.container}>
      <View style={styles.phoneInputContainer}>
        {/* Country code picker */}
        <Picker
          selectedValue={countryCode}
          style={styles.picker}
          onValueChange={(itemValue) => setCountryCode(itemValue)}
        >
          <Picker.Item label="+1 (USA)" value="+1" />
          <Picker.Item label="+44 (UK)" value="+44" />
          <Picker.Item label="+91 (India)" value="+91" />
          <Picker.Item label="+33 (France)" value="+33" />
          {/* Add more countries as needed */}
        </Picker>

        {/* Phone number input field */}
        <TextInput
          style={styles.phoneNumberInput}
          keyboardType="phone-pad"
          placeholder="06 -- -- -- --"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
        />
      </View>

      {/* Submit button */}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 150,
  },
  phoneNumberInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
});
