import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { SafeAreaView, StatusBar, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
    List,
    ListItem,
    Text,
    Body,
    Container,
    Root,
    Content,
    Thumbnail,
    Left,
    ActionSheet,
    Form,
    Item,
    Input
} from 'native-base';
import SelectionListHeader from '../components/SelectionListHeader';
import images from '../components/allImages'
import Searchbar from '../screens/searchBar'
import {  View, StyleSheet  } from 'react-native';

export default function QueueScreen({ navigation }) {
    //code to get the queues (with the following attributes) user logged in is in from database. 
    const mockItems = [
        {
            id: '1',
            name: 'NAOKI Hair Dressing',
            address: '4 Tampines Central 5, 03-10/11, Singapore 529510',
            waitingNumber: 1,
            estimatedWaitTime: 10,
            contactNumber: 67839481
        },
        {
            id: '2',
            name: 'Porta Porta Italian Restaurant',
            address: 'No. 32 Jln Pari Burong, Singapore 488698',
            waitingNumber: 2,
            estimatedWaitTime: 4,
            contactNumber: 93648261
        },
    ];

    function useSelectionChange(items) {
        const [selectionMode, setSelectionMode] = useState(null);
        useEffect(() => {
            if (items.filter(i => i.selected).length > 0) {
                setSelectionMode(true);
            } else {
                setSelectionMode(false);
            }
        });
        return selectionMode;
    }
        const [items, setItems] = useState(mockItems);
        const selectionMode = useSelectionChange(items);

        const toggleSelect = item => {
            setItems(
                items.map(i => {
                    if (item === i) {
                        i.selected = !i.selected;
                    }
                    return i;
                }),
            );
        };

        const clearSelection = () => {
            setItems(
                items.map(i => {
                    i.selected = false;
                    return i;
                }),
            );
        };

        const onPress = item => {
            if (selectionMode) {
                toggleSelect(item);
            } else {
                pressItem(item);
            }
        };

        const onLongPress = item => {
            if (selectionMode === false) {
                toggleSelect(item);
            }
        };

       var BUTTONS = ["Contact Queue Admin", "Leave Queue", "Cancel"];
       var DESTRUCTIVE_INDEX = 1;
       var CANCEL_INDEX = 2;
       var FormState = {
           visible: true
       }


       const pressItem = item => {
           console.log(JSON.stringify(item) + " pressed");
           console.log("Next modal");
           return (
               ActionSheet.show(
                   {
                       options: BUTTONS,
                       cancelButtonIndex: CANCEL_INDEX,
                       destructiveButtonIndex: DESTRUCTIVE_INDEX,
                       title: JSON.stringify(item.name).slice(1, -1)
                   },
                   buttonIndex => {
                       if (buttonIndex == 0) {
                           Alert.alert("Contact Queue Admin\n" + "Phone: " + JSON.stringify(item.contactNumber));
                           //Form.show(
                           //    { title: JSON.stringify(item.name).slice(1, -1) }
                           //)
                       }
                       else if (buttonIndex == 1) {
                           clearSelection();
                           //insert code to delete from database
                       }
                       else {
                           ActionSheet.hide()
                       }
                   }
               )
           )
        };

        const renderItem = item => {
            return (
                <ListItem Thumbnail
                    onPress={() => onPress(item)}
                    onLongPress={() => onLongPress(item)}
                    key={item.id}
                    noIndent
                    style={[item.selected ? styles.selected : styles.normal]}>
                    <Left>
                        <Thumbnail large square source={images[item.id]} />
                        <Body>
                            <Text>{item.name}</Text>
                            <Text style={{ color: "grey" }}>{item.address}</Text>
                            <Text style={{ color: "orange" }}>Queue number: {item.waitingNumber}</Text>
                            <Text style={{ color: "orange" }}>Estimated wait time: {item.estimatedWaitTime} mins</Text>
                        </Body>
                    </Left>
                    
                </ListItem>

            );
    };

    const [value, setValue] = useState()
    function updateSearch(value) {
        //search logic here
        console.log(value)
    }

  return (
      <>
          <Root>
              <StatusBar backgroundColor='black' />
              
              <Container style={{ backgroundColor: "#eeeeee" }}>
                  <View style={styles.container}>
                      <Text style={styles.title}>In Queue</Text>
                      <Searchbar
                          value={value}
                          updateSearch={updateSearch}
                          style={{ marginTop: '0%' }}
                       />
                  </View>
                  
                  <SelectionListHeader
                      selectionMode={selectionMode}
                      title="You are in 2 queues."
                      selectedItemsCount={items.filter(i => i.selected).length}
                      clearSelection={clearSelection}
                      selectActions={[
                          {
                              name: 'Leave All Queues Selected',
                              method: function () {
                                  clearSelection();
                              },
                          },
                          {
                              name: 'Cancel',
                          },
                      ]}
                  />
                  <Content>
                      <List>
                          {items.map(item => {
                              return renderItem(item);
                          })}
                      </List>
                  </Content>
              </Container>
          </Root>
      </>
  )
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        backgroundColor: "#eeeeee"
    },
    selected: {
        backgroundColor: 'lightgray',
        marginLeft: 0,
        paddingLeft: 18,
    },
    normal: {
        backgroundColor: "white"
    },
    title: {
        color: 'black',
        fontSize: 40,
        padding: 20,
        marginTop:20
    },
    caption: {
        marginLeft: 5,
        color: 'black',
        fontSize: 15,
        justifyContent: 'flex-start'
    },
    estWaitTime: {
        marginLeft: 5,
        color: 'orange',
        fontSize: 10,
        justifyContent: 'flex-start'
    },
    address: {
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
    estWaitTime: {
        color: 'orange',
    },
  })