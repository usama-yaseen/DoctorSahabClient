import * as React from "react";
import { useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome5";
import { Avatar, Input, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AppointmentDetailStyles,
  BookingStyles,
} from "../../Styles/PostLoginStyles/AppointmentStyles";
import { getAppointments } from "../firestore";
import { FlatList } from "react-native-gesture-handler";

const Stack = createStackNavigator();

const AppointmentScreen = ({ navigation, route }) => {
  let [AppointmentList, setAppointmentList] = React.useState([]);
  let [isLoading, setLoading] = React.useState(true);
  useEffect(() => {
    getAppointments(setAppointmentList, setLoading);
    route.params.setTabBarHeight(null);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="blue" />
        <Text style={{ fontSize: 28 }}>Checking Appointments</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        key={Math.random()}
        data={AppointmentList}
        style={{
          backgroundColor: "white",
        }}
        keyExtractor={(data, index) => index.toString()}
        renderItem={(x) => (
          <Booking
            data={x.item}
            setTabBarHeight={route.params.setTabBarHeight}
            navigation={navigation}
          />
        )}
      />
    </SafeAreaView>
  );
};

const Booking = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.setTabBarHeight(0);
        props.navigation.navigate("Appointment Details", {
          setTabBarHeight: props.setTabBarHeight,
        });
      }}
      style={BookingStyles.container}
    >
      <View style={BookingStyles.DrDetails}>
        <View>
          <Text style={BookingStyles.DrName}>{props.data.Doctor_Name}</Text>
          <Text style={BookingStyles.DrDesignation}>
            {props.data.Doctor_Designation}
          </Text>
        </View>
        <Avatar rounded size={64} source={require("../../assets/dp.png")} />
      </View>

      <View style={BookingStyles.Problem}>
        <View>
          <Text style={BookingStyles.ProblemHeading}>Problem</Text>
          <Text style={BookingStyles.ProblemText}>{props.data.Problem}</Text>
        </View>
        <TouchableOpacity
          style={BookingStyles.ChatButton}
          onPress={() => alert("Take Appoitnments")}
        >
          <Text style={BookingStyles.ChatButtonText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
export const Appointments = ({ route }) => {
  return (
    <Stack.Navigator initialRouteName="Appointments">
      <Stack.Screen
        name="Appointments"
        options={{
          headerTitleAlign: "center",
          title: "Appointment",
          headerStyle: {
            borderBottomWidth: 0.55,
          },
        }}
        initialParams={{ setTabBarHeight: route.params.setTabBarHeight }}
        component={AppointmentScreen}
      />
      <Stack.Screen
        name="Appointment Details"
        options={{
          headerTitleAlign: "center",
          title: "Details",
          headerStyle: {
            borderBottomWidth: 0.55,
          },
        }}
        initialParams={{ setTabBarHeight: route.params.setTabBarHeight }}
        component={Appointment_Details}
      />
    </Stack.Navigator>
  );
};
const Appointment_Details = ({ navigation, route }) => {
  navigation.setOptions({
    headerLeft: () => (
      <Icon
        name="chevron-left"
        type="feather"
        color={"#5D19FC"}
        size={32}
        onPress={() => {
          route.params.setTabBarHeight(null), navigation.goBack();
        }}
      />
    ),
  });

  React.useEffect(() => {
    route.params.setTabBarHeight(0);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={AppointmentDetailStyles.container}>
        <Avatar
          rounded
          style={{ width: "100%", aspectRatio: 1.75 / 1 }}
          source={require("../../assets/dp.png")}
        />
        <View style={AppointmentDetailStyles.DrDetails}>
          <View>
            <Text style={AppointmentDetailStyles.DrName}>
              Dr. Thomas Anthony
            </Text>
            <Text style={AppointmentDetailStyles.DrDesignation}>
              Heart Surgeon
            </Text>
          </View>

          <Icon
            name="direction"
            type="entypo"
            size={42}
            color={"blue"}
            onPress={() => openmaps()}
          />
        </View>

        <View style={AppointmentDetailStyles.Achievements_Container}>
          <View style={AppointmentDetailStyles.Achievements}>
            <Icon name="user" type="entypo" size={28} color="blue" />
            <Text>Patients</Text>
            <Text style={AppointmentDetailStyles.Achievement_Text}>900+</Text>
          </View>
          <View style={AppointmentDetailStyles.Achievements}>
            <Icon name="medal" type="font-awesome-5" size={28} color="blue" />
            <Text>Experience</Text>
            <Text style={AppointmentDetailStyles.Achievement_Text}> 10 Y+</Text>
          </View>
          <View style={AppointmentDetailStyles.Achievements}>
            <Icon name="star" type="feather" size={28} color="blue" />
            <Text>Rating</Text>
            <Text style={AppointmentDetailStyles.Achievement_Text}>
              Avg 4.5
            </Text>
          </View>
        </View>
        <View style={AppointmentDetailStyles.GigDescriptionContainer}>
          <Text style={AppointmentDetailStyles.Headings_Text}>Problem</Text>
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            It has survived not only five centuries.
          </Text>
        </View>
        <View style={AppointmentDetailStyles.GigDescriptionContainer}>
          <Text style={AppointmentDetailStyles.Headings_Text}>Desciption</Text>
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </Text>
        </View>

        <View style={AppointmentDetailStyles.GigDescriptionContainer}>
          <Text style={AppointmentDetailStyles.Headings_Text}>Gig Details</Text>
          <Text style={{ fontSize: 16, textAlign: "center" }}>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.{" "}
          </Text>
        </View>

        <View style={AppointmentDetailStyles.CostContainer}>
          <Text style={AppointmentDetailStyles.CostText}>Cost</Text>
          <Text style={AppointmentDetailStyles.CostPrice}>100$</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    backgroundColor: "white",
    padding: 8,
  },
});
