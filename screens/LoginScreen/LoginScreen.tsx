import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import globalStyles from '../../assets/styles/styles';
import InputField from '../../components/InputField/InputField';
import TextLabel from '../../components/TextLabel/TextLabel';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ColoredButton from '../../components/ColoredButton/ColoredButton';
import {horizontalScale, verticalScale} from '../../assets/styles/scale';

type Props = {};

const LoginScreen: React.FC<Props> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView
      style={[globalStyles.flexStyle, globalStyles.backgroundWhite]}>
      <View style={styles.containerStyle}>
        <TextLabel textValue={'Login'} type={1} />
        <InputField
          label={'Email'}
          placeholder={'Enter email'}
          keyboardType={'email-address'}
          onChangeText={(val: React.SetStateAction<string>) => setEmail(val)}
        />
        <InputField
          label={'Password'}
          placeholder={'Enter password'}
          isPassword={true}
          onChangeText={(val: React.SetStateAction<string>) => setPassword(val)}
        />
        <ColoredButton
          label={'Login'}
          callback={() => {}}
          r
          disabled={email.length < 5 || password.length < 5}
        />
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
