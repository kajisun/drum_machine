import React from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFreeCodeCamp } from "@fortawesome/free-brands-svg-icons";

class PadSrc {
    constructor(keyCode, keyTrigger, id, url) {
        this.keyCode = keyCode;
        this.keyTrigger = keyTrigger;
        this.id = id;
        this.url = url;
    }
}

const bankOne = [
    new PadSrc(81, "Q", "Heater-1",
        'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'),
    new PadSrc(87, "W", "Heater-2", 
        'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'),
    new PadSrc(69, "E", "Heater-3",
        'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'),
    new PadSrc(65, "A", "Heater-4", 
        'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'),
    new PadSrc(83, "S", "Clap", 
        'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'),
    new PadSrc(68, "D", "Open-HH", 
        'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'),
    new PadSrc(90, "Z", "Kick-n'-Hat", 
        'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'),
    new PadSrc(88, "X", "Kick", 
        'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'),
    new PadSrc(67, "C", "Close-HH", 
        'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'),
]

const bankTwo = [
    new PadSrc(81, "Q", "Chord-1",
        'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'),
    new PadSrc(87, "W", "Chord-2", 
        'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'),
    new PadSrc(69, "E", "Chord-3",
        'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'),
    new PadSrc(65, "A", "Shaker", 
        'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'),
    new PadSrc(83, "S", "Open-HH", 
        'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'),
    new PadSrc(68, "D", "Open-HH", 
        'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'),
    new PadSrc(90, "Z", "Punchy-Kick", 
        'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'),
    new PadSrc(88, "X", "Side-Stick", 
        'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'),
    new PadSrc(67, "C", "Snare", 
        'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'),
]

const activeStyle = {
    backgroundColor: "orange",
    boxShadow: "0 3px orange",
    height: 77,
    marginTop: 13,
}

const inactiveStyle = {
    backgroundColor: "gray",
    marginTop: 10,
    boxShadow: "3px 3px 5px black",
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            power: true,
            display: String.fromCharCode(160),
            currentPadBank: bankOne,
            currentPadBankId: "Heater Kit",
            sliderVal: 0.3,
        };
        this.displayClipName = this.displayClipName.bind(this);
        this.selectBank = this.selectBank.bind(this);
        this.adjustVolume = this.adjustVolume.bind(this);
        this.powerControl = this.powerControl.bind(this);
        this.clearDisplay = this.clearDisplay.bind(this);
    }

    powerControl() {
        this.setState({
            power: !this.state.power,
            display: String.fromCharCode(160),
        });
    }

    selectBank() {
        if (this.state.power) {
            this.state.currentPadBankId === "Heater Kit" ?
                this.setState({
                    currentPadBank: bankTwo,
                    display: "Smooth Piano Kit",
                    currentPadBankId: "Smooth Piano Kit",
                }) :
                this.setState({
                    currentPadBank: bankOne,
                    display: "Heater Kit",
                    currentPadBankId: "Heater Kit",
                });
        }
    }

    displayClipName(name) {
        if (this.state.power) {
            this.setState({
                display: name,
            });
        }
    }

    adjustVolume(e) {
        if (this.state.power) {
            this.setState({
                sliderVal: e.target.value,
                display: "Volume: " + Math.round(e.target.value * 100),
            });
            setTimeout(() => this.clearDisplay(), 1000);
        }
    }

    clearDisplay() {
        this.setState({
            display: String.fromCharCode(160),
        });
    }

    render() {  
        const powerSlider = this.state.power ? {
            float: "right",
        } : {
            float: "left",
        };

        const bankSlider = this.state.currentPadBank === bankOne ? {
            float: "left",
        } : {
            float: "right",
        };
        {
            const clips = [...document.getElementsByClassName("clip")];
            clips.forEach(sound => sound.volume = this.state.sliderVal);
        }

        return (
            <div id="drum-machine" className="inner-container">
                <PadBank
                    power={this.state.power}
                    updateDisplay={this.displayClipName}
                    clipVolume={this.state.sliderVal}
                    currentPadBank={this.state.currentPadBank} />

                <div className="logo">
                    <div className="inner-logo">{"FCC" + String.fromCharCode(160)}</div>
                        <FontAwesomeIcon icon={faFreeCodeCamp} className="faFreeCodeCamp" />
                </div>

                <div className="controls-container">
                    
                    <div className="control">
                        <p>Power</p>
                        <div onClick={this.powerControl} className="select">
                            <div style={powerSlider} className="inner" />    
                        </div>
                    </div>
                    <p id="display">
                        {this.state.display}
                    </p>
                    <div className="volume-slider">
                        <input type="range" min="0" max="1" step="0.01" value={this.state.sliderVal} onChange={this.adjustVolume} />
                    </div> 
                    <div className="control">
                        <p>Bank</p>
                        <div onClick={this.selectBank} className="select">
                            <div style={bankSlider} className="inner" />
                        </div>        
                    </div>
                </div>
            </div>
        )
    }
}

class PadBank extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let padBank;
        this.props.power ?
            padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
                return (
                    <DrumPad 
                        clipId={padBankArr[i].id}
                        clip={padBankArr[i].url}
                        keyTrigger={padBankArr[i].keyTrigger}
                        keyCode={padBankArr[i].keyCode}
                        updateDisplay={this.props.updateDisplay}
                        power={this.props.power}
                    />
                )
            }) :
            padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
                return (
                    <DrumPad 
                        clipId={padBankArr[i].id}
                        clip="#"
                        keyTrigger={padBankArr[i].keyTrigger}
                        keyCode={padBankArr[i].keyCode}
                        updateDisplay={this.props.updateDisplay}
                        power={this.props.power}
                    />
                )
            });
        return (
            <div className="pad-bank">
                {padBank}
            </div>
        )
    }
}

class DrumPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            padStyle: inactiveStyle
        }
        this.playSound = this.playSound.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.activatedPad = this.activatedPad.bind(this);
    }
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }
    handleKeyPress(e) {
        if (e.keyCode === this.props.keyCode) {
            this.playSound();
        }
    }
    activatedPad() {
        if (this.props.power) {
            this.state.padStyle.backgroundColor === "orange" ?
                this.setState({
                    padStyle: inactiveStyle
                }) :
                this.setState({
                    padStyle: activeStyle
                });
        } else {
            this.state.padStyle.marginTop === 13 ?
                this.setState({
                    padStyle: inactiveStyle
                }) :
                this.setState({
                    padStyle: {
                        height: 77,
                        marginTop: 13,
                        backgroundColor: "gray",
                        boxShadow: "0 3px grey"
                    }
                });
        }
    }
    playSound(e) {
        const sound = document.getElementById(this.props.keyTrigger);
        sound.currentTime = 0;
        sound.play();
        this.activatedPad();
        setTimeout(() => this.activatedPad(), 100);
        this.props.updateDisplay(this.props.clipId.replace(/-/g, " "));
    }
    render() {
        return (
            <div id={this.props.clipId} 
                onClick={this.playSound}
                className="drum-pad"
                style={this.state.padStyle}
            >
                <audio className="clip"
                    src={ this.props.clip }
                    id={this.props.keyTrigger}
                ></audio>
                {this.props.keyTrigger}
            </div>
        )
    }
}

export default App;
