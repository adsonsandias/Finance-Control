const path = require('path')
// Removendo a dependência de ModuleScopePlugin que está causando problemas
// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')

module.exports = {
  webpack: {
    alias: {
      '@shared': path.resolve(__dirname, '../../shared'),
    },
    configure: (webpackConfig) => {
      // Remove ModuleScopePlugin to allow imports outside src/
      // Comentando esta parte para evitar o erro com ModuleScopePlugin
      // webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
      //   (plugin) => !(plugin instanceof ModuleScopePlugin)
      // )

      // Add TypeScript loader for shared directory
      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf)
      if (oneOfRule) {
        const tsRule = oneOfRule.oneOf.find(
          (rule) => rule.test && rule.test.toString().includes('tsx')
        )
        if (tsRule) {
          tsRule.include = [tsRule.include, path.resolve(__dirname, '../../shared')]
        }
      }

      return webpackConfig
    },
  },
}
