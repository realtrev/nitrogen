import { state } from "../../DEV_API_STATE";

export default function handler(req, res) {
  const directMessageId = `${state.user}${req.query.dm}`;
  const directMessage = state.directMessages.get(directMessageId);
  const channelMessages = state.messages.get(directMessageId);
  if (directMessage) {
    res.status(200).json({id: directMessage, messages: channelMessages});
    return;
  }
  res.status(404).json({ error: "Direct message channel not found" });
}