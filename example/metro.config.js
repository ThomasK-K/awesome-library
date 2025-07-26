const path = require('path');
const fs = require('fs');
const { getDefaultConfig } = require('@expo/metro-config');

// Find the project and workspace directories
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

// 1. Watch all files within the monorepo
const watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages and in what order
const nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
const extraNodeModules = {
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  'react': path.resolve(projectRoot, 'node_modules/react'),
  'tkk-rn-component-package': path.resolve(workspaceRoot, 'src'),
};

const config = getDefaultConfig(projectRoot);

config.watchFolders = watchFolders;
config.resolver.nodeModulesPaths = nodeModulesPaths;
config.resolver.extraNodeModules = extraNodeModules;

// Add resolution for the library source files
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'tkk-rn-component-package') {
    return {
      filePath: path.resolve(workspaceRoot, 'src/index.tsx'),
      type: 'sourceFile',
    };
  }
  
  // Let Metro handle everything else
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
