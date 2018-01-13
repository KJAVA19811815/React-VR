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
    this.spinAnimation();
  }

  spinAnimation() {
    this.state.spin.setValue(0);
    Animated.timing(this.state.spin, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear
    }).start(() => this.spinAnimation());
  }
  render() {
    const spin = this.state.spin.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "360deg"]
    });

    const AnimatedModel = Animated.createAnimatedComponent(Model);

    return (
      <View>
        <Pano source={asset("space.jpg")} />
        <AnimatedModel
          source={{
            obj: asset("death-star.obj")
          }}
          style={{
            transform: [
              { translate: [0, 0, -8] },
              {
                rotate: spin
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
