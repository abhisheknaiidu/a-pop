
      const { createReactPlayer } = require('./lib/ReactPlayer')
      const Player = require('./lib/players/SoundCloud').default
      module.exports = createReactPlayer([Player])
    