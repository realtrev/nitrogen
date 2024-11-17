import { RiHome5Line } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CommunityBar({atHome = false}) {
  const router = useRouter();

  // fetch communities
  // /api/user/communities
  const [communities, setCommunities] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get('/api/user/communities').then((res) => {
      setCommunities(res.data);
    });
    axios.get('/api/user').then((res) => {
      setUser(res.data);
    });
  }, []);

  function CommunityList({community, isSelected}) {
    return(
      <button className={`duration-200 ${isSelected? 'bg-primary-1' : 'hover:bg-primary-1'} w-14 h-14 rounded-full p-0.5`} onClick={(e) => router.replace(`/channels/${community.id}`)}>
        <div className="w-full h-full rounded-full border-mid border-2" style={{backgroundImage: `url("${community}")`, backgroundSize: '100% 100%'}} />
      </button>
    );
  }

  if (!user || !communities) {
    return (
      <div className="w-24 h-full border-r border-r-void bg-mid flex-shrink-0 flex flex-col">
      </div>
    );
  }

  return(
    <div className="w-24 h-full border-r border-r-void bg-mid flex-shrink-0 flex flex-col">
      <div className="flex-grow flex flex-col gap-3 overflow-y-scroll side-scrollbar items-center pl-2 pt-8 overflow-x-hidden">
        <button onClick={(e) => router.push('/messages/direct')} className={`duration-200 ${atHome? 'bg-primary-1' : 'hover:bg-primary-1'} group w-14 h-14 rounded-full p-0.5`}>
          <div className="w-full h-full rounded-full bg-black border-mid border-2 flex items-center justify-center">
            <RiHome5Line className={`${atHome? 'text-primary-1' : 'text-sub3 group-hover:text-white'} text-3xl duration-200`} />
          </div>
        </button>
        {communities.map((community) => (
          <CommunityList key={community.id} community={community} isSelected={community.id === '1'} />
        ))}
        <button className={`duration-200 hover:bg-primary-1 group w-14 h-14 rounded-full p-0.5`}>
          <div className="w-full h-full rounded-full bg-primary-2 border-mid border-2 flex items-center justify-center">
            <AiOutlinePlus className={`text-primary-1 text-2xl duration-200`} />
          </div>
        </button>
      </div>
      <div className="flex-shrink-0 w-full flex flex-col items-center pb-8 gap-2">
        <button className="relative h-14 aspect-square rounded-full overflow-hidden" style={{backgroundImage: `url(${user.profileUrl})`, backgroundSize: '100% 100%'}} />
      </div>
    </div>
  );
}