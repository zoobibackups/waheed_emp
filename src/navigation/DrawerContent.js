import {DrawerContentScrollView} from '@react-navigation/drawer';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {MainRoutes} from '../constants/routes';
import {colors, fonts} from '../constants/theme';
import {Signout} from '../store/actions/LoginActions';
const DrawerContentt = ({navigation, props}) => {
  const dispatch = useDispatch();
  const localSignout = () => dispatch(Signout(null));
  const {user} = useSelector(state => state.LoginReducer);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.dark_primary_color}}>
      <DrawerContentScrollView
        style={{flex: 1, backgroundColor: '#000'}}
        contentContainerStyle={{
          alignItems: 'flex-start',
          paddingTop: 0,
          marginStart: 0,
          justifyContent: 'flex-start',
        }}>
        <View style={styles.drawercontent}>
          <Image
            source={require('../assets/images/dummy.png')}
            style={{
              width: scale(70),
              borderRadius: scale(100),
              height: scale(70),
              resizeMode: 'cover',
            }}
          />
          <View style={{justifyContent: 'flex-start'}}>
            <Text style={styles.textStyleHeader}>
              {user.first_name} {user.last_name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate(MainRoutes.EditProfileScreen)}
            style={{
              position: 'absolute',
              top: scale(10),
              right: scale(10),
            }}>
            <Entypo name="edit" color={'#fff'} size={scale(20)} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate(MainRoutes.HomeScreen)}
          style={styles.btnView}>
          <View style={{width: scale(20), height: scale(20)}}>
            <AntDesign
              name="home"
              color={colors.dark_primary_color}
              size={scale(20)}
            />
          </View>
          <Text style={styles.textStyle}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(MainRoutes.TimeSheetListScreen)}
          style={styles.btnView}>
          <View style={{width: scale(20), height: scale(20)}}>
            <AntDesign
              name="clockcircle"
              color={colors.dark_primary_color}
              size={scale(18)}
            />
          </View>
          <Text style={styles.textStyle}>My Time</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(MainRoutes.MyExpensesScreen)}
          style={styles.btnView}>
          <View style={{width: scale(20), height: scale(20)}}>
            <Entypo
              name="credit"
              color={colors.dark_primary_color}
              size={scale(20)}
            />
          </View>
          <Text style={{...styles.textStyle}}>My Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(MainRoutes.LeavesScreen)}
          style={styles.btnView}>
          <View style={{width: scale(20), height: scale(20)}}>
            <Entypo
              name="calendar"
              color={colors.dark_primary_color}
              size={scale(20)}
            />
          </View>
          <Text style={styles.textStyle}>Leaves</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(MainRoutes.MyReferencesScreen)}
          style={styles.btnView}>
          <View style={{width: scale(20), height: scale(20)}}>
            <Ionicons
              name="md-briefcase"
              color={colors.dark_primary_color}
              size={scale(16)}
            />
          </View>
          <Text style={styles.textStyle}>My References</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(MainRoutes.MyRefrerralsScreen)}
          style={styles.btnView}>
          <View style={{width: scale(20), height: scale(20)}}>
            <FontAwesome
              name="tasks"
              color={colors.dark_primary_color}
              size={scale(16)}
            />
          </View>
          <Text style={styles.textStyle}>My Referrals</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={() => localSignout()}
        style={styles.logoutbutton}>
        <View style={{width: scale(20), height: scale(20)}}>
          <Entypo
            name="log-out"
            color={colors.dark_primary_color}
            size={scale(20)}
          />
        </View>
        <Text style={{...styles.textStyle}}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default DrawerContentt;

const styles = StyleSheet.create({
  MainContent: {
    flex: 1,
    alignSelf: 'flex-start',
    backgroundColor: 'red',
  },
  drawercontent: {
    padding: scale(10),
    flex: 1,
    width: '100%',
    alignSelf: 'flex-start',
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: colors.dark_primary_color,
  },

  btnView: {
    paddingLeft: scale(15),
    marginLeft: scale(5),
    paddingVertical: scale(8),
    borderBottomColor: colors.divide_color,
    borderBottomWidth: 1,
    width: widthPercentageToDP(75),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    marginLeft: scale(10),
    fontFamily: fonts.Medium,
    color: colors.text_primary_color,
  },
  textStyleHeader: {
    marginLeft: scale(10),
    fontFamily: fonts.Medium,
    fontSize: scale(12),
    color: colors.white,
  },
  logoutbutton: {
    marginLeft: scale(15),
    marginBottom: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    paddingBottom: scale(10),
    paddingLeft: scale(15),
    backgroundColor: '#fff',
  },
});
