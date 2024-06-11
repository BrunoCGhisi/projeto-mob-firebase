import { Text, View, TouchableOpacity, TextInput, StyleSheet,} from "react-native";
import { database }                         from "../config/firebaseconfig";
import {collection, collection, addDoc }    from '../config/firebaseconfig';
import React, {useState, useEffect}         from "react";


export default function NewTask({navigation}){

    const [newTask, setNewTask] = useState(null)

    function addNewTask(){
        const taskDocRef = collection(database, "Task");
        addDoc(taskDocRef,{
            description: newTask,
            status: false
        })
        navigation.navigate('Task')
    }
    return(
        <View style={StyleSheet.container}> 
            <Text style={styles.txtDescription}> New Task </Text>
            <TextInput 
                style={styles.input}
                placeholder="ex Estudar"
                value={newTask}
                onChangeText={setNewTask}
            />
            <TouchableOpacity 
            style={styles.btnSave}
            onPress={()=> {addNewTask()}}
            >
                <Text style={styles.txtBtnSave}> Save </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#DAD7CD'
    },
    btnNewTask:{
        backgroundColor:'#344e41',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        height:60,
        width:60,
        position: 'absolute',
        bottom:20,
        left:'4%'
    },
    txtTask:{
        textAlign: 'center',
        color:'#344E41',
        fontWeight: 'bold',
        fontSize:25,
    },
    txtbtnNewTask:{
        fontSize:25,
        fontWeight: 'bold'
    },
    task: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F29559'
    },

    txtDescription: {
        width: '80%',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    btnDelete:{
        textAlign: 'center',
        color: '#344E41',
        fontWeight
    }
})
