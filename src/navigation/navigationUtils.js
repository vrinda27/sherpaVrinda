// RootNavigation.js

import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function _navigate() {
  if (navigationRef.isReady()) {
    navigationRef.reset({
        index: 1,
        routes: [{name: 'Signin'}],
      })
  }
}

// add other navigation functions that you need and export them