import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ChevronDownIcon, ChevronUpIcon} from 'native-base';

type AccordionItemPros = PropsWithChildren<{
  title: string;
}>;

function AccordionItem({children, title}: AccordionItemPros): JSX.Element {
  const [expanded, setExpanded] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{children}</View>;

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <Text style={styles.accordTitle}>{title}</Text>
        {expanded ? (
          <ChevronUpIcon size={5} color="#bbb" />
        ) : (
          <ChevronDownIcon size={5} color="#bbb" />
        )}
      </TouchableOpacity>
      {expanded && body}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accordContainer: {
    paddingVertical: 4,
  },
  accordHeader: {
    padding: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accordTitle: {
    marginHorizontal: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  accordBody: {
    marginHorizontal: 5,
    padding: 12,
  },
});

export default AccordionItem;
