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

import firebase from "../database/firebaseDB";
const db = firebase.firestore();

export default function AdminQueueScreen({ navigation, route }) {
  //const [qArray, setQArray] = useState([]);
  const [pendingArray, setPendingArray] = useState([]);
  const { shopID } = route.params;

  //const shopRef = db.collection(`Shops`);
  //const qRef = db.collection(`Shops/${shopID}/Queue`);
  const pendingRef = db.collection(`Shops/${shopID}/Pending_Queue`);

  // Load Firebase data on start

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

  // Delete a person from pending list
  function deletePending(uID, id) {
    deleteUserOrder(uID, id);
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

  const renderSwipeList = (data) => (
    <TouchableHighlight
      onPress={() => console.log("You touched me")}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {data.item.Number}
        </Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        onPress={() => deletePending(data.item.UserID, data.item.id)}
      >
        <Feather name="trash-2" size={30} color="rgba(255, 255, 255, 1)" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => deletePending(data.item.UserID, data.item.id)}
      >
        <Feather name="trash-2" size={30} color="rgba(255, 255, 255, 1)" />
      </TouchableOpacity>
    </View>
  );

  function back() {
    navigation.goBack();
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.boxContainer}>
        <Text style={styles.title}> Pending List: </Text>
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
        <TouchableOpacity style={styles.button} onPress={back}>
          <Text style={{ fontSize: 20 }}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    //flexWrap: "wrap",
    //justifyContent: "center",
    //backgroundColor: "#ffc",
    alignItems: "center",
  },
  boxContainer: {
    width: "100%",
    //flexWrap: "wrap",
    justifyContent: "center",
    //backgroundColor: "#ffc",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "rgba(255, 128, 0, 1)",
    padding: 60,
  },
  listContainer: {
    width: "100%",
    //flexWrap: "wrap",
    justifyContent: "center",
    //backgroundColor: "#ffc",
    alignItems: "center",
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
    padding: 20,
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
});
