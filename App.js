/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import firebase from 'react-native-firebase';
import {
  AdMobBanner,
  AdMobRewarded,
  AdMobInterstitial,
  PublisherBanner,
} from 'react-native-admob';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMout() {
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');

    AdMobInterstitial.addEventListener('adLoaded',
      () => console.log('AdMobInterstitial adLoaded')
    );
    AdMobInterstitial.addEventListener('adFailedToLoad',
      (error) => console.warn(error)
    );
    AdMobInterstitial.addEventListener('adOpened',
      () => console.log('AdMobInterstitial => adOpened')
    );
    AdMobInterstitial.addEventListener('adClosed',
      () => {
        console.log('AdMobInterstitial => adClosed');
        AdMobInterstitial.requestAd().catch(error => console.warn(error));
      }
    );
    AdMobInterstitial.addEventListener('adLeftApplication',
      () => console.log('AdMobInterstitial => adLeftApplication')
    );

    AdMobInterstitial.requestAd().catch(error => console.warn(error));
  }

  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
  }

  showInterstitial() {
    AdMobInterstitial.showAd().catch(error => console.warn(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Test react native firebase</Text>
        <Button
          title="Show Interstitial and preload next"
          onPress={this.showInterstitial}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
