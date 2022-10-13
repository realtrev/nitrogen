import { state } from '../DEV_API_STATE';

export default function handler(req, res) {
  const userId = state.user;
  const user = state.users.get(userId);
  if (userId === state.user && user) {
    res.status(200).json(user);
    return;
  }
  res.status(404).json({error: 'User not found'});
}