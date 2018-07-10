import jwt_decode from 'jwt-decode';
import Promise from 'bluebird';

const MAX_JWT_REFRESHES = 10;
const JWT_REFRESH_COUNT_KEY = 'jwt_refresh_count';
export const CHECK_JWT_REFRESH_TIMER_KEY = 'check_jwt_refresh_timer';

export function getJWTExpirationDate(token) {
  const decoded = jwt_decode(token);
  const date = new Date(0);

  if (!decoded.exp) {
    return null;
  }

  date.setUTCSeconds(decoded.exp);

  return date;
}

export function checkJWTRefresh() {
  if (!shouldRefreshJWT()) {
    return stopJWTRefreshChecker();
  } else if (localStorage.GrizzGoogleToken) {
    if (isJWTExpired(localStorage.GrizzGoogleToken)) {
      refreshExpiredJWT();
    }
  }
}

export function shouldRefreshJWT() {
  return getJWTRefreshCount() < MAX_JWT_REFRESHES;
}

export function startJWTRefreshChecker() {
  // start the refresh checker (checking once / min)
  return localStorage.setItem(
    CHECK_JWT_REFRESH_TIMER_KEY,
    setInterval(checkJWTRefresh, 60000)
  );
}

export function stopJWTRefreshChecker() {
  return clearInterval(localStorage.check_jwt_refresh_timer);
}

export function resetJWTRefreshCount() {
  return localStorage.setItem(JWT_REFRESH_COUNT_KEY, 0);
}

export function isJWTExpired(token) {
  const date = getJWTExpirationDate(token);

  if (date === null) {
    return false;
  }

  return !(date.valueOf() > new Date().valueOf());
}

export function refreshExpiredJWT() {
  window.gapi.load('auth2', function() {
    const existingAuthInstance = window.gapi.auth2.getAuthInstance();
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
          return res.currentUser.get();
        });
    }

    return currentUserPromise
      .then(currentGoogleUser => {
        return currentGoogleUser.reloadAuthResponse();
      })
      .then(function(newAuthResponse) {
        localStorage.setItem('GrizzGoogleToken', newAuthResponse.id_token);
        localStorage.setItem(JWT_REFRESH_COUNT_KEY, getJWTRefreshCount() + 1);
      });
  });
}

function getJWTRefreshCount() {
  if (localStorage.jwt_refresh_count) {
    return parseInt(localStorage.jwt_refresh_count, 10);
  } else return 0;
}
