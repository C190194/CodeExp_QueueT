import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

import firebase from "../database/firebaseDB";

const db = firebase.firestore();

export default function AdminQueueScreen({ navigation, route }) {
  const [qArray, setQArray] = useState([]);
  const [pendingArray, setPendingArray] = useState([]);
  shopID = "znXRQ1uBEdzRE50FjdgV";

  //const shopRef = db.collection(`Shops`);
  const qRef = db.collection(`Shops/${shopID}/Queue`);
  const pendingRef = db.collection(`Shops/${shopID}/Pending_Queue`);

  // Monitor route.params for changes and add order to the pending list
  useEffect(() => {
    //console.log(route.params?.order.id);
    if (route.params?.order) {
      qRef
        .doc(route.params?.order.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
      delete route.params?.order.id;
      pendingRef.add(route.params?.order);
      delete route.params?.order.Time;
      delete route.params?.order.UserID;
      delete route.params?.order.Number;
    }
  }, [route.params?.order]);

  // Load Firebase data on start
  useEffect(() => {
    const unsubscribe = qRef.orderBy("Number").onSnapshot((collection) => {
      let updatedQueue = collection.docs.map((doc) => {
        if (doc.id != "Number") {
          return {
            id: doc.id,
            Number: doc.data().Number,
            UserID: doc.data().UserID,
          };
        }
      });
      if (updatedQueue) {
        setQArray(updatedQueue);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = pendingRef
      .orderBy("Number")
      .onSnapshot((collection) => {
        let updatedPendingQ = collection.docs.map((doc) => {
          if (doc.id != "Number") {
            return {
              id: doc.id,
              Number: doc.data().Number,
              UserID: doc.data().UserID,
              Time: doc.data().Time,
            };
          }
        });
        if (updatedPendingQ) {
          setPendingArray(updatedPendingQ);
        }
      });

    return () => {
      unsubscribe();
    };
  }, []);

  // This deletes absent numbers in the pending list
  function removePending() {
    console.log("here");
    let d = new Date();
    let time = d.getTime() - 5 * 1000;
    for (let i = pendingArray.length - 1; i >= 0; i--) {
      if (pendingArray[i].Time < time) {
        pendingRef
          .doc(pendingArray[i].id)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      }
    }
  }

  // This deletes an individual note
  function nextPerson() {
    removePending();
    let id;
    if (pendingArray.length) {
      id = pendingArray[0].id;
      navigation.navigate("Next Number Screen", {
        ...pendingArray[0],
        ...{ shopID: shopID },
      });
    } else if (qArray.length) {
      id = qArray[0].id;
      navigation.navigate("Next Number Screen", {
        ...qArray[0],
        ...{ shopID: shopID },
      });
    } else {
      id = null;
      console.log("No person in the queue");
    }

    // To delete that item, we filter out the item we don't want
  }

  // The function to render each row in our FlatList
  function renderItem({ item }) {
    if (item.Time) {
      return (
        <View
          style={{
            padding: 10,
            paddingTop: 50,
            paddingBottom: 50,
            borderBottomColor: "#ccc",
            backgroundColor: "#eee",
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>{item.Number}</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            padding: 10,
            paddingTop: 50,
            paddingBottom: 50,
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>{item.Number}</Text>
        </View>
      );
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.listContainer}>
        <FlatList
          data={
            pendingArray.concat(qArray).length
              ? pendingArray.concat(qArray)
              : []
          }
          renderItem={renderItem}
          style={{ width: "100%" }}
          //keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={nextPerson}>
          <Text style={{ fontSize: 20 }}>Next Customer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    //height:100,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#eee",
    width: "100%",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 70,
  },
});
