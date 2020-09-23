
      const { createReactPlayer } = require('./lib/ReactPlayer')
      const Player = require('./lib/players/Wistia').default
      module.exports = createReactPlayer([Player])
    