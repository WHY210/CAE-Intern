import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

const MyWebView = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: "https://viewer.autodesk.com/id/dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YTM2MHZpZXdlci1wcm90ZWN0ZWQvdDE2OTEyMzc5NTZfNzQ4ZTEwZDItYmJlZi00YjBhLTkwZmUtZDc4ODhhNWRhYzAzLmR3Zw?sheetId=Njg4MmJlNDgtNjYyNi01MjM4LWQzZGYtOTRlOWYwYTAwMTlk"
        }}
      />
    </View>
  );
};
export default MyWebView;
