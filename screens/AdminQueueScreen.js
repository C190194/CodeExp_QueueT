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
  Dimensions,
} from "react-native";
import { Modal, Portal, Provider } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

import firebase from "../database/firebaseDB";
const db = firebase.firestore();

import cancelSender from "./SendCancelNotification";

export default function AdminQueueScreen({ navigation, route }) {
  const [qArray, setQArray] = useState([]);
  const [pendingArray, setPendingArray] = useState([]);
  shopID = "znXRQ1uBEdzRE50FjdgV";

  //const shopRef = db.collection(`Shops`);
  const qRef = db.collection(`Shops/${shopID}/Queue`);
  const pendingRef = db.collection(`Shops/${shopID}/Pending_Queue`);

  // // This is to set up the top right button
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Button
  //         onPress={() => {
  //           navigation.navigate("Notification Screen");
  //         }}
  //         title="Notification"
  //       />
  //     ),
  //   });
  // });

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
      let newID = route.params?.order.id;
      delete route.params?.order.id;
      pendingRef.doc(newID).set(route.params?.order);
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

  // Delete order from user database
  function deleteUserOrder(userID, orderID) {
    console.log(userID, orderID);
    let userRef = db.collection(`Users/${userID}/Appointments`);

    userRef
      .doc(orderID.toString())
      .delete()
      .then(() => {
        console.log("Order successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  // This deletes absent numbers in the pending list
  function removePending() {
    let d = new Date();
    let time = d.getTime() - 5 * 1000; // 5 mins
    for (let i = pendingArray.length - 1; i >= 0; i--) {
      if (pendingArray[i].Time < time) {
        deleteUserOrder(pendingArray[i].UserID, pendingArray[i].id);
        let userRef = db.collection(`Users`).doc(pendingArray[i].UserID);
        userRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              cancelSender(doc.data().token);
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });

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
    console.log(qArray);
    removePending();
    let id;
    if (qArray.length) {
      id = qArray[0].id;
      navigation.navigate("Next Number Screen", {
        ...qArray[0],
        ...{ shopID: shopID },
      });
    } else {
      id = null;
      console.log("No person in the queue");
      showModal();
    }
  }

  function showPendingList() {
    navigation.navigate("Pending List Screen", {
      ...{ shopID: shopID },
    });
  }

  // The function to render each row in our FlatList
  const numColumns = 2;
  function renderFlatList({ item }) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          margin: 1,
          height: Dimensions.get("window").width / numColumns, // approximate a square
        }}
      >
        <Text style={styles.orderText}>{item.Number}</Text>
      </View>
    );
  }

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
  };
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.numText}>
        Currently {qArray.length} people in the queue{" "}
      </Text>
      <TouchableOpacity style={styles.pendButton} onPress={showPendingList}>
        <Text style={{ fontSize: 20 }}>Display Pending List</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, width: "100%" }}>
        <FlatList
          data={formatData(qArray.length ? qArray : [], numColumns)}
          renderItem={renderFlatList}
          style={{ marginVertical: 20, width: "100%" }}
          numColumns={numColumns}
          //keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.callButton} onPress={nextPerson}>
          <Text style={{ fontSize: 20 }}>Next Customer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  numText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "rgba(255, 128, 0, 1)",
    marginTop: 5,
    padding: 5,
    alignSelf: "center",
  },
  orderText: {
    fontWeight: "bold",
    fontSize: 25,
    //color: "rgba(255, 128, 0, 1)",
    padding: 5,
  },
  pendButton: {
    alignSelf: "center",
    alignItems: "center",
    height: 30,
    width: 200,
    borderRadius: 10,
    marginTop: 10,
    //position: "absolute",
    //top: 50,
    //left: 50,
    backgroundColor: "rgb(132, 214, 248)",
  },
  flatListContainer: {
    //flex: 1,
    //height:100,

    backgroundColor: "#ffc",
    alignItems: "center",
    //justifyContent: "center",
  },
  buttonContainer: {
    //backgroundColor: "#eee",
    width: "100%",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  callButton: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(161, 252, 168)",
    borderWidth: 3,
    borderLeftColor: "green",
    borderTopColor: "green",
    borderRightColor: "green",
    borderBottomColor: "green",
    height: 70,
    width: 250,
    borderRadius: 10,
    //padding: 70,
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
