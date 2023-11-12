
import { Dimensions, StyleSheet } from "react-native";
var width = Dimensions.get('screen').width; //full width
var height = Dimensions.get('screen').height; //full height

//Dark Theme
var backgroundColor = '#222831'
var secondaryColor = '#393E46'
var textColor = 'white'
var cardColor = '#101114'
var accentColor = '#FD7014'
var borderColor = secondaryColor

//Light Theme
var backgroundColorLight = '#cfe1b9'
var secondaryColorLight = '#97a97c'
var textColorLight = 'black'
var cardColorLight = '#718355'
var borderColorLight = 'black'

const styles = StyleSheet.create({
    Main: {
        display: 'flex',
        backgroundColor:backgroundColor
    },
    header: {
        width:'100%',
        height:'25%',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:secondaryColor,
        borderBottomRightRadius:30,
        borderBottomLeftRadius:30,
    },
    input:{
        fontSize:20,
        color:textColor,
        width:'70%',
        textAlign:'justify',
        height:height/6,

    },  
    datebuttonrow:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        height:height/10,
    },
    datebutton:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:secondaryColor,
        borderRadius:10,
        width:width/2.5,
    },
    datebuttontext:{
        color:textColor,
        fontSize:25,
        textAlign:'center'
    },
    reminderlist:{
        flex:1,
        display:'flex',
        flexDirection:'column',
        width:'100%',
    },
    schedulebutton:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        padding:10,
        width:'50%'
    },
    modalbottombuttons:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    schedulebuttontext:{
        color:textColor,
        textAlign:'center',
        fontSize:20,
    },

    body: {
        display:'flex',
        width:'100%',
        height:'75%',
    },
    reminderitem:{
        width:'100%',
        height:'100%',
        
    },
    delete:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'red',
        height:height/6,
        width:width,
        marginBottom:10,
        paddingLeft:20,
        borderBottomWidth:3,
        borderBottomColor:secondaryColor
    },  
    completetask:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:'green',
        height:height/6,
        width:width,
        marginBottom:10,
        paddingRight:20,
        borderBottomWidth:3,
        borderBottomColor:secondaryColor
    },  
    reminderformat:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:width,
        height:height/6,
        padding:10,
        paddingTop:10,
        paddingBottom:10,
        borderColor:borderColor,
        borderBottomWidth:3,
        backgroundColor:cardColor,
    },
    normaltext:{
        fontSize:20,
        color:textColor,
        textAlign:'center',
    },
    remindersection:{
        width:'50%',
    },
    remindertext:{
        fontSize:20,
        color:textColor,
        fontSize:25, 
    },
    titletext:{
        fontSize:30,
        color:textColor,
        fontWeight:'bold',
        padding:50,
    },
    modalbutton:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        height:'10%',
        paddingRight:20,
        paddingLeft:20
    },
    switch:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:20,
    },
    inputrow:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%', 
        marginBottom:20,
        paddingLeft:20,
        paddingRight:40
    },
    error:{
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        width:'50%',
        alignSelf:'center',
    },
    clearAllModal:{
        backgroundColor:backgroundColor,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:width/2,
        height:height/4,
        borderRadius:25
    },
    clearAllModalOuter:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        backgroundColor:'#00000080'
    },
    lineThrough:{
        textDecorationStyle:'solid',
        textDecorationLine:'line-through'
    },
    
  });

export {
    styles, 
    backgroundColor, 
    secondaryColor, 
    accentColor, 
    textColor, 
    backgroundColorLight,
    secondaryColorLight,
    textColorLight,
    cardColorLight,
    borderColor,
    borderColorLight,
    height
}