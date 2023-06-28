import * as React from 'react';
import { View, StyleSheet, Button, Dimensions, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import {Component} from "react";

class VideoDisplayScreen extends Component{
    constructor(props) {
        super(props);
        this.video = React.createRef();
        this.state = {
            status: {},
        };
    }

    handlePlaybackStatusUpdate = (status) => {
        this.setState({ status });
    };

    handlePlayPause = () => {
        const { status } = this.state;
        if (status.isPlaying) {
            this.video.current.pauseAsync();
        } else {
            this.video.current.playAsync();
        }
    };

    render(){
        // const { url } = this.props.route.params;
        return (
            <View style={styles.container}>
                <Video
                    ref={this.video}
                    style={styles.video}
                    source={{
                        uri: this.props.route ? this.props.route.params.url: this.props.url,
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.COVER}
                    isLooping
                    onPlaybackStatusUpdate={this.handlePlaybackStatusUpdate}
                />
            </View>
        )
    }
}

export default VideoDisplayScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 16,
        color: 'white',
        textAlign: 'left',
    },
    video: {
        alignSelf: 'center',
        width: Dimensions.get('window').width,
        height: 300,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
