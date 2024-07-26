import React, { PropsWithChildren } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export type FieldTextProps = {
  text: string;
  fieldStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const FieldTitle: React.FC<FieldTextProps> = (props) => {
  return (
    <View style={[props.fieldStyle]}>
      <Text style={[fieldStyle.fieldTitle, props.textStyle]}>
        {props.text}
      </Text>
    </View>
  );
};
export const FieldDescription: React.FC<FieldTextProps> = (props) => {
  return (
    <View style={[props.fieldStyle]}>
      <Text style={[fieldStyle.fieldDescription, props.textStyle]}>
        {props.text}
      </Text>
    </View>
  );
};
const fieldStyle = StyleSheet.create({
  fieldTitle: {
    fontSize: 15,
    fontWeight: '600',
    // whiteSpace: 'wrap'
  },
  fieldDescription: {
    fontSize: 13,
  },
});
