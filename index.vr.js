import React from "react";
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  Model,
  Animated
} from "react-vr";
import { Easing } from "react-native";

export default class StarWars extends React.Component {
  constructor() {
    super();
    this.state = {
      spin: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.spin, {
      toValue: 1,
      duration: 3000,
      easing: Easing.ease
    }).start();
  }
  render() {
    return (
      <View>
        <Pano source={asset("space.jpg")} />
        <Model
          source={{
            obj: asset("death-star.obj")
          }}
          style={{
            transform: [
              { translate: [0, 0, -2] },
              {
                rotate: this.state.spin.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"]
                })
              }
            ]
          }}
          texture={
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/827672/death-star.png"
          }
          wireframe={false}
        />
      </View>
    );
  }
}

AppRegistry.registerComponent("StarWars", () => StarWars);
