import {useState} from 'react';
import Header from './components/Header';
import {useMessages} from './hooks/useMessages';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';

function App() {
  // const {messages, createMessage, deleteMessage} = useMessages();
  // const [messageContent, setMessageContent] = useState('');

  // const handleCreateMessage = async (e) => {
  //   e.preventDefault();
  //   await createMessage(messageContent);
  // };

  // const handleDeleteMessage = async (messageId) => {
  //   await deleteMessage(messageId);
  // };

  return (
    <div className="App min-h-screen min-w-screen p-4 bg-slate-800 flex items-center justify-center">
      {/* <Login /> */}
      {/* <SignUp /> */}
      <Home />
    </div>
  );
}

export default App;

{
  /* <main className="Main-Container flex flex-col items-center">
  <Header />
  <div className="Messages-Container bg-slate-100 w-96">
    <h2 className="text-2xl text-center">Messages</h2>
    <ul className="w-full">
      /* Display message content in an array
              1. Map through the messages array
              2. For each message, create a list item with a paragraph tag
              3. The paragraph tag should display the message content
              4. Add a key attribute to the list item and set it to the message's _id
              5. Add a conditional class to the paragraph tag
              6. If the message's sender is current user, align the text to the right
            
      {messages.map((message) => (
        <li key={message._id}>
          <p
            className={`hover:text-blue-500 ${
              message.sender === 'Goku' && 'text-right'
            }`}
          >
            {message.content}
          </p>
        </li>
      ))}
    </ul>
  </div>
  <form onSubmit={handleCreateMessage}>
    <label
      htmlFor="message-content"
      className="text-lg"
    >
      Message
    </label>
    <input
      id="message-content"
      type="text"
      value={messageContent}
      onChange={(e) => setMessageContent(e.target.value)}
    />
    <button className="bg-blue-500 text-white px-3 py-1 rounded-md ml-2 hover:bg-blue-600 cursor-pointer">
      Send
    </button>
  </form>
</main>; */
}
