import { state } from '../../../DEV_API_STATE';

export default function handler(req, res) {
  if (!state.users.get(state.user)?.communities?.includes(req.query.id)) {
    return res.status(404).send();
  }
  const community = state.communities.get(req.query.id);

  if (community) {
    const filterMembers = getMembers(community.memberData);
    // add the number of members together exept offline members
    const online = filterMembers.reduce((acc, cur) => acc + (cur.offline ? 0 : cur.count), 0);
    const total = filterMembers.reduce((acc, cur) => acc + cur.count, 0);
    res.status(200).json({online: online, total: total, members: filterMembers});
  }
  res.status(404).send();
}

// this function is used to only return certain members from the database
// it allows members to be loaded in batches so that we only display the necessary members
function getMembers(data, start = 0, count = 50) {
  // create an empty array to store the new data
  const res = [];
  let skipsLeft = start;
  let countsLeft = count;

  // for each set of data
  // example: {display: 'Online ', type: 'SYSTEM', priority: 0, count: 1, icon: null, members: [1...n]}
  data.forEach((set) => {
    // if we have already skipped enough members, skip this set
    if (set.members.length > skipsLeft) {
      // if the set has more than 10 members
      // we will update the skips we have made at the end
      // find how far to the end of the set we are after skipping
      const distanceToEnd = set.members.length - skipsLeft;
      // if the distance to the end is greater than the counts we have left
      if (distanceToEnd < countsLeft) {
        // select the rest of the set
        set.members = set.members.slice(skipsLeft);
        // remove how many items we counted,
        // which is to the end of the set
        countsLeft -= distanceToEnd;
      } else {
        // the slice will end inside the set
        // we only want to take the desired amount of members
        // so we select only between the skips and the amount we want
        set.members = set.members.slice(skipsLeft, countsLeft);
        // remove how many items we counted,
        // which should be all of the items
        countsLeft = 0;
      }
      skipsLeft = 0;
    } else {
      // if the skip number is greater than the length of the set
      // then it will pass over the whole set and take no elements
      // we will remove the amount we skipped from the amount left to skip
      skipsLeft -= set.members.length;
      set.members = [];
    }
    // push the copy of the set to the result array
    res.push(set);
  });

  // return the result array
  return res;
}