import { state } from '../../../DEV_API_STATE';

export default function handler(req, res) {
  if (!state.users.get(state.user)?.communities?.includes(req.query.id)) {
    return res.status(404).send();
  }
  const community = state.communities.get(req.query.id);
  const member = req.query.member;

  if (community) {
    const member = community.members.find((member) => member.id === req.query.member);
    if (member) {
      res.status(200).json(member);
    }
  }
  res.status(404).send();
}