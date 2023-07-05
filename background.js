chrome.runtime.onMessage.addListener( data => {
  if ( data.type === 'notification' ) {
    notify( data.message );
  }
});

chrome.runtime.onInstalled.addListener( () => {
  chrome.contextMenus.create({
    id: 'notify',
    title: "Notify!: %s", 
    contexts:[ "selection" ]
  });
});

chrome.contextMenus.onClicked.addListener( ( info, tab ) => {
  if ( 'notify' === info.menuItemId ) {
    notify( info.selectionText );
  }
} );

const notify = message => {
  return chrome.notifications.create(
    '',
    {
      type: 'basic',
      title: 'Notify!',
      message: message || 'Notify!',
      iconUrl: './assets/icons/128.png',
    }
  );
};
