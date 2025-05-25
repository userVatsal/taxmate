module.exports = {
  hooks: {
    readPackage(pkg) {
      // Ensure sharp is only used at build time
      if (pkg.name === 'sharp') {
        pkg.optionalDependencies = pkg.optionalDependencies || {}
        pkg.optionalDependencies['sharp'] = pkg.version
        delete pkg.dependencies['sharp']
      }

      // Handle any other package-specific requirements
      if (pkg.dependencies) {
        // Ensure we're using compatible versions
        if (pkg.dependencies['next']) {
          pkg.dependencies['next'] = '15.2.4'
        }
      }

      return pkg
    }
  }
} 