import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewNotes() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [newTodo, setNewTodo] = useState([]);

  const storeData = async () => {
    try {
      let oldTodos = [];
      let notelist = [];
      todos = JSON.parse(await AsyncStorage.getItem('NOTE')) || [];
      todos.map(item => {
        notelist.push(item);
      });
      setNewTodo([]);
      notelist.push({title: title, desc: desc});
      const jsonValue = JSON.stringify(notelist);
      await AsyncStorage.setItem('NOTE', jsonValue);
      navigation.goBack();
      setNewTodo([newTodo, ...oldTodos]);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter notes title"
        placeholderTextColor={'orange'}
        style={[styles.inputStyle,{marginTop:100}]}
        value={title}
        onChangeText={text => {
          setTitle(text);
        }}
      />
      <TextInput
        placeholder="Enter notes Desc"
        placeholderTextColor={'orange'}
        multiline={true}
        numberOfLines={4}
        style={[styles.inputStyle,{height:120,textAlignVertical:'top'}]}
        value={desc}
        onChangeText={text => {
          setDesc(text);
        }}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          storeData();
        }}>
        <Text style={styles.btnText}>Add Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#191825',
  },
  inputStyle: {
    width: '90%',
    height: 50,
    borderColor: 'orange',
    borderWidth: 1.5,
    borderRadius: 15,
    paddingLeft: 20,
    marginBottom: 20,
    color:'white',
    fontSize:17
  },
  addBtn: {
    width: '90%',
    height: 50,
    borderRadius: 15,
    paddingLeft: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'orange',
  },
  btnText: {
    color: '#191825',
    fontSize: 18,
  },
});
