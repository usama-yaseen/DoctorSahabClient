import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import { Image, Avatar, Input, Icon } from "react-native-elements";
import { SignOut } from "../firestore";
import {EditProfileScreen} from "./EditProfile"
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const Profile = ({ route, navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile Screen"
        initialParams={{
          MyDetails: route.params.MyDetails,
        }}
        options={{
          title: "Profile",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                SignOut();
                navigation.replace("Login");
              }}
            >
              <Icon
                name="logout"
                type="material-community"
                style={{ marginRight: "5%" }}
                size={32}
                color={"blue"}
              />
            </TouchableOpacity>
          ),
        }}
        component={ProfileScreem}
      />
      <Stack.Screen
        name="EditProfile"
        initialParams={{
          MyDetails: route.params.MyDetails,
        }}
        options={{
          title: "Edit ",
        }}
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
};

const ProfileScreem = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "2%",
        }}
      >
        <Avatar
          rounded
          style={{ width: "90%", aspectRatio: 1.75 / 1 }}
          source={require("../../assets/dp.png")}
        />

        <Text style={styles.profilename}>Dr. {route.params.MyDetails.displayName}</Text>
        <View style={styles.holder}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('EditProfile')}>

            <Text style={styles.btntext}>Edit Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => alert("Pressed Help")}>
            <Text style={styles.btntext}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ height: 50, width: '100%', justifyContent: "center" }}
            onPress={() => alert("Pressed About")}>
            <Text style={styles.btntext}>About</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* </ImageBackground> */}
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  profilename: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 30,
    marginTop: 10
  },
  holder: {
    backgroundColor: "#f8f8f8",
    borderWidth: 0.9,
    borderRadius: 15,
    borderColor: "#cfcfcf",
    marginHorizontal: 20,
    marginVertical: "20%",
    width: '90%'
  },
  btn: {
    height: 50,
    width: '100%',
    borderBottomWidth: 0.9,
    justifyContent: "center",
    borderColor: "#cfcfcf",
  },
  btntext: {
    fontSize: 18,
    textAlign: 'center'
  }
});
