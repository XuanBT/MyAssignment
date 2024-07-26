import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle, Text, TextStyle } from "react-native";


export type SectionRowProps = {
  rowContainerStyle?: StyleProp<ViewStyle>;
};

export const SectionContent = (props: PropsWithChildren<SectionRowProps>) => {
  return (
    <View style={[sectionStyles.sectionContent, props.rowContainerStyle]}>
      {props.children}
    </View>
  );
};

export const SectionRow = (props: PropsWithChildren<SectionRowProps>) => {
  return (
    <View style={[sectionStyles.sectionRow, props.rowContainerStyle]}>
      {props.children}
    </View>
  );
};

export const SectionCol = (props: PropsWithChildren<SectionRowProps>) => {
  return (
    <View style={[sectionStyles.sectionCol12, props.rowContainerStyle]}>
      {props.children}
    </View>
  );
};

export const SectionCol4 = (props: PropsWithChildren<SectionRowProps>) => {
  return (
    <View style={[sectionStyles.sectionCol4, props.rowContainerStyle]}>
      {props.children}
    </View>
  );
};
export const SectionCol12 = (props: PropsWithChildren<SectionRowProps>) => {
  return (
    <View style={[sectionStyles.sectionCol12, props.rowContainerStyle]}>
      {props.children}
    </View>
  );
};
const sectionStyles = StyleSheet.create({
  sectionContent: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#D3DCE6",
    padding: 5
  },
  sectionRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // marginHorizontal: -15,
  },
  sectionCol4: {
    width: "100%",
    maxWidth: "33.333333%",
    // paddingHorizontal: 15
  },
  sectionCol6: {
    width: '100%',
    maxWidth: '50%'
  },
  sectionCol12: {
    width: '100%',
    maxWidth: '100%'
  },
//   fieldTitle: {
//     fontSize: 13,
//     color: "rgb(112, 119, 126)",
//     fontWeight: "700",
//   },
//   fieldDescription: {
//     fontSize: 14,
//     fontWeight: "400",
//   },
});
