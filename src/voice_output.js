/*
 * Imports
 */
var ESpeak = require("node-espeak");
var Samplerate = require("samplerate");
var Util = require("util");
var EventEmitter = require("events").EventEmitter;

/*
 * Code
 */
var VoiceOutput = function(mumble) {
	this._inputStream = mumble.inputStream();
	ESpeak.initialize({
		lang : "en",
		gender : "female"
	});
	ESpeak.setProperties({
		range : 30,
		pitch: 60,
		rate: 120
	});
	console.log(ESpeak.getVoice());
	ESpeak.onVoice(this._onESpeakVoice.bind(this));
};

Util.inherits(VoiceOutput, EventEmitter);

VoiceOutput.prototype._onESpeakVoice = function(wav, samples, samplerate) {
	var resampled = Samplerate.resample(wav, samplerate, 48000, 1);
	this._inputStream.write(resampled);
};

VoiceOutput.prototype.say = function(text) {
	ESpeak.speak(text);
};

module.exports = VoiceOutput;
