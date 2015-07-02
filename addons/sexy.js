var instrument = require("../src/instrument");

module.exports = function(bot) {
	bot.newCommand("talk dirty", function() {
		var words = {
			maleGenital : [
				' USB-plug',
				' VGA-Kabel',
				'e Externe Festplatte',
				'e PCI-Express-Card',
				'e Erweiterungskarte',
				'en USB-Stick',
				'e S-D-Card',
				'en 3.5 Millimeter Kopfhörer Stecker'
			],
			femaleGenital : [
				'en USB-Port',
				'en VGA-Port',
				'e 3.5mm Kopfhörer Buchse',
				' CD-Rom Laufwerk',
				'en P S 2 Port',
				'en CPU Sockel',
				'en Speicherslot',
				'en P C I-Express-Slot'
			],
			action : [
				'stecken',
				'einstecken',
				'anschließen',
				'rammen',
				'schweissen'
			],
			pettingAction : [
				'überlade',
				'überschreibe',
				'aktiviere',
				'berühre',
				'zerstöre',
				'entferne',
				'übertakte',
				'debugge'
			],
			pettingZone : [
				'e Festplatte',
				'en Touchscreen',
				'e C P U',
				'e Grafikkarte',
				'e North bridge',
				' Mainboard',
				'en Speicher',
				'e S S D',
				' Netzteil',
				'en L3-Cache',
				'en Kernel',
				'en Bootloader',
				' BIOS',
				'e Firmware'
			],
			attribute : [
				'heiss',
				'übertaktet',
				'fehlerhaft',
				'limited edition',
				'verbessert',
				'kaputt',
				'modifiziert',
				'veraltet',
				'buggy',
				'intern',
				'extern'
			],
			adverb : [
				'schnell',
				'langsam',
				'mit 1000 Megabytes pro Sekunde'
			]
		};

		var sentences = [
			'Ich will mein{{maleGenital}} in dein{{femaleGenital}} {{action}}.',
			'Ohh, ja, bitte {{pettingAction}} mein{{pettingZone}}! Ich bin so {{attribute}}!',
			'Mmh, das macht  mein{{pettingZone}} so {{attribute}}.',
			'Ich liebe dein{{femaleGenital}}. Du bist so  {{attribute}}!',
			'Ich liebe dein{{maleGenital}}. Du bist so  {{attribute}}!',
			'Lass mich dein{{femaleGenital}} {{pettingAction}}n.',
			'Lass mich dein{{maleGenital}} {{pettingAction}}n.',
			'Oooh, bitte {{pettingAction}} mein{{maleGenital}} {{adverb}}.',
			'Oooh, bitte {{pettingAction}} mein{{femaleGenital}} {{adverb}}.',
			'Ich glaube, mein{{pettingZone}} ist grade {{attribute}} geworden!',
			'Pass auf, oder ich {{pettingAction}} dein{{pettingZone}}.',
			'Du bist so {{attribute}}!',
			'Ich will, dass du mein{{pettingZone}} {{pettingAction}}st.'
		];
		bot.say(instrument(sentences, words));
	}, "Gibt eine zufällig generierte erotische Bemerkung aus.", "female");
};
