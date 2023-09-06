import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const DWGViewer = () => {
  const html = `
    <!DOCTYPE html>
    

<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.css">
    <script src="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.js"></script>
</head>

<body>
  <h1>FORGE VIEWER<h1>
  <div id="forgeViewer"></div>
</body>
<script>

var viewer;
var options = {
    env: 'AutodeskProduction',
    api: 'derivativeV2',  // for models uploaded to EMEA change this option to 'derivativeV2_EU'
    getAccessToken: function(onTokenReady) { 
        var token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY0RE9XMnJoOE9tbjNpdk1NU0xlNGQ2VHEwUSIsInBpLmF0bSI6Ijd6M2gifQ.eyJzY29wZSI6WyJjb2RlOmFsbCIsImRhdGE6d3JpdGUiLCJkYXRhOnJlYWQiLCJidWNrZXQ6Y3JlYXRlIiwiYnVja2V0OmRlbGV0ZSIsImJ1Y2tldDpyZWFkIl0sImNsaWVudF9pZCI6Im5Hakc0NzVMeTZJWEdkSDh3TnlVRTg3YmtxQTJUbmYwIiwiYXVkIjoiaHR0cHM6Ly9hdXRvZGVzay5jb20vYXVkL2Fqd3RleHA2MCIsImp0aSI6IkJMNDBCbFY0cjRReGlHZlFIYUZBRnRsUnNRNGpxS0pyT3ZHQVhUMjNQcTRzVlZPc2oyS25USmF3Z2xPeEJlVkoiLCJleHAiOjE2OTEyNjEzOTZ9.iwiRfWI9SMYtNhGBpB0ravL3Yt_hqgHni0JsQPMVoYPZi4zSWthhDJVkbfThivGu7xaZNFTNKYgnwY-t7y0ibwCiFov56KU-Cjx9w2eG7IJZWjZ0-UsgFV7b4Lm9aD5QACCQ9HUQSgru_zcEfo95ElyWpMDyEjvQ50xTlIQbl4figon-8Dfw9UurR1SF1p1aBWVEaeNoOI8GYrj6kZXrefT1LmnoPHCu5ih8xBSIMQS9E9hoS9RHsJ6s_4mcIbmrEjJiLCLmjHfJoYgErPeZISqsPGecbRbGmiwm3KPbxQdCYLXS3HtCd0ht63BhvF2XxM_eseIq-CzHyNygjqkAOA';
        var timeInSeconds = 3600; // Use value provided by Forge Authentication (OAuth) API
        onTokenReady(token, timeInSeconds);
    }
};
var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWxfYmltX2NhZS9tb2RlbF9iaW1fY2FlLnJ2dA';
Autodesk.Viewing.Initializer(options, function() {

    var htmlDiv = document.getElementById('forgeViewer');
    viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);
    viewer.start();
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);

    function onDocumentLoadSuccess(viewerDocument) {
        // Choose the default viewable - most likely a 3D model, rather than a 2D sheet.
        var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
        viewer.loadDocumentNode(viewerDocument, defaultModel);
        
    }

    function onDocumentLoadFailure() {
        console.error('Failed fetching Forge manifest');
    }    

});

</script>
  `;

  return (
    <View style={styles.container}>
      <WebView
        style={styles.webView}
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    depth: '100%',
  },
  webView: {
    flex: 1,
  },
});

export default DWGViewer;
