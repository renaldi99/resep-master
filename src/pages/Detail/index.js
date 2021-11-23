import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { API_URL } from "../../data/DataApi";
import { colors, heightMobileUI, responsiveHeight } from "../../utils";
import { IconBowl, IconLeft, IconLevel, IconTimeBig } from "../../assets";
import { RFValue } from "react-native-responsive-fontsize";
import { Jarak } from "../../components";

const Detail = ({ navigation, route }) => {
  const { itemData, data } = route.params;
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [author, setAuthor] = useState([]);
  const [step, setStep] = useState([]);

  console.log("Ini dia", data);

  const getDataItem = () => {
    axios
      .get(API_URL + `recipe/${itemData}`)
      .then((res) => {
        const dataItem = res.data.results;
        setRecipeDetail(dataItem);
        setRecipeIngredients(dataItem.ingredient);
        setAuthor(dataItem.author);
        setStep(dataItem.step);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDataItem();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View>
        <Image
          style={styles.sectionDetailImage}
          source={
            recipeDetail.thumb
              ? { uri: recipeDetail.thumb }
              : { uri: data.thumb }
          }
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.buttonTopBack}
      >
        <IconLeft />
      </TouchableOpacity>

      <View style={styles.sectionDetailContent}>
        <Text style={styles.titleDetailRecipe}>{recipeDetail.title}</Text>
        <Text style={styles.textRecipeAuthor}>
          Resep dibuat oleh {author.user}
        </Text>
        <View style={styles.wrapperInfoBox}>
          <View style={styles.boxTimeEstimated}>
            <IconTimeBig />
            <Text style={styles.textInfoEstimated}>{recipeDetail.times}</Text>
          </View>

          <View style={styles.boxLevelDifficulty}>
            <IconLevel />
            <Text style={styles.textLevelDifficulty}>
              {recipeDetail.dificulty}
            </Text>
          </View>

          <View style={styles.boxServing}>
            <IconBowl />
            <Text style={styles.textServing}>{recipeDetail.servings}</Text>
          </View>
        </View>

        <View style={styles.sectionIngredients}>
          <Text style={styles.titleTextIngredients}>
            Bahan yang diperlukan 📌
          </Text>
          {recipeIngredients.map((item, index) => {
            return (
              <View key={index} style={styles.sectionContentIngredients}>
                <View style={styles.boxNumber}>
                  <Text style={styles.numberIngredients}>{index + 1}.</Text>
                </View>
                <Text style={styles.textIngredients}>{item}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.line} />

        <View style={styles.sectionStep}>
          <Text style={styles.titleTextStep}>Langkah - langkah memasak 👨🏻‍🍳</Text>
          {step.map((item, index) => {
            return (
              <View key={index} style={styles.sectionContentStep}>
                <View style={styles.boxNumberStep}>
                  <Text style={styles.numberStep}>{index + 1}.</Text>
                </View>
                <Text style={styles.textStep}>{item.slice(1).trim()}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  sectionDetailImage: {
    height: responsiveHeight(400),
  },
  sectionDetailContent: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: -30,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  titleDetailRecipe: {
    color: colors.colorPrimary,
    fontSize: RFValue(20, heightMobileUI),
    fontWeight: "bold",
  },
  textRecipeAuthor: {
    color: colors.colorPrimary,
    fontSize: RFValue(18, heightMobileUI),
    marginTop: 12,
  },
  wrapperInfoBox: {
    flexDirection: "row",
    paddingVertical: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  boxTimeEstimated: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    backgroundColor: colors.secondGreen,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  textInfoEstimated: {
    color: colors.green,
    marginTop: 10,
  },
  boxLevelDifficulty: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    backgroundColor: colors.secondOrange,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  textLevelDifficulty: {
    color: colors.orange,
    marginTop: 10,
  },
  boxServing: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    backgroundColor: colors.secondPurple,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  textServing: {
    color: colors.purple,
    marginTop: 10,
  },
  buttonTopBack: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sectionIngredients: {
    paddingBottom: 18,
    paddingRight: 30,
  },
  titleTextIngredients: {
    color: colors.colorPrimary,
    fontSize: RFValue(20, heightMobileUI),
    marginBottom: 10,
  },
  sectionContentIngredients: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  boxNumber: {
    backgroundColor: colors.green,
    height: 30,
    width: 30,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  numberIngredients: {
    color: colors.white,
    fontSize: RFValue(18, heightMobileUI),
  },
  textIngredients: {
    color: colors.colorPrimary,
    fontSize: RFValue(18, heightMobileUI),
    marginLeft: 8,
  },
  line: {
    borderWidth: 0.2,
    borderColor: colors.colorPrimary,
    marginBottom: 18,
  },
  sectionStep: {},
  titleTextStep: {
    color: colors.colorPrimary,
    fontSize: RFValue(20, heightMobileUI),
    marginBottom: 10,
  },
  sectionContentStep: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  boxNumberStep: {
    backgroundColor: colors.purple,
    height: 30,
    width: 30,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  numberStep: {
    color: colors.white,
    fontSize: RFValue(18, heightMobileUI),
  },
  textStep: {
    color: colors.colorPrimary,
    fontSize: RFValue(18, heightMobileUI),
    marginLeft: 8,
  },
});
