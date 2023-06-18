import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen/index';

// TimeSheet
import TimeSheetListScreen from '../screens/TimeSheetScreen';
import AddTimeSheetScreen from '../screens/TimeSheetScreen/AddTimeSheetScreen';
import DetailsSheetScreen from '../screens/TimeSheetScreen/DetailsTimeSheetScreen';
import EditTimeSheetScreen from '../screens/TimeSheetScreen/EditTimeSheetScreen';

// Expenses screen
import MyExpensesScreen from '../screens/ExpensesScreen';
import AddExpenseScreen from '../screens/ExpensesScreen/AddExpenseScreen';
import EditExpenseScreen from '../screens/ExpensesScreen/EditExpenseScreen';
import ExpenseDetailsScreen from '../screens/ExpensesScreen/ExpansesDetails';

import MyTasksScreen from '../screens/MyTasksScreen';
import MyTimeScreen from '../screens/MyTimeScreen';

// Leaves Managemmentt
import LeavesScreen from '../screens/LeavesScreen';
import AddLeaveScreen from '../screens/LeavesScreen/AddLeaveScreen';
import EditLeaveScreen from '../screens/LeavesScreen/EditLeaveScreen';

// Jobs Screen
import CalendarScreen from '../screens/CalendarScreen';
import JobApplyScreen from '../screens/CalendarScreen/JobApply';

// Refraals Screen

import AddCertificateScreen from '../screens/EditProfileScreen/AddCertificateScreen';
import MyReferencesScreen from '../screens/MyReferencesScreen';
import MyRefrerralsScreen from '../screens/MyReferralsScreen';

//

import EditCertificateScreen from '../screens/EditProfileScreen/EditCertificateScreen';
import EditEucationScreen from '../screens/EditProfileScreen/EditEducationScreen';
import EditExperienceScreen from '../screens/EditProfileScreen/EditExperienceScreen';

import DrawerContent from './DrawerContent';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditExperienceScreen"
        component={EditExperienceScreen}
        options={{
          headerShown: true,
          title: 'Experience Edit',
        }}
      />
      <Stack.Screen
        name="EditCertificateScreen"
        component={EditCertificateScreen}
        options={{
          headerShown: true,
          title: 'Certificate Edit',
        }}
      />
      <Stack.Screen
        name="EditEucationScreen"
        component={EditEucationScreen}
        options={{
          headerShown: true,
          title: 'Education Edit',
        }}
      />
      <Stack.Screen
        name="AddCertificateScreen"
        component={AddCertificateScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyReferencesScreen"
        component={MyReferencesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyRefrerralsScreen"
        component={MyRefrerralsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TimeSheetListScreen"
        component={TimeSheetListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailsSheetScreen"
        component={DetailsSheetScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddTimeSheetScreen"
        component={AddTimeSheetScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EditTimeSheetScreen"
        component={EditTimeSheetScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MyExpensesScreen"
        component={MyExpensesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ExpenseDetailsScreen"
        component={ExpenseDetailsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddExpenseScreen"
        component={AddExpenseScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EditExpenseScreen"
        component={EditExpenseScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MyTasksScreen"
        component={MyTasksScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyTimeScreen"
        component={MyTimeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="LeavesScreen"
        component={LeavesScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddLeaveScreen"
        component={AddLeaveScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditLeaveScreen"
        component={EditLeaveScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="JobApplyScreen"
        component={JobApplyScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const StackNavigator = () => (
  <Drawer.Navigator
    gestureEnabled={false}
    screenOptions={{
      swipeEnabled: true,
      headerShown: false,
    }}
    drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="MainStack" headerShown={false}>
      {props => <MainStack {...props} />}
    </Drawer.Screen>
  </Drawer.Navigator>
);

export default StackNavigator;
