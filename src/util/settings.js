import micropub from './micropub';
import {DEFAULT_REACJI} from '../constants';

const KEYS = [
  'defaultToCurrentPage',
  'autoSlug',
  'closeAfterPosting',
  'debugLog',
  'reacji',
  'slug',
  'syndicateTo',
];

const DEFAULT_SETTINGS = {
  defaultToCurrentPage: false,
  autoSlug: false,
  closeAfterPosting: true,
  debugLog: false,
  reacji: DEFAULT_REACJI,
  slug: 'mp-slug',
  syndicateTo: 'mp-syndicate-to',
};

export function getSettings() {
  const settings = JSON.parse(localStorage.getItem('settings'));
  if (settings) {
    return settings;
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings) {
  const clean = {};
  KEYS.forEach(key => {
    clean[key] = settings[key];
  });
  localStorage.setItem('settings', JSON.stringify(clean));
}

export function saveAuthenticationDetails(domain, token, micropubEndpoint) {
  if (domain) {
    localStorage.setItem('domain', domain);
    micropub.options.me = domain;
  }
  if (token) {
    localStorage.setItem('token', token);
    micropub.options.token = token;
  }
  if (micropubEndpoint) {
    localStorage.setItem('micropubEndpoint', micropubEndpoint);
    micropub.options.micropubEndpoint = micropubEndpoint;
  }
}

export function getSyndicateOptions() {
  const options = localStorage.getItem('syndicateTo');
  if (options && options !== 'undefined') {
    return JSON.parse(options);
  } else {
    // Fix bad data from omnibear v1.0.0 bug that saved 'undefined' to localStorage
    localStorage.setItem('syndicateTo', '[]');
    return [];
  }
}
