import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {sendMessageToAPI} from './api';

type ChatMessage = {
  text: string;
  isUser: boolean;
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  const sendMessage = async () => {
    if (inputText.trim() === '') {
      return;
    }

    const newMessage: ChatMessage = {
      text: inputText,
      isUser: true,
    };

    const reply = await sendMessageToAPI(inputText);
    if (reply !== null) {
      const replyMessage: ChatMessage = {
        text: reply,
        isUser: false,
      };
      setMessages([...messages, newMessage, replyMessage]);
    } else {
      console.log('Failed to get a reply from the server.');
    }
    setInputText('');
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              {
                alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                backgroundColor: message.isUser ? '#DCF8C5' : '#E4E6EB',
              },
            ]}>
            <Text>{message.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={text => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  textInput: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
