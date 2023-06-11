import React,{useEffect, useState} from 'react';
import { FlatList,SafeAreaView,Image,StyleSheet, View,ActivityIndicator,TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import CalenderInput from '../../components/CalenderInput';
import { commonStyles } from '../../styles';
import CustomHeader from '../../components/SearchHeader';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../constants/theme';
import { MainRoutes } from '../../constants/routes';
import { AppScreenWidth } from '../../constants/sacling';
import { useSelector } from 'react-redux';
import Spacer from '../../components/Spacer';
import CustomStatusBar from '../../components/StatusBar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { getLeavesList } from '../../api';
import LeaveCard from './LeaveCard'
    const HomeScreen = ({navigation}) => {
        const {user} = useSelector(state => state.LoginReducer)
        const [data, setData] = useState([])
        const [filterdata, setFilterData] = useState([])
        const [loading, setLoading] = useState(true)
        const [endDate, setEndDate] = useState("")
        const [startDate, setStartDate] = useState("")
        const [error, setError] = useState(false)
        const isFocused = useIsFocused();
        useEffect(() => {
           gelocallist()
        },[isFocused])

        const gelocallist = () => {
            getLeavesList(user.account_id, user.candidate_id).then((response) => {
                if(response.status === 200){
                    let tempd = response.data.data.reverse()
                    setData(tempd);
                    setFilterData(tempd);
                  
                }
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                setError(true)
                console.log(err);
            })
        }
        

        const FilterByTitle = (title) => {
            try{
                let se = title.toLowerCase()
                const regex = new RegExp(`${se}`);
                let draft_data = data.filter(function(item){ 
                    return item.policy_name.toLowerCase().match(regex)
                 })
                 setFilterData(draft_data)
            }
            catch(err){
                setFilterData(data)
            }
          
        }

        const renderItem = ({ item }) => (
            <LeaveCard 
               item={item}
               onPress={() => navigation.navigate(MainRoutes.EditLeaveScreen, {item})}
               onDeleteItem={() => {
                
                gelocallist()
               }}
            />
        ); 
        const filterbydate = (date , is_start) => {
            if(is_start){
                setStartDate(date)
            }else{
                setEndDate(date)
            }
            if(startDate !== "" || endDate !== ""){
                let date_filter = data.filter(function(item){
                   
                        if(moment(item.requested_date).isBetween(moment(startDate), moment(endDate))){
                            return item
                        }
                    })
              
                setFilterData(date_filter)
            }           
        }
        const FilterbyStatus = (status) => {
            
            if(status == "All"){
                setFilterData(data)
            }else if(status == "0" || status == 0){
                let draft_data = data.filter(function(item){
                    return item.status == "0" || item.status == 0
                })
                setFilterData(draft_data) 
            }
            else if(status == "1" || status == 1){
                let draft_data = data.filter(function(item){
                    return item.status == "1" || item.status == 1
                })
                setFilterData(draft_data) 
            }
            else if(status == "2" || status == 2){
                let draft_data = data.filter(function(item){
                    return item.status == "2" || item.status == 2
                })
                setFilterData(draft_data) 
            }
            
        }

        if(loading){
            return(  
               
              
                <SafeAreaView style={commonStyles.container} >
                    <CustomHeader 
                        show_backButton={true}
                        isdrawer={true}
                        SearchPress={(text) => FilterByTitle(text)}
                        NotificationPress={() => alert("NotificationPress")}
                        FilterPress={(data) => FilterbyStatus(data)}
                        onPress={() => navigation.openDrawer()}
                        title={"Leaves List"}
                    />
                    <Spacer height={verticalScale(100)} />
                    <ActivityIndicator size={"large"} color={colors.dark_primary_color} />
                </SafeAreaView>
               
            )
            }
        return (
            <SafeAreaView style={{flex:1, backgroundColor:colors.dark_primary_color}} >
              
                <View style={commonStyles.container} >
                     <CustomHeader 
                        show_backButton={true}
                        isdrawer={true}
                        SearchPress={(text) => FilterByTitle(text)}
                        NotificationPress={() => alert("NotificationPress")}
                        FilterPress={(data) => FilterbyStatus(data)}
                        onPress={() => navigation.openDrawer()}
                        is_leave_header = {true}
                        title={"Leaves List"}
                    />
                    <View style={{flexDirection:"row",width:AppScreenWidth, justifyContent:"space-between"}} >
                        <CalenderInput 
                            placeholder={"Start Date"}
                            value={startDate}
                            errorMessage={""}
                            w={AppScreenWidth/2-scale(5)}
                            onChangeText={(date) => filterbydate(date , true) }
                        />
                    
                        <CalenderInput 
                            placeholder={"End Date"}
                            value={endDate}
                            errorMessage={""}
                            w={AppScreenWidth/2-scale(5)}
                            onChangeText={(date) => filterbydate(date , false) }
                        />
                    </View>
                    <FlatList 
                        showsVerticalScrollIndicator={false}
                        data={filterdata}
                        renderItem={renderItem}
                        maxToRenderPerBatch={20}
                        updateCellsBatchingPeriod={80}
                        initialNumToRender={20}
                        windowSize={35}
                        bounces={false}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => {

                            return(
                                <View style={{alignSelf:"center",marginTop:verticalScale(150), flex:1, justifyContent:"center", alignItems:"center"}} >
                                    {
                                        error
                                    ?
                                    <Image 
                                        source={require("../../assets/images/error.gif")}
                                        style={{
                                            width:verticalScale(150), 
                                            height:verticalScale(150),
                                            resizeMode:"contain"
                                        }} 
                                    />
                                    :
                                    <Image 
                                        source={require("../../assets/images/norecord.gif")}
                                        style={{
                                            width:verticalScale(150), 
                                            height:verticalScale(150),
                                            resizeMode:"contain"
                                        }} 
                                    />
                        }
                                </View>
                            )
                        }}
                    />
                    <TouchableOpacity 
                        onPress={() => navigation.navigate(MainRoutes.AddLeaveScreen)}
                        style={{
                            alignSelf:"flex-end", 
                            paddingHorizontal:scale(20), 
                            paddingVertical:scale(10),
                            position:"absolute",
                            bottom:scale(55)
                        }}>
                        <AntDesign name={"pluscircle"} size={scale(35)} color={colors.dark_primary_color} />
                </TouchableOpacity>
                </View>
            </SafeAreaView>
            
        );
    };


export default HomeScreen;

