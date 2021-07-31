import AppMenu from "./components/menu/app_menu";
import {createTheme, ThemeProvider} from "@material-ui/core"
import { deepPurple } from "@material-ui/core/colors";
import purple from '@material-ui/core/colors/purple';

const theme = createTheme({
  palette:{
    primary: deepPurple,
    type: 'light'
  },
  typography: {
    allVariants:{color: '#7c4dff'}
  }
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
          <AppMenu />
     </ThemeProvider>
    </div>
  );
}

export default App;
