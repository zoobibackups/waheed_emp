import React,{useState} from 'react';
import { Image,View,ScrollView,Text} from 'react-native';
import CustomTextInput from '../../components/TextInput';
import CustomHeader from '../../components/CustomHeader';
import { commonStyles,textStyles } from '../../styles';
import CustomButton from '../../components/Button';
import { AuthRoutes } from '../../constants/routes';
import { scale } from 'react-native-size-matters';
import {colors} from '../../constants/theme';
import Spacer from '../../components/Spacer';
import DrawLine from '../../components/DrawLine'
import { width } from '../../constants/sacling';
    const ForgotPasswordScreen = ({navigation}) => {
        const [email_address, setEmailAddress] = useState("")
        const [email_addressErrorMessage, setUseremailErrorMessaage] = useState("")
        const [successMessage, setSuccessMessage] = useState('')
        const [disable, setDisable] = useState(false)
        const [loading ,setLoading] = useState(false)
        const RestorePassword = () => {
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (!reg.test(email_address)) {
                setUseremailErrorMessaage('Please enter valid email');
               
                return;
            }
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setSuccessMessage("An email has been send to your account")
                setDisable(true)
            }, 2000);
            setUseremailErrorMessaage("")
        }
 
        return (
            <View style={commonStyles.container} >
                <CustomHeader 
                    show_backButton={true}
                    onPress={() => navigation.navigate(AuthRoutes.SignInScreen)}
                    isdrawer={false}
                    title={"Restore password"}
                />
                <ScrollView
                 showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        backgroundColor: '#fff',
                        flexGrow: 1,
                        alignItems: 'center',
                    }}>
                <Image
                    resizeMode={'cover'}
                    resizeMethod={'resize'}
                    style={{width:width,}}
                    source={require('../../assets/images/login.png')}
                />
                     <DrawLine height={0.6} />
                     <Spacer />
                     
                <CustomTextInput
                    placeholder={'Enter your email'}
                    value={email_address}
                    secureTextEntry={false}
                    onChangeText={text => setEmailAddress(text)}
                    errorMessage={email_addressErrorMessage}
                />
                <View style={{width: width-scale(20), alignItems:"flex-start"}}>
                <Text style={{...textStyles.title, color:colors.dark_primary_color}}>
                 {successMessage}
                </Text>
              </View>
               <View style={{height:scale(20)}} />
               
                <CustomButton 
                    onPress={() => RestorePassword()}
                    loading={loading}
                    text={"Restore"}
                    loadingText={"Processing"}
                />
                </ScrollView>
            </View>
        );
    };


export default ForgotPasswordScreen;
