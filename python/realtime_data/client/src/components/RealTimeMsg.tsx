import React, {useState, useEffect} from 'react';
import {io} from 'socket.io-client';

let endPoint = "http://localhost:5000";
let socket = io(`${endPoint}`);

const RealTimeMsg = () => {

    const [messages, setMessages] = useState(["Hello And Welcome"]);
    const [message, setMessage] = useState("");
    const [json_data, setJson_data] = useState({});

    // socket.emit('q_json_data');
    socket.on('qjson', data =>{
        console.log('json data: ',data);
        setJson_data(data);
    });

    useEffect(()=>{socket.emit('q_json_data');}, []);

    useEffect( ()=>{
        get_messages();
    }, [messages.length] );

    // useEffect( () =>{
    //     get_json_data();
    // }, [json_data] );


    const get_json_data = () => {
        socket.on('qjson', data =>{
            console.log('json data: ',data);
            setJson_data(data);
        });
    };

    const get_messages = () => {
        socket.on('message', msg => {
            setMessages([...messages, msg]);
        });
    }

    const onChange = (e: any) => {
        setMessage(e.target.value);
    }

    const onClick = () => {
        if( message ){
            socket.emit('message', message);
            setMessage('');
        }else{
            alert('Please add message !!')
        }
    }

    return (
        <div>
            {
                (messages.length > 0) && messages.map(m=>
                    (<div key={m}><p>{m}</p></div>))
            }
            <input value={message} name='message' onChange = {e => onChange(e)} />
            <button onClick = {onClick} > Submit </button>
            <div>{JSON.stringify(json_data)}</div>
            
        </div>
    );

};

export default RealTimeMsg;