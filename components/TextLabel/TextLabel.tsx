import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {getStyle} from 'react-native-svg/lib/typescript/xml';
import {fontScale} from '../../assets/styles/scale';
type Props = {
  textValue: string;
  type?: number;
  color?: string;
};

const TextLabel: React.FC<Props> = ({textValue, type, color}) => {
  const getStyle = () => {
    switch (type) {
      case 1:
        return styles.title1;
      case 2:
        return styles.title2;
      case 3:
        return styles.title3;
      default:
        return styles.title1;
    }
  };
  return <Text style={[getStyle(), {color: color}]}>{textValue}</Text>;
};
TextLabel.defaultProps = {
  color: '#000',
  type: 3,
};
export default TextLabel;
const styles = StyleSheet.create({
  title1: {
    //fontFamily: 'Inter',
    fontSize: fontScale(24),
    fontWeight: '600',
    lineHeight: fontScale(27),
  },
  title2: {
    //fontFamily: 'Inter',
    fontSize: fontScale(18),
    fontWeight: '600',
    lineHeight: fontScale(22),
  },
  title3: {
    //fontFamily: 'Inter',
    fontSize: fontScale(16),
    fontWeight: '600',
    lineHeight: fontScale(20),
  },
});
