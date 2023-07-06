import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Button} from 'react-native';
import PropTypes from 'prop-types';

class PlayerCard extends React.Component {
    static propTypes = {
        playerName: PropTypes.string.isRequired,
        playerNumber: PropTypes.number.isRequired,
        playerColor: PropTypes.string.isRequired,
        scoreToWin: PropTypes.number.isRequired,
    };

    state = {
        score: 0,
        won: false,
    };

    addScore = () => {
        this.setState(prevState => ({
            score: prevState.score + 1,
        }), () => { 
            this.handleWin(); 
        });

    };

    minusScore = () => {
        this.setState(prevState => ({
            score: prevState.score - 1,
        }), () => {
            this.handleWin();
        });
    };

    handleWin = () => {
        if (this.state.score === this.props.scoreToWin) {
            alert(this.props.playerName + ' wins!')
            this.setState({won: true});   
        } else{
            this.setState({won: false});
        }
    };


    render() {
        const backgroundColor = this.props.playerColor;
        const {won} = this.state;
        return (
            <View style={[styles.container, {backgroundColor}, won && styles.wonBorder]}>
                <TouchableOpacity onPress={this.addScore} style={styles.card}>
                    <Text style={styles.playerText}>{this.props.playerName}</Text>
                    <Text style={styles.scoreText}>{this.state.score}</Text>
                </TouchableOpacity>
                <Button title="-" onPress={this.minusScore} style={styles.minusButton} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:5,
    },
    scoreText: {
        fontSize: 40,
        color: 'white',
    },
    playerText: {
        fontSize: 20,
        color: 'black',
    },
    card: {
        textAlign: 'center',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 100,
    },
    minusButton: {
        fontSize: 40,
        color: 'black',
        width: 100,
    },
    wonBorder: {
        borderColor: 'red',
        borderWidth: 5,
    },
});

export default PlayerCard;