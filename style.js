
import { Dimensions, StatusBar, StyleSheet } from "react-native";
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const styles = StyleSheet.create({
    Main: {
        display: 'flex',
        backgroundColor:'#352F44'
    },
    header: {
        width:'100%',
        height:'25%',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:'#5C5470',
        borderBottomRightRadius:30,
        borderBottomLeftRadius:30,
    },
    body: {
        display:'flex',
        width:'100%',
        height:'75%',
    },
    reminderitem:{
        width:'100%',
        height:'100%',
        marginBottom:10,
        marginTop:10,
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
        marginTop:10,
        paddingLeft:20,
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
        marginTop:10,
        paddingRight:20,
    },  
    reminderformat:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:width,
        height:height/6,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:"#5C5470",
    },
    normaltext:{
        fontSize:20,
        color:'white'
    },
    titletext:{
        fontSize:30,
        color:'white',
        fontWeight:'bold',
        margin:60
    },
    modalbutton:{
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-end',
        width:'100%',
        height:'10%',
        paddingRight:20
    }
    
  });

  export default styles