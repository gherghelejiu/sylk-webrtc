'use strict';

const React = require('react');


let AudioPlayer = React.createClass({
    propTypes: {
        sourceFile: React.PropTypes.string.isRequired
    },

    audioEnded: function() {
        this.timeout = setTimeout(() => {
            this.refs.audio.play();
        }, 3000);
    },

    componentDidMount: function() {
        this.timeout = null;
    },

    componentWillUnmount: function() {
        clearTimeout(this.timeout);
        this.timeout = null;
        this.refs.audio.removeEventListener('ended', this.audioEnded);
    },

    play: function(repeat) {
        if (repeat) {
            this.timeout = null;
            audio.addEventListener('ended', this.audioEnded);
        } else {
            audio.addEventListener('ended', this.stop);
        }
        this.refs.audio.play();
    },

    stop: function() {
        let audio = this.refs.audio;
        clearTimeout(this.timeout);
        audio.pause();
        audio.currentTime = 0;
        this.timeout = null;
        this.file = null ;
        audio.removeEventListener('ended', this.audioEnded);
    },

    render: function() {
        return (
            <div>
                <audio ref="audio">
                    <source src={this.props.sourceFile} type="audio/wav" />
                </audio>
            </div>
        );
    }
});

module.exports = AudioPlayer;
