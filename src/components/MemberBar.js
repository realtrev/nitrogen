import axios from "axios";
import { useEffect, useState } from "react";

export default function MemberBar({community, user = null}) {
  const [members, setMembers] = useState(community.memberData);
  const [member, setMember] = useState(null);

  // get members
  useEffect(() => {
    axios.get(`/api/communities/${community.id}/members`).then((res) => {
      setMembers(res.data);
    }).catch((err) => {
      // console.log(err);
    });
    axios.get(`/api/communities/${community.id}/member/${user.id}`).then((res) => {
      setMember(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const UserList = ({id, offline = false}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      // /api/users/762765642830315530
      axios.get(`/api/users/${id}`).then((res) => {
        setUsers(res.data);
      }).catch((err) => {
        console.log(err);
      });
    }, []);

    if (!users) {
      return(
      <div className={`${offline ? 'brightness-50' : ''} text-sub3 text-sm`}>
        {id}
      </div>
      )
    }
    return(
      <div className={`${offline ? 'brightness-50' : ''} text-sub3 text-sm flex items-center gap-2`}>
        <div className="relative h-6 aspect-square rounded-full overflow-hidden" style={{backgroundImage: `url("/api/users/${users.id}/avatar")`, backgroundSize: '100% 100%'}} />
        {users.name}
      </div>
    );
  }

  if (!members || !member) {
    return(
      <div className="w-72 h-full border-l border-l-void bg-mid flex-shrink-0 flex flex-col py-6 px-4 pr-2 select-none gap-2 overflow-y-auto side-scrollbar">
        Loading...
      </div>
    );
  }

  function createdDate(timestamp) {
    // example timestamp: 1610000000000
    const date = new Date(timestamp);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  return (
    <div className="w-72 h-full border-l border-l-void bg-mid flex-shrink-0 flex flex-col py-6 px-4 pr-2 select-none gap-2 overflow-y-auto side-scrollbar">
      <div className="w-full flex items-center flex-shrink-0">
        <p className="font-black text-xs text-sub2 pb-2">THIS COMMUNITY</p>
      </div>
      <div className="bg-darker rounded-lg w-full p-4 flex flex-col gap-2 flex-shrink-0">
        <div className="font-black text-xs text-sub3">ABOUT THIS COMMUNITY</div>
        <div className="text-sub3 text-sm w-full">{community.description}</div>
        <div className="font-black text-xs text-sub3 pt-3">COMMUNITY CREATED ON</div>
        <div className="text-sub3 text-sm w-full">{createdDate(community.createdTimestamp)}</div>
        <div className="font-black text-xs text-sub3 pt-3">COMMUNITY STATS</div>
        <div className="text-sub3 text-sm w-full">{members.total} Members</div>
        <div className="text-sub3 text-sm w-full">5 Channels</div>
        <div className="text-sub3 text-sm w-full">{members.online} Online members</div>
      </div>
      <div className="bg-darker rounded-lg w-full p-4 flex flex-col gap-2 flex-shrink-0">
        <div className="font-black text-xs text-sub3">COMMUNITY MEMBER SINCE</div>
        <div className="text-sub3 text-sm w-full">{createdDate(member.joinTimestamp)}</div>
      </div>
      <div className="w-full flex items-center flex-shrink-0">
          <p className="font-black text-xs text-sub2 pt-4 pb-2">COMMUNITY MEMBERS</p>
      </div>
      {members?.members?.map((member, index) => {
        const display = member.display;
        const type = member.type;
        const count = member.count;
        const users = member.members;
        return(
          <div key={index} className="bg-darker rounded-lg text-sub3 w-full p-4 flex flex-col gap-2 flex-shrink-0">
            <div className="font-black text-xs text-sub3 flex">{display.toUpperCase()}<div className="ml-auto font-black">{count}</div></div>
            {users.map((user, index) => {
              return(
                <UserList key={index} id={user} offline={member.offline} />
              )
            })}
          </div>
        );
      })}
    </div>
  );
}