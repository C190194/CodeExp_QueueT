import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import firebase from "../database/firebaseDB";

const db = firebase.firestore();

export default function NextNumberScreen({ route, navigation }) {
  const { id, Number, shopID } = route.params;

  const [qArray, setQArray] = useState([]);
  const [pendingArray, setPendingArray] = useState([]);

  const qRef = db.collection(`Shops/${shopID}/Queue`);
  const pendingRef = db.collection(`Shops/${shopID}/Pending_Queue`);

  const [order, setOrder] = useState({});

  // Load Firebase data on start
  useEffect(() => {
    const unsubscribe = qRef.orderBy("Number").onSnapshot((collection) => {
      const updatedQueue = collection.docs.map((doc) => {
        return {
          id: doc.id,
          Number: doc.data().Number,
          UserID: doc.data().UserID,
        };
      });
      setQArray(updatedQueue);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = pendingRef
      .orderBy("Number")
      .onSnapshot((collection) => {
        const updatedPendingQ = collection.docs.map((doc) => {
          return {
            id: doc.id,
            Number: doc.data().Number,
            UserID: doc.data().UserID,
            Time: doc.data().Time,
          };
        });
        setPendingArray(updatedPendingQ);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  // This moves absent numbers to pending list
  function serve() {
    qRef
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    navigation.goBack();
  }

  // This moves absent numbers to pending list
  function addPending() {
    let order = qArray[0];

    let d = new Date();
    let newPending = {
      id: order.id,
      Number: order.Number,
      UserID: order.UserID,
      Time: d.getTime(),
    };
    console.log(newPending);
    navigation.navigate({
      name: "AdminQueue",
      params: { order: newPending },
      merge: true,
    });
  }

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <Text style={{ fontSize: 24 }}>Next Number to Serve: </Text>
      <Text style={{ fontSize: 34 }}>{Number}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={serve}>
          <Text style={styles.buttonText}>Serve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={addPending}>
          <Text style={styles.buttonText}>Pass</Text>
        </TouchableOpacity>
      </View>
      {/* <Text>{text.toUpperCase()}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    width: 80,
  },
  buttonText: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
