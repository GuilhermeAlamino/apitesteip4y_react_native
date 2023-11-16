import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen() {

  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('UserIndex');
  }

  return (
    <View style={Styles.container}>
      <Onboarding onDone={handleDone} onSkip={handleDone} nextLabel={'Próximo'} skipLabel={''} containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: '#000',
            image: <Image source={require('../../../assets/img/logo.png')} style={{ width: 250, height: 40 }} />,
            title: 'Bem-vindo',
            subtitle: '',
          },
          {
            backgroundColor: '#000',
            image: <Image source={require('../../../assets/img/Account1.gif')} style={{ width: 400, height: 350 }} />,
            title: 'Vamos lá',
            subtitle: '',
          },
        ]}
      />
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  doneButton: {
    padding: 20,
    backgroundColor: 'white'
  }
})