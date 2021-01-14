import Menu from './components/Menu';
import Page from './pages/Page';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { rrfProps } from './redux/store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <IonSplitPane contentId='main'>
              <Menu />
              <IonRouterOutlet id='main'>
                <Route path='/:name' component={Page} exact />
                <Redirect from='/' to='/Sequences' exact />
              </IonRouterOutlet>
            </IonSplitPane>
          </ReactReduxFirebaseProvider>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

export default App;
