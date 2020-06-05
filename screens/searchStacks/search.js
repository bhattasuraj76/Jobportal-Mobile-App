import React, { useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { Picker } from "@react-native-community/picker";
import { ThemeContext } from "../../contexts/ThemeContext";
import ContainerFluid from "../../shared/containerFluid";
import { TouchableWithoutFeedback, ScrollView } from "react-native-gesture-handler";
import { DEFAULT_JOB_CATEGORIES, DEFAULT_JOB_TYPES, DEFAULT_JOB_LEVELS } from "../../utils/constants/Consts";
import AppBtn from "../../shared/appBtn";
import InputLevel from "../../shared/inputLevel";
import FormGroup from "../../shared/formGroup";
import SearchInput from "../../shared/searchInput";

function Search({navigation}) {
  //theme value
  const { isThemeDark} = useContext(ThemeContext);

  //state 
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null)
  const [level, setLevel] = useState(null);


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
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ marginVertical: 30, paddingHorizontal: 30 }}>
            {/* search by title  start*/}
            <FormGroup>
              <InputLevel>Job Title</InputLevel>
              <SearchInput
                placeholder="Search by job title"
                onChangeText={(value) => setTitle(value)}
              />
            </FormGroup>
            {/* search by title  end*/}

            {/* search by job category start*/}
            <FormGroup>
              <InputLevel>Category</InputLevel>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={category}
                  style={{
                    ...styles.picker,
                    ...(isThemeDark && { color: "#fff" }),
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setCategory(itemValue)
                  }
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
            </FormGroup>
            {/* search by job category end */}

            {/* search by job type start*/}
            <FormGroup>
              <InputLevel>Type</InputLevel>
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
            </FormGroup>
            {/* search by job type end */}

            {/* search by job position start*/}
            <FormGroup>
              <InputLevel>Level</InputLevel>
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
            </FormGroup>
            {/* search by job category end */}

            <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
              <AppBtn title="Search Jobs" onPress={searchJobs} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ContainerFluid>
  );
}



const styles = StyleSheet.create({
  pickerWrapper: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
  },
  picker: {
    height: 45,
    color: "#333",
  },
});
export default Search;
