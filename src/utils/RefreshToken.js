import jwt_decode from 'jwt-decode';
import Promise from 'bluebird';

const MAX_JWT_REFRESHES = 10;
const JWT_REFRESH_COUNT_KEY = 'jwt_refresh_count';
export const CHECK_JWT_REFRESH_TIMER_KEY = 'check_jwt_refresh_timer';

export function getJWTExpirationDate(token) {
  // console.log('Getting exp');
  const decoded = jwt_decode(token);
  const date = new Date(0);

  if (!decoded.exp) {
    return null;
  }

  date.setUTCSeconds(decoded.exp);

  return date;
}

export function checkJWTRefresh() {
  // console.log('Checking now');

  if (!shouldRefreshJWT()) {
    return stopJWTRefreshChecker();
  }

  if (localStorage.GrizzGoogleToken) {
    if (isJWTExpired(localStorage.GrizzGoogleToken)) {
      refreshExpiredJWT();
    }
  }
  // else {
  //   console.log('No token found');
  // }
}

export function shouldRefreshJWT() {
  // console.log('Should Refresh?');
  return getJWTRefreshCount() < MAX_JWT_REFRESHES;
}

export function startJWTRefreshChecker() {
  // start the refresh checker (checking once / 5min)
  // console.log('Start checking');
  return localStorage.setItem(
    CHECK_JWT_REFRESH_TIMER_KEY,
    setInterval(checkJWTRefresh, 300000)
  );
}

export function stopJWTRefreshChecker() {
  // console.log('Stop checking');
  return clearInterval(localStorage.CHECK_JWT_REFRESH_TIMER_KEY);
}

export function resetJWTRefreshCount() {
  return localStorage.setItem(JWT_REFRESH_COUNT_KEY, 0);
}

export function isJWTExpired(token) {
  // console.log('Expired?');
  const date = getJWTExpirationDate(token);

  if (date === null) {
    // console.log('Yes');
    return false;
  }
  // console.log('No');
  return !(date.valueOf() > new Date().valueOf());
}

export function refreshExpiredJWT() {
  // console.log('Refreshing');
  window.gapi.load('auth2', function() {
    const existingAuthInstance = window.gapi.auth2.getAuthInstance();
    // console.log('Getting existingAuthInstance');
    let currentUserPromise;

    if (existingAuthInstance) {
      currentUserPromise = Promise.resolve(
        existingAuthInstance.currentUser.get()
      );
    } else {
      currentUserPromise = window.gapi.auth2
        .init({
          client_id:
            '296954481305-plmc2jf1o7j7t0aignvp73arbk2mt3pq.apps.googleusercontent.com',
          scope:
            'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email openid email profile'
        })
        .then(function(res) {
          // console.log('res');
          // console.log(res);
          return res.currentUser.get();
        });
    }

    return currentUserPromise
      .then(currentGoogleUser => {
        // console.log('currentGoogleUser');
        // console.log(currentGoogleUser);
        return currentGoogleUser.reloadAuthResponse();
      })
      .then(function(newAuthResponse) {
        // console.log('newAuthResponse');
        // console.log(newAuthResponse);
        localStorage.setItem('GrizzGoogleToken', newAuthResponse.id_token);
        localStorage.setItem(JWT_REFRESH_COUNT_KEY, getJWTRefreshCount() + 1);
      });
  });
}

function getJWTRefreshCount() {
  //  console.log('Counting');
  return parseInt(localStorage.JWT_REFRESH_COUNT_KEY || '0', 10);
}
