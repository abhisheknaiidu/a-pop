
      const { createReactPlayer } = require('./lib/ReactPlayer')
      const Player = require('./lib/players/DailyMotion').default
      module.exports = createReactPlayer([Player])
    