import React, {useState, useEffect} from "react";
import {SafeAreaView, Text, View, TouchableOpacity,FlatList, StyleSheet} from 'react-native';
import {database, doc, deleteDoc, auth} from "../config/firebaseconfig";
import { collection, onSnapshot, query,where} from 'firebase/firestore';
import AntDesign from '@expo/vector-icons/AntDesign';
import { signOut } from "firebase/auth";


export default function Task ({navigation}){
    // um array com o useState para receber do use effect nossas tarefas
    const [task, setTask] = useState([])
    //conectando nosso app com o banco; 
    //tasksCollection é a variável que está conectando com o banco Tasks.
    //O onSnapshot é usado para escutar mudanças em tempo real na coleção "Tasks";

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            console.error('nenhum user logado');
            return;
        }

        const tasksCollection = collection(database, "Tasks");
        const q = query(tasksCollection, where("idUser", "==", user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });
            });
            setTask(list);
        });

        return () => unsubscribe();
    }, [])

    function deleteTast(id){
        
        //database.collection("Tasks").doc(id).deleteDoc()
        const taskDocRef = doc(database, "Tasks", id);
        deleteDoc(taskDocRef)
        
    }
    const logout = async () => {
        try {
            await signOut(auth);
            navigation.replace("Login"); // ureplace para que o usuário não possa voltar para a tela de tarefas com o botão de voltar
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    return(
        <SafeAreaView style={styles.container}>
          <FlatList
          showsVerticalScrollIndicator={false}
          data={task}
          renderItem={({item} )=>{
            return(
            <View style={styles.tasks}>
                <TouchableOpacity
                    style={styles.btnDeleteTask}
                    onPress={()=>{
                        deleteTast(item.id)
                    }}>
                    <AntDesign name="delete" size={24} color="#373D20" />
                </TouchableOpacity>
                <Text
                style={styles.txtdescription}
                onPress={()=> {
                    navigation.navigate("Details",{
                        id:item.id,
                        description:item.description
                    })
                }}>
                    {item.description}
                </Text>
            </View>
            )
        }}
        />

          <TouchableOpacity style={styles.btnNewTask}>
            <Text 
            style={styles.iconBtn}
            onPress={()=> navigation.navigate("NewTask")}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogout} onPress={logout}>
                <Text style={styles.txtbtnLogout}>Logout</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#EFF1ED',
        paddingTop: 20,
    },
    btnNewTask:
    {
        backgroundColor: '#373D20',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: 60,
        width: 60,
        bottom: 30,
        left: 20,
        borderRadius: 20,
        
    },
    iconBtn:
    {
        color: '#EFF1ED',
        fontSize: 25,
        fontWeight: 'bold',
    },
    tasks: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    btnDeleteTask: {
        justifyContent: 'center',
        paddingLeft: 15,

    },
    txtdescription:{
        width: '80%',
        alignContent: 'flex-start',
        backgroundColor: '#bcbd8b',
        padding: 12,
        paddingHorizontal: 20,
        marginBottom: 5,
        marginRight: 15,
        color: '#766153',
    },
    btnLogout: {
        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: 50,
        width: '60%',
        bottom: 30,
        right: 20,
        borderRadius: 20,
    },
    txtbtnLogout: {
        color: '#EFF1ED',
        fontSize: 18,
        fontWeight: 'bold',
    },
        

})