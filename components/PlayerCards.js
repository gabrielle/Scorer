import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Button, FlatList, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import PlayerCard from './PlayerCard';

const data = [
    {key: 1, name: 'Player 1', color: 'lightpink'},
    {key: 2, name: 'Player 2', color: 'lightsteelblue'},
    {key: 3, name: 'Player 3', color: 'lightgreen'},
    {key: 4, name: 'Player 4', color: 'lightsalmon'},
    {key: 5, name: 'Player 5', color: 'lightseagreen'},
    {key: 6, name: 'Player 6', color: 'lightyellow'},
    {key: 7, name: 'Player 7', color: 'lightcoral'},
    {key: 8, name: 'Player 8', color: 'lightcyan'},
];

class PlayerCards extends React.Component {
    
    static propTypes = {
        scoreToWin: PropTypes.number.isRequired,
    };

    renderGridItems = ({item}) => {
        return (
            <View style={styles.gridItem}>
                <PlayerCard playerName = {item.name} playerNumber = {item.key} playerColor = {item.color} scoreToWin={this.props.scoreToWin}></PlayerCard>
            </View>
        );
    };

    checkOrientation = () => {
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
            return 2;
        } else {
            return 4;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                data={data}
                numColumns={this.checkOrientation()}
                renderItem={this.renderGridItems}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.gridContainer}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    gridContainer: {
      padding: 2,
    },
    gridItem: {
      flex: 1,
      padding: 5,
      margin: 5,
    },
  });

export default PlayerCards;