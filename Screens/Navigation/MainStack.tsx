import {createStackNavigator} from '@react-navigation/stack';
import {MainStackParamList} from './MainStackParamList';
// import {StoryScreen} from '../NewStoriesScreen';
import {NavigationContainer} from '@react-navigation/native';
import { Homepage } from '../Homepage';
import { NewStoriesScreen } from '../NewStoriesScreen';
import { StoryDetailScreen } from '../StoryDetailScreen';
import { BestStoriesScreen } from '../BestStoriesScreen';
import { TopStoriesScreen } from '../TopStoriesScreen';

const Stack = createStackNavigator<MainStackParamList>();
export const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage">
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="NewStoriesScreen" component={NewStoriesScreen} />
        <Stack.Screen name="StoryDetailScreen" component={StoryDetailScreen}/>
        <Stack.Screen name="BestStoriesScreen" component={BestStoriesScreen}/>
        <Stack.Screen name="TopStoriesScreen" component={TopStoriesScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
