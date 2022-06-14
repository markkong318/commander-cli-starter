const _ = require('lodash');

// const envStore = require('./storage/env-store');
// const configStore = require('./storage/config-store');
// const auth = require('../framework/net/auth');
//
// const URI_QA = 'https://admin.qa.rgames.jp/lg/api/';
// const URI_PROD = 'https://admin.rgames.jp/lg/api/';

module.exports = new Proxy(this, {
  get: function (target, prop, receiver) {
    const name = _.kebabCase(prop);

    const path = `../api/${name}`;
    console.debug(`api: ${path}`);

    const fn = require(path);

    return async function () {
      // let idToken = configStore.get('idToken');
      //
      // if (!idToken) {
      //   const secret = envStore.get('secret');
      //   if (!secret) {
      //     throw new Error('No secret. Please set secret in your config');
      //   }
      //
      //   let refreshToken = envStore.get('refreshToken');
      //
      //   if (!refreshToken) {
      //     const port = await auth.getPort();
      //
      //     await auth.openAuthUrl({ port });
      //     const code = await auth.startServer({ port });
      //     refreshToken = await auth.getRefreshToken({ port, secret, code });
      //
      //     configStore.set('refreshToken', refreshToken);
      //   }
      //
      //   try {
      //     idToken = await auth.getIdToken({ secret, refreshToken });
      //   } catch (e) {
      //     throw new Error(`Fail to get id token. Refresh token may be invalid. Please run "lgdadmin login" again`);
      //   }
      //
      //   envStore.set('idToken', idToken);
      // }
      //
      // const uri = envStore.get('uri') || envStore.get('qa') ? URI_QA: URI_PROD;
      // const authorization = `Bearer ${idToken}`;
      //
      // console.debug(`uri: ${uri}`);
      // console.debug(`authorization: ${authorization}`);

      const args = [...arguments];

      args[0] = {
        // authorization,
        // uri,
        ...args[0],
      };

      return await fn(...args);
    }
  },
});
