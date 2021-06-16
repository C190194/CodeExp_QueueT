import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TouchableHighlight,
} from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

import firebase from "../database/firebaseDB";
const db = firebase.firestore();

const rowSwipeAnimatedValues = {};

export default function AdminQueueScreen({ navigation, route }) {
  const [qArray, setQArray] = useState([]);
  const [pendingArray, setPendingArray] = useState([]);
  shopID = "znXRQ1uBEdzRE50FjdgV";

  //const shopRef = db.collection(`Shops`);
  const qRef = db.collection(`Shops/${shopID}/Queue`);
  const pendingRef = db.collection(`Shops/${shopID}/Pending_Queue`);

  // This is to set up the top right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.navigate("Notification Screen");
          }}
          title="Notification"
        />
      ),
    });
  });

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
    let d = new Date();
    let time = d.getTime() - 60 * 60 * 1000;
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
    if (qArray.length) {
      id = qArray[0].id;
      navigation.navigate("Next Number Screen", {
        ...qArray[0],
        ...{ shopID: shopID },
      });
    } else if (pendingArray.length) {
      id = pendingArray[0].id;
      navigation.navigate("Next Number Screen", {
        ...pendingArray[0],
        ...{ shopID: shopID },
      });
    } else {
      id = null;
      console.log("No person in the queue");
    }
  }

  // Delete a person from pending list
  function deletePending(id) {
    pendingRef
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    //deletePending(rowKey);
    closeRow(rowMap, rowKey);
    const newData = [...qArray];
    const prevIndex = qArray.findIndex((item) => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setQArray(newData);
    console.log(newData);
  };

  const renderSwipeList = (data) => (
    <TouchableHighlight
      onPress={() => console.log("You touched me")}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View>
        <Text> {data.item.Number} </Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity onPress={() => deleteRow(rowMap, data.item.id)}>
        <Feather name="trash-2" size={30} color="rgba(255, 255, 255, 1)" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deletePending(data.item.id)}>
        <Feather name="trash-2" size={30} color="rgba(255, 255, 255, 1)" />
      </TouchableOpacity>
    </View>
  );

  // The function to render each row in our FlatList
  function renderFlatList({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 50,
          paddingBottom: 50,
          borderTopColor: "#ccc",
          borderTopWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>{item.Number}</Text>
      </View>
    );
  }

  function PendingComponent() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <SwipeListView
            data={pendingArray}
            renderItem={renderSwipeList}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={45}
            rightOpenValue={-45}
            previewRowKey={"0"}
            previewOpenValue={-40}
            previewOpenDelay={0}
            style={{ width: "80%" }}
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

  function showPendingList() {
    navigation.navigate("Pending List Screen", {
      ...{ shopID: shopID },
    });
  }

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Show Pending List"
        style={{ marginTop: 30 }}
        onPress={showPendingList}
      />
      <View style={{ flex: 1, width: "100%" }}>
        <FlatList
          data={qArray.length ? qArray : []}
          renderItem={renderFlatList}
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

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Queue" component={QueueComponent} />
        <Tab.Screen name="Pending List" component={PendingComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    //flex: 1,
    //height:100,

    backgroundColor: "#ffc",
    alignItems: "center",
    //justifyContent: "center",
  },
  buttonContainer: {
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

  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 60,
    borderRadius: 20,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});
