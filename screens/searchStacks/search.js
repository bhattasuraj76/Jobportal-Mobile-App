import React, { useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { Picker } from "@react-native-community/picker";
import { ThemeContext } from "../../contexts/ThemeContext";
import Container from "../../shared/container";
import { globalStyles } from "../../styles/globalStyles";
import AppText from "../../shared/appText";
import ContainerFluid from "../../shared/containerFluid";
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { DEFAULT_JOB_CATEGORIES, DEFAULT_JOB_TYPES, DEFAULT_JOB_LEVELS } from "../../utils/constants/Consts";
import AppBtn from "../../shared/appBtn";

function Search({navigation}) {
  const { isThemeDark} = useContext(ThemeContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");

  
  useFocusEffect(
    React.useCallback(() => {
      console.log("focused");
    })
  );

  const searchJobs = () => {
    navigation.navigate("HomeTab", {
      screen: "Home",
      params: {
          title,
          category,
          level,
          type
      },
    });
  }

  return (
    <ContainerFluid>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ marginTop: 30, paddingHorizontal: 30 }}>
          {/* search by title  */}

          <View style={styles.formGroup}>
            <InputLevel title="Job Title" />
            <TextInput
              style={{ ...styles.input, ...(isThemeDark && { color: "#fff" }) }}
              placeholder="Search by job title"
              onChangeText={(value) => setTitle(value)}
            />
          </View>

          {/* search by title  */}

          {/* search by job category start*/}
          <View style={styles.formGroup}>
            <InputLevel title="Category" />

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={category}
                style={{
                  ...styles.picker,
                  ...(isThemeDark && { color: "#fff" }),
                }}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                mode="dropdown"
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Choose Category" value="" />
                {DEFAULT_JOB_CATEGORIES.map((item, index) => {
                  return (
                    <Picker.Item
                      label={item.title}
                      value={item.value}
                      key={index}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
          {/* search by job category end */}

          {/* search by job type start*/}
          <View style={styles.formGroup}>
            <InputLevel title="Type" />
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={type}
                style={{
                  ...styles.picker,
                  ...(isThemeDark && { color: "#fff" }),
                }}
                onValueChange={(itemValue, itemIndex) => setType(itemValue)}
                mode="dropdown"
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Choose Type" value="" />
                {DEFAULT_JOB_TYPES.map((item, index) => {
                  return (
                    <Picker.Item
                      label={item.title}
                      value={item.value}
                      key={index}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
          {/* search by job type end */}

          {/* search by job position start*/}
          <View style={styles.formGroup}>
            <InputLevel title="Level" />
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={level}
                style={{
                  ...styles.picker,
                  ...(isThemeDark && { color: "#fff" }),
                }}
                onValueChange={(itemValue, itemIndex) => setLevel(itemValue)}
                mode="dropdown"
              >
                <Picker.Item label="Choose Level" value="" />

                {DEFAULT_JOB_LEVELS.map((item, index) => {
                  return (
                    <Picker.Item
                      label={item.title}
                      value={item.value}
                      key={index}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
          {/* search by job category end */}

          <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
            <AppBtn title="Search Jobs" onPress={searchJobs} />
          </View>

          {/* <View style={formGroupStyle}>
          {label}
          <View style={specialPickerWrapperStyle}>
            {" "}
            <Picker
              accessibilityLabel={locals.label}
              ref="input"
              style={selectStyle}
              selectedValue={locals.value}
              onValueChange={locals.onChange}
              help={locals.help}
              enabled={locals.enabled}
              mode={locals.mode}
              prompt={locals.prompt}
              itemStyle={locals.itemStyle}
            >
              {options}
            </Picker>
          </View>
        </View> */}
        </View>
      </TouchableWithoutFeedback>
    </ContainerFluid>
  );
}

function InputLevel({title}){
  const {isThemeDark} = useContext(ThemeContext);
  return <Text style={{...styles.level, ...(isThemeDark && {color: '#fff'}) }}>{title}</Text>
}

const styles = StyleSheet.create({
  level: {
    fontSize: 18,
    fontFamily: "open-sans-regular",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    fontSize: 18,
    color: "#333",
  },
  pickerWrapper: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
  },
  picker: {
    height: 45,
    color: '#333'
  },
  formGroup: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
export default Search;
