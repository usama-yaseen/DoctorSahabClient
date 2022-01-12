import { React, useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Button,
} from "react-native";

export const EditProfileScreen = ({ navigation }) => {
    const [Name, setName] = useState("");
    const [Phone, setPhone] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputcontainer}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.textheading}>Name</Text>
                    <TextInput
                        style={styles.textinput}
                        value={Name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.styleBottom}></View>
            </View>

            <View style={styles.inputcontainer}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.textheading}>Phone #</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={setPhone}
                        value={Phone}
                    />
                </View>
            </View>
            <TouchableOpacity style={{
                width: '25%', padding: 10,
                backgroundColor: '#226597', borderRadius: 20
            }} onPress={() => alert("Your Data will be Saved")} >
                <Text style={{ color: 'white', fontSize: 18,textAlign:'center' }}>Save</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadBtnContainer: {
        opacity: 0.7,
        position: "absolute",
        right: 0,
        bottom: 0,
        backgroundColor: "lightgrey",
        width: "100%",
        height: "25%",
    },
    uploadBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    textheading: {
        paddingTop: 10,
        height: 40,
        width: "30%",
    },
    textinput: {
        marginLeft: 6,
        padding: 10,
        width: "70%",
        height: 40,
    },
    inputcontainer: {
        backgroundColor: "#f8f8f8",
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    styleBottom: {
        backgroundColor: "#EBEBEB",
        width: "100%",
        height: 2,
    },
});