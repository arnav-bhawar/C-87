import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { render } from 'react-dom';

export default class BookDonateScreen extends Component{
    constructor(){
        super()
        this.state = {
            requestBooksList :[]
        }
        this.requestRef - null
    }

    getRequestedBookList = ()=>{
        this.requestRef = db.collection("request_books")
        .onSnapshot((sapshot)=>{
            var requestBooksList = snashot.docs.map(document => document.data());
            this.setState({
                requestBooksList: this.requestedBooksList
            });
        })
    }

    compnentDidMount(){
        this,getRequestedBookList()
    }

    componentWillUnmount(){
        this.requestRef();
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ( {item,1} ) => {
        return(
            <ListItem
            key = {i}
            title= {item.book_name}
            subtitle = {item.reason_to_request}
            titelStyle = {{color: 'black', fontWeight: 'bold'}}
            rightElement = {
                <TouchableOpacity style = {StyleSheet.button}>
                    <Text style = {{color: '#ffff'}}>View</Text>>
                </TouchableOpacity>
            }
            bottomDivider
            />
        )
    }
}

render(){
    return(
        <View style = {{flex:1}}>
            <MyHeader title = "Donate Books"/>
            <View style = {{flex:1}}>
                {
                this.state.requestedBooksList.length === 0
                ?(
                    <View style = {StyleSheet.subContainer}>
                        <Text style={{ fontSize:20}}>List of All Requested Books</Text>
                        </View>
                )
            :(
                <FlatList
                keyExtractor = {this.keyExtractor}
                data= {this.state.requestedBooksList}
                renderItem = {this,renderItem}
                />
            )
            }
            </View>
        </View>
    )
        }
        
    
const styles = StyleSheet.create({
    subContainer:{
        flex:1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    button:{
        width:100,
        height:30,
        justifyContent: 'center',
        alignItems:'center',
        backGroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width:0,
            height:8 
        }
    }
})