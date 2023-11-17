import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Style from '../../../assets/css/Style';
import Api from '../../../service/Api';

const UserFormEdit = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [cpf, setCPF] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Api.get(`/show/${userId}`);
        const userDataResponse = response.data.data ? response.data.data : null;
        if (userDataResponse) {
          setUserData(userDataResponse);
          setCPF(userDataResponse.cpf);
          setNome(userDataResponse.nome);
          setSobrenome(userDataResponse.sobrenome);
          setDataNascimento(formatDateForDisplay(userDataResponse.dataNascimento));
          setEmail(userDataResponse.email);
          setGenero(userDataResponse.genero);
        } else {
          console.log('Dados do usuário não encontrados.');
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

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

  const handleSalvarEdicao = async () => {
    try {
      setErrorMessages({});

      const formattedDataNascimento = dataNascimento && formatDateForApi(dataNascimento);

      const updatedUserData = { cpf, nome, sobrenome, dataNascimento: formattedDataNascimento, email, genero };

      const response = await Api.put(`/edit/${userData.id}`, updatedUserData);

      if (response.data.success) {
        setSuccessMessage('Usuário atualizado com sucesso!');

        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
      } else {
        setErrorMessages(response.data.message);
        console.log(response.data.message)
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

  const handleRecomecar = () => {
    setCPF(userData ? userData.cpf : '');
    setNome(userData ? userData.nome : '');
    setSobrenome(userData ? userData.sobrenome : '');
    setDataNascimento(userData ? formatDateForDisplay(userData.dataNascimento) : '');
    setEmail(userData ? userData.email : '');
    setGenero(userData ? userData.genero : '');
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

  const formatDateForApi = (dateString) => {
    // Remover caracteres não numéricos
    const cleanedDate = dateString.replace(/[^0-9]/g, '');

    // Extrair dia, mês e ano
    const day = cleanedDate.substring(0, 2);
    const month = cleanedDate.substring(2, 4);
    const year = cleanedDate.substring(4, 8);

    // Formatando para o estilo yyyy-mm-dd
    return `${year}-${month}-${day}`;
  };

  const formatDateForDisplay = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={Style.container}>
      <Text style={Style.title}>Editar Usuário</Text>

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
        <Text style={Style.titleSelect}>{genero || 'Selecione o Gênero'}</Text>
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
        <TouchableOpacity onPress={handleSalvarEdicao} style={Style.button}>
          <Text style={Style.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRecomecar} style={Style.buttonRecomecar}>
          <Text style={Style.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserFormEdit;
