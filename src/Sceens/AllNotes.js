import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Modal,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AllNotes() {
  const navigation = useNavigation();
  const focused = useIsFocused();
  const [noteList, setNoteLIst] = useState([]);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDesc, setUpdatedDesc] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const [itemId, setItemId] = useState();
  useEffect(() => {
    getData();
  }, [focused]);

  const getData = async () => {
    try {
      const todos = await AsyncStorage.getItem('NOTE');
      console.log('get data todos', todos);
      if (todos.length > 0) {
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
    console.log('json value ===>', jsonValue);
  };
  const openModal = item => {
    console.log('modal item ', item);
    setModalVisible(true);
    setUpdatedTitle(item?.title);
    setUpdatedDesc(item?.desc);
    setItemId(item?.id);
  };
  const handaleEdit = async itemId => {
    console.log('itemId', itemId);
    const newData = noteList.map(item => {
      if (item.id === itemId) {
        item.title = updatedTitle;
        item.desc = updatedDesc;
        //  return item;
      }
      return item;
    });
    console.log('newdata===>', newData);
    setNoteLIst(newData);
    const jsonValue = JSON.stringify(newData);
    await AsyncStorage.setItem('NOTE', jsonValue);
  };
  const saveData = () => {
    setModalVisible(!modalVisible);
    handaleEdit(itemId);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>All Notes</Text>
      </View>
      <FlatList
        style={styles.flatlistStyle}
        data={noteList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.noteContainer}
              onPress={() => {
                openModal(item);
              }}>
              <ScrollView>
                <Text style={styles.displayTxt}>{item.title}</Text>
                <Text style={styles.descStyle}>{item.desc}</Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.deletebtn}
                onPress={() => {
                  deleteData(index);
                }}>
                <Text
                  style={{fontSize: 15, color: 'orange', alignSelf: 'center'}}>
                  Delete
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.container}>
          <View style={styles.modalheaderView}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                // getData();
              }}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  tintColor: 'white',
                }}
                source={require('../accests/img/back.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{position: 'absolute', right: 20}}
              onPress={() => {
                saveData();
              }}>
              <Image
                style={{
                  height: 35,
                  width: 35,
                }}
                source={require('../accests/img/checkmark.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.editnoteContainer}>
            <View>
              <TextInput
                style={{
                  fontSize: 23,
                  color: 'white',
                  fontWeight: '700',
                  backgroundColor: '#191825',
                  paddingLeft: 20,
                  borderRadius: 10,
                }}
                numberOfLines={2}
                editable={true}
                defaultValue={updatedTitle}
                onChangeText={value => {
                  setUpdatedTitle(value);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsPress(!isPress);
              }}
              style={{
                marginTop: 35,
                // marginLeft: 18,
              }}>
              {/* {!isPress ? (
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                    fontWeight: '500',
                  }}
                  numberOfLines={2}>
                  {updatedDesc}
                </Text>
              ) : ( */}
              <TextInput
                style={{
                  fontSize: 18,
                  color: 'white',
                  fontWeight: '500',
                  width: '100%',
                }}
                // maxLength={50}
                multiline
                // placeholder={updatedDesc}
                defaultValue={updatedDesc}
                onChangeText={value => {
                  setUpdatedDesc(value);
                }}
              />
              {/* )} */}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#000000',
  },
  modalheaderView: {
    height: 50,
    marginTop: 20,
    marginLeft: 30,
    // backgroundColor: 'white',
    flexDirection: 'row',
  },
  headerView: {
    height: 55,
    width: '100%',
    backgroundColor: '#191825',
    marginTop: 10,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    paddingLeft: 20,
  },
  Addbtn: {
    height: 50,
    width: 50,
    backgroundColor: 'orange',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '400',
  },

  displayTxt: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  noteContainer: {
    width: '100%',
    backgroundColor: '#191825',
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  editnoteContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#191825',
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
  flatlistStyle: {
    flex: 1,
    paddingHorizontal: 15,
    marginBottom: 80,
  },
  descStyle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '400',
    paddingTop: 5,
  },
  deletebtn: {
    backgroundColor: '#000',
    borderRadius: 10,
    width: 70,
    height: 35,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
