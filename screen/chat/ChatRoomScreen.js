/* eslint-disable prettier/prettier */
// https://www.canva.com/design/DAFlTkQwZEI/eubyrsZdoFeSNSGGEATfNQ/edit
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat,Bubble,Send } from 'react-native-gifted-chat';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import axios from "axios";
import {checkToken} from "../../common/security/checkToken";
import { useNavigation } from '@react-navigation/native';

export default function ChatRoomScreen(props) {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello, I'm Cooking Master and I am here to assist you today! How can I help you?",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Cooking Master',
                    avatar: require('../../assets/icons/icon_cooking_master.png'),
                },
            },
        ])
    }, []);

    const sendMessageToChatGPT = async (message) => {
        try {
            let reply = "Oops, this feature only supports registered users, please log in first."

            if(await checkToken()) {
                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant.',
                        },
                        {
                            role: 'user',
                            content: message,
                        },
                    ],
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer [Replace your token here]',
                    },
                });

                const { choices } = response.data;
                reply = choices[0].message.content;
                console.log('ChatGPT Reply:', reply);
            }
            return reply;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onSend = useCallback((newMessages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
        const userMessage = newMessages[0].text;

        // Send userMessage to ChatGPT API, receive response
        let response = "Oops, this feature only supports registered users, please log in first."
        sendMessageToChatGPT(userMessage).then(chatGPTResponse => {
            const responseMessage = {
                _id: Math.round(Math.random() * 1000000),
                text: chatGPTResponse,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Cooking Master',
                    avatar: require('../../assets/icons/icon_cooking_master.png'),
                },
            };
            setMessages((prevMessages) => GiftedChat.append(prevMessages, [responseMessage]));
        })
    }, []);

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: 'black',
                    },
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#fff',
                    },
                    right: {
                        backgroundColor: '#95ec69',
                    },
                }}
            />
        );
    };

    const renderSend = (props) => {
        return (
            <Send
                {...props}
                alwaysShowSend={true}
            >
                <View style={styles.sendBtn}>
                    <Text style={{color: '#ffffff', fontSize: 17}}>Send</Text>
                </View>
            </Send>
        );
    };

    return (
        <SafeAreaView style={styles.mainContent}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                showUserAvatar={true}
                locale={'us-en'}
                showAvatarForEveryMessage={true}
                renderBubble={renderBubble}
                placeholder={'Send a message.'}
                renderSend={renderSend}
                inverted={true}
                renderUsernameOnMessage={true}
                user={{
                    _id: 50,
                    name: 'User',
                    avatar: require('../../assets/icons/icon_cooking_learner.png'),
                }}
                alignTop={true}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: '#ededed',
    },
    sendBtn: {
        width: 63,
        height: 32,
        borderRadius: 3,
        backgroundColor:'#07c160',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:5,
        marginRight:5,
    }
});


