
      const { createReactPlayer } = require('./lib/ReactPlayer')
      const Player = require('./lib/players/YouTube').default
      module.exports = createReactPlayer([Player])
    