import { state } from '../../DEV_API_STATE';

export default function handler(req, res) {
  if (!state.users.get(state.user)?.communities?.includes(req.query.id)) {
    return res.status(404).send();
  }
  const community = state.communities.get(req.query.id);
  community.channels.forEach((channel) => {
    channel.messages = undefined;
  });

  if (community) {
    res.status(200).json(community);
    return;
  }
  res.status(404).json({error: 'Community not found'});
}