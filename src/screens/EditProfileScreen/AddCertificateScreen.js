import axios from 'axios';
import moment from 'moment';
import {NativeBaseProvider, Select} from 'native-base';
import React, {useReducer} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import CustomButton from '../../components/Button';
import CalenderInput from '../../components/DateInputMethod';
import CustomTextInput from '../../components/TextInput';
import {AppScreenWidth} from '../../constants/sacling';
import {colors, fonts} from '../../constants/theme';
import {commonStyles, selectStyles} from '../../styles';

const initialState = {
  certification_id: '1',
  certification_no: '',
  credentials: '',
  expiry_date: '',
  upload_file: {
    name: 'Dummy.pdf',
    mime_type: 'application/pdf',
    content: '',
  },
};
const AddCertificateScreen = ({navigation}) => {
  const [certificateData, dispatch] = useReducer(reducer, initialState);
  const {user, token} = useSelector(state => state.LoginReducer);
  function reducer(state, action) {
    switch (action.type) {
      case 'certification_no':
        return {...state, certification_no: action.payload};
      case 'credentials':
        return {...state, credentials: action.payload};
      case 'expiry_date':
        return {...state, expiry_date: action.payload};
      default:
        return initialState;
    }
  }
  const addCertificate = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
    );
    myHeaders.append('Cookie', 'PHPSESSID=o356k5uak3a7o7ds19ukqtru4s');

    var data = JSON.stringify({
      candidate_id: user.candidate_id,
      certification_no: certificateData.certification_no,
      credentials: certificateData.credentials,
      expiry_date: certificateData.expiry_date,
      account_id: user.account_id,
      upload_file: {
        name: 'Dummy.pdf',
        mime_type: 'application/pdf',
        content: '',
      },
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.recruitbpm.com/certifications',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        Alert.alert(response.data.message);
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        Alert.alert('Ther is some issue with your request');
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
      <StatusBar barStyle={'light-content'} />
      <View style={commonStyles.container}>
        <CustomTextInput
          placeholder={'Certificate Number'}
          value={certificateData.certification_no}
          borderWidth={1}
          lableColor={colors.dark_primary_color}
          borderRadius={scale(5)}
          onChangeText={text => {
            dispatch({type: 'degreeTitle', payload: text});
          }}
          errorMessage={''}
        />
        <CustomTextInput
          placeholder={'Certificate Number'}
          value={certificateData.certification_no}
          borderWidth={1}
          lableColor={colors.dark_primary_color}
          borderRadius={scale(5)}
          onChangeText={text => {
            dispatch({type: 'certification_no', payload: text});
          }}
          errorMessage={''}
        />
        <CustomTextInput
          placeholder={'Certificate Credentials'}
          value={certificateData.credentials}
          borderWidth={1}
          lableColor={colors.dark_primary_color}
          borderRadius={scale(5)}
          onChangeText={text => {
            dispatch({type: 'credentials', payload: text});
          }}
          errorMessage={''}
        />

        <CalenderInput
          placeholder={'Expiry Date'}
          value={certificateData.expiry_date}
          errorMessage={''}
          onChangeText={date =>
            dispatch({
              type: 'expiry_date',
              payload: moment(new Date(date)).format('YYYY-MM-DD'),
            })
          }
        />

        <CustomButton
          loading={false}
          loadingText={'Saving'}
          onPress={() => {
            addCertificate();
          }}
          text={'Save'}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddCertificateScreen;
