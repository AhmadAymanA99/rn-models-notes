import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {
  createTable,
  getDBConnection,
  getModels,
  saveModelItems,
} from '../services/db-service';
import {ModalItem} from '../models';
import {
  HStack,
  Box,
  Text,
  Image,
  Input,
  HamburgerIcon,
  Pressable,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Images from '../components/Images';

function ModelsList(): JSX.Element {
  const [models, setModels] = useState<ModalItem[]>([]);
  const [modelsFiltered, setModelsFiltered] = useState<any>([]);
  const [Query, setQuery] = useState<string>('');

  const loadDataCallback = useCallback(async () => {
    try {
      const initModels = [
        {
          id: 1,
          name: 'Printer HS',
          code: 'Gt2000',
          type: 'Gt2000',
          cost: 1000,
          category: 'printer',
          image: 'printer',
        },
        {
          id: 2,
          name: 'LCD XS',
          code: 'Gt2001',
          type: 'Gt2001',
          cost: 1100,
          category: 'lcd',
          image: 'lcd',
        },
        {
          id: 3,
          name: 'Laptops',
          code: 'Gt2002',
          type: 'Gt2002',
          cost: 1200,
          category: 'laptop',
          image: 'laptop',
        },
        {
          id: 4,
          name: 'Printer Inc',
          code: 'Gt2003',
          type: 'Gt2003',
          cost: 200,
          category: 'inc',
          image: 'inc',
        },
      ];
      const db = await getDBConnection();
      await createTable(db);
      const storedItems = await getModels(db);
      if (storedItems.length) {
        setModels(storedItems);
      } else {
        await saveModelItems(db, initModels);
        setModels(initModels);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  useEffect(() => {
    if (Query) {
      const filtered = models.filter(model =>
        model?.name?.toLowerCase()?.includes(Query.toLowerCase()),
      );
      setModelsFiltered(filtered);
    } else setModelsFiltered(false);
  }, [Query]);

  const {navigate} = useNavigation();
  const ToModelDetail = id => {
    navigate('Details', {id});
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Input
          variant="rounded"
          placeholder="Type to Search..."
          size="2xl"
          margin={5}
          InputRightElement={<HamburgerIcon size={5} mr="5" />}
          value={Query}
          onChangeText={e => setQuery(e)}
        />
        <HStack justifyContent="center" flexWrap="wrap">
          {(modelsFiltered || models).map(model => (
            <Pressable
              key={model?.id}
              w="40%"
              m={2}
              marginBottom={5}
              onPress={() => ToModelDetail(model?.id)}>
              <Box
                alignItems="center"
                justifyContent="center"
                rounded="2xl"
                padding={5}
                shadow={3}
                bg="white">
                <Image
                  source={Images[model?.image]}
                  alt="image"
                  height="80px"
                />
              </Box>
              <Text textAlign="center">{model?.name}</Text>
            </Pressable>
          ))}
        </HStack>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default ModelsList;
