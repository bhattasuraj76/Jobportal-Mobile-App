import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, Modal } from "react-native";
import Colors from './utils/contants/Colors'

export default MoreOptions = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
        <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.contentView}
        >
          <View style={styles.content}>
            *<Text style={styles.contentTitle}>Hi 👋!</Text>
            <Text>Hello from Overlay!</Text>
          </View>
        </Modal>
  );
}
const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
	buttonStyle: {
    height: 90,
    width: 90,
    backgroundColor: Colors.tabBarBorderDefault,
    borderRadius: 100
  }
});