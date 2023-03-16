import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000000",
    },
    header:{
      padding:15,
    },
    headerText:{
      marginTop:30,
      textAlign:'center',
      fontSize: 24,
      lineHeight: 45,
      color: "#FFF",
    },
    containerInput:{
      backgroundColor:"#67686D",
      height: 42,
      padding: 10,
      borderRadius: 16,
      marginTop: 24,
      marginBottom: 20,
      alignItems:'center',
      justifyContent:'space-between',
      flexDirection:"row"
    },
    input:{
      color: "#fff",
      width: "80%",
      paddingLeft: 15,
    },
    noResultText: {
      color: "#FFF",
      fontSize: 18,
      textAlign: "center",
      marginTop: 50,
    },
  });