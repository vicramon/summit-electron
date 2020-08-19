// import { notarize } from 'electron-notarize';
import pkg from 'electron-notarize';
const { notarize } = pkg;

async function packageTask () {
  // Package your app here, and code sign with hardened runtime
  await notarize({
    appBundleId: 'com.summit.app',
    appPath: '../release-builds/Summit-darwin-x64/Summit.app',
    appleId: 'vicramon3@gmail.com',
    appleIdPassword: 'jwaj-doaw-rcgm-cqgr',
  });
}
packageTask();
