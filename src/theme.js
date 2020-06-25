import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: red[400],
        }
    }
})

export default theme;