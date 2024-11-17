import { state } from '../../DEV_API_STATE';

export default async function handler(req, res) {
  const user = state.users.get(req.query.id);
  if (user) {
    // get image from url
    const image = await fetch(user.profileUrl);
    console.log(user.profileUrl);
    
    // set content type
    res.setHeader('Content-Type', 'image/png');
    // send image
    res.send(image);
    return;
  }
  res.status(404).send();
}