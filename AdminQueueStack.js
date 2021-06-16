import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdminQueueScreen from "./AdminQueueScreen";

const InnerStack = createStackNavigator();
export default function NotesStack() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="AdminQueue"
        component={AdminQueueScreen}
        options={{
          title: "Admin Queue",
          headerStyle: {
            backgroundColor: "yellow",
            height: 100,
            shadowColor: "black",
            shadowOpacity: 0.2,
            shadowRadius: 5,
          },
          headerTintColor: "#f55",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      />
    </InnerStack.Navigator>
  );
}
