
      const { createReactPlayer } = require('./lib/ReactPlayer')
      const Player = require('./lib/players/Streamable').default
      module.exports = createReactPlayer([Player])
    