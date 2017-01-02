import React from 'react';
import {
  Animated,
  AppRegistry,
  asset,
  Image,
  Mesh,
  Pano,
  StyleSheet,
  Text,
  View,
} from 'react-vr';

class ReactVR extends React.Component {
  constructor() {
    super();

    this.state = {
      bounceValue: new Animated.Value(0),
      positionY: new Animated.Value(0),
      timing: new Animated.Value(0),
      isTextVisible: false,
      text: 'Hello!',
     };
  }

  componentDidMount() {
    this.onTableBounce()
  }

  onTableBounce() {
    Animated.sequence([
      Animated.spring(
        this.state.positionY,
        {
          toValue: 0.1,
          friction: 1,
        },
      ),
      Animated.spring(
        this.state.positionY,
        {
          toValue: -0.1,
          friction: 1,
        },
      ),
    ]).start((event) => {
      event.finished && this.onTableBounce();
    });
  }

  onImageBounce() {
    this.state.bounceValue.setValue(1.1);
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: 0.8,
        friction: 1,
      },
    ).start();
  }

  render() {
    return (
      <View>
        <Animated.View
          style={{
            flex: 1,
            transform:[{ translateY: this.state.positionY }],
          }}
        >
          {window.navigator.platform === 'MacIntel' &&
            <Mesh
              source={{ mesh: asset('table.obj'), mtl: asset('table.mtl'), lit: true }}
              style={{ transform: [{scale: 0.01}, { translate: [60, -30, -200] }, {rotateY: '-20deg' }] }}
            />
          }
        </Animated.View>
        <Pano source={asset('chess-world.jpg')}/>
        <Animated.Image
          onEnter={() => this.onImageBounce()}
          source={{ uri: 'http://i.imgur.com/XMKOH81.jpg' }}
          style={{
            flex: 1,
            width: 2,
            height: 1.5,
            transform: [{ translate: [-1, 0.5, -4] }, { scale: this.state.bounceValue }],
          }}
        />
        <Text
          style={{
            backgroundColor: 'transparent',
            padding: 0.02,
            textAlign:'center',
            textAlignVertical:'center',
            fontSize: 0.8,
            layoutOrigin: [0.5, 0.5],
            transform: [{translate: [0, 0.1, -3.9]}],
          }}
          onEnter={() => this.setState({ isTextVisible: true, text: "What's" })}
          onExit={() => this.setState({ isTextVisible: false, text: "Hello!" })}
        >
          {this.state.text}
        </Text>
        <Text
          style={{
            backgroundColor: 'transparent',
            padding: 0.02,
            textAlign:'center',
            textAlignVertical:'center',
            fontSize: this.state.isTextVisible ? 1.5 : 0,
            layoutOrigin: [0.5, 0.5],
            transform: [{translate: [0.1, -3.5, -10]}],
          }}
        >
          good B) ?
        </Text>
      </View>
    );
  }
};

AppRegistry.registerComponent('ReactVR', () => ReactVR);
