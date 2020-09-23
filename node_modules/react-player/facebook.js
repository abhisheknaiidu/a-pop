
      const { createReactPlayer } = require('./lib/ReactPlayer')
      const Player = require('./lib/players/Facebook').default
      module.exports = createReactPlayer([Player])
    