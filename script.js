const fetishesByCategory = {
    'toys': [
        'behind toys', 'rope play', 'handcuffs', 'gags', 'feathers', 'blindfolds', 'paddles', 'whips', 
        'nipple clamps', 'vibrators', 'love balls', 'strap-ons', 'dildos', 'bondage tape', 'leather restraints'
    ],
    'fluids': [
        'yellow fluid', 'oil play', 'wax play', 'lotion play', 'slime play', 'food play', 'ice play'
    ],
    'costumes': [
        'maid outfits', 'police uniforms', 'nurse outfits', 'superhero costumes', 'animal costumes', 
        'school uniforms', 'leather outfits', 'latex outfits', 'corsets', 'lingerie'
    ],
    'roles': [
        'dominance', 'submission', 'role reversal', 'teacher-student', 'boss-employee', 'doctor-patient', 
        'parent-child', 'celebrity-fan', 'prisoner-guard', 'hunter-prey', 'royalty-servant'
    ],
    'positions': [
        'doggy style', 'missionary', 'cowgirl', 'reverse cowgirl', 'spooning', 'standing', 'lotus', 'chair', 
        'bridge', 'pile driver', 'wheelbarrow', 'butterfly', 'scissors'
    ],
    'locations': [
        'kitchen', 'bathroom', 'bedroom', 'living room', 'garden', 'office', 'car', 'elevator', 'hotel', 
        'beach', 'forest', 'rooftop', 'theater'
    ],
    'sensations': [
        'tickling', 'massage', 'scratching', 'biting', 'pinching', 'licking', 'nibbling', 'kissing', 
        'slapping', 'spanking', 'hair pulling'
    ],
    'audio-visual': [
        'erotic videos', 'audio recordings', 'roleplay audio', 'erotic books', 'erotic comics', 
        'virtual reality', 'sexy phone calls', 'sexting', 'video calls'
    ],
    'fantasies': [
        'voyeurism', 'exhibitionism', 'threesome', 'group play', 'public play', 'swinging', 'partner swapping', 
        'secret affair', 'stranger encounter', 'forbidden love'
    ],
    'power dynamics': [
        'master-slave', 'mistress-pet', 'dom-sub', 'captor-captive', 'mentor-protege', 'owner-property', 
        'siren-victim', 'warlord-prisoner'
    ],
    'fetish themes': [
        'latex', 'leather', 'uniforms', 'age play', 'pet play', 'water play', 'food play', 'impact play', 
        'sensory deprivation', 'sensory overload', 'role reversal', 'costume play', 'mask play', 'mirror play'
    ],
    'play settings': [
        'private', 'public', 'indoors', 'outdoors', 'daytime', 'nighttime', 'at a party', 'in a vehicle', 
        'in a hot tub', 'in a pool', 'in a shower', 'in a sauna', 'on a balcony'
    ]
};

let mode = '';
let drawnFetishes = new Set();

function setMode(selectedMode) {
    mode = selectedMode;
    document.getElementById('filter-options').classList.toggle('hidden', mode !== 'filter');
    document.getElementById('result').textContent = '';
}

function randomizeFetish() {
    let randomFetish;
    if (mode === 'filter') {
        const selectedCategories = document.getElementById('categories-input').value.trim().toLowerCase().split(',');
        randomFetish = randomizeByFilter(selectedCategories);
    } else {
        const allFetishes = Object.values(fetishesByCategory).flat();
        randomFetish = getRandomItem(allFetishes);
        drawnFetishes.add(randomFetish);
    }

    if (randomFetish) {
        document.getElementById('result').textContent = `Random Fetish: ${randomFetish}`;
    } else {
        document.getElementById('result').textContent = 'No more unique fetishes available in the selected categories. Please try again.';
    }
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function randomizeByFilter(selectedCategories) {
    const filteredFetishes = {};
    for (const category of selectedCategories) {
        if (fetishesByCategory[category]) {
            for (const fetish of fetishesByCategory[category]) {
                if (!filteredFetishes[fetish]) {
                    filteredFetishes[fetish] = [];
                }
                filteredFetishes[fetish].push(category);
            }
        }
    }

    const prioritizedFetishes = Object.keys(filteredFetishes).sort((a, b) => filteredFetishes[b].length - filteredFetishes[a].length);
    const availableFetishes = prioritizedFetishes.filter(fetish => !drawnFetishes.has(fetish));

    if (availableFetishes.length > 0) {
        const randomFetish = getRandomItem(availableFetishes);
        drawnFetishes.add(randomFetish);
        return randomFetish;
    } else {
        return null;
    }
}

function anotherRound() {
    document.getElementById('result').textContent = '';
    document.getElementById('categories-input').value = '';
    drawnFetishes = new Set();
}
