import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {VStack, Button, HamburgerIcon, ChevronRightIcon} from 'native-base';
import {useNavigation} from '@react-navigation/native';

function Home(): JSX.Element {
  const btnProps = {
    bg: 'gray.200',
    _text: {
      color: 'black',
      paddingX: 3,
      minWidth: 200,
      fontWeight: 'bold',
    },
    _pressed: {bg: 'gray.100'},
    _icon: {color: 'black'},
    size: 'lg',
    rounded: 'full',
    shadow: 3,
    endIcon: <ChevronRightIcon />,
    leftIcon: <HamburgerIcon />,
  };

  const {navigate} = useNavigation();
  const ToModelList = () => {
    navigate('Model');
  };

  return (
    <SafeAreaView style={styles.container}>
      <VStack space={6} alignItems="center" marginTop={10}>
        <Button {...btnProps}>Asset Inventory</Button>
        <Button {...btnProps} onPress={ToModelList}>
          Model
        </Button>
        <Button {...btnProps}>Person</Button>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default Home;
