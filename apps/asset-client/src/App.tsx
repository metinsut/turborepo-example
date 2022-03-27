import './assets/scss/main.scss';
import './mixins/momentMixin';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  CssBaseline,
  StyledEngineProvider,
  StylesProvider,
  ThemeProvider,
  jssPreset
} from 'catamaran/core/mui';
import { BrowserRouter as Router } from 'react-router-dom';
import { SmoothSnackbar } from 'components/SmoothSnackbar';
import { Provider as StoreProvider } from 'react-redux';
import { create } from 'jss';
import ErrorBoundary from './errorBoundry';
import ScrollReset from './components/ScrollReset';
import jssExtend from 'jss-plugin-extend';
import routes, { renderRoutes } from './routes/routes';
import store from './store';
import theme from 'catamaran/theme';
import useTranslationInit from 'hooks/app/useTranslationInit';

const styleNode = document.createComment('jss-insertion-point');
const insertion = document.getElementById('insertion');
document.head.insertBefore(styleNode, insertion);

const jss = create({
  insertionPoint: 'jss-insertion-point',
  plugins: [...jssPreset().plugins, jssExtend()]
});

const AppContent = () => {
  useTranslationInit();

  return (
    <StylesProvider jss={jss}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <ErrorBoundary>
              <SmoothSnackbar />
              <ScrollReset />
              {renderRoutes(routes)}
            </ErrorBoundary>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </StylesProvider>
  );
};

const App = () => (
  <StoreProvider store={store}>
    <AppContent />
  </StoreProvider>
);

export default App;
