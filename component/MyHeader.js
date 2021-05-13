import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '..config'

export default class MyHeader extends Component {
  constructor (props){
    super (props);
    this.state = {
      value : " "
    }
  }
  
getNumberOfUnreadNotifications(){
  db.collection('all_notifications').where('notification_status','==',"unread")
  .onSnapshot((snapshot)=>{
    var unreadNoifications = snapshot.docs.map((doc)=> doc.data())
    this.setState ({
       value : unreadNoifications.length
    })
  })
}

 BellIconWithBadge = (props)=> {
  return(
    <View>
      <Icon name = 'bell' type = 'font-awesome' color = 'red' size = {25} onPress = {()=>props.navigation.navigate('Notification')}/>
      <Badge value = {this.state.value} containerStyle =  {{position : 'absolute', top:-4 , right: -4 }}/>
    </View>
  )
}

render(){ 
    return (
      <Header
      leftComponent = {<Icon name = 'bars' type = 'font-awesome' color = 'red' onPress = {()=>props.navigation.toggleDrawer()}/>}
        centerComponent={{ text: props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
        rightComponent = {<BellIconWithBadge {...props }/>}
        backgroundColor = "#eaf8fe"
      />
    );
  }
  
 
}