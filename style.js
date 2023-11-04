
import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    Main: {
        display: 'flex',
        paddingTop:StatusBar.currentHeight 
    },
    child1: {
        width:'100%',
        height:'30%',
        backgroundColor:'red'
    },
    child2: {
        display:'flex',
        alignItems:'flex-end',
        width:'100%',
        height:'70%',
        backgroundColor:'blue',
    },
    button:{
        fontSize:30
    },
    pressable: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:100,
        backgroundColor:'green',
        width:60,
        height:60,
        marginRight:10,
        marginTop:-25
    }
    
  });

  export default styles