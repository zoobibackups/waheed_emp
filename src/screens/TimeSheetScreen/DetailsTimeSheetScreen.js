import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {scale, verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {timeSheetDetailsById} from '../../api';
import CustomHeader from '../../components/CustomHeader';
import DrawLine from '../../components/DrawLine';
import Spacer from '../../components/Spacer';
import CustomStatusBar from '../../components/StatusBar';
import {AppScreenWidth} from '../../constants/sacling';
import {colors} from '../../constants/theme';
import {commonStyles, textStyles} from '../../styles';
import CommentsBox from './CommentsBox';
import WeeklySummary from './Summary';
import TimeSheetItem from './TimeSheetItem';
const DetailsSheetScreen = ({navigation, route}) => {
  const {user} = useSelector(state => state.LoginReducer);
  const [loading, setLoading] = useState(true);
  const [time_sheet_details, setTimeSheetDetails] = useState(null);
  const [logs, setLogs] = useState([]);
  const [time_types, setTimeTypes] = useState([]);
  const [error, setError] = useState(false);
  const [filepath, setFilePath] = useState({
    path: null,
    ext: null,
    name: null,
  });
  let item = route.params.item;
  const status = item.module_status_name;
  useEffect(() => {
    timeSheetDetailsById(item.time_sheet_id, user.account_id)
      .then(response => {
        if (response.status === 200) {
          if (response.data.data.document_file !== null) {
            setFilePath({
              ...filepath,
              path: `https://storage.googleapis.com/recruitbpm-document/ghauritech/${response.data.data.document_file}`,
              name: response.data.data.document_title,
            });
          }

          let data = groupBy(response.data.logs, 'type');
          console.log(data, 'dddddd');
          setTimeSheetDetails(response.data.data);
          setTimeTypes(response.data.time_types);
          setLogs(Object.entries(data));
          setLoading(false);
        } else {
          console.log('errr', response.status);
          setError(true);
        }
      })
      .catch(err => {
        console.log(err);
        setError(true);
      });
  }, []);

  function groupBy(arr, property) {
    return arr.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }
  const handleClick = title => {};
  if (loading || time_sheet_details === null) {
    return (
      <SafeAreaProvider>
        <CustomStatusBar />
        <View style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={false}
            onPress={() => navigation.goBack()}
            title={'Details TimeSheet'}
          />
          <Spacer height={AppScreenWidth} />
          <ActivityIndicator size={'large'} color={colors.dark_primary_color} />
        </View>
      </SafeAreaProvider>
    );
  }
  if (error) {
    return (
      <SafeAreaProvider>
        <CustomStatusBar />
        <View style={commonStyles.container}>
          <CustomHeader
            show_backButton={true}
            isdrawer={false}
            onPress={() => navigation.goBack()}
            title={'Details TimeSheet'}
          />
          <Spacer height={AppScreenWidth / 2} />
          <Image
            source={require('../../assets/images/error.gif')}
            style={{
              width: verticalScale(150),
              height: verticalScale(150),
              resizeMode: 'contain',
            }}
          />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <CustomStatusBar />
      <SafeAreaView style={commonStyles.container}>
        <CustomHeader
          show_backButton={true}
          isdrawer={false}
          onPress={() => navigation.goBack()}
          title={'Details TimeSheet'}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <TimeSheetItem
            time={`${item.time_sheet_view} Starts At ${item.log_date}`}
            name={`${item.job_title} - ${time_sheet_details?.company_name}`}
            submittedto={`Time Approver Manager - ${item?.approver_name}`}
            contactname={`Contact Manager - ${time_sheet_details?.contact_name}`}
            status={item.module_status_name}
            status_style={item.status_colour_code}
            onPress={() => {}}
          />

          <WeeklySummary
            editable={status === 'Draft' ? true : false}
            logs={logs}
            time_types={time_types}
          />

          <View style={{width: AppScreenWidth}}>
            <Text style={{...textStyles.smallheading, color: '#0090FF'}}>
              Comments
            </Text>
            <DrawLine marginTop={scale(5)} />
            <DrawLine marginTop={scale(1)} />
            <CommentsBox
              title={'Approver Comment'}
              name={'Approver'}
              disable={true}
              comment={
                time_sheet_details.approver_comments === ''
                  ? null
                  : time_sheet_details.approver_comments
              }
            />
            <CommentsBox
              title={'Submitter Comment'}
              disable={true}
              name={time_sheet_details.comments}
              comment={time_sheet_details.comments}
            />

            <CommentsBox
              title={'Document Attached'}
              disable={false}
              comment={time_sheet_details.document_title}
              onPress={() => handleClick(time_sheet_details.document_title)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default DetailsSheetScreen;
