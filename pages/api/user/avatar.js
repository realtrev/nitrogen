import { state } from '../DEV_API_STATE';

export default async function handler(req, res) {
  const user = state.users.get(state.user);
  console.log(state.user);
  if (user) {
    // get image from url
    const image = await fetch(user.profileUrl);
    // convert image to buffer
    const buffer = await image.buffer();
    // set content type
    res.setHeader('Content-Type', 'image/png');
    // send image
    res.send(buffer);
    return;
  }
  res.status(404).send();
}