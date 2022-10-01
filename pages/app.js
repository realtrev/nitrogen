import { useRef, useState } from "react"
import { IoSend } from "react-icons/io5"

export default function Dashboard({ Component, pageProps }) {
  const userId = 1;
  
  const chatName = 'The Nitrogen App';

  const messageBox = useRef(null);
  const chatBox = useRef(null);
  const [sendable, setSendable] = useState(false);

  const [sampleChat, setSampleChat] = useState([]);

  useState(() => {
    const messages = [];
    function createMessage(type, content, author, date) {
      const message = {
        type: type,
        content: {
          text: content.text,
          image: content.image,
        },
        author: author.id,
        date: date,
      }
      messages.push(message);
    }

    createMessage('text', { text: 'Hey!' }, { id: 1, username: 'Gamer' }, new Date())
    createMessage('text', { text: 'What\'s up?' }, { id: 2, username: 'Nitrogen' }, new Date())
    createMessage('text', { text: 'I was thinking about a super cool idea for a chat app called Nitrogen!' }, { id: 1, username: 'Gamer' }, new Date())
    createMessage('text', { text: 'I have a few ideas on how it might work.' }, { id: 1, username: 'Gamer' }, new Date())
    createMessage('text', { text: 'Huh.' }, { id: 2, username: 'Nitrogen' }, new Date())
    createMessage('text', { text: 'That does sound pretty cool. Can you send me a link to some concept work?' }, { id: 2, username: 'Nitrogen' }, new Date())
    createMessage('text', { text: 'Okay!' }, { id: 1, username: 'Gamer' }, new Date())
    createMessage('text', { text: 'I\'ll add you to the project on Figma.' }, { id: 1, username: 'Gamer' }, new Date())
    createMessage('text', { text: 'Sounds good to me!' }, { id: 2, username: 'Nitrogen' }, new Date())
    createMessage('text', { text: 'Awesome.' }, { id: 1, username: 'Gamer' }, new Date())
    createMessage('text', { text: 'I\m working on a sketch right now with Next js.' }, { id: 1, username: 'Gamer' }, new Date())
    createMessage('text', { text: 'Sick. Here\'s a moderately long message again so that we can make sure that messages that are super long work how they\'re supposed to. I\'m actually pretty sure that it breaks when the message is too long.' }, { id: 2, username: 'Nitrogen' }, new Date())
    createMessage('text', { text: 'Good idea.' }, { id: 1, username: 'Gamer' }, new Date())
    setSampleChat(messages);
    console.log(messages);
  }, []);

  function sendMessage(event) {
    // if the message is empty or only spaces
    if (messageBox.current.value.trim() === '') {
      return;
    }
    event.preventDefault();
    const messageContent = messageBox.current.value;
    const message = {
      type: 'text',
      author: userId,
      content: {
        text: messageContent,
        image: undefined,
      },
      date: new Date(),
    }
    setSampleChat([...sampleChat, message]);
    messageBox.current.value = '';
    // scroll to bottom 1 ms after the message is sent
    if(chatBox.current.scrollTop + chatBox.current.clientHeight === chatBox.current.scrollHeight) {
      setTimeout(() => {
        chatBox.current.scrollTop = chatBox.current.scrollHeight;
      }, 0);
      setSendable(false);
    }
  }

  function manageKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(event)
    }
  }

  function messageIsSendable(event) {
    if (messageBox.current.value.trim() !== '') {
      setSendable(true);
    } else {
      setSendable(false);
    }
  }

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-gray-base">
      <div className="w-96 h-screen flex-shrink-0"></div>
      <div className="flex-grow overflow-hidden h-screen flex flex-col">
        <div className="h-12 flex-shrink-0">

        </div>
        <div className="flex-grow w-full overflow-y-scroll overflow-x-hidden bg-gray-dark flex flex-col pl-4 pr-2" id="message-chat" ref={chatBox}>
          <div className="flex-grow">
          </div>
          <div className="p-4 bottom-0 items-center flex flex-col pt-12">
            <div className="h-20 aspect-square rounded-full bg-primary"></div>
            <h1 className="font-big font-extrabold text-white text-2xl">{chatName}</h1>
            <h1 className="text-text-subtitle text-xl">This is the beginning of messages in <span className="font-semibold">{chatName}</span>.</h1>
          </div>
            {sampleChat.map((message, index) => {
            if (message.author === userId) {
              return (
                <div className="flex justify-end items-center p-1" key={index}>
                  <div className="bg-messages-outgoing rounded-3xl min-h-[3rem] flex items-center px-4 min-w-[3rem] max-w-[75%] justify-center">
                    <p className="text-white">{message.content.text}</p>
                  </div>
                </div>
              )
            } else {
              if(index === 0 || sampleChat[index - 1].author !== message.author) {
                return (
                  <div className="flex p-1 gap-2" key={index}>
                    <div className="bg-gray-darkest rounded-full p-4 h-12 aspect-square"></div>
                    <div className = "bg-messages-incoming rounded-3xl min-h-[3rem] py-3 flex items-center px-4 min-w-[3rem] max-w-[75%] justify-center">
                      <p className="text-white">{message.content.text}</p>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className="flex p-1 gap-2 pl-16" key={index}>
                    <div className = "bg-messages-incoming rounded-3xl min-h-[3rem] py-3 flex items-center px-4 min-w-[3rem] max-w-[75%] justify-center">
                      <p className="text-white">{message.content.text}</p>
                    </div>
                  </div>
                )                
            }
          }})}
        </div>
        <div className="h-16 bottom-0 w-full pl-12 pr-4 flex items-center gap-2 flex-shrink-0 bg-gray-dark">
          <textarea className="ml-6 px-4 h-12 rounded-full w-full bg-gray-darkest outline-none text-white resize-none flex text-base scrollbar-hidden py-3 font-whitney placeholder-text-sub2" placeholder="Message the chat" onKeyDown={manageKeyPress} onChange={messageIsSendable} ref={messageBox}></textarea>
          <button className={`rounded-full h-12 aspect-square flex items-center justify-center duration-200 outline-none ${sendable ? 'bg-messages-outgoing' : 'bg-messages-incoming'}`} onClick={sendMessage}>
            <IoSend className="text-xl text-white" />
          </button>
        </div>
      </div>
      <div className="w-96 h-screen flex-shrink-0"></div>
    </div>
  );
}