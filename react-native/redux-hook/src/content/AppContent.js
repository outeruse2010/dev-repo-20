import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { View, Text, StyleSheet, FlatList } from 'react-native';//, TextInput
import { Card, Title, Paragraph, Avatar,IconButton, TextInput } from 'react-native-paper';
import { getUserAction } from './api/action/Action';

import { Icon } from 'react-native-elements'


const AppContent = () =>{

    const [searchInput, setSearchInput] = useState('');
    const [contacts, setContacts] = useState([]);
    const [inMemoryContacts, setInMemoryContacts] = useState([]);

    const dispatch = useDispatch();
    useEffect(()=>{
        getUserAction(dispatch);
    },[]);

    const userReducer = useSelector((state)=>{
        return {...state.userReducer}
    });
    let users = userReducer.data;
    let len = users ? users.length : 0;

    useEffect(()=>{
        setContacts(users);
        setInMemoryContacts(users);
    },[users]);
    
    const searchContact = (value) => {
        setSearchInput(value);      
          const filteredContacts = inMemoryContacts.filter(
                u=>{
                    return u.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
                }
            );        
            setContacts(filteredContacts);  
    };

    return (   
        <View>
            {/* <TextInput placeholder='search..' style={styles.text_input_style}
            onChangeText={value => searchContact(value)}
            /> */}
            <TextInput label='search..' style={styles.text_input_style}
            onChangeText={value => searchContact(value)} 
            value={searchInput}/>

           <FlatList data={contacts} keyExtractor={u=>''+u.id}
           renderItem={u=>eachUser(u)}
           ListEmptyComponent={()=>(<View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50
          }}><Text style={{ color: '#bad555' }}>No Contact Found</Text></View>)} />
        </View>          
    );

};

const eachUser = ({item, index}) =>{
    //console.log('***u: ',item.name)
    return (<View >
                <Card style={styles.card_style} >
                    
                    <Card.Title
                    style={styles.title_style}
                        title={item.name}
                        subtitle={item.phone}
                        left={(props) => <Avatar.Icon size={26} icon="account" />}
                        right={(props) => <IconButton size={26} icon="dots-vertical" color='grey' />}
                    />
                    
                </Card>
            </View>);
};

export default AppContent;

const styles = StyleSheet.create({
    text_input_style:{
        marginHorizontal: 5,
        height: 50,
        fontSize: 15,
    },
    card_style:{
        flex:1,
        height:70,
        backgroundColor:'#e5e5e5', 
        marginVertical: 2,
        marginHorizontal:5
    },
    content_style:{
        paddingTop:0,
        top: 0,
        paddingBottom: 2
    },
    title_style:{
        top: 0,
        paddingTop: 0,
        marginTop: 0,
    }
});
