import React, {useState} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {database, doc, } from "../config/firebaseconfig";
import {collection, addDoc, updateDoc } from "firebase/firestore";

export default function Details ({navigation, route}){

    const [descriptionEdit, setDescriptionEdit] = useState(route.params.description)
    const idTask = route.params.id

    function editTask (description, id){
        const taskDocRef = doc(database, "Tasks", id);
        updateDoc(taskDocRef, {
            description: descriptionEdit,
        })
        navigation.navigate('Task')
    }

    return(
        <View style={styles.container}>
            <Text style={styles.txtdescription}> Description </Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: estudar"
                onChangeText= {setDescriptionEdit}
                value={descriptionEdit}
            />
            <TouchableOpacity 
            style={styles.btnsave}
            onPress={()=> {editTask(descriptionEdit, idTask)}}>
                <Text style={styles.txtbtnsave}> Save </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#EFF1ED',
    },
    txtdescription: {
        width: '90%',
        marginTop: 20,
        marginLeft: 20,
        fontSize: 16,
        color: '#373D20'
    },
    input:{
        width: '90%',
        marginTop: 10,
        padding: 10, 
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#373D20',
        margin: 'auto'
    },
    btnsave:{
        width: '60%',
        backgroundColor: '#373D20',
        justifyContent: 'center',
        alignItems:'center',
        position:'absolute',
        height: 50,
        bottom: '5%',
        left: '20%',
        borderRadius: 20,
    },
    txtbtnsave:{
        color: '#EFF1ED',
        fontSize: 25,
        fontWeight: 'bold',
    }
})