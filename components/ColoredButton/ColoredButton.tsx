import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  fontScale,
  horizontalScale,
  verticalScale,
} from '../../assets/styles/scale';

type Props = {
  label: string;
  callback: Function;
  disabled?: boolean;
};
const ColoredButton: React.FC<Props> = ({label, callback, disabled}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.buttonStyle, {opacity: disabled ? 0.4 : 1}]}
      onPress={() => callback()}>
      <Text style={styles.buttonTextStyle}>{label}</Text>
    </TouchableOpacity>
  );
};
ColoredButton.defaultProps = {
  disabled: true,
};
export default ColoredButton;
const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    backgroundColor: '#2979F2',
    height: verticalScale(55),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: horizontalScale(50),
    marginVertical: verticalScale(10),
  },
  buttonTextStyle: {
    fontSize: fontScale(16),
    lineHeight: fontScale(19),
    color: '#FFF',
    textAlign: 'center',
  },
});
