import { state } from '../../DEV_API_STATE';

export default function handler(req, res) {
  const userId = req.query.id;
  let user = state.users.get(userId);
  if (user) {
    if (user.id !== state.user) {
        user = {
        id: user.id,
        name: user.name,
        joinTimestamp: user.joinTimestamp,
      }
    }
    res.status(200).json(user);
    return;
  }
  res.status(404).json({error: 'User not found'});
}