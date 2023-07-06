import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, TextInputComponent} from 'react-native';
import PropTypes from 'prop-types';
import Sound from 'react-native-sound';
import alarms from './clock-alarm.mp3';
import {Picker} from '@react-native-picker/picker';

const alarm = new Sound(alarms, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
});

class Timer extends React.Component {
    static propTypes = {
        defaultSeconds: PropTypes.number.isRequired,
        defaultMinutes: PropTypes.number.isRequired,
    };
    state={
        remainingSeconds: this.props.defaultSeconds,
        initialSeconds : this.props.defaultSeconds,
        remainingMinutes: this.props.defaultMinutes,
        initialMinutes : this.props.defaultMinutes,
        seconds: 0,
        inputVisible: true,
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    toggleVisible = (e)  => {
        this.setState(prevState => ({
            inputVisible: e,
        }));
    }

    startTimer = () => {
        this.resetTimer();
        this.toggleVisible(false);

        const totalSeconds = this.state.initialSeconds + (this.state.initialMinutes * 60);
        this.setState({remainingSeconds: totalSeconds,
        seconds: this.state.initialSeconds});

        this.interval = setInterval(() => {
          this.setState(prevState => {
            let remainingSeconds = prevState.remainingSeconds - 1;
            let remainingMinutes = Math.floor(remainingSeconds / 60);
            let seconds = remainingSeconds % 60;
            return {
                remainingSeconds,
                remainingMinutes,
                seconds,
            };
          }, () => {
            if (this.state.remainingSeconds === 0) {
                //alarm.play();
                this.resetTimer();
              //clearInterval(this.interval);
            }
          });
        }, 1000);
      };

    resetTimer = () => {
        clearInterval(this.interval);
        this.setState({remainingSeconds: this.state.initialSeconds,
            remainingMinutes: this.state.initialMinutes,});
            this.toggleVisible(true);
        //alarm.stop();
    }

    addTime = () => {
        this.setState(prevState => ({
            remainingSeconds: prevState.remainingSeconds + 1,
        }));
    }

    removeTime = () => {
        this.setState(prevState => ({
            remainingSeconds: prevState.remainingSeconds - 1,
        }));
    }

    renderPickerItems = () => {
        const items = [];
        for (let i = 0; i < 60; i++) {
            items.push(<Picker.Item key={i} value={i} label={`${i}`} />);
        }
        return items;
    };

    formatNumber = (number) =>{      
        if (number < 10) {
            return '0'+ number;
        }
        return number;
    }

    render() {
        const {remainingSeconds, remainingMinutes, seconds} = this.state;
        return (
            <View style={styles.container}>
                {this.state.inputVisible &&
                    <View>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={this.state.initialMinutes}
                                style={{ height: 50, width: 100, backgroundColor: 'white' }}
                                onValueChange={(itemValue, ItemIndex) =>
                                    this.setState({ initialMinutes: itemValue })
                                }>
                                {this.renderPickerItems()}
                            </Picker>
                            <Text style={styles.text}>{':'}</Text>
                            <Picker
                                selectedValue={this.state.initialSeconds}
                                style={{ height: 40, width: 100, backgroundColor: 'white' }}

                                onValueChange={(itemValue, ItemIndex) =>
                                    this.setState({ initialSeconds: itemValue })
                                }>
                                {this.renderPickerItems()}
                            </Picker>
                        </View>
                        <Button style={styles.touchButton} onPress={this.startTimer} title='Start Timer'></Button>
                    </View>
                    ||
                    <View style={styles.container}>
                        <Text style={styles.text}>{remainingMinutes}{':'}{this.formatNumber(seconds)}</Text>
                        <Button title="Reset Timer" style={styles.text} onPress={this.resetTimer}></Button>
                    </View>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#dfdfdf',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        height: '100%',
    },
    picker:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 40,
        color: 'white',
    },
    touchButton: {
        backgroundColor: 'blue',
        width: '100%',
    },
});

export default Timer;

