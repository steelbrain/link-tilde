#!/usr/bin/env node

const os = require('os')
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

function main() {
  if (os.platform() === 'win32') {
    console.warn('[WARNING] link-tilde does not work on Windows due to Filesystem naming restrictions')
    return null
  }

  const workingDirectory = process.cwd()
  const manifestPath = path.join(workingDirectory, 'package.json')
  const errorPS = `manifest file at '${manifestPath}'`

  let manifestContents

  try {
    manifestContents = fs.readFileSync(manifestPath, 'utf8')
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return `Manifest file not found at '${manifestPath}'`
    }
    return (error && error.message) || `Unknown Error reading ${errorPS}`
  }

  try {
    manifestContents = JSON.parse(manifestContents)
  } catch (error) {
    return `Malformed JSON found in ${errorPS}`
  }

  const { tildeDirectory } = manifestContents && typeof manifestContents === 'object' ? manifestContents : {}

  if (typeof tildeDirectory !== 'string') {
    return `.tildeDirectory not specified in ${errorPS}`
  }

  const resolvedDirectory = path.resolve(tildeDirectory)
  const targetPath = path.join(workingDirectory, 'node_modules', '~')

  try {
    fs.statSync(resolvedDirectory)
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return `Resolved tilde directory not found at '${resolvedDirectory}'`
    }
    return (error && error.message) || 'Unknown error confirming existence of tilde target directory'
  }

  try {
    fs.unlinkSync(targetPath)
  } catch (error) {
    if (!error || error.code !== 'ENOENT') {
      return (error && error.message) || 'Unknown error unlinking existing tilde directory'
    }
  }

  try {
    mkdirp.sync(path.dirname(targetPath))
  } catch (error) {
    return (error && error.message) || 'Unknown error creating node_modules in target directory'
  }

  try {
    fs.symlinkSync(fs.realpathSync(resolvedDirectory), targetPath)
  } catch (error) {
    return (error && error.message) || 'Unknown error symlinking tilde directory to node_modules'
  }

  return null
}

const errorMessage = main()
if (errorMessage) {
  console.error(errorMessage)
  process.exit(1)
}
