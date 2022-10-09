import { state } from '../../../../DEV_API_STATE';

export default function handler(req, res) {
  if (!state.users.get(state.user)?.communities?.includes(req.query.id)) {
    return  res.status(404).send();
  }
  const communityId = req.query.id;
  const channelId = req.query.channel;
  const community = state.communities.get(communityId);
  const channel = community.channels.filter((channel) => channel.id === channelId)[0];
  const initialMessageCount = 30;
  if (channel) {
    if (channel.messages.length > initialMessageCount) {
      channel.messages = channel.messages.slice(0, initialMessageCount);
    }
    res.status(200).json(channel.messages);
    return;
  }
  res.status(404).send();
}