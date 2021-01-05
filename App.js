import React, {useEffect, useRef, useState} from 'react';

import {WebView} from 'react-native-webview';
import {BackHandler, Platform, SafeAreaView} from 'react-native';

const App = () => {
  const webView = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', HandleBackPressed);
      };
    }
  }, []);
  const HandleBackPressed = () => {
    if (webView.current) {
      webView.current.goBack();
      return true; // PREVENT DEFAULT BEHAVIOUR (EXITING THE APP)
    }
    return false;
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <WebView
          ref={webView}
          source={{
            uri: 'https://www.oilcp2.com',
          }}
          onError={() => {
            webView.reload();
          }}
          onNavigationStateChange={(navState) =>
            setCanGoBack(navState.canGoBack)
          }
        />
      </SafeAreaView>
    </>
  );
};

export default App;
