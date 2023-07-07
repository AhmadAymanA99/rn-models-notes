import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Divider,
  ScrollView,
  Input,
  CheckCircleIcon,
  Pressable,
} from 'native-base';
import {useRoute} from '@react-navigation/native';
import AccordionItem from '../components/AccordionItem';
import {
  getDBConnection,
  getNotes,
  getOneModel,
  saveNoteItems,
} from '../services/db-service';
import {ModalItem, NoteItem} from '../models';
import Images from '../components/Images';

function Details(): JSX.Element {
  const {params} = useRoute();
  const {id} = params;
  const [modelInfo, setModelInfo] = useState<ModalItem>();
  const [Notes, setNotes] = useState<NoteItem[]>([]);
  const [Query, setQuery] = useState<string>('');

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const storedItems = await getOneModel(db, id);
      if (storedItems.length) {
        setModelInfo(storedItems[0]);
      }
      const storedNotes = await getNotes(db, id);
      if (storedNotes.length) {
        setNotes(storedNotes);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const saveNote = async () => {
    if (Query) {
      try {
        const obj: NoteItem = {
          model_id: id,
          details: Query,
          by: 'Jennifer Smith',
          date: new Date().toString(),
          type: 'new',
        };

        Notes?.push(obj);
        const db = await getDBConnection();
        await saveNoteItems(db, obj);
        setQuery('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        marginX={3}
        marginY={6}
        paddingTop={5}
        rounded="2xl"
        minHeight="94%"
        bg="gray.200">
        <Box>
          <Box
            alignSelf="center"
            rounded="2xl"
            padding={3}
            shadow={3}
            width="55%"
            bg="white">
            {modelInfo?.image && (
              <Image
                source={Images[modelInfo?.image]}
                alt="image"
                height={120}
              />
            )}
          </Box>
          <Divider mt={6} width="90%" alignSelf="center" />
          <AccordionItem title="Image Info">
            <VStack justifyContent="center" space={3}>
              <HStack justifyContent="space-between">
                <Text style={styles.label}>Model</Text>
                <Text style={styles.textSmall}>{modelInfo?.code}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text style={styles.label}>Model Name</Text>
                <Text style={styles.textSmall}>{modelInfo?.name}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text style={styles.label}>Model Type</Text>
                <Text style={styles.textSmall}>{modelInfo?.type}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text style={styles.label}>Cost</Text>
                <Text style={styles.textSmall}>{modelInfo?.cost}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text style={styles.label}>Category</Text>
                <Text style={styles.textSmall}>{modelInfo?.category}</Text>
              </HStack>
              <HStack justifyContent="space-between">
                <Text style={styles.label}>Additional Description</Text>
                <Text style={styles.textSmall}>{modelInfo?.desc}</Text>
              </HStack>
            </VStack>
          </AccordionItem>

          <Divider width="90%" alignSelf="center" />
          <AccordionItem title="Notes">
            <Pressable style={styles.save} onPress={saveNote}>
              <CheckCircleIcon mx={2} />
              <Text style={styles.smLabel}>Save</Text>
            </Pressable>
            <Input
              variant="rounded"
              placeholder="Add a Note..."
              size="2xl"
              bg="white"
              shadow={3}
              value={Query}
              onChangeText={e => setQuery(e)}
              _focus={{shadow: 0, bg: 'gray.100'}}
            />

            {Notes?.length > 0 && (
              <Box paddingBottom={50}>
                <Text style={styles.label} marginTop={4} margin={1}>
                  History Notes
                </Text>
                <Box rounded="2xl" bg="white" shadow={3}>
                  <VStack
                    justifyContent="center"
                    divider={<Divider width="90%" alignSelf="center" />}>
                    {Notes?.map((note, index) => (
                      <Box key={index} margin={4}>
                        <Text>{note?.by}</Text>
                        <Text fontSize={9}>{note?.date}</Text>
                        <Text style={styles.label}>{note?.details}</Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              </Box>
            )}
          </AccordionItem>
          <Divider width="90%" alignSelf="center" />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textSmall: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  label: {
    fontSize: 16,
    fontWeight: '300',
    color: '#666',
  },
  smLabel: {
    fontSize: 14,
    fontWeight: '300',
    color: '#333',
  },
  save: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 2,
    alignItems: 'center',
  },
});

export default Details;
