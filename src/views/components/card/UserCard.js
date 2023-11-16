import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserCard = ({ id, nome, sobrenome, onEdit, onDelete }) => {
  const formatName = (nome, sobrenome) => {
    const fullName = `${nome} ${sobrenome}`;
    return fullName.length > 17 ? `${fullName.slice(0, 17)}...` : fullName;
  };

  return (
    <View style={Style.card}>
      <View style={Style.userInfoContainer}>
        <Text style={Style.userName} numberOfLines={1} ellipsizeMode="tail">
          {formatName(nome, sobrenome)}
        </Text>

        <View style={Style.buttonContainer}>
          <TouchableOpacity style={Style.button} onPress={onEdit}>
            <Text style={Style.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.buttonDelete} onPress={() => onDelete(id)}>
            <Text style={Style.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Style = StyleSheet.create({
  card: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#006400',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonDelete: {
    backgroundColor: '#D12C38',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});


export default UserCard;
