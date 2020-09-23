
      const { createReactPlayer } = require('./lib/ReactPlayer')
      const Player = require('./lib/players/Twitch').default
      module.exports = createReactPlayer([Player])
    