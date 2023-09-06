import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from "./app/screens/Welcome";
import ToDoList from "./app/screens/ToDoList";
import OnlineViewer from "./app/screens/OnlineViewer";
import AR from "./app/screens/AR";

import ProjectListScreen from "./app/screens/ProjectListScreen";

//import CADScreen from "./app/screens/CADScreen";
import Viewer from "./app/screens/Viewer";
import FloorListScreen from "./app/screens/FloorListScreen";

import IssueListScreen from "./app/screens/IssueListScreen";

import IssueLocationMapAddPin from "./app/screens/IssueLocationMapAddPinScreen";
import IssueLocationMapAddButton from "./app/screens/IssueLocationMapAddButtonScreen";


import Issue from "./app/screens/Issue";
import IssueLocationMapPinScreen from "./app/screens/IssueLocationMapPinScreen";
import ResultButton from "./app/screens/ResultButton";

const Stack = createStackNavigator();

export default function App( navigation ) {
  return (
    <NavigationContainer
      initialRouteName='Welcome'
    >
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{title: ''}}/>
        <Stack.Screen name="ToDoList" component={ToDoList} options={{title: 'Reference'}}/>
        <Stack.Screen name="OnlineViewer" component={OnlineViewer} options={{title: 'OnlineViewer'}}/>
        <Stack.Screen name="Viewer" component={Viewer} options={{title: 'APS Viewer'}}/>
        <Stack.Screen name="AR" component={AR} options={{title: 'AR'}}/>
        <Stack.Screen name="ProjectList" component={ProjectListScreen} options={{title: '專案列表'}}/>
        <Stack.Screen name="Issue" component={Issue} options={{title: ''}}/>
        
        <Stack.Screen name="FloorList" component={FloorListScreen} options={{title: 'FloorList'}}/>
        <Stack.Screen name="IssueList" component={IssueListScreen} options={{title: 'IssueList'}}/>
        <Stack.Screen name="IssueLocationMapAddButton" component={IssueLocationMapAddButton} options={{title: 'Button'}}/>
        <Stack.Screen name="IssueLocationMapAddPin" component={IssueLocationMapAddPin} options={{title: 'Add Pin'}}/>
        <Stack.Screen name="IssueLocationMapPin" component={IssueLocationMapPinScreen} options={{title: 'IssueLocationMapPin'}}/>
        <Stack.Screen name="ResultButton" component={ResultButton} options={{title: 'ResultButton'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


//<Stack.Screen name="CAD" component={CADScreen} options={{title: 'APS Viewer'}}/>
//<Stack.Screen name="Viewer" component={ViewerScreen} options={{title: 'APS Viewer'}}/>