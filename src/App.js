import React from 'react';
import { hot } from 'react-hot-loader';

import NotificationWidget from './components/notification-widget/NotificationWidget'

function App() {
  return (
    <div>
      <NotificationWidget/>
    </div>
  );
}
 
export default hot(module)(App);