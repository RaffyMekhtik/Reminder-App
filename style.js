
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
    input:{
        fontSize:20,
        color:'white',
        width:'50%',
        textAlign:'justify',
        height:height/8,

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
        backgroundColor:'#5C5470',
        borderRadius:10,
        width:width/2.5,
    },
    datebuttontext:{
        color:'white',
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
        color:'white',
        textAlign:'center',
        fontSize:20,
    },
    titletext:{
        color:'white',
        fontSize:30,
        paddingLeft:20,
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
        borderBottomColor:'#5C5470'
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
        borderBottomColor:'#5C5470'
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
       
        borderColor:'#5C5470',
        borderBottomWidth:3,
    },
    normaltext:{
        fontSize:20,
        color:'white'
    },
    remindertext:{
        fontSize:20,
        color:'white',
        fontSize:25, 
        width:width/2
    },
    titletext:{
        fontSize:30,
        color:'white',
        fontWeight:'bold',
        margin:60
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
        paddingLeft:20,
        marginBottom:20,
    },
    error:{
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        width:'50%',
        alignSelf:'center'
    },
    clearAllModal:{
        backgroundColor:'white',
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
    }
    
  });

  export default styles