import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Timer from './Timer';
import PlayerCards from './PlayerCards';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Timer defaultSeconds = {3} defaultMinutes = {1}></Timer>
        <PlayerCards scoreToWin = {4}></PlayerCards>     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    width:'100%',
    height:'100%',
  },
});

export default App;

