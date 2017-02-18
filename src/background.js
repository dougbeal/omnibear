
var authTabId = null;

function handleMessage(request, sender, sendResponse) {
  switch (request.action) {
    case 'begin-auth':
      handleBeginAuth(request.payload);
      break;
  }
}

function handleBeginAuth(payload) {
  localStorage.setItem('domain', payload.domain);
  authTabId = payload.tabId;
}

function handleTabChange (tabId, changeInfo, tab) {
  if (tabId !== authTabId || !isSuccessfulAuth(changeInfo)) {
    return;
  }
  var code = getParamFromUrl('code', changeInfo.url);
  fetchToken(code)
  .then(function (data) {
    var token = getParamFromUrlString('access_token', data);
    localStorage.setItem('token', token)
    chrome.tabs.remove(tab.id);
    authTabId = null;
  });
}

function isSuccessfulAuth (changeInfo) {
  var url = 'http://omnibear.com/auth/success';
  return changeInfo.status === 'loading' && changeInfo.url && changeInfo.url.startsWith(url);
}

// TODO: move some of these to utils

function getParamFromUrl(paramName, url) {
  var params = url.split('?')[1];
  return getParamFromUrlString(paramName, params);
}

function getParamFromUrlString(paramName, params) {
  var matches = params.split('&').filter(param => param.startsWith(`${paramName}=`));
  if (matches && matches.length) {
    return matches[0].substr(paramName.length + 1);
  } else {
    return null;
  }
}

function fetchToken(code) {
  var params = getParamString({
    code: code,
    redirect_uri: 'http://omnibear.com/auth/success/',
    client_id: 'http://omnibear.com',
    me: 'http://keithjgrant.com'
  });
  return fetch('https://tokens.indieauth.com/token?' + params, {
    method: 'POST'
  })
  .then(function (res) {
    return res.text();
  });
}

function getParamString(payload) {
  var params = [];
  for (var prop in payload) {
    params.push(`${prop}=${payload[prop]}`);
  }
  return params.join('&');
}

module.exports = function () {
  chrome.runtime.onMessage.addListener(handleMessage);
  chrome.tabs.onUpdated.addListener(handleTabChange);
}