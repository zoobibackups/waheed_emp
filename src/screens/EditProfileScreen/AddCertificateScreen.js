import React from 'react';
import {Alert, SafeAreaView, StatusBar, View} from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import {colors} from '../../constants/theme';
import {commonStyles} from '../../styles';

const AddCertificateScreen = ({navigation}) => {
  const addCertificate = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
    );
    myHeaders.append('Cookie', 'PHPSESSID=o356k5uak3a7o7ds19ukqtru4s');

    var raw = JSON.stringify({
      candidate_id: '653556',
      certification_no: '999111',
      credentials: 'certificate credentials',
      certification_file: 'file-tjf-2022-22-08-11-12-58-129.jpg',
      expiry_date: '2022-08-09',
      account_id: '1',
      is_active: '1',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.recruitbpm.com/certificate', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 200) {
          Alert.alert(result.message);
        } else {
          Alert.alert('Ther is some issue with your request');
        }
      })
      .catch(error => Alert.alert('Ther is some issue with your request'));
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
      <StatusBar barStyle={'light-content'} />
      <View style={commonStyles.container}></View>
    </SafeAreaView>
  );
};

export default AddCertificateScreen;
