import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Dialog,
  Portal,
  RadioButton,
  Provider as PaperProvider,
} from "react-native-paper";
import { View, Text, Row } from "native-base";

const NotificationDialoge = ({
  visibleDialoge,
  setVisibleDailoge,
  onNotifyValueChange,
}) => {
  useEffect(() => {
    setVisible(visibleDialoge);
  }, [visibleDialoge]);
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(5);
  const hideDialog = () => setVisibleDailoge();
  const onValueChange = (value) => {
    setSelectedValue(value);
    onNotifyValueChange(value);
    hideDialog();
  };
  return (
    <PaperProvider>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Choose an option</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={onValueChange}
              value={selectedValue}
            >
              <View style={styles.radioButtonContainer}>
                <RadioButton value={3} />
                <Text>3 minutes before</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton value={5} />
                <Text>5 minutes before</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton value={8} />
                <Text>8 minutes before</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton value={10} />
                <Text>10 minutes before</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton value={1} />
                <Text>Never</Text>
              </View>
            </RadioButton.Group>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default NotificationDialoge;
