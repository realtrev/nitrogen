export const state = {
  communities: new Map(),
  users: new Map(),
  messages: new Map(),
  directMessages: new Map(),
  user: "465613580096765973"
}

state.communities.set('1016778719202902088', {
  id: "1016778719202902088",
  name: 'Community 1',
  description: 'This is the first community',
  profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80',
  createdTimestamp: 1620000000000,
  members: [
    {id: "342013001479749643", roles: ['Owner'], status: 'ONLINE'}, // AugieDog08
    {id: "465613580096765973", roles: ['Owner'], status: 'ONLINE'}, // Paridax
    {id: "762765642830315530", roles: ['Member'], status: 'ONLINE'}, // FatRatWithAHat
    {id: "457710227240779790", roles: ['Member'], status: 'OFFLINE'}, // Cloudyy
    {id: "494249333986689035", roles: ['Member'], status: 'ONLINE'}, // Countwinston
  ],
  channels: [
    {id: "859446262197387266", name: 'General', type: 'text', description: 'General chat for the community', messages: [
      {id: "342013001479749643", content: 'Hello world!', timestamp: 1620000000000},
      {id: "465613580096765973", content: 'Hello world!', timestamp: 1619999997000},
      {id: "762765642830315530", content: 'Hello world!', timestamp: 1619999994000},
      {id: "457710227240779790", content: 'Hello world!', timestamp: 1619999991000},
      {id: "494249333986689035", content: 'Hello world!', timestamp: 1619999988000},
    ]},
    {id: "859446301044375592", name: 'Media', type: 'text', description: 'Media chat for the community', messages: [
      {id: "342013001479749643", content: 'Hello media chat!', timestamp: 1620000000000},
      {id: "465613580096765973", content: 'Hello media chat!', timestamp: 1619999997000},
      {id: "762765642830315530", content: 'Hello media chat!', timestamp: 1619999994000},
      {id: "457710227240779790", content: 'Hello media chat!', timestamp: 1619999991000},
      {id: "494249333986689035", content: 'Hello media chat!', timestamp: 1619999988000},
    ]},
    {id: "865340740565073931", name: 'Voice', type: 'voice', description: 'Voice chat for the community', messages: [
      {id: "342013001479749643", content: 'Hello voice chat!', timestamp: 1620000000000},
      {id: "465613580096765973", content: 'Hello voice chat!', timestamp: 1619999997000},
      {id: "762765642830315530", content: 'Hello voice chat!', timestamp: 1619999994000},
      {id: "457710227240779790", content: 'Hello voice chat!', timestamp: 1619999991000},
      {id: "494249333986689035", content: 'Hello voice chat!', timestamp: 1619999988000},
    ]},
    {id: "859446280539209748", name: 'Music', type: 'voice', description: 'Music chat for the community', messages: [
      {id: "342013001479749643", content: 'Hello music chat!', timestamp: 1620000000000},
      {id: "465613580096765973", content: 'Hello music chat!', timestamp: 1619999997000},
      {id: "762765642830315530", content: 'Hello music chat!', timestamp: 1619999994000},
      {id: "457710227240779790", content: 'Hello music chat!', timestamp: 1619999991000},
      {id: "494249333986689035", content: 'Hello music chat!', timestamp: 1619999988000},
    ]},
    {id: "861288761072287765", name: 'Bot Commands', type: 'text', description: 'Bot commands for the community', messages: [
      {id: "342013001479749643", content: 'Hello bot commands!', timestamp: 1620000000000},
      {id: "465613580096765973", content: 'Hello bot commands!', timestamp: 1619999997000},
      {id: "762765642830315530", content: 'Hello bot commands!', timestamp: 1619999994000},
      {id: "457710227240779790", content: 'Hello bot commands!', timestamp: 1619999991000},
      {id: "494249333986689035", content: 'Hello bot commands!', timestamp: 1619999988000},
    ]},
    {id: "962560672892321832", name: 'Other', type: 'text', description: 'Other chat for the community', messages: [
      {id: "342013001479749643", content: 'Hello other chat!', timestamp: 1620000000000},
      {id: "465613580096765973", content: 'Hello other chat!', timestamp: 1619999997000},
      {id: "762765642830315530", content: 'Hello other chat!', timestamp: 1619999994000},
      {id: "457710227240779790", content: 'Hello other chat!', timestamp: 1619999991000},
      {id: "494249333986689035", content: 'Hello other chat!', timestamp: 1619999988000},
    ]},
  ],
  roles: [
    {id: "11231435454323", name: 'Owner', color: '#dd5600'},
    {id: "25463654886457", name: 'Member', color: '#55DD55'},
  ],
});

state.communities.set('996579178004631592', {
  id: "996579178004631592",
  name: 'Community 2',
  description: 'This is the second community',
  profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80',
  createdTimestamp: 1620000000000,
  members: [
    {id: "342013001479749643", roles: ['Owner'], status: 'ONLINE'}, // AugieDog08
    {id: "465613580096765973", roles: ['Owner'], status: 'ONLINE'}, // Paridax
    {id: "762765642830315530", roles: ['Member'], status: 'ONLINE'}, // FatRatWithAHat
    {id: "457710227240779790", roles: ['Member'], status: 'OFFLINE'}, // Cloudyy
    {id: "494249333986689035", roles: ['Member'], status: 'ONLINE'}, // Countwinston
  ],
  channels: [
    {id: "1", name: 'General', type: 'text', description: 'General chat for the community', messages: [
      {id: "342013001479749643", content: 'Hello world 2!', timestamp: 1620000000000},
      {id: "465613580096765973", content: 'Hello world 22!', timestamp: 1619999997000},
      {id: "762765642830315530", content: 'Hello world 222!', timestamp: 1619999994000},
      {id: "457710227240779790", content: 'Hello world 2222!', timestamp: 1619999991000},
      {id: "494249333986689035", content: 'Hello world 22222!', timestamp: 1619999988000},
    ]},
    {id: "2", name: 'Media', type: 'text', description: 'Media chat for the community', messages: [
      {id: "342013001479749643", content: 'Hello media chat 2!', timestamp: 1620000000000},
      {id: "465613580096765973", content: 'Hello media chat 22!', timestamp: 1619999997000},
      {id: "762765642830315530", content: 'Hello media chat 222!', timestamp: 1619999994000},
      {id: "457710227240779790", content: 'Hello media chat 2222!', timestamp: 1619999991000},
      {id: "494249333986689035", content: 'Hello media chat 22222!', timestamp: 1619999988000},
    ]},
    {id: "3", name: 'Voice', type: 'voice', description: 'Voice chat for the community', messages: [
      {id: "342013001479749643", content: 'Hello voice chat 2!', timestamp: 1620000000000},
      {id: "465613580096765973", content: 'Hello voice chat 22!', timestamp: 1619999997000},
      {id: "762765642830315530", content: 'Hello voice chat 222!', timestamp: 1619999994000},
      {id: "457710227240779790", content: 'Hello voice chat 2222!', timestamp: 1619999991000},
      {id: "494249333986689035", content: 'Hello voice chat 22222!', timestamp: 1619999988000},
    ]},
    {id: "4", name: 'Music', type: 'voice', description: 'Music chat for the community', messages: [
      {id: "342013001479749643", content: 'Hello music chat 2!', timestamp: 1620000000000},
      {id: "465613580096765973", content: 'Hello music chat 22!', timestamp: 1619999997000},
      {id: "762765642830315530", content: 'Hello music chat 222!', timestamp: 1619999994000},
      {id: "457710227240779790", content: 'Hello music chat 2222!', timestamp: 1619999991000},
      {id: "494249333986689035", content: 'Hello music chat 22222!', timestamp: 1619999988000},
    ]},
    {id: "5", name: 'Bot Commands', type: 'text', description: 'Bot commands for the community', messages: [
      {id: "342013001479749643", content: 'Hello bot commands 2!', timestamp: 1620000000000},
      {id: "465613580096765973", content: 'Hello bot commands 22!', timestamp: 1619999997000},
      {id: "762765642830315530", content: 'Hello bot commands 222!', timestamp: 1619999994000},
      {id: "457710227240779790", content: 'Hello bot commands 2222!', timestamp: 1619999991000},
      {id: "494249333986689035", content: 'Hello bot commands 22222!', timestamp: 1619999988000},
    ]},
    {id: "6", name: 'Other', type: 'text', description: 'Other chat for the community', messages: [
      {id: "342013001479749643", content: 'Hello other chat 2!', timestamp: 1620000000000},
      {id: "465613580096765973", content: 'Hello other chat 22!', timestamp: 1619999997000},
      {id: "762765642830315530", content: 'Hello other chat 222!', timestamp: 1619999994000},
      {id: "457710227240779790", content: 'Hello other chat 2222!', timestamp: 1619999991000},
      {id: "494249333986689035", content: 'Hello other chat 22222!', timestamp: 1619999988000},
    ]},
  ],
  roles: [
    {id: "1", name: 'Owner', color: '#00a0aa'},
    {id: "2", name: 'Member', color: '#a0fa00'},
  ],
});


state.messages.set("3312132231431143321", [
  {id: "342013001479749643", content: 'Hello world 2!', timestamp: 1620000000000},
  {id: "465613580096765973", content: 'Hello world 22!', timestamp: 1619999997000},
  {id: "342013001479749643", content: 'Hello world 2!', timestamp: 1620000000000},
  {id: "465613580096765973", content: 'Hello world 22!', timestamp: 1619999997000},
]);

state.directMessages.set("342013001479749643465613580096765973", "3312132231431143321");
state.directMessages.set("465613580096765973342013001479749643", "3312132231431143321");


state.users.set("342013001479749643", {
  id: "342013001479749643",
  name: 'AugieDog08',
  profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80',
  status: 'online',
  customStatus: null,
  pinnedChannels: [],
  communities: [
    "996579178004631592"
  ]
});
state.users.set("465613580096765973", {
  id: "465613580096765973",
  name: 'Paridax',
  profileUrl: 'https://cdn.discordapp.com/avatars/465613580096765973/bb548f99066f2ffaa463439b78e29712.webp?size=80',
  status: 'online',
  customStatus: null,
  pinnedChannels: [],
  communities: [
    "996579178004631592"
  ]
});
state.users.set("762765642830315530", {id: "762765642830315530", name: 'FatRatWithAHat', profileUrl: 'https://cdn.discordapp.com/avatars/762765642830315530/d97c52aa52dd654cb5019f9b72048094.webp?size=80'});
state.users.set("457710227240779790", {id: "457710227240779790", name: 'Cloudyy', profileUrl: 'https://cdn.discordapp.com/avatars/457710227240779790/4375a48ba3b6302e454620dc2b133000.webp?size=80'});
state.users.set("494249333986689035", {id: "494249333986689035", name: 'Countwinston', profileUrl: 'https://cdn.discordapp.com/avatars/494249333986689035/0d02459acd8fc96d8a7950a3d5fa0cde.webp?size=80'});
state.users.set("831632584429535252", {id: "831632584429535252", name: 'BOT Carbon', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
state.users.set("808501493266776095", {id: "808501493266776095", name: 'BOT Nitrogen', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
state.users.set("553712745992945679", {id: "553712745992945679", name: 'nogel', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
state.users.set("1009141447443882097", {id: "1009141447443882097", name: 'adritempo', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
state.users.set("771034691762389012", {id: "771034691762389012", name: 'Onii-chan', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
state.users.set("530029729667874817", {id: "530029729667874817", name: 'ParidAlt', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
state.users.set("673323066331496466", {id: "673323066331496466", name: 'ChilledPaper', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});
state.users.set("768919954232705035", {id: "768919954232705035", name: 'MasterColbat', profileUrl: 'https://cdn.discordapp.com/avatars/342013001479749643/da1363e9c00ca067921f1bf44f4d9ded.webp?size=80'});