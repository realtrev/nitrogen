import { useRef, useState, useEffect, componentDidMount } from "react"
import { RiEmotionLine, RiSettings3Line, RiSendPlane2Line, RiSearchLine, RiChat4Line, RiChatVoiceLine, RiStarSLine, RiStarSFill, RiHashtag, RiVolumeUpLine, RiHome5Line, RiGroupLine } from "react-icons/ri"
import { AiOutlinePlus } from "react-icons/ai"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useRouter } from 'next/router'
import CommunityBar from "../../src/components/CommunityBar"
import axios from "axios"
import MemberBar from "../../src/components/MemberBar"

export default function Dashboard({ Component, pageProps }) {
  const router = useRouter();

  const chatName = 'The Nitrogen App';

  const [community, setCommunity] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch data from api
    const { communityId } = router.query;
    console.log(communityId);
    axios.get(`/api/communities/${communityId}`).then((res) => {
      setCommunity(res.data);
      console.log(res.data);
    }).catch((err) => {
      router.replace('/messages/direct');
    });
    axios.get('/api/user').then((res) => {
      setUser(res.data);
    });
  }, []);

  const messageBox = useRef(null);
  const chatBox = useRef(null);
  const messageContainer = useRef(null);

  const [sendable, setSendable] = useState(false);

  const [sampleChat, setSampleChat] = useState([]);

  const [message, setMessage] = useState('');
  const [atBottom, setAtBottom] = useState(true);
  const [stickToBottom, setStickToBottom] = useState(true);
  const [emojiPicker, setEmojiPicker] = useState(false);

  const ranges = [
    '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
    '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
    '\ud83d[\ude80-\udeff]', // U+1F680 to U+1F6FF
    ' ', // Also allow spaces
  ].join('|');

  const removeEmoji = str => str.replace(new RegExp(ranges, 'g'), '');
  const isOnlyEmojis = str => !removeEmoji(str).length;
  const lengthNoSpaces = str => str.replace(/\s/g, '').length;

  // const users = new Map();
  // users.set("342013001479749643", {id: 342013001479749643, name: 'AugieDog08', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
  // users.set("465613580096765973", {id: 465613580096765973, name: 'Paridax', profileUrl: 'https://cdn.discordapp.com/avatars/465613580096765973/bb548f99066f2ffaa463439b78e29712.webp?size=80'});
  // users.set("762765642830315530", {id: 762765642830315530, name: 'FatRatWithAHat', profileUrl: 'https://cdn.discordapp.com/avatars/762765642830315530/d97c52aa52dd654cb5019f9b72048094.webp?size=80'});
  // users.set("457710227240779790", {id: 457710227240779790, name: 'Cloudyy', profileUrl: 'https://cdn.discordapp.com/avatars/457710227240779790/4375a48ba3b6302e454620dc2b133000.webp?size=80'});
  // users.set("494249333986689035", {id: 494249333986689035, name: 'Countwinston', profileUrl: 'https://cdn.discordapp.com/avatars/494249333986689035/0d02459acd8fc96d8a7950a3d5fa0cde.webp?size=80'});
  // users.set("11234", {id: 11234, name: 'BOT Carbon', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
  // users.set("12234", {id: 11235, name: 'BOT Nitrogen', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
  // users.set("11", {id: 11, name: 'nogel', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
  // users.set("12", {id: 12, name: 'adritempo', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
  // users.set("13", {id: 13, name: 'Onii-chan', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
  // users.set("14", {id: 14, name: 'ParidAlt', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
  // users.set("15", {id: 15, name: 'ChilledPaper', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
  // users.set("16", {id: 16, name: 'MasterColbat', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});

  const channels = [];
  channels.push({id: "1234", name: 'General', type: 'text', topic: 'General chat for the Nitrogen App', lastMessageId: '1234', lastMessage: 'This is the last message', lastMessageTimestamp: '2021-05-01T00:00:00.000Z', lastMessageAuthor: '465613580096765973'});
  channels.push({id: "1235", name: 'Bot Commands', type: 'text', topic: 'Commands for the Nitrogen App', lastMessageId: '1235', lastMessage: 'This is the last message', lastMessageTimestamp: '2021-05-01T00:00:00.000Z', lastMessageAuthor: '465613580096765973'});
  channels.push({id: "1236", name: 'Media', type: 'text', topic: 'Media', lastMessageId: '1236', lastMessage: 'This is the last message', lastMessageTimestamp: '2021-05-01T00:00:00.000Z', lastMessageAuthor: '465613580096765973'});
  channels.push({id: "1237", name: 'Off Topic', type: 'text', topic: 'Voice chat', lastMessageId: '1237', lastMessage: 'This is the last message', lastMessageTimestamp: '2021-05-01T00:00:00.000Z', lastMessageAuthor: '465613580096765973'});
  channels.push({id: "1238", name: 'Voice Chat', type: 'voice', topic: 'Voice chat', lastMessageId: '1238', lastMessage: 'This is the last message', lastMessageTimestamp: '2021-05-01T00:00:00.000Z', lastMessageAuthor: '465613580096765973'});
  const currentChannel = "1234";
  const channel = channels.find(c => c.id === currentChannel);

  const userStarredChannelIds = ["1236", "1238"];
  const channelName = channels.find(c => c.id === currentChannel).name;
  const isStarred = userStarredChannelIds.includes(currentChannel);
  const userStarredChannels = channels.filter(channel => userStarredChannelIds.includes(channel.id));
  const topic = channels.find(c => c.id === currentChannel).topic;
  const userOtherChannels = channels.filter(channel => !userStarredChannelIds.includes(channel.id));

  function Channel({channel, isCurrentChannel}) {
    const name = channel.name;
    const type = channel.type;
    const newMessage = Math.random() > 0.7 && type === 'text';
    return(
      <button className="group w-full h-14 flex rounded-r-lg overflow-hidden mb-1">
        <div className={`duration-100 w-0.5 h-full ${isCurrentChannel ? 'bg-primary-1' : newMessage ? 'bg-white group-hover:bg-primary-1' : 'bg-none group-hover:bg-primary-1'} flex-shrink-0`} />
        <div className={`duration-100 flex-grow ${isCurrentChannel ? 'bg-primary-2' : 'bg-none group-hover:bg-primary-2'} h-full px-4 flex items-center gap-2`}>
          <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center">
            { type === 'text' ?
            <RiHashtag className={`duration-200 text-2xl ${isCurrentChannel ? 'text-primary-1' : newMessage ? 'text-white' :'text-sub2 group-hover:text-sub3'}`} />
            :
            <RiVolumeUpLine className={`duration-200 text-2xl ${isCurrentChannel ? 'text-primary-1' : newMessage ? 'text-white' : 'text-sub2 group-hover:text-sub3'}`} />
            }
          </div>
          <h1 className={`duration-100 text-sm ${isCurrentChannel ? 'text-white' : 'text-sub3 group-hover:text-white'}`}>{name}</h1>
          <button className="ml-auto group w-8 aspect-square hover:bg-primary-2 items-center justify-center rounded-full hidden group-hover:flex">
            <RiSettings3Line className="text-2xl text-sub2 hover:text-primary-1 hover:rotate-90 duration-200 ease-out" />
          </button>
        </div>
      </button>
    );
  }

  useState(() => {
    const messages = [];
    function createMessage(type, content, author, date) {
      const messageData = {
        type: type,
        content: {
          text: content.text,
          image: content.image,
        },
        author: author,
        date: date,
      }
      messages.push(messageData);
    }

    createMessage('text', { text: 'Hey!' }, "465613580096765973", new Date())
    createMessage('text', { text: 'What\'s up?' }, "342013001479749643", new Date())
    createMessage('text', { text: 'I was thinking about a super cool idea for a chat app called Nitrogen!' }, "465613580096765973", new Date())
    createMessage('text', { text: 'I have a few ideas on how it might work.' }, "465613580096765973", new Date())
    createMessage('text', { text: 'Huh.' }, "342013001479749643", new Date())
    createMessage('text', { text: 'That does sound pretty cool. Can you send me a link to some concept work?' }, "342013001479749643", new Date())
    createMessage('text', { text: 'Okay!' }, "465613580096765973", new Date())
    createMessage('text', { text: 'I\'ll add you to the project on Figma.' }, "465613580096765973", new Date())
    createMessage('text', { text: 'Sounds good to me!' }, "342013001479749643", new Date())
    createMessage('text', { text: 'Awesome.' }, "465613580096765973", new Date())
    createMessage('text', { text: 'I\m working on a sketch right now with Next js.' }, "465613580096765973", new Date())
    createMessage('text', { text: 'Sick. Here\'s a moderately long message again so that we can make sure that messages that are super long work how they\'re supposed to. I\'m actually pretty sure that it breaks when the message is too long.' }, "342013001479749643", new Date())
    createMessage('text', { text: 'Good idea.' }, "465613580096765973", new Date())
    createMessage('text', { text: 'Sick. Here\'s a moderately long message again so that we can make sure that messages that are super long work how they\'re supposed to. I\'m actually pretty sure that it breaks when the message is too long.' }, "465613580096765973", new Date())
    createMessage('text', { text: 'Hey!' }, "465613580096765973", new Date())
    createMessage('text', { text: 'What\'s up?' }, "762765642830315530", new Date())
    createMessage('text', { text: 'I was thinking about a super cool idea for a chat app called Nitrogen!' }, "465613580096765973", new Date())
    createMessage('text', { text: 'I have a few ideas on how it might work.' }, "465613580096765973", new Date())
    createMessage('text', { text: 'Huh.' }, "762765642830315530", new Date())
    createMessage('text', { text: 'That does sound pretty cool.' }, "762765642830315530", new Date())
    createMessage('text', { text: 'Okay!' }, "465613580096765973", new Date())
    setSampleChat(messages);
  }, []);

  function urlify(text) {
    var urlRegex = /(<\S+:\/\/\S+>|https?:\/\/\S+.\S+)/g;
    return text.replace(urlRegex, function(url) {
      if (url.startsWith('<')) {
        url = url.slice(1, -1);
      }
      return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
    })
  }

  function sendMessage(event) {
    // if the message is empty or only spaces
    if (messageBox.current.value.trim() === '') {
      return;
    }
    event.preventDefault();
    setStickToBottom(true);
    console.log(message);
    const messageData = {
      type: 'text',
      author: null,
      content: {
        text: message,
        image: undefined,
      },
      username: 'Gamer',
      date: new Date(Date.now()),
    }
    setSampleChat([...sampleChat, messageData]);
    messageBox.current.value = '';
    manageMessageBox();
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
      messageBox.current.style.height = '20px';
    } else {
      messageBox.current.style.height = 0;
      if (messageBox.current.scrollHeight > 16 * 16) {
        messageBox.current.style.height = '16rem';
      } else {
        messageBox.current.style.height = messageBox.current.scrollHeight + 'px';
      }
    }

    if (messageBox.current.value.trim() !== '') {
      setSendable(true);
    } else {
      setSendable(false);
    }

    if(atBottom) {
      setStickToBottom(true);
    }
  }

  function manageScroll() {
    if(chatBox.current.scrollHeight === chatBox.current.scrollTop + chatBox.current.clientHeight) {
      setAtBottom(true);
    } else {
      setAtBottom(false);
    }
  }

  // this code will run after the component is rendered
  useEffect(() => {
    if(chatBox.current && stickToBottom) {
      setStickToBottom(false);
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  });

  function getRelativeDay(date) {
    const today = new Date();
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return `${month}/${day}/${year}`;
    }
  }

  function inputInMessageBox(text) {
    messageBox.current.value += ` ${text}`;
    manageMessageBox();
  }

  const UserList = ({id, offline = false}) => {
    const user = null;
    if (!user) {
      return(
      <div className={`${offline ? 'brightness-50' : ''} text-sub3 text-sm`}>
        {id}
      </div>
      )
    }
    return(
      <div className={`${offline ? 'brightness-50' : ''} text-sub3 text-sm flex items-center gap-2`}>
        <div className="relative h-6 aspect-square rounded-full overflow-hidden" style={{backgroundImage: `url(${user.profileUrl})`, backgroundSize: '100% 100%'}} />
        {user.name}
      </div>
    );
  }

  if (!community || !user) {
    return (
      <div className="flex w-screen h-screen items-center justify-center select-none bg-mid">
        <h1 className="text-2xl font-bold text-red animate-bounce">Loading...</h1>
      </div>
    );
  }
  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="relative bg-dark h-full w-full overflow-hidden">
        <div className="h-full w-full overflow-hidden backdrop-blur-3xl flex">
          <CommunityBar atHome={false} />
          <div className="w-72 h-full border-r border-r-void bg-mid flex-shrink-0 flex flex-col"> {/* HYDRATION ERROR */}
            <div className="h-20 w-full flex-shrink-0 bg-mid flex items-center px-4 gap-2">
              <div className="w-8 aspect-square rounded-full" style={{backgroundImage: `url(${community.profileUrl})`, backgroundSize: '100% 100%'}} />
              <h1 className="text-white text-sm font-medium">{community.name}</h1>
              <button className="ml-auto group w-8 aspect-square hover:bg-primary-2 flex items-center justify-center rounded-full">
                <RiSettings3Line className="text-2xl text-sub2 group-hover:text-primary-1 group-hover:rotate-90 duration-200 ease-out" />
              </button>
            </div>
            <div className="px-4 flex-shrink-0">
              <div className="w-full bg-black rounded-lg flex gap-2 px-3 items-center">
                <input className="flex-grow bg-black placeholder-sub2 text-sm my-3 w-0 outline-none text-white" placeholder="Search...">
                </input>
                <button className="w-8 h-8 flex-shrink-0 hover:bg-primary-2 flex items-center justify-center rounded-full">
                  <RiSearchLine className="text-2xl text-sub2 group-hover:text-primary-1" />
                </button>
              </div>
            </div>
            <div className="flex-grow pt-6 pb-5 overflow-y-scroll bar side-scrollbar select-none">
              <p className="font-black text-xs text-sub2 pb-4 pl-4">STARRED</p>
              {userStarredChannels.map((channel) => {
                const selected = channel.id === currentChannel;
                return <Channel key={channel.id} channel={channel} isCurrentChannel={selected} />
              })}
              <p className="font-black text-xs text-sub2 pb-4 pl-4 pt-5">COMMUNITY CHANNELS</p>
              {userOtherChannels.map((channel) => {
                const selected = channel.id === currentChannel;
                return <Channel key={channel.id} channel={channel} isCurrentChannel={selected} />
              })}
            </div>
          </div>
          <div className="flex-grow h-full flex flex-col">
            <div className="select-none h-20 w-full flex-shrink-0 border-b border-b-void bg-mid px-4 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  { channel.type === 'text' ?
                  <RiHashtag className={`text-3xl text-sub3`} />
                  :
                  <RiVolumeUpLine className={`text-3xl text-sub3`} />
                  }
                </div>
                <div>
                  <div className="flex gap-2">
                    <h1 className="text-white font-medium">{channelName}</h1>
                    {isStarred ?
                      <button className="text-2xl text-gold">
                        <RiStarSFill />
                      </button>
                      :
                      <button className="text-2xl text-gold">
                        <RiStarSLine />
                      </button>
                    }
                  </div>
                  <p className="text-sm whitespace-nowrap text-sub3">{topic}</p>
                </div>
              </div>
              <button className="w-12 h-12 items-center flex group justify-center rounded-full">
                <RiGroupLine className="text-2xl text-white" />
              </button>
            </div>
            <div className="flex-grow w-full relative overflow-hidden">
              <div className="grow-0 chat-scrollbar h-full flex flex-col pl-2 py-4 text-white font-sans bg-dark overflow-y-scroll overflow-x-hidden" ref={chatBox} onScroll={manageScroll}>
                <div className="flex-grow">
                </div>
                {sampleChat.map((message, index) => {
                const lastMessage = index === 0;
                const prevMessage = index > 0 ? sampleChat[index - 1] : null;
                const authorId = message.author;
                const username = 'Deleted User';
                // get time HH:MM AM/PM
                const time = message.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
                const avatarURL = null;
                // if the time difference since the last message is more than 10 minutes
                const timeDifference = prevMessage ? message.date.getTime() - prevMessage.date.getTime() : 0;
                const newSection = timeDifference > 600000; // 10 minutes in milliseconds

                const newDay = prevMessage ? message.date.getDate() !== prevMessage.date.getDate() : true;
                const relativeDay = getRelativeDay(message.date);
                const makeBig = isOnlyEmojis(message.content.text) && lengthNoSpaces(message.content.text) <=  50;
                if (authorId === undefined) {
                  if(!prevMessage || prevMessage.author !== undefined || newSection) {
                    return (
                      <div className="flex justify-end pt-5 w-[calc(100vw-43rem)] overflow-hidden gap-2 pr-2 flex-shrink-0" key={index}>
                        <div className="msg-gradient rounded-xl rounded-tr-none max-w-[75%] flex flex-col">
                          <div className="w-full flex-grow rounded-xl rounded-tr-none bg-primary-2 py-3 px-4">
                            <div className="flex w-full justify-between items-center gap-4">
                              <h1 className="font-extrabold text-sm text-primary-1">{username}</h1>
                              <p suppressHydrationWarning={true} className="text-xs text-gray">{time}</p>
                            </div>
                            <p className={`text-white ${makeBig ? 'text-3xl' : 'text-sm'} break-words whitespace-pre-wrap`} dangerouslySetInnerHTML={{ __html: urlify(message.content.text) }}></p>
                          </div>
                        </div>
                        <div className="h-10 aspect-square rounded-full overflow-hidden flex-shrink-0" style={{backgroundImage: `url(${avatarURL})`, backgroundSize: '100% 100%'}} />
                      </div>
                    )
                  } else {
                    return (
                      <div className="flex justify-end w-[calc(100vw-43rem)] items-center pt-1 flex-shrink-0" key={index}>
                        <div className="message msg-gradient relative rounded-xl max-w-[66%] flex flex-col">
                          <div className="w-full flex-grow rounded-xl bg-primary-2 py-3 px-4">
                            <p className={`text-white ${makeBig ? 'text-3xl' : 'text-sm'} break-words whitespace-pre-wrap`} dangerouslySetInnerHTML={{ __html: urlify(message.content.text) }}></p>
                          </div>
                        </div>
                        <div className="hidden-data relative w-14 h-auto overflow-hidden flex items-center justify-center">
                          <p suppressHydrationWarning={true} className="text-2xs text-high whitespace-nowrap">{time}</p>
                        </div>
                      </div>
                    )
                  }
                } else {
                  if(!prevMessage || prevMessage.author !== authorId) {
                    return (
                      <div className="flex justify-start w-[calc(100vw-44rem)] pt-5 gap-2 pl-2 flex-shrink-0" key={index}>
                        <div className="h-10 aspect-square rounded-full overflow-hidden" style={{backgroundImage: `url(${avatarURL})`, backgroundSize: '100% 100%'}} />
                        <div className="msg-gradient-gray relative rounded-xl rounded-tl-none max-w-[66%] flex flex-col">
                          <div className="w-full flex-grow rounded-xl rounded-tl-none bg-message py-3 px-4">
                            <div className="flex w-full justify-between items-center gap-4">
                              <h1 className="font-extrabold text-sm text-primary-1">{username}</h1>
                              <p suppressHydrationWarning={true} className="text-xs text-gray">{time}</p>
                            </div>
                            <p className={`text-white ${makeBig ? 'text-2xl' : 'text-sm'} break-words whitespace-pre-wrap`}>{message.content.text}</p>
                          </div>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div className="flex justify-end items-center w-[calc(100vw-44rem)] pt-1 flex-row-reverse flex-shrink-0" key={index}>
                        <div className="message msg-gradient-gray relative rounded-xl max-w-[66%] flex flex-col">
                          <div className="w-full flex-grow rounded-xl bg-message py-3 px-4">
                            <p className={`text-white ${makeBig ? 'text-2xl' : 'text-sm'} break-words whitespace-pre-wrap`}>{message.content.text}</p>
                          </div>
                        </div>
                        <div className="hidden-data relative w-14 h-auto overflow-hidden flex items-center justify-center">
                          <p suppressHydrationWarning={true} className="text-2xs text-high whitespace-nowrap">{time}</p>
                        </div>
                      </div>
                    )
                  }
                }
              })}
              </div>
              <div className={`absolute bottom-4 rounded-md shadow-xl left-4 ${!emojiPicker ? 'hidden': 'block'}`}>
                <Picker onEmojiSelect={(e) => {
                  inputInMessageBox(e.native);
                  messageBox.current.focus();
                  setEmojiPicker(false);
                  }}
                  onClickOutside={(e) => {
                    emojiPicker ? setEmojiPicker(false) : null;
                    // messageBox.current.focus();
                    }} />
              </div>
              <div className={`absolute bottom-0 w-full h-6 fade-off duration-100 ease-linear ${atBottom ? 'opacity-0': 'opacity-100'}`}>

              </div>
            </div>
            <div className="relative w-full flex-shrink-0 p-4 pt-0 flex-items-center bg-dark">
              <div ref={messageContainer} className="bottom-4 w-full min-h-[2.75rem] h-auto bg-black rounded-lg text-white flex overflow-hidden gap-4 px-4">
                <div className="h-[2.75rem] flex-shrink-0 flex items-center group-hover">
                  <button className="w-8 aspect-square overflow-hidden rounded-md group flex items-center justify-center" onClick={(e) => setEmojiPicker(true)}>
                    <RiEmotionLine theme="dark" className="flex-shrink-0 text-2xl text-sub2 hover:text-primary-1 hover:scale-125 duration-200 ease-out"></RiEmotionLine>
                  </button>
                </div>
                <div className="h-full flex flex-grow py-3">
                  <textarea style={{height: '20px'}} className="msg-scrollbar bg-black flex font-medium w-full outline-none text-sm placeholder-sub2 resize-none" placeholder="Write a message..." onKeyDown={manageKeyPress} onChange={(e) => manageMessageBox()} ref={messageBox}></textarea>
                </div>
                <div className="flex-shrink-0 flex gap-4">
                <div className="h-[2.75rem] flex-shrink-0 flex items-center">
                  <button className="w-8 aspect-square overflow-hidden rounded-md group flex items-center justify-center" disabled={!sendable} onClick={sendMessage}>
                    <RiSendPlane2Line className={`text-2xl transition-all duration-200 ${sendable ? 'text-primary-1 group-hover:brightness-75' : 'text-sub2'}`}></RiSendPlane2Line>
                  </button>
                </div>
                </div>
              </div>
            </div>
          </div>
          <MemberBar user={user} community={community} />
        </div>
      </div>
    </div>
  );
}