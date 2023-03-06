import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AllNotes() {
  const navigation = useNavigation();
  const focused = useIsFocused();

  const [noteList, setNoteLIst] = useState([]);
  useEffect(() => {
    getData();
  }, [focused]);

  const getData = async () => {
    try {
      const todos = await AsyncStorage.getItem('NOTE');
      if (todos !== null) {
        const todoList = JSON.parse(todos);
        setNoteLIst(todoList);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const deleteData = async index => {
    const tempTodo = noteList;
    const selectTodo = tempTodo.filter((item, ind) => {
      return ind != index;
    });
    setNoteLIst(selectTodo);
    const jsonValue = JSON.stringify(selectTodo);
    await AsyncStorage.setItem('NOTE', jsonValue);
    console.log('Done');
  };
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlistStyle}
        data={noteList}
        renderItem={({item, index}) => {
          return (
            <View style={styles.noteContainer}>
              <Text style={styles.displayTxt}>{item.title}</Text>
              <Text style={styles.descStyle}>{item.desc}</Text>
              <TouchableOpacity
                style={styles.deletebtn}
                onPress={() => {
                  deleteData(index);
                }}>
                <Text
                  style={{fontSize: 18, color: 'orange', alignSelf: 'center'}}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.Addbtn}
        onPress={() => {
          navigation.navigate('NewNotes');
        }}>
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    bottom: 10,
    right: 30,
  },
  btnText: {
    color: '#fff',
    fontSize: 30,
  },

  displayTxt: {
    fontSize: 20,
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
    marginBottom: 80,
  },
  descStyle: {
    fontSize: 16,
    color: '#191825',
    fontWeight: '400',
    paddingTop: 5,
  },
  deletebtn: {
    backgroundColor: '#191825',
    position: 'absolute',
    right: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
  },
});
