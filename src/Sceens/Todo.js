import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
export default function Todo() {
  const initialState = {
    id: 0,
    data: '',
  };
  const [newTodo, setNewTodo] = useState(initialState);
  const [todo, setTodo] = useState([]);
  const [update, setUpdateTodo] = useState('');

  const addTodo = () => {
    if (!newTodo.data) {
      Alert.alert('Error', 'Please Enter Detail');
      return;
    }
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>TODO</Text>
      <FlatList
        style={styles.flatlistStyle}
        data={newTodo}
        renderItem={({item, index}) => {
          return (
            <View style={styles.noteContainer}>
              <Text style={styles.displayTxt}>{item.data}</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.container}>
        <TextInput
          placeholder="Enter Your Todo"
          style={styles.inputStyle}
          value={update}
          onChangeText={text => {
            setUpdateTodo(text);
          }}
        />

        <TouchableOpacity
          style={styles.Addbtn}
          onPress={() => {
            addTodo();
          }}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    marginTop: 20,
    color: '#FFF',
    alignSelf: 'center',
  },
  inputStyle: {
    width: '70%',
    height: 50,
    borderColor: '#000',
    borderWidth: 1.5,
    borderRadius: 15,
    paddingLeft: 20,
    position: 'absolute',
    bottom: 35,
    marginLeft: 10,
  },
  addBtn: {
    width: '90%',
    height: 50,
    borderColor: '#000',
    borderWidth: 1.5,
    borderRadius: 15,
    paddingLeft: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#000',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#191825',
  },
  Addbtn: {
    height: 60,
    width: 60,
    backgroundColor: '#000',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  btnText: {
    color: '#fff',
    fontSize: 30,
  },

  displayTxt: {
    fontSize: 18,
    color: '#191825',
    fontWeight: '600',
  },
  noteContainer: {
    width: '100%',
    backgroundColor: 'orange',
    marginTop: 10,
    borderRadius: 6,
    padding: 10,
  },
  flatlistStyle: {
    flex: 1,
    paddingHorizontal: 15,
  },
  descStyle: {
    fontSize: 14,
    color: '#191825',
    fontWeight: '400',
  },
});
