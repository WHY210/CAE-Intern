// Javascript //

///////////////////////////////////
// Authentication API 有空要加上去 //
///////////////////////////////////

// Options
var options = {
    env: 'AutodeskProduction',  
    api: 'derivativeV2',   
    getAccessToken: function(onTokenReady) {
        var token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY0RE9XMnJoOE9tbjNpdk1NU0xlNGQ2VHEwUSIsInBpLmF0bSI6Ijd6M2gifQ.eyJzY29wZSI6WyJjb2RlOmFsbCIsImRhdGE6d3JpdGUiLCJkYXRhOnJlYWQiLCJidWNrZXQ6Y3JlYXRlIiwiYnVja2V0OmRlbGV0ZSIsImJ1Y2tldDpyZWFkIl0sImNsaWVudF9pZCI6Im5Hakc0NzVMeTZJWEdkSDh3TnlVRTg3YmtxQTJUbmYwIiwiYXVkIjoiaHR0cHM6Ly9hdXRvZGVzay5jb20vYXVkL2Fqd3RleHA2MCIsImp0aSI6IkJMNDBCbFY0cjRReGlHZlFIYUZBRnRsUnNRNGpxS0pyT3ZHQVhUMjNQcTRzVlZPc2oyS25USmF3Z2xPeEJlVkoiLCJleHAiOjE2OTEyNjEzOTZ9.iwiRfWI9SMYtNhGBpB0ravL3Yt_hqgHni0JsQPMVoYPZi4zSWthhDJVkbfThivGu7xaZNFTNKYgnwY-t7y0ibwCiFov56KU-Cjx9w2eG7IJZWjZ0-UsgFV7b4Lm9aD5QACCQ9HUQSgru_zcEfo95ElyWpMDyEjvQ50xTlIQbl4figon-8Dfw9UurR1SF1p1aBWVEaeNoOI8GYrj6kZXrefT1LmnoPHCu5ih8xBSIMQS9E9hoS9RHsJ6s_4mcIbmrEjJiLCLmjHfJoYgErPeZISqsPGecbRbGmiwm3KPbxQdCYLXS3HtCd0ht63BhvF2XxM_eseIq-CzHyNygjqkAOA';
        var timeInSeconds = 3600; // Use value provided by APS Authentication (OAuth) API
        onTokenReady(token, timeInSeconds);
    }
};

/////////////////////////////////////
// Model Derivative API 有空要加上去 //
/////////////////////////////////////

// document (2D 3D Model)
var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWxfYmltX2NhZS9tb2RlbF9iaW1fY2FlLnJ2dA';  

// initializing
var viewer;
Autodesk.Viewing.Initializer(options, function() {
    var htmlDiv = document.getElementById('forgeViewer');   // 在網頁中獲取一個 HTML 元素，這裡是通過 ID 為 'forgeViewer' 的元素來找到它(寫在Viewer.html)
    viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);     // 創建了一個新的 Forge Viewer 3D 物件。htmlDiv 是前面獲取的 <div> 元素，它將用於顯示 Forge Viewer 的 3D 視圖。這裡使用了 GuiViewer3D，它是 Forge Viewer API 提供的一個 GUI 版本的 3D Viewer，用於提供更多的用戶界面元素和控制。
    var startedCode = viewer.start();                       // 啟動了 Forge Viewer 3D，將 3D 視圖顯示在之前指定的 htmlDiv 元素中。執行這個方法後，Viewer 3D 將會被初始化和渲染。
    if (startedCode > 0) {
        console.error('Failed to create a Viewer: WebGL not supported.');
        return;
    }
});

// starting forge 
var htmlDiv = document.getElementById('forgeViewer');
viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv, {});
viewer.start()

// fetch manifest
Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
function onDocumentLoadSuccess(viewerDocument) {
    // load model in manifest
    //var viewables = viewerDocument.getRoot().search({'type':'geometry'});
    //viewer.loadDocumentNode(viewerDocument, viewables[0])
    var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(viewerDocument, defaultModel);
}
function onDocumentLoadFailure() {
    console.error('Failed fetching Forge manifest');
}


// GUID (使用 export 關鍵字將函數進行導出，這樣在其他文件中也可以使用這個函數)
export function addSelection(item, addComplete) {
    // 使用 firestore() 函數來獲取 Firestore 實例 (下面整串都是firestore的語法)
    firestore()
        // 選擇 'units' 集合
        .collection('units')  
        // 在 'units' 集合中新增一個文檔（Document），並設置以下值
        .add({
            externaldId: item.externaldId,  
            name: item.name,               
            status: item.status,            
        })
        .then((snapshot) => snapshot.get())  // 獲取新添加文檔的快照
        .then((selectionData) => addComplete(selectionData.data()))  // 將文檔數據通過 addComplete 函數回傳
        .catch((error) => console.log(error));  // 處理錯誤，如果有錯誤則輸出到控制台
  };

// dbId
model.getExternalIdMapping(
    (data) => changeColor(data),   // 成功時的回調函數，將數據傳遞給 changeColor 函數
    (err) => console.log(err),     // 失敗時的回調函數，將錯誤訊息輸出到控制台
);
  

// javascript + JSX ///////////////////////////////
const listSetting = {
    data: this.props.items,                    // 資料源，通常是要顯示在列表中的項目數據陣列
    extraData: this.state.activeRow,           // 附加資料，在數據更新時用於觸發列表重新渲染
    keyExtractor: (item) => item.id,           // 用於為每個列表項目生成唯一的 key，一般為項目的 id 屬性
    onRefreshItems: this.props.onRefreshItems, // 當列表需要刷新時的回調函數
    refreshing: this.props.refreshing,         // 一個布林值，表示列表是否正在刷新中
    renderItem: (info) => renderItem(info)     // 用於渲染每個列表項目的回調函數
};


//return(
 //   <View style={StyleSheet.content}>
  //      <FlatList />...
   // </View>
//)


// destroy viewer instance 應該要寫在reactnative，點完就destroy

//viewer.finish();
//viewer = null;
//Autodesk.Viewing.shutdown();