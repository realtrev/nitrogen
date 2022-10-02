import { useRef, useState } from "react"
import { IoSend } from "react-icons/io5"

export default function Dashboard({ Component, pageProps }) {
  const userId = 1;
  
  const chatName = 'The Nitrogen App';

  const messageBox = useRef(null);
  const chatBox = useRef(null);
  const messageContainer = useRef(null);

  const [sendable, setSendable] = useState(false);

  const [sampleChat, setSampleChat] = useState([]);

  const [message, setMessage] = useState('');
  const [atBottom, setAtBottom] = useState(true);
 
  useState(() => {
    const messages = [];
    function createMessage(type, content, author, date) {
      const messageData = {
        type: type,
        content: {
          text: content.text,
          image: content.image,
        },
        author: author.id,
        username: author.username,
        date: date,
      }
      messages.push(messageData);
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
    createMessage('text', { text: 'Sick. Here\'s a moderately long message again so that we can make sure that messages that are super long work how they\'re supposed to. I\'m actually pretty sure that it breaks when the message is too long.' }, { id: 1, username: 'Gamer' }, new Date())
    setSampleChat(messages);
  }, []);

  function sendMessage(event) {
    // if the message is empty or only spaces
    if (messageBox.current.value.trim() === '') {
      return;
    }
    event.preventDefault();
    console.log(message);
    const messageData = {
      type: 'text',
      author: userId,
      content: {
        text: message,
        image: undefined,
      },
      username: 'Gamer',
      date: new Date(),
    }
    setSampleChat([messageData, ...sampleChat]);
    messageBox.current.value = '';
    manageMessageBox();
    // scroll to bottom 1 ms after the message is sent
    if(atBottom) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
    setSendable(false);
  }

  function manageKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(event);
    }
  }

  function manageMessageBox() {

    setMessage(messageBox.current.value.trim());
    if (!messageBox.current.value) {
      messageBox.current.style.height = '3rem';
    } else {
      messageBox.current.style.height = 0;
      if (messageBox.current.scrollHeight > 16 * 16) {
        messageBox.current.style.height = '16rem';
      } else {
        messageBox.current.style.height = messageBox.current.scrollHeight + 'px';
      }
    }

    if(atBottom) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }

    if (messageBox.current.value.trim() !== '') {
      setSendable(true);
    } else {
      setSendable(false);
    }
  }

  function manageScroll() {
    if(chatBox.current.scrollTop + chatBox.current.clientHeight === chatBox.current.scrollHeight) {
      setAtBottom(true);
    } else {
      setAtBottom(false);
    }
  }

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-gray-base">
      <div className="w-72 h-screen flex-shrink-0"></div>
      <div className="flex-grow overflow-hidden h-screen flex flex-col">
        <div className="h-12 flex-shrink-0 hidden">

        </div>
        <div className="flex-grow w-full overflow-y-scroll overflow-x-hidden bg-gray-dark flex pl-4 pr-2 scrollbar pb-2 flex-col-reverse" ref={chatBox} onScroll={manageScroll} onLoad={(e) => {chatBox.current.scrollTop = chatBox.current.scrollHeight}}>
            {sampleChat.reverse().map((message, index) => {
              if(index === sampleChat.length && atBottom) {
                setTimeout(() => {
                  chatBox.current.scrollTop = chatBox.current.scrollHeight;
                }, 0);
              }

              const lastMessage = index === sampleChat.length;
              const prevMessage = index + 1 < sampleChat.length ? sampleChat[index + 1] : null;
              const messageAuthor = message.author;
              const username = message.username;
              // get time HH:HH AM/PM
              const time = message.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

              if (messageAuthor === userId) {
                if(!prevMessage || prevMessage.author !== userId) {
                  return (
                    <div className="flex justify-end items-center pt-5" key={index}>
                      <div className="message relative bg-messages-outgoing rounded-3xl min-h-[3rem] whitespace-pre-wrap flex py-3 items-center px-4 min-w-[3rem] max-w-[75%] justify-center wrap-anywhere">
                        <p className="text-white">{message.content.text}</p>
                        <div className="w-full h-full absolute select-none rounded-3xl message"></div>
                        <div className="hidden-data absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-messages-incoming text-sm select-none">
                            {time}
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className="flex justify-end items-center pt-1" key={index}>
                      <div className="message relative bg-messages-outgoing rounded-3xl min-h-[3rem] whitespace-pre-wrap flex py-3 items-center px-4 min-w-[3rem] max-w-[75%] justify-center wrap-anywhere">
                        <p className="text-white">{message.content.text}</p>
                        <div className="w-full h-full absolute select-none rounded-3xl message"></div>
                        <div className="hidden-data absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-messages-incoming text-sm select-none">
                            {time}
                        </div>
                      </div>
                    </div>
                  )
                }
              } else {
                if(!prevMessage || prevMessage.author === userId) {
                  return (
                    <div key={index}>
                      <div className="h-5 pl-[4.5rem] text-text-sub2 text-xs select-none">
                        <p className="">{message.username}</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-gray-darkest rounded-full h-12 aspect-square"></div>
                        <div className = "bg-messages-incoming relative rounded-3xl whitespace-pre-wrap min-h-[3rem] py-3 flex items-center px-4 min-w-[3rem] max-w-[75%] justify-center wrap-anywhere">
                          <div className="w-full h-full absolute select-none rounded-3xl message"></div>
                          <p className="text-white">{message.content.text}</p>
                          <div className="hidden-data absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-messages-incoming text-sm select-none">
                            {time}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className="flex pt-1 pl-14" key={index}>
                      <div className = "message relative bg-messages-incoming rounded-3xl whitespace-pre-wrap min-h-[3rem] py-3 flex items-center px-4 min-w-[3rem] max-w-[75%] justify-center wrap-anywhere">
                        <p className="text-white">{message.content.text}</p>
                        <div className="w-full h-full absolute select-none rounded-3xl message"></div>
                        <div className="hidden-data absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-messages-incoming text-sm select-none">
                            {time}
                        </div>
                      </div>
                    </div>
                  )                
                }
              }
            })}
          <div className="p-4 bottom-0 items-center flex flex-col pt-12 select-none">
            <div className="h-20 aspect-square rounded-full bg-primary"></div>
            <h1 className="font-big font-black text-white text-3xl">{chatName}</h1>
            <h1 className="text-text-subtitle text-xl text-center">This is the beginning of messages in <span className="font-semibold">{chatName}</span>.</h1>
          </div>
          <div className="flex-grow">
          </div>
        </div>
        <div className="h-auto bottom-0 py-2 w-full pl-12 pr-4 flex gap-2 flex-shrink-0 bg-gray-dark">
          <div ref={messageContainer} className="overflow-hidden shrink-0 ml-6 rounded-3xl flex-grow" >
            <textarea style={{height: '3rem'}} className="scrollbar-msg w-full px-4 bg-gray-darkest outline-none text-white resize-none flex text-base scrollbar-hidden py-3 font-whitney placeholder-text-sub2" placeholder="Message the chat" onKeyDown={manageKeyPress} onChange={(e) => manageMessageBox()} ref={messageBox}></textarea>
          </div>
          <button className={`rounded-full h-12 aspect-square flex items-center justify-center duration-200 outline-none ${sendable ? 'bg-messages-outgoing' : 'bg-messages-incoming '}`} disabled={!sendable} onClick={sendMessage}>
            <IoSend className="text-xl text-white" />
          </button>
        </div>
      </div>
      <div className="w-72 h-screen flex-shrink-0"></div>
    </div>
  );
}