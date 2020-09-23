
      const { createReactPlayer } = require('./lib/ReactPlayer')
      const Player = require('./lib/players/Vidyard').default
      module.exports = createReactPlayer([Player])
    