import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import firebase from "../database/firebaseDB";
const db = firebase.firestore();

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
export default async function sendPushNotification(expoPushToken) {
  console.log(expoPushToken);
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Reminder from QueueT",
    body: "Your order has been cancelled because you have been late for 5 minutes",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}
