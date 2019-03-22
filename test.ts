import { question } from 'readline-sync'
const myPokemon = "Charmander"
const opponent = "Bulbusaur"
let myHP = 200
let oppHP = 200
let isMyTurn = true

function displayOptions(move) {
  let i = 1
  while (i < 5) {
    console.log(i + '. ' + move[i].name + ', Damage:' + move[i].damage)

    // i += 1
    i = i + 1
  }
}

const skillCharmander = [
  {
    name: 'Tackle',
    damage: 10,
    type: 'normal',
  },
  {
    name: 'Ember',
    damage: 50,
    type: 'fire',
  },
  {
    name: 'Body Slam',
    damage: 75,
    type: 'normal',
  },
  {
    name: 'Flamethrower',
    damage: 125,
    type: 'fire',
  },
]
const skillBulbusaur = [
  {
    name: 'Tackle',
    damage: 10,
    type: 'normal',
  },
  {
    name: 'Wipe',
    damage: 50,
    type: 'grass',
  },
  {
    name: 'Body Slam',
    damage: 75,
    type: 'normal',
  },
  {
    name: 'Razor Leaf',
    damage: 125,
    type: 'grass',
  },
]

// 1. You have encounter your opponent Mr Mine.
// 2. You send in Gengar.
// 3. You can choose one of Gengar's skills
// 4. Gengar use shadow ball. Shadow Ball hits for 50 DMG. 
// 5. You have earned experience points.
// 6. if your pokemon levels up, might learn new skills.
console.log('You have encountered a wild ' + opponent)
console.log('You send out ' + myPokemon)
console.log(myPokemon + ' has ' + myHP + ' HP')
console.log(opponent + ' has ' + oppHP + ' HP')

while (myHP > 0 && oppHP > 0) {

  console.log('------------------------------')
  let attackerName = isMyTurn ? myPokemon : opponent
  let defenderName = isMyTurn ? opponent : myPokemon
  console.log('It is now ' + attackerName + "'s turn")

  if (isMyTurn) {
    displayOptions(skillCharmander)
    let ansCharmanderMove = question('Please select your move\n')

    console.log(attackerName + ' uses ' + skillCharmander[ansCharmanderMove].name + '.')
    console.log(skillCharmander[ansCharmanderMove].name + ' hits for ' + skillCharmander[ansCharmanderMove].damage + ' damage')
    oppHP = oppHP - skillCharmander[ansCharmanderMove].damage
    console.log(defenderName + "'s health is reduced to " + oppHP)
  } else {
    displayOptions(skillBulbusaur)
    let ansBulbasaurMove = question('Please select your move\n')

    console.log(attackerName + ' uses ' + skillBulbusaur[ansBulbasaurMove].name + '.')
    skillBulbusaur[1].damage
    console.log(skillBulbusaur[1].name + ' hits for ' + skillBulbusaur[1].damage + ' damage')
    myHP = myHP - skillBulbusaur[1].damage
    console.log(defenderName + "'s health is reduced to " + myHP)
  }

  // TODO: switch turns
  isMyTurn = !isMyTurn
}

// 4. Critical Hit. Enemy fainted because health reduced to 0/

if (oppHP <= 0) {
  console.log(opponent + ' faints')
  console.log(myPokemon + ' has gained 50 exp')
} else if (myHP <= 0) {
  console.log(opponent + "'s health is reduced to 0")
  console.log('GAME OVER')
}

