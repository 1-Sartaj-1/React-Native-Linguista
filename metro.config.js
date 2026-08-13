// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// zustand's ESM build (zustand/esm/middleware.mjs) references `import.meta.env`
// for Vite compatibility. On web, Metro bundles everything into a classic
// (non-module) <script>, and a classic script can't contain `import.meta`
// syntax at all — the whole bundle fails to parse, producing a blank white
// screen. Force zustand to resolve its CommonJS build instead, which uses
// `process.env.NODE_ENV` and has no such issue.
const { resolveRequest } = config.resolver;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "zustand" || moduleName.startsWith("zustand/")) {
    return { type: "sourceFile", filePath: require.resolve(moduleName) };
  }
  return resolveRequest
    ? resolveRequest(context, moduleName, platform)
    : context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativewind(config);
