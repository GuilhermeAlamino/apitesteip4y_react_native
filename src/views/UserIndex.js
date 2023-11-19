import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import UserCard from './components/card/UserCard';
import ButtonMenu from './components/button/ButtonMenu';
import Api from '../service/Api';

const UserIndex = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const showModal = (userId) => {
    setUserIdToDelete(userId);
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setUserIdToDelete(null);
    setIsModalVisible(false);
  };

  const fetchUserData = async () => {
    try {
      const response = await Api.get('/');
      const data = response.data.data;
      console.log(data);

      setUserData(data);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleEdit = (userId) => {
    navigation.navigate('UserUpdate', { userId });
  };

  const handleDelete = (userId) => {
    showModal(userId);
  };

  const confirmDelete = async () => {
    try {
      await Api.delete(`/delete/${userIdToDelete}`);
      hideModal();

      fetchUserData();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      {userData &&
        userData.map((user, index) => (
          <UserCard
            key={index}
            id={user.id}
            nome={user.nome}
            sobrenome={user.sobrenome}
            onEdit={() => handleEdit(user.id)}
            onDelete={handleDelete}
          />
        ))}
      <ButtonMenu />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={hideModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Deseja realmente excluir este usuário?</Text>
            <TouchableOpacity onPress={confirmDelete} style={styles.buttonAccept}>
              <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hideModal} style={styles.button}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 17,
    color:"#000"
  },
  button: {
    width: '100%',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  buttonAccept: {
    width: '100%',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
  },
});

export default UserIndex;
