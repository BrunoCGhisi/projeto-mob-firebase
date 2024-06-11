import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import React, {useState,useEffect} from "react";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import {database} from "../config/firebaseconfig";

export default function Task({navigation}){

    //lista
    const [task ,setTask] = useState([])

    useEffect(() => {
        const taskCollection = collection(database, "Tasks")
        const listen = onSnapshot(taskCollection, (query) => {
            const list = []
            query.forEach((doc)=>{
                list.push({...doc.data(), id: doc.id})
            })
            setTask(list)
        })
        return () => listen()
    }, [])

    function deleteTask(id){
        const taskDocRef = doc(database, "Tasks", id);
        deleteDoc(taskDocRef)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.txtTask}>Tarefas</Text>
            <FlatList
                data={task}
                renderItem={({item}) => {
                    return(
                        <View style={styles.task}>
                            <Text style={styles.txtDescription}>
                                onPress={() => {
                                    navigation.navigate("Details", {
                                        id:item.id,
                                        description:item.description
                                    })
                                }}
                                {item.description}
                            </Text>
                            <TouchableOpacity
                            style={styles.btnDelete}
                            onPress={()=> deleteTask(item.id)}
                            >
                                <AntDesign name="delete" size={24}
                                color="#344E41" />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />

            <TouchableOpacity style={styles.btnNewTask}onPress={()=> navigation.navigate("NewTask")}>
                <Text style={styles.txtbtnNewTask}> + </Text>
            </TouchableOpacity>
        </View>
    )
};

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
