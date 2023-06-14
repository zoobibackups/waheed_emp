import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {candidateLogin} from '../../api';
import CustomButton from '../../components/Button';
import CustomHeader from '../../components/CustomHeader';
import Spacer from '../../components/Spacer';
import CustomTextInput from '../../components/TextInput';
import {AppScreenWidth, width} from '../../constants/sacling';
import {colors} from '../../constants/theme';
import {Login} from '../../store/actions/LoginActions';
import {commonStyles, textStyles} from '../../styles';
const SignInScreen = ({navigation}) => {
  const [email_address, setUseremail] = useState('rajan13506@farebus.com'); // niveba2588@shbiso.com
  const [UseremailErrorMesage, setUseremailErrorMessaage] = useState('');
  const [password, setPassword] = useState('123456'); //123456
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [is_api_error, set_api_error] = useState('');
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userLogin = data => dispatch(Login(data));

  const submitdate = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!reg.test(email_address.trim())) {
      setUseremailErrorMessaage('Please enter valid email');
      setPasswordErrorMessage('');
      return;
    }
    if (password.trim().length < 4) {
      setUseremailErrorMessaage('');
      setPasswordErrorMessage('Please enter password at least 4 characters');
      return;
    }
    setLoading(true);
    setPasswordErrorMessage('');
    setUseremailErrorMessaage('');
    let data = {
      email_address: email_address.trim(),
      userpassword: password,
      type: 'candidate',
      dd: 'dd',
    };
    candidateLogin(data)
      .then(response => {
        setLoading(false);
        if (response.status == 200) {
          if (response.data.status) {
            userLogin(response.data);
          } else {
            setApiErrorMessage(response.data.error);
            set_api_error(true);
          }
        } else {
          setApiErrorMessage(
            `Server Error ${response.status} occured. Please try again`,
          );
          set_api_error(true);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setApiErrorMessage(`Server Error  occured. Please try again`);
        set_api_error(true);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
      <View style={commonStyles.container}>
        <CustomHeader title={'Sign In'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            backgroundColor: '#fff',
            flexGrow: 1,
            alignItems: 'center',
          }}>
          <Image
            resizeMode={'cover'}
            resizeMethod={'resize'}
            style={{width: width}}
            source={require('../../assets/images/login.png')}
          />
          <CustomTextInput
            placeholder={'Email Address'}
            value={email_address}
            onChangeText={text => setUseremail(text)}
            errorMessage={UseremailErrorMesage}
          />
          <CustomTextInput
            placeholder={'Password'}
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            errorMessage={passwordErrorMessage}
          />
          <View style={{alignSelf: 'center', width: AppScreenWidth}}>
            {is_api_error ? (
              <Text style={{...textStyles.errorText, textAlign: 'left'}}>
                {apiErrorMessage}
              </Text>
            ) : null}
          </View>
          {/* <TouchableOpacity
          onPress={() => navigation.navigate(AuthRoutes.ForgotPasswordScreen)}
          style={{width: AppScreenWidth, alignItems: 'flex-end'}}>
          <Text style={{...textStyles.title, color:colors.dark_primary_color}}>
            Forgot Password?
          </Text>
        </TouchableOpacity> */}

          <Spacer />
          <CustomButton
            onPress={() => submitdate()}
            loading={loading}
            text={'Login'}
            loadingText={'Processing'}
          />
          <Spacer />
          {/* <DrawLine height={0.6} />
        <Spacer /> */}
          {/* <Text style={{...textStyles.Label, textAlign: 'center'}}>OR</Text> */}
          {/* <View
          style={{
            width: AppScreenWidth,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={styles.GoogleButton}>
            <GOOGLE width={scale(15)} height={scale(15)} />
            <Text
              style={{
                ...textStyles.title,
                backgroundColor: '#0000',
                marginLeft: scale(5),
                textAlign: 'center',
              }}>
              Sign In With Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.GoogleButton}}>
            <MICROSOFT width={scale(15)} height={scale(15)} />
            <Text
              style={{
                ...textStyles.title,
                marginLeft: scale(5),
                textAlign: 'center',
              }}>
              Sign In With Microsoft
            </Text>
          </TouchableOpacity>
        </View> */}

          <View
            style={{
              width: width,
              position: 'absolute',
              bottom: 0,
              paddingBottom: 10,
              backgroundColor: '#fff',
            }}>
            <Text style={textStyles.disabletext}>
              Copyright @{new Date().getFullYear()} RecruitBPM All Rights
              Reserved
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  GoogleButton: {
    flexDirection: 'row',
    width: AppScreenWidth / 2 - scale(10),
    borderWidth: 0,
    marginVertical: 10,
    elevation: 0,
    backgroundColor: '#fff',
    borderColor: colors.text_primary_color,
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(5),
  },
});

export default SignInScreen;
