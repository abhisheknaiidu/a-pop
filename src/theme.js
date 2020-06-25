import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: red[400],
        },
        secondary: {
            main: '#000000',
        }
    }
})

export default theme;