import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({


  TextHeader: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',

  },
 
  ViewOfTextHeader: {

    padding: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1976D2'
  },
  ImageBack: {
    marginLeft: 10,
    width: 15,
    height: 15,
  },
  
  styleForHome:{
    flexDirection: 'row',
    marginBottom:10,
  },

  HeaderScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    color: '#ffffff',
    backgroundColor: '#1976D2'
  },

  TextInputStyle:
  {

    textAlign: 'center',
  },

  button: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 7,
    marginTop: 12
  },



  textViewContainer: {

    textAlignVertical: 'center',
    padding: 10,
    fontSize: 20,
    color: '#000',

  },
  ViewInput: {
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#009688',
    height: 40,
    borderRadius: 7,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  },




  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },

});
export default styles;