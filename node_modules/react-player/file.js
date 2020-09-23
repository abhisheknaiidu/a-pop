
      const { createReactPlayer } = require('./lib/ReactPlayer')
      const Player = require('./lib/players/FilePlayer').default
      module.exports = createReactPlayer([Player])
    