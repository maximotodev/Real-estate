import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Messages = () => {
  const router = useRouter();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState(new Set());
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const uniqueConversations = {};
      response.data.forEach((msg) => {
        const key = msg.conversationId;
        if (!uniqueConversations[key]) {
          uniqueConversations[key] = {
            conversationId: msg.conversationId,
            lastMessage: msg.message,
            timestamp: msg.createdAt,
            otherUserId: msg.senderId === JSON.parse(localStorage.getItem('user')).id ? msg.receiverId : msg.senderId,
            otherUserName: msg.senderId === JSON.parse(localStorage.getItem('user')).id ? msg.receiverName : msg.senderName,
          };
        }
      });

      setConversations(Object.values(uniqueConversations).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    } catch (error) {
      toast.error('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/messages?conversationId=${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data);
    } catch (error) {
      toast.error('Failed to load messages');
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const token = localStorage.getItem('token');
      const conversation = conversations.find((c) => c.conversationId === selectedConversation);

      await axios.post(
        '/api/messages',
        {
          receiverId: conversation.otherUserId,
          message: newMessage,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewMessage('');
      fetchMessages(selectedConversation);
      fetchConversations();
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Messages - Real Estate</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Messages</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Conversations</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-600">No conversations yet</div>
                ) : (
                  conversations.map((conv) => (
                    <div
                      key={conv.conversationId}
                      onClick={() => setSelectedConversation(conv.conversationId)}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition ${
                        selectedConversation === conv.conversationId
                          ? 'bg-blue-50 border-l-4 border-blue-600'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <p className="font-semibold text-gray-800">{conv.otherUserName}</p>
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(conv.timestamp).toLocaleDateString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Messages Area */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg flex flex-col">
              {selectedConversation ? (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800">
                      {conversations.find((c) => c.conversationId === selectedConversation)?.otherUserName}
                    </h3>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => {
                      const isOwn = msg.senderId === JSON.parse(localStorage.getItem('user')).id;
                      return (
                        <div
                          key={idx}
                          className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                              isOwn
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                          >
                            <p>{msg.message}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {new Date(msg.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-600">
                  Select a conversation to start messaging
                </div>
              )}
            </div>
          </div>
        </div>
        <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
    </>
  );
};

export default Messages;
