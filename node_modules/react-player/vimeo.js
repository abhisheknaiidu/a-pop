
      const { createReactPlayer } = require('./lib/ReactPlayer')
      const Player = require('./lib/players/Vimeo').default
      module.exports = createReactPlayer([Player])
    