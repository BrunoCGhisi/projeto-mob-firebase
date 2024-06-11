import { Text, View, TouchableOpacity } from "react-native";

export default function Details({navigation}){
    return(
        <View> 
            <TouchableOpacity onPress={() => navigation.navigate("NewTask")}> 
                <Text>NewTask</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Task")}> 
                <Text>Task</Text>
            </TouchableOpacity>
        </View>
    )
}