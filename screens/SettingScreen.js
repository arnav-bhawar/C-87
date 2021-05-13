import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, TextInput, Alert } from 'react-native';

export default class SettingScreen extends Component{
    constructor(){
        super();
            this.state = {
                firstName : '',
                lastName : '',
                address : '',
                contact: '',
                emailId: '',
                docId: ''
                
            }
           
        
    }

    getUserDetails = ()=>{
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id','==',email).get()
        .them(snapshot =>{
            snapshot.forEach(doc =>{
                var data = doc.data()
                this.setState({
                    emailId : data.email_id,
                    firstName : data.first_name,
                    lastName : data.last_name,
                    address : data.address,
                    contact : data.contact,
                    docId : doc.id
                    

                })
            });
        })
    }

    updateUserDetails = ()=>{
        db.collection('users').doc(this.state.docId)
        .update({
            "first_name": this.state.firstName,
            "last_name" : this.state.lastName,
            "address": this.state.address,
            "contact": this.state.contact,
        })
        Alert.alert("Profile Updated Succesfully")

    }
    componentDidMount(){
        this.getUserDetails()
    }


    render(){
        return( 
            <View style = {StyleSheet.conatiner}> 
            <MyHeader title = "Settings" nvigation = {this.props.navigation}/>
            <View style = {StyleSheet.formContainer}>
                <TextInput style = {styles.formTextInput}
                placeHolder = {"First Name"}
                maxLength = {8}
                onChangeText = {(text)=>{
                    this.setState({
                        firstName:text
                    })
                }}
                value = {this.state.firstName}
                />
                <TextInput
                style = {styles.formTextInput}
                placeHolder = {"Last Name"}
                maxLength = {8}
                onChangeTect = {(text)=>{
                    this.setState({
                        lastName: text
                    })
                }}
                value= {this.state.lastName}
                />
                <TextInput
                style = {styles.formTextInput}
                placeHolder = {"Address"}
                multiline = {true}
                onChangeText = {(text)=>{
                    this.setState({
                        address: text
                    })
                }}
                value = {this.state.address}
                />
                <TouchableOpacity style = {styles.button}
                onPress = {()=>{
                    this.updateDetails()
                }}>
                    <Text style = {styles.buttonText}>Save</Text>
                    
                </TouchableOpacity>
            </View>
            
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent:'center'
    },
    formConatiner:{
        flex:1,
        width:'100%',
        alignItems: 'center'
    },
    formTextInput:{
        width:"75%",
        height: 35,
        alignSelf: ' center',
        borderWidth:1,
        borderColor: '#ffab91',
        borderRadius: 10,
        marginTop: 20,
        padding: 10,
    },
    button:{
        width: "75%",
        height: 50,
        justifyContent:'center',
        borderRadius:10,
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: { 
        width: 0,
        height: 8,
        },
        shadowOpacity:0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: 20
    },
    buttonText:{
        fontSize: 35,
        fontWeight: "bold",
        color:"#fff"
    }
})