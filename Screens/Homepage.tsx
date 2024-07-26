import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MainStackParamList} from './Navigation/MainStackParamList';

export const Homepage = (
  props: StackScreenProps<MainStackParamList, 'Homepage'>,
) => {
  return (
    <View style={storyStyle.container}>
      <View style={storyStyle.buttonContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('NewStoriesScreen')}>
          <View style={storyStyle.buttonContent}>
            <Text style={storyStyle.buttonText}>New Stories</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('BestStoriesScreen')}>
          <View style={storyStyle.buttonContent}>
            <Text style={storyStyle.buttonText}>Best Stories</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('TopStoriesScreen')}>
          <View style={storyStyle.buttonContent}>
            <Text style={storyStyle.buttonText}>Top Stories</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* <Text>Homepage</Text> */}
    </View>
  );
};

const storyStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    height: '100%',
    display: 'flex', 
    justifyContent: 'center',
     alignItems: 'center'
  },
  buttonContent: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    minWidth: 100,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ed1b2e',
  },
  buttonText: {
    color: '#ed1b2e',
    fontSize: 15,
    fontWeight: 'bold'
  }
});
