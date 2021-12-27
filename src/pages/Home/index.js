import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { colors, heightMobileUI } from "../../utils";
import { API_URL } from "../../data/DataApi";
import axios from "axios";
import { DefaultImageProfile, IconTime } from "../../assets";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  const [recommended, setRecommended] = useState([]);
  const [category, setCategory] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [categorySelected, setCategorySelected] = useState("resep-dessert");

  const getData = () => {
    axios
      .get(API_URL + "recipes-length/?limit=5")
      .then((res) => {
        const dataRecommended = res.data.results;
        setRecommended(dataRecommended);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(API_URL + "categorys/recipes")
      .then((res) => {
        const dataCategory = res.data.results;
        setCategory(dataCategory);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(API_URL + "categorys/recipes/" + categorySelected)
      .then((res) => {
        const dataRecipe = res.data.results;
        setRecipe(dataRecipe);
        // console.log(dataRecipe);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeCategory = (value) => {
    setCategorySelected(value);
    setRecipe([]);
    axios
      .get(API_URL + "categorys/recipes/" + categorySelected)
      .then((res) => {
        const dataRecipe = res.data.results;
        setRecipe(dataRecipe);
        // console.log(dataRecipe);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderName}>
            <Text style={styles.titleName}>Hello 👋</Text>
            <Text style={styles.textContent}>Mau masak apa hari ini?</Text>
          </View>
          <Image style={styles.userImage} source={DefaultImageProfile} />
        </View>

        <View style={styles.sectionContentRecommended}>
          <Text style={styles.sectionTitleContenRecommended}>
            Rekomendasi resep hari ini
          </Text>
          <FlatList
            data={recommended}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Detail", {
                      itemData: item.key,
                      data: item,
                    })
                  }
                  style={styles.containerCardRecommended}
                >
                  <Image
                    style={styles.imageCardRecommended}
                    source={{ uri: item.thumb }}
                  />
                  <View style={styles.wrapperContent}>
                    <Text style={styles.titleContent}>
                      {item.title.length > 32
                        ? item.title.substring(0, 32) + "..."
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
              );
            }}
          />
        </View>

        <View style={styles.sectionCategory}>
          <Text style={styles.sectionTitleCategory}>Pilih Sesuai Kategori</Text>
          <FlatList
            data={category}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <>
                  <TouchableOpacity
                    style={
                      categorySelected === item.key
                        ? styles.wrapperButtonCategory
                        : styles.wrapperButtonCategoryNotSelected
                    }
                    onPress={() => changeCategory(item.key)}
                  >
                    <Text style={styles.textCategory}>{item.category}</Text>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        </View>

        {/* List Data Recipe */}
        <View>
          {recipe.map((item, index) => {
            return (
              <View key={index} style={styles.containerCardRecipe}>
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
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  sectionHeader: {
    paddingTop: 30,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeaderName: {},
  titleName: {
    color: colors.colorPrimary,
    fontSize: RFValue(24, heightMobileUI),
    fontWeight: "bold",
  },
  textContent: {
    color: colors.grey,
    fontSize: RFValue(20, heightMobileUI),
    marginTop: 5,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  sectionContentRecommended: {
    paddingTop: 40,
  },
  sectionTitleContenRecommended: {
    paddingHorizontal: 30,
    color: colors.colorPrimary,
    fontSize: RFValue(24, heightMobileUI),
    fontWeight: "bold",
  },
  containerCardRecommended: {
    marginTop: 15,
    marginLeft: 30,
    overflow: "hidden",
    width: 270,
    borderRadius: 8,
  },
  imageCardRecommended: {
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
  sectionCategory: {
    paddingTop: 40,
  },
  sectionTitleCategory: {
    paddingHorizontal: 30,
    color: colors.colorPrimary,
    fontSize: RFValue(24, heightMobileUI),
    fontWeight: "bold",
  },
  wrapperButtonCategory: {
    marginLeft: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.colorSecondary,
    borderRadius: 8,
    marginTop: 15,
  },
  wrapperButtonCategoryNotSelected: {
    marginLeft: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.whiteGrey,
    borderRadius: 8,
    marginTop: 15,
  },
  textCategory: {
    color: colors.colorPrimary,
  },
  containerCardRecipe: {
    paddingHorizontal: 30,
    marginTop: 15,
    // backgroundColor: "grey",
  },
  cardRecipe: {
    overflow: "hidden",
    borderRadius: 8,
  },
  imageCardRecipe: {
    width: "100%",
    height: 200,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
