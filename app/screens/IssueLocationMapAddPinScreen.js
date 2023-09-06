import React, { Component } from 'react';
import { Image, Text, View, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as StorageHelper from '../helpers/StorageHelper';

class TouchableCoordinate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinateX: null,
      coordinateY: null,
      itemCount: 0,
    };

    this.floorImagePath = {
      "1": require('../assets/1F.png'),
      "2": require('../assets/2F.png'),
      "3": require('../assets/3F.png'),
      "4": require('../assets/4F.png'),
      "5": require('../assets/5F.png'),
      "6": require('../assets/6F.png'),
      "7": require('../assets/7F.png'),
      "8": require('../assets/8F.png'),
      "9": require('../assets/9F.png'),
    };
  }

  handlePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    this.setState({
      coordinateX: locationX,
      coordinateY: locationY,
    });
  };

  handlePin = async () => {
    console.log(this.props.route.params)
    const { coordinateX, coordinateY, itemCount } = this.state;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const newCoordinate = { x: coordinateX / screenWidth, y: coordinateY / screenHeight };
    console.log('已放置 PIN 於座標:', this.props.route.params.project, this.props.route.params.floorName, newCoordinate);
    this.props.navigation.navigate("Issue", {
      project: this.props.route.params.project,
      floorId: this.props.route.params.floorId,
      floorName: this.props.route.params.floorName,
      newCoordinate: newCoordinate
    });    
  };

  render() {
    const { coordinateX, coordinateY } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
            <View style={styles.container}>
              <Image
                style={styles.backgroundImage}
                source={this.floorImagePath[this.props.route.params.floorId]}
                resizeMode="cover"
              />
              {coordinateX !== null && coordinateY !== null && (
                <TouchableOpacity
                  style={[
                    styles.issue,
                    { top: coordinateY, left: coordinateX }
                  ]}
                  onPress={this.handlePin}
                >
                  <Text style={styles.issueText}>缺失</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: "absolute",
  },
  issue: {
    borderRadius: 5,
    backgroundColor: 'red',
    padding: 3,
    marginTop: 0,
    position: 'absolute',
  },
  issueText: {
    color: 'white',
    fontSize: 10,
  },
});

export default TouchableCoordinate;
