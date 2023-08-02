import {KeyboardType, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import TextLabel from '../TextLabel/TextLabel';
import {verticalScale} from '../../assets/styles/scale';

type Props = {
  label: string;
  isPassword?: boolean;
  keyboardType?: KeyboardType;
  placeholder?: string;
  onChangeText?: Function;
};

const InputField: React.FC<Props> = ({
  label,
  isPassword,
  keyboardType,
  placeholder,
  onChangeText,
}) => {
  const [value, setValue] = useState('');
  return (
    <View style={styles.container}>
      <TextLabel textValue={label} color={'grey'} />
      <TextInput
        style={styles.inputStyle}
        value={value}
        onChangeText={val => {
          setValue(val);
          onChangeText && onChangeText(val);
        }}
        placeholder={placeholder}
        secureTextEntry={isPassword}
        keyboardType={keyboardType}
      />
    </View>
  );
};
InputField.defaultProps = {
  placeholder: '',
  isPassword: false,
  keyboardType: 'default',
  onChangeText: () => {},
};
export default InputField;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: verticalScale(12),
    borderBottomColor: 'rgba(167, 167, 167, 0.5)',
    borderBottomWidth: 1,
  },
  inputStyle: {
    paddingVertical: verticalScale(4),
    marginTop: verticalScale(4),
  },
});
