import React, { useState, useEffect } from 'react';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Text, View, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, TextInput, Alert, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import firebase from "../../database/firebaseDB";
import Searchbar from '../screens/searchBar'
import { theme } from '../core/theme'
//import Modal from 'react-native-modal';

//get shopid & userid
//add to queue then update appointment in Queue Screen
//display current queue number
//display appointment
//add waiting time
//cancel appointment
//notify shop when he in pending queue and arrive at shop

export default function MainScreen({ navigation }) {
  const [value, setValue] = useState()
  function updateSearch(value) {
       //earch logic here
       console.log(value)
  }	

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
		<Text style={styles.title}> Start Queuing</Text>
        <Searchbar
            value={value}
            updateSearch={updateSearch}
            style={{ marginTop: '8%' }}
        /> 
		<ScrollView>
		    <Text style={styles.subtitle}> Popular on QueueTogether</Text>
			<ScrollView horizontal={true}>
			
			<TouchableOpacity onPress={() => setModalVisible(true)}>
			<View style = {styles.card}>
			<Image
             style={styles.profilePic}
             source={require('../assets/images/hairdresser1.jpg')}
            />
			<Text style={styles.caption}>Queue Name</Text>
			<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
			<Text style={styles.address}>Insert first few words of Address</Text>
			</View>
			</TouchableOpacity>
			
			<Modal 
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
				  Alert.alert("Modal has been closed.");
				  setModalVisible(!modalVisible);
				}}
			  >
				<View style={styles.centeredView}>
				  <View style={styles.modalView}>
				    <View style = {{flex:8}}>
					<Image
					style={styles.modalPic}
					source={require('../assets/images/hairdresser1.jpg')}
					/>
					<Text style={styles.caption}>Queue Name</Text>
					<Text style={styles.address}>Address of queue here</Text>
					<Text style={styles.modalText}>Brief description of the queue</Text>
					<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
					<Text style={styles.estWaitTime}>You are number 5 in the queue.</Text>
					</View>
					<View style={{ flexDirection:"row" ,
								   justifyContent: 'flex-end',
								   flex:1}}>
					<Pressable
					  style={[styles.button, styles.buttonClose]}
					  onPress={() => 
					    {
						// const userName = email?
						const db = firebase.firestore();
						const UserID = "VOffdU0wx1T6Q6P2ql9h";
						const apptRef = db.collection(`Users/${UserID}/Appointments`);
						const shopID = "znXRQ1uBEdzRE50FjdgV";
						const qRef = db.collection(`Shops/${shopID}/Queue`);
						const shopRef=db.collection('Shops').doc(shopID);
						var lastNum=shopRef.get().Last_Number;
						console.log("last no. is " +lastNum);
						qRef.add(
									{
									Number: 124, //by right is lastNum+1
									UserID: UserID
									}
								)
							.then( () =>{
								console.log("User successfully added!");
								setModalVisible(!modalVisible);
							})
							.catch((error) =>{
								console.error("Error adding user: ", error);
							})
						//increase Last_Number by 1	
						shopRef.update({
							Last_Number : firebase.firestore.FieldValue.increment(1)
						});

						apptRef.add({
							queueNumber: 124, //by right is lastNum+1,
							shopID: shopID
						})
						.then( () =>{
							console.log("Successfully added to user's appt");
						})
						.catch((error) =>{
							console.error("Error adding to user's appt: ", error);
						})
					  }
					}
					>
					  <Text style={styles.textStyle}>Join Queue</Text>
					</Pressable>
					<Pressable
					  style={[styles.button, styles.buttonClose]}
					  onPress={() => setModalVisible(!modalVisible)}
					>
					  <Text style={styles.textStyle}>Close</Text>
					</Pressable>
					</View>
				  </View>
				</View>
			</Modal>
			
			
			<View style = {styles.card}>
			<Image
             style={styles.profilePic}
			 source={require('../assets/images/restaurant1.jpg')}
            />
			<Text style={styles.caption}>Queue Name</Text>
			<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
			<Text style={styles.address}>Insert first few words of Address</Text>
			</View>
			<View style = {styles.card}>
			<Image
             style={styles.profilePic}
             source={require('../assets/images/hairdresser2.png')}
            />
			<Text style={styles.caption}>Queue Name</Text>
			<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
			<Text style={styles.address}>Insert first few words of Address</Text>
			</View>
			<View style = {styles.card}>
			<Image
             style={styles.profilePic}
             source={require('../assets/images/restaurant2.jpg')}
            />
			<Text style={styles.caption}>Queue Name</Text>
			<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
			<Text style={styles.address}>Insert first few words of Address</Text>
			</View>
			<View style = {styles.card}>
			<Image
             style={styles.profilePic}
             source={require('../assets/images/restaurant3.jpg')}
            />
			<Text style={styles.caption}>Queue Name</Text>
			<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
			<Text style={styles.address}>Insert first few words of Address</Text>
			</View>
			<View style = {styles.card}>
			<Image
             style={styles.profilePic}
             source={require('../assets/images/4d1.jpg')}
            />
			<Text style={styles.caption}>Queue Name</Text>
			<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
			<Text style={styles.address}>Insert first few words of Address</Text>
			</View>
			
			</ScrollView>
            <Text style={styles.subtitle}> Queues Around You</Text>
			<ScrollView horizontal={true}>
			<View style = {styles.card}>
			<Image
             style={styles.profilePic}
             source={require('../assets/images/clinic1.jpg')}
            />
			<Text style={styles.caption}>Queue Name</Text>
			<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
			<Text style={styles.address}>Insert first few words of Address</Text>
			</View>
			<View style = {styles.card}>
			<Image
             style={styles.profilePic}
             source={require('../assets/images/clinic2.jpg')}
            />
			<Text style={styles.caption}>Queue Name</Text>
			<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
			<Text style={styles.address}>Insert first few words of Address</Text>
			</View>
			<View style = {styles.card}>
			<Image
             style={styles.profilePic}
             source={require('../assets/images/4d1.jpg')}
            />
			<Text style={styles.caption}>Queue Name</Text>
			<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
			<Text style={styles.address}>Insert first few words of Address</Text>
			</View>
			<View style = {styles.card}>
			<Image
             style={styles.profilePic}
             source={require('../assets/images/hawker1.png')}
            />
			<Text style={styles.caption}>Queue Name</Text>
			<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
			<Text style={styles.address}>Insert first few words of Address</Text>
			</View>
			<View style = {styles.card}>
			<Image
             style={styles.profilePic}
             source={require('../assets/images/hawker2.jpg')}
            />
			<Text style={styles.caption}>Queue Name</Text>
			<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
			<Text style={styles.address}>Insert first few words of Address</Text>
			</View>

			</ScrollView>
            <Text style={styles.subtitle}> Favourites</Text>
			<ScrollView horizontal={true}>
			<View style = {styles.card}>
			<Image
             style={styles.profilePic}
             source={require('../assets/images/4d1.jpg')}
            />
			<Text style={styles.caption}>Queue Name</Text>
			<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
			<Text style={styles.address}>Insert first few words of Address</Text>
			</View>
			</ScrollView>
            <Text style={styles.subtitle}> Queue Again</Text> 
			<ScrollView horizontal={true}>
			<View style = {styles.card}>
			<Image
             style={styles.profilePic}
             source={require('../assets/images/clinic1.jpg')}
            />
			<Text style={styles.caption}>Queue Name</Text>
			<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
			<Text style={styles.address}>Insert first few words of Address</Text>
			</View>
			<View style = {styles.card}>
			<Image
             style={styles.profilePic}
             source={require('../assets/images/hawker2.jpg')}
            />
			<Text style={styles.caption}>Queue Name</Text>
			<Text style={styles.estWaitTime}>Est Wait time: 10 mins</Text>
			<Text style={styles.address}>Insert first few words of Address</Text>
			</View>
			</ScrollView>
            {/* <Button 
                onPress={() => navigation.navigate('Login')}
                title="Go to Profile"
            /> */}
		</ScrollView>
        </View>
     </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
	card: {
      width: 260,
      height: 260,
      backgroundColor: 'white' ,
      margin: 5,
    },
	title: {
    marginTop: 60,
    color: 'black',
    fontSize: 40,
    },
	subtitle: {
    marginTop: 10,
    color: 'black',
    fontSize: 20,
    },
	profilePic: {
    height: 200,
    width: 260,
    borderColor: 'white',
    //borderRadius: 30,
    //overflow: "hidden",
    borderWidth: 5,
    },
	button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
    },
	caption:{
	marginLeft: 5,
    color: 'black',
    fontSize: 15,
	justifyContent: 'flex-start'
	},
	estWaitTime:{
	marginLeft: 5,
    color: 'orange',
    fontSize: 10,
	justifyContent: 'flex-start'
	},
	address:{
	marginLeft: 5,
    color: 'grey',
    fontSize: 10,
	justifyContent: 'flex-start'
	},
	centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
    },
    modalView: {
	  margin: 5,
	  backgroundColor: "white",
	  borderRadius: 0,
	  padding: 10,
	  width: 350,
	  height: 500,
	  shadowColor: "#000",
	  shadowOffset: {
	  width: 100,
	  height: 100
	  },
	  shadowOpacity: 0.25,
	  shadowRadius: 4,
	  elevation: 5
    },
    button: {
	  borderRadius: 0,
	  height: 50,
      width: 100,
	  elevation: 2,
	  justifyContent: "center",
      alignItems: "center",
	  margin: 5,
    },
    buttonOpen: {
	  backgroundColor: "#F194FF",
    },
    buttonClose: {
	  backgroundColor: "#2196F3",
    },
   textStyle: {
	  color: "white",
	  fontWeight: "bold",
	  textAlign: "center"
    },
    modalText: {
	  marginLeft: 5,
      color: 'black',
      fontSize: 10,
	  justifyContent: 'flex-start'
   },
   modalPic: {
    height: 200,
    width: 330,
    borderColor: 'white',
    //borderRadius: 30,
    //overflow: "hidden",
    borderWidth: 5,
    },
  })