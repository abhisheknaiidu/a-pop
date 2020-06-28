import { createMuiTheme } from '@material-ui/core/styles'
import { deepPurple } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: deepPurple[200],
        },
        secondary: {
            main: deepPurple[200],
        }
    },
    typography: {
        fontFamily: 'Roboto, Arial',
      }
})

export default theme;