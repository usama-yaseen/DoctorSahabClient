import {
    View,
    SafeAreaView, Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Avatar, Input } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AppointmentScreen = () => {
    let arr = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    return (
        <SafeAreaView style={styles.container}>
            <Booking />
        </SafeAreaView >
    )
};

const Booking = () => {
    return (
        <TouchableOpacity
            onPress={() => alert("Open Gig")}
            style={{ elevation: 10, backgroundColor: 'white', borderRadius: 15, width: "95%", alignSelf: 'center', padding: 15, marginVertical: '2%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: "bold", alignSelf: 'flex-start'
                    }}>Dr. Thomas Anthony</Text>
                    <Text style={{
                        fontSize: 16,
                        color: 'grey', alignSelf: 'flex-start'
                    }}>Heart Surgeon</Text>
                </View>
                <Avatar
                    rounded
                    size={64}
                    source={require("../../assets/dp.png")}
                />
            </View>
            <View>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "bold", alignSelf: 'flex-start'
                }}>Next Appointment</Text>
                <Text style={{
                    fontSize: 14,
                    color: 'grey', alignSelf: 'flex-start'
                }}>Today</Text>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "bold", alignSelf: 'flex-start'
                    }}>Problem</Text>
                    <Text style={{
                        fontSize: 14,
                        color: 'grey', alignSelf: 'flex-start'
                    }}>Heart Issue</Text>
                </View>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        backgroundColor: "blue",
                    }}
                    onPress={() => alert("Take Appoitnments")}
                >
                    <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 16, color: 'white' }}>
                        Chat
                    </Text>
                </TouchableOpacity>
            </View>

        </TouchableOpacity>
    )
}
export const Appointments = ({ route }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Appointments"
                options={{
                    title: "Appointment",
                    headerStyle: {
                        borderBottomWidth: 0.55
                    },
                }} component={AppointmentScreen} />
        </Stack.Navigator>
    );
}
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 8,
    },
});
