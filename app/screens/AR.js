import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

const MyWebView = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: "https://www.linkedin.com/pulse/react-native-3d-bim-musa-mthimunye?trk=article-ssr-frontend-pulse_more-articles_related-content-card"
        }}
      />
    </View>
  );
};
export default MyWebView;
