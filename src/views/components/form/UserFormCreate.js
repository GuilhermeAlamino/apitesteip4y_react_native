import React, { useState } from 'react';
import { View, Text, TouchableOpacity,Modal, FlatList, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Style from '../../../assets/css/Style';
import Api from '../../../service/Api';

const UserFormCreate = () => {
  const [cpf, setCPF] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const generos = [
    'Masculino',
    'Feminino',
    'Não Binário',
    'Gênero Fluido',
    'Agênero',
    'Bigênero',
    'Trigênero',
    'Gêneroqueer',
    'Demigênero',
    'Andrógino',
    'Neutrois',
  ];

  const handleInserir = async () => {
    try {
      setErrorMessages({});

      const formattedDataNascimento = dataNascimento ? formatDateForApi(dataNascimento) : '';

      const userData = { cpf, nome, sobrenome, dataNascimento: formattedDataNascimento, email, genero };

      const response = await Api.post('/store', userData);

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        console.log(response.data);

        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
      }

      setModalVisible(false);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessages(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  const formatDateForApi = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleRecomecar = () => {
    setCPF('');
    setNome('');
    setSobrenome('');
    setDataNascimento('');
    setEmail('');
    setGenero('');
    setModalVisible(false);
    setErrorMessages({});
    setSuccessMessage('');
  };

  const renderGeneroItem = ({ item }) => (
    <TouchableOpacity
      style={Style.generoItem}
      onPress={() => {
        setGenero(item);
        setModalVisible(false);
      }}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={Style.container}>
      <Text style={Style.title}>Criar Usuário</Text>

      <TextInputMask
        style={Style.input}
        placeholder="CPF"
        type={'cpf'}
        value={cpf}
        onChangeText={(text) => setCPF(text)}
      />
      {errorMessages.cpf && <Text style={Style.errorText}>{errorMessages.cpf[0]}</Text>}

      <TextInput
        style={Style.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      {errorMessages.nome && <Text style={Style.errorText}>{errorMessages.nome[0]}</Text>}

      <TextInput
        style={Style.input}
        placeholder="Sobrenome"
        value={sobrenome}
        onChangeText={setSobrenome}
      />
      {errorMessages.sobrenome && <Text style={Style.errorText}>{errorMessages.sobrenome[0]}</Text>}

      <TextInputMask
        style={Style.input}
        placeholder="Data de Nascimento"
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY',
        }}
        value={dataNascimento}
        onChangeText={(text) => setDataNascimento(text)}
      />
      {errorMessages.dataNascimento && <Text style={Style.errorText}>{errorMessages.dataNascimento[0]}</Text>}

      <TextInput
        style={Style.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      {errorMessages.email && <Text style={Style.errorText}>{errorMessages.email[0]}</Text>}

      <TouchableOpacity
        style={Style.generoButton}
        onPress={() => setModalVisible(true)}
      >
        <Text>{genero || 'Selecione o Gênero'}</Text>
      </TouchableOpacity>
      {errorMessages.genero && <Text style={Style.errorText}>{errorMessages.genero[0]}</Text>}
      {successMessage ? <Text style={Style.successText}>{successMessage}</Text> : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={Style.modalContainer}>
          <FlatList
            data={generos}
            renderItem={renderGeneroItem}
            keyExtractor={(item) => item}
          />
          <TouchableOpacity
            style={Style.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={Style.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={Style.buttonContainer}>
        <TouchableOpacity onPress={handleInserir} style={Style.button}>
          <Text style={Style.buttonText}>Inserir</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRecomecar} style={Style.buttonRecomecar}>
          <Text style={Style.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserFormCreate;
