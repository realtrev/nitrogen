import { state } from '../DEV_API_STATE';

export default function handler(req, res) {
  const userId = state.user;
  const user = state.users.get(userId);
  const communities = [];
  user.communities?.forEach((communityId) => {
    const community = state.communities.get(communityId);
    communities.push({
      id: community.id,
      name: community.name
    });
  });
  if (userId === state.user && communities) {
    res.status(200).json(communities);
    return;
  }
  res.status(404).send();
}