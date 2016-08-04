const pkg = require('./package.json'),
	fs = require('fs');

var prefixes = [
		"Aching","Active","Agile","Alien","Alpha","Alpine","Amazing","Ancient","Angry","Antique","Anxious","Arctic","Arid","Awkward",
		"Bad","Bare","Basic","Big","Bitter","Black","Blank","Blind","Blond","Blue","Blushing","Boring","Brave","Brief","Bright","Broken","Bronze","Brown","Bulky","Busy",
		"Calm","Celtic","Cheap","Chief","Classic","Clean","Clever","Clumsy","Coarse","Cold","Colossal","Common","Complex","Confused","Cool","Crafty","Crazy","Creepy","Crisp","Critical","Crooked","Cruel","Crystal","Cuddly",
		"Damaged","Dangerous","Daring","Dark","Dead","Deaf","Deep","Defiant","Delirious","Dense","Dessert","Digital","Dim","Dirty","Discrete","Distant","Dizzy","Double","Dual","Dust","Dusty",
		"Eager","Early","Earnest","Electric","Enchanted","Enraged","Euphoric","Evil","Exalted","Exotic","Expert",
		"Fake","False","Famous","Fancy","Fast","Fat","Fatal","Feisty","Fickle","Fine","Fire","Firm","First","Fixed","Flat","Flawed","Flawless","Flimsy","Formal","Frail","Fresh","Frigid","Frost","Frozen","Frugal","Funny","Fuzzy",
		"Gentle","Giant","Gifted","Glorious","Golden","Good","Gorgeous","Graceful","Gracious","Greedy","Grim","Grizzled","Guilty",
		"Hairy","Handsome","Happy","Hard","Hasty","Haunting","Heavy","Hefty","Helpless","Hidden","High","Hoarse","Hollow","Honest","Honored","Hot","Huge","Humble","Humming","Hungry",
		"Icy","Idle","Imaginary","Impure","Incredible","Infamous","Infinite","Innocent","Intrepid","Iron","Itchy",
		"Jealous","Jumbo","Jungle",
		"Keen","Kind",
		"Lame","Last","Late","Lazy","Lean","Light","Little","Lone","Long","Lost","Loud","Low","Loyal","Lucky",
		"Mad","Major","Mild","Minor","Misty","Modest","Murky","Muted",
		"Naughty","Needy","Nervous","Nice",
		"Odd","Old","Orange","Original",
		"Pale","Perfect","Pesky","Petty","Pink","Plain","Plastic","Polar","Polite","Poor","Precious","Pretty","Proud","Purple",
		"Quick","Quiet",
		"Rapid","Rare","Reckless","Red","Rich","Rough","Rude",
		"Sad","Salty","Scarlet","Selfish","Shiny","Shy","Silent","Silver","Sleepy","Slow","Snowy","Stalking","Steel","Sturdy","Sweet","Swift",
		"Tense","Thirsty","Tired","Toxic","Twin",
		"Urban",
		"Vague","Vicious","Violet","Virtual",
		"Warm","White","Wicked","Wise","Worried",
		"Yawning","Yellow","Young"
	],
	animals = [
		"Alligator","Ant","Ape",
		"Badger","Bat","Bear","Bee","Bird","Boar","Buffalo","Butterfly",
		"Camel","Cat","Cayman","Cheetah","Chicken","Cobra","Coyote","Crab","Crocodile",
		"Deer","Dinosaur","Dog","Dolphin","Dragon","Duck",
		"Eagle","Elephant","Elk",
		"Falcon","Fish","Fox","Frog",
		"Gazelle","Giraffe","Goat","Gorilla","Grasshopper",
		"Hamster","Hare","Hawk","Hedgehog","Hippopotamus","Horse","Hyena",
		"Jaguar",
		"Kangaroo","Koala",
		"Leopard","Lion","Lizard","Lobster",
		"Mantis","Mammoth","Manatee","Mandrill","Mole","Mongoose","Monkey","Mouse",
		"Octopus","Ostrich","Owl",
		"Panther","Parrot","Panda","Pelican","Penguin","Phoenix","Pig",
		"Rabbit","Raccoon","Rat","Raven",
		"Salamander","Salmon","Sardine","Serpent","Shark","Sheep","Snail","Snake","Squirrel","Swan","Swordfish",
		"Tiger","Toad","Turtle",
		"Unicorn",
		"Wasp","Whale","Wolf",
		"Yak",
		"Zebra"
	],
	generate = function () {
		var args = Array.prototype.slice.call(arguments),
			parts = [];

		args.forEach((list) => {
			parts.push(list[Math.floor(Math.random() * list.length)]);
		});

		return parts.join('');
	},
	update = process.argv[2],
	version = pkg.version.split('-').shift().split('.');

switch (update) {
	case 'major':
		version[0]++;
		version[1] = 0;
		version[2] = 0;
		break;
	case 'minor':
		version[1]++;
		version[2] = 0;
		break;
	case 'patch':
	default:
		version[2]++;
		break;
}

pkg.version = version.join('.') + '-' + generate(prefixes, animals).toLowerCase();

fs.writeFile('./package.json', JSON.stringify(pkg, null, 2), function (err) {
	if (err) {
		return console.log(err);
	}

	console.log("The file was saved!");
});