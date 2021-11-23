import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import { API_URL } from "../../data/DataApi";
import { colors, heightMobileUI } from "../../utils";
import { IconTime } from "../../assets";
import { SafeAreaView } from "react-native-safe-area-context";

const ListRecipe = ({ navigation }) => {
  const [recipe, setRecipe] = useState([]);

  console.log(recipe);

  const getList = () => {
    axios
      .get(API_URL + "recipes")
      .then((res) => {
        const dataList = res.data.results;
        setRecipe(dataList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sectionListRecipe}>
        <Text style={styles.textTitleList}>
          Daftar resep popular untuk kamu 👩‍🍳
        </Text>

        <FlatList
          data={recipe}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.containerList}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Detail", {
                      itemData: item.key,
                      data: item,
                    })
                  }
                  style={styles.cardRecipe}
                >
                  <Image
                    style={styles.imageCardRecipe}
                    source={{ uri: item.thumb }}
                  />

                  <View style={styles.wrapperContent}>
                    <Text style={styles.titleContent}>
                      {item.title.length > 45
                        ? item.title.substring(0, 45) + "..."
                        : item.title}
                    </Text>

                    <View style={styles.wrapperContentDetail}>
                      <Text style={styles.dificultyLevel}>
                        {item.dificulty}
                      </Text>
                      <View style={styles.wrapperEstimatedTime}>
                        <IconTime />
                        <Text style={styles.estimatedTime}>{item.times}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  sectionListRecipe: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  textTitleList: {
    color: colors.colorPrimary,
    fontSize: RFValue(20, heightMobileUI),
    fontWeight: "bold",
    marginBottom: 30,
  },
  containerList: {
    marginTop: 15,
  },
  cardRecipe: {
    borderRadius: 8,
    overflow: "hidden",
  },
  imageCardRecipe: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  wrapperContent: {
    paddingVertical: 10,
  },
  titleContent: {
    color: colors.colorPrimary,
    fontSize: RFValue(20, heightMobileUI),
  },
  wrapperContentDetail: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dificultyLevel: {
    color: colors.orange,
    fontSize: RFValue(18, heightMobileUI),
  },
  wrapperEstimatedTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  estimatedTime: {
    marginLeft: 8,
    color: colors.green,
    fontSize: RFValue(18, heightMobileUI),
  },
});
