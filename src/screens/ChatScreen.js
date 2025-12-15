import { useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
} from 'react-native';
import {
    ActivityIndicator,
    Appbar,
    Button,
    Card,
    Text,
    TextInput,
} from 'react-native-paper';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      from: 'bot',
      text: 'Hi, I am your FreshCart assistant. Ask me about products or offers!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now().toString(), from: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // TODO: replace with real Gemini API call
      const replyText =
        "I'm a demo bot on mobile now. Connect me to Gemini API like in your web app.";
      const botMsg = {
        id: Date.now().toString() + '-bot',
        from: 'bot',
        text: replyText,
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        id: Date.now().toString() + '-error',
        from: 'bot',
        text: 'Something went wrong. Please try again.',
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <Card
      style={[
        styles.message,
        item.from === 'user' ? styles.userMsg : styles.botMsg,
      ]}
    >
      <Card.Content>
        <Text style={styles.msgAuthor}>
          {item.from === 'user' ? 'You' : 'Assistant'}
        </Text>
        <Text>{item.text}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Appbar.Header>
        <Appbar.Content title="Assistant" subtitle="Ask about FreshCart" />
      </Appbar.Header>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={renderItem}
      />

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator />
          <Text style={{ marginLeft: 8 }}>Thinking...</Text>
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          mode="outlined"
          placeholder="Type a message"
          value={input}
          onChangeText={setInput}
        />
        <Button mode="contained" onPress={sendMessage} style={styles.sendBtn}>
          Send
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: {
    padding: 12,
  },
  message: {
    marginBottom: 8,
  },
  userMsg: {
    alignSelf: 'flex-end',
    minWidth: '40%',
    maxWidth: '80%',
  },
  botMsg: {
    alignSelf: 'flex-start',
    minWidth: '40%',
    maxWidth: '80%',
  },
  msgAuthor: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
  inputRow: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  sendBtn: {
    alignSelf: 'center',
  },
});

export default ChatScreen;
