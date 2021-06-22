import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import EditAccount from "./components/Edit Account";
import HowItWorks from "./components/HowItWorks";
import ProjectProcess from "./components/ProjectProcess";
import Step1 from "./components/WizardSteps/Step1";
import Step2 from "./components/WizardSteps/Step2";
import Step3 from "./components/WizardSteps/Step3";
import Step4 from "./components/WizardSteps/Step4";
import Step5 from "./components/WizardSteps/Step5";
import Step6 from "./components/WizardSteps/Step6";

const Stack = createStackNavigator();

const MainStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HowItWorks">
      <Stack.Screen
        options={{ headerShown: false }}
        name="HowItWorks"
        component={HowItWorks}
      />
      <Stack.Screen
        options={{ headerShown: false, gesturesEnabled: false }}
        name="Step1"
        component={Step1}
      />
      <Stack.Screen
        options={{ headerShown: false, gesturesEnabled: false }}
        name="Step2"
        component={Step2}
      />
      <Stack.Screen
        options={{ headerShown: false, gesturesEnabled: false }}
        name="Step3"
        component={Step3}
      />
      <Stack.Screen
        options={{ headerShown: false, gesturesEnabled: false }}
        name="Step4"
        component={Step4}
      />
      <Stack.Screen
        options={{ headerShown: false, gesturesEnabled: false }}
        name="Step5"
        component={Step5}
      />
      <Stack.Screen
        options={{ headerShown: false, gesturesEnabled: false }}
        name="Step6"
        component={Step6}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditAccount"
        component={EditAccount}
      />
      
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProjectProcess"
        component={ProjectProcess}
      />
    </Stack.Navigator>
  );
};
const AuthStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{ headerShown: false, gesturesEnabled: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false, gesturesEnabled: false }}
        name="SignUp"
        component={SignUp}
      />
    </Stack.Navigator>
  );
};
export { MainStackNavigator,AuthStackNavigator };
