const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

// Get the default Metro configuration for the project
const defaultConfig = getDefaultConfig(__dirname);

// Merge additional custom config
const customConfig = {
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, 'png', 'jpg', 'jpeg'], // Add asset extensions
  },
};

// Wrap the config with the Reanimated wrapper and merge
module.exports = wrapWithReanimatedMetroConfig(mergeConfig(defaultConfig, customConfig));



// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('metro-config').MetroConfig}
//  */

// const {
//     wrapWithReanimatedMetroConfig,
//   } = require('react-native-reanimated/metro-config');
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
// module.exports = wrapWithReanimatedMetroConfig(config);
