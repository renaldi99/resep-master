import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  IconHome,
  IconHomeActive,
  IconList,
  IconListActive,
  IconProfile,
  IconProfileActive,
  IconSearch,
  IconSearchActive,
} from "../../assets";
import { colors } from "../../utils";

const TabItem = ({ onPress, onLongPress, label, isFocused }) => {
  const Icon = () => {
    if (label === "Home") {
      return isFocused ? <IconHomeActive /> : <IconHome />;
    }
    if (label === "Search") {
      return isFocused ? <IconSearchActive /> : <IconSearch />;
    }
    if (label === "ListRecipe") {
      return isFocused ? <IconListActive /> : <IconList />;
    }
    if (label === "Profile") {
      return isFocused ? <IconProfileActive /> : <IconProfile />;
    }

    return null;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}
    >
      <Icon />
      <Text style={styles.textTab(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  textTab: (isFocused) => ({
    color: isFocused ? colors.colorPrimary : "#4F5E84",
    marginTop: 4,
  }),
});
