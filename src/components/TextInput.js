import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutDown,
  LightSpeedInRight,
  LightSpeedOutLeft,
} from 'react-native-reanimated';
import {scale, verticalScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {width} from '../constants/sacling';
import {colors, fonts} from '../constants/theme';
import {textStyles} from '../styles/textStyles';
const CustomTextInput = ({
  value,
  borderRadius = 0,
  placeholder,
  errorMessage,
  editable = true,
  lableColor = colors.text_primary_color,
  borderWidth = 0,
  secureTextEntry = false,
  onChangeText,
}) => {
  const [eyeon, setEyeOn] = useState(secureTextEntry);
  return (
    <View
      style={{
        width: width - scale(20),
        justifyContent: 'center',
        borderWidth: 0,
        alignSelf: 'center',
        minHeight: verticalScale(50),
        paddingTop: scale(5),
        marginVertical: scale(0),
      }}>
      <Animated.Text
        entering={FadeInDown}
        exiting={FadeOutDown}
        style={{...textStyles.Label, color: lableColor}}>
        {placeholder}
      </Animated.Text>

      <View>
        <TextInput
          secureTextEntry={eyeon}
          placeholder={placeholder}
          placeholderTextColor={colors.divide_color}
          value={value}
          editable={editable}
          onChangeText={text => onChangeText(text)}
          style={{
            backgroundColor: '#fff',
            marginBottom: verticalScale(5),
            width: width - scale(20),
            borderColor: colors.divide_color,
            borderBottomWidth: 1,
            includeFontPadding: false,

            borderRadius: borderRadius,
            borderWidth: borderWidth,
            height: verticalScale(40),
            fontFamily: fonts.Medium,
            paddingHorizontal: scale(10),
            color: colors.text_primary_color,
          }}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setEyeOn(!eyeon)}
            style={{
              position: 'absolute',
              width: scale(30),
              marginVertical: verticalScale(5),
              right: 0,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              backgroundColor: 'rgba(0,0,0,0)',
              height: verticalScale(40),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome
              name={!eyeon ? 'eye' : 'eye-slash'}
              size={scale(16)}
              color={colors.text_primary_color}
            />
          </TouchableOpacity>
        )}
      </View>

      {errorMessage !== '' && (
        <Animated.Text
          entering={LightSpeedInRight}
          exiting={LightSpeedOutLeft}
          style={textStyles.errorText}>
          {errorMessage}
        </Animated.Text>
      )}
    </View>
  );
};

export default CustomTextInput;
