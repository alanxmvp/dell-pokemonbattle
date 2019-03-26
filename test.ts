import { question } from 'readline-sync'
let isMyTurn = true
let myPokemon = [
  { // first pokemon
    name: 'Charmander',
    type: 'fire',
    hp: 200,
    atk: 20,
    def: 5,
    status: 'normal',
    statuscount: 0,
    skill: [
      {
        name: 'Growl',
        damage: 5,
        type: 'plusatk',
        category: 'buff',
      },
      {
        name: 'tail whip',
        damage: 5,
        type: 'minusdef',
        category: 'debuff',
      },
      {
        name: 'Ember',
        damage: 50,
        type: 'fire',
        category: 'attack',
      },
      {
        name: 'Flamethrower',
        damage: 125,
        type: 'fire',
        category: 'attack',
      },
      {
        name: 'Poison Powder',
        damage: 50,
        type: 'poison',
        category: 'attack',
      },
      {
        name: 'Dark Void',
        damage: 40,
        type: 'sleep',
        category: 'attack',
      },
      {
        name: 'Secret Power',
        damage: 5,
        type: 'paralyze',
        category: 'attack',
      },
    ],
  }
]
let oppPokemon = [
  {
    name: 'Bulbusaur',
    type: 'grass',
    hp: 250,
    atk: 15,
    def: 10,
    status: 'normal',
    statuscount: 0,
    skill: [
      {
        name: 'Tackle',
        damage: 30,
        type: 'normal',
        category: 'attack',
      },
      {
        name: 'Harden',
        damage: 5,
        type: 'plusdef',
        category: 'buff',
      },
      {
        name: 'Vine Wipe',
        damage: 50,
        type: 'grass',
        category: 'attack',
      },
      {
        name: 'Razor Leaf',
        damage: 125,
        type: 'grass',
        category: 'attack',
      },
      {
        name: 'Poison Gas',
        damage: 20,
        type: 'poison',
        category: 'attack',
      },
      {
        name: 'Spore',
        damage: 10,
        type: 'sleep',
        category: 'attack',
      },
      {
        name: 'Lick',
        damage: 10,
        type: 'paralyze',
        category: 'attack',
      },
    ]
  }
]

function displayMoves(monster) {
  let i = 0
  while (i < 8) {
    console.log(i + '. ' + monster.skill[i].name + ', Damage:' + monster.skill[i].damage)

    // i += 1
    i = i + 1
  }
}

function checkStatus(pokemon) { //check whether getting any effect (poison / sleep / paralyze)
  if (pokemon.statuscount > 0) {
    if (pokemon.status == 'poison') {
      // if getting poison status
      let poisondmg = pokemon.hp * 10 / 100
      pokemon.hp = pokemon.hp - poisondmg
      console.log(pokemon.name + 'getting ' + poisondmg + '.')
      pokemon.statuscount = pokemon.statuscount - 1
      return 'poison'
    } else if (pokemon.status == 'sleep' || pokemon.status == 'paralyze') {
      console.log(pokemon.name + ' is ' + pokemon.status + '. Not able to move !')
      pokemon.statuscount = pokemon.statuscount - 1
      return 'skip'
    }
  } else {
    return 'normal'
  }
}

function checkEffective(attackType, defenderType) {
  //get attacker / defender type
  let atkType = attackType
  let defType = defenderType
  let effect = 'normal'

  if (atkType == 'fire') {
    if (defType == 'water' || defType == 'rock' || defType == 'fire') {
      effect = 'weak'
    } else if (defType == 'grass' || defType == 'bug' || defType == 'ice') {
      effect = 'effective'
    } else {
      effect = 'normal'
    }
  } else if (atkType == 'grass' || atkType == 'bug') {
    if (defType == 'flying' || defType == 'bug' || defType == 'fire') {
      effect = 'weak'
    } else if (defType == 'rock' || defType == 'water') {
      effect = 'effective'
    } else {
      effect = 'normal'
    }
  } else if (atkType == 'water') {
    if (defType == 'water' || defType == 'grass') {
      effect = 'weak'
    } else if (defType == 'grass' || defType == 'bug') {
      effect = 'effective'
    } else {
      effect = 'normal'
    }
  } else if (atkType == 'electric') {
    if (defType == 'electric' || defType == 'grass') {
      effect = 'weak'
    } else if (defType == 'flying' || defType == 'water') {
      effect = 'effective'
    } else {
      effect = 'normal'
    }
  } else if (atkType == 'flying') {
    if (defType == 'rock' || defType == 'electric') {
      effect = 'weak'
    } else if (defType == 'fighting' || defType == 'bug' || defType == 'grass') {
      effect = 'effective'
    } else {
      effect = 'normal'
    }
  } else if (atkType == 'Rock') {
    if (defType == 'fighting') {
      effect = 'weak'
    } else if (defType == 'flying' || defType == 'bug' || defType == 'fire') {
      effect = 'effective'
    } else {
      effect = 'normal'
    }
  } else if (atkType == 'fighting') {
    if (defType == 'flying' || defType == 'bug' || defType == 'psychic') {
      effect = 'weak'
    } else if (defType == 'normal' || defType == 'rock') {
      effect = 'effective'
    } else {
      effect = 'normal'
    }
  } else if (atkType == 'ghost') {
    if (defType == 'normal') {
      effect = 'weak'
    } else if (defType == 'psychic') {
      effect = 'effective'
    } else {
      effect = 'normal'
    }
  } else if (atkType == 'psychic') {
    if (defType == 'psychic') {
      effect = 'weak'
    } else if (defType == 'fighting') {
      effect = 'effective'
    } else {
      effect = 'normal'
    }
  } else {
    effect = 'normal'
  }

  return effect
}

function beginBattle() {
  console.log('You have encountered a wild ' + oppPokemon[0].name)
  console.log('You send out ' + myPokemon[0].name)
  console.log(myPokemon[0].name + ' has ' + myPokemon[0].hp + ' HP')
  console.log(oppPokemon[0].name + ' has ' + oppPokemon[0].hp + ' HP')
  //console.log(myPokemon[0].skill[0].name)
  while (myPokemon[0].hp > 0 && oppPokemon[0].hp > 0) {

    console.log('-----------------------------------------')
    let attackerName = isMyTurn ? myPokemon[0].name : oppPokemon[0].name
    let defenderName = isMyTurn ? oppPokemon[0].name : myPokemon[0].name
    let newDamage = 0

    console.log('It is now ' + attackerName + "'s turn.")

    if (isMyTurn) {
      let pokeStatus = checkStatus(myPokemon[0])

      if (pokeStatus === 'skip') {
        // when get paralyze or sleep turn will be skip and do nothing
      } else {
        //code go here if poison or normal
        if (pokeStatus === 'poison' && myPokemon[0].hp <= 0) {
          //hp = 0 or below 0 after get poison damage
          return
        } else {
          displayMoves(myPokemon[0])
          let ansCharmanderMove = question('Please select your move\n')
          console.log(attackerName + ' uses ' + myPokemon[0].skill[ansCharmanderMove].name + '.')

          // if user choose buff & debuff move, run below code
          if (myPokemon[0].skill[ansCharmanderMove].category == 'buff') {
            if (myPokemon[0].skill[ansCharmanderMove].type == 'plusdef') {
              myPokemon[0].def = myPokemon[0].def + myPokemon[0].skill[ansCharmanderMove].damage
              console.log(attackerName + "'s defense has increased.")
            } else if (myPokemon[0].skill[ansCharmanderMove].type == 'plusatk') {
              myPokemon[0].atk = myPokemon[0].atk + myPokemon[0].skill[ansCharmanderMove].damage
              console.log(attackerName + "'s attack has increased.")
            }
          } else if (myPokemon[0].skill[ansCharmanderMove].category == 'debuff') {
            if (myPokemon[0].skill[ansCharmanderMove].type == 'minusdef') {
              oppPokemon[0].def = oppPokemon[0].def - myPokemon[0].skill[ansCharmanderMove].damage
              console.log(defenderName + "'s defense has decreased.")
            } else if (myPokemon[0].skill[ansCharmanderMove].type == 'minusatk') {
              oppPokemon[0].atk = oppPokemon[0].atk - myPokemon[0].skill[ansCharmanderMove].damage
              console.log(defenderName + "'s attack has decreased.")
            }
          } else { // attack move
            //calculate atk - def
            if (oppPokemon[0].def > 0) {
              let dmgRate1 = myPokemon[0].atk - oppPokemon[0].def

              if (dmgRate1 <= 0) {
                newDamage = 5 //the minimum attack value in case defense is more than attack
              }
              else {
                dmgRate1 = myPokemon[0].atk * dmgRate1 / 100
                newDamage = Math.floor(myPokemon[0].skill[ansCharmanderMove].damage + dmgRate1)
              }
            } else { //then def 0
              newDamage = myPokemon[0].skill[ansCharmanderMove].damage
            }

            // check effectiveness here
            let effectiveness = checkEffective(myPokemon[0].skill[ansCharmanderMove].type, oppPokemon[0].type)

            if (effectiveness == 'effective') {
              newDamage = newDamage * 2
              console.log('Super effective ! ' + myPokemon[0].skill[ansCharmanderMove].name + ' hits for ' + newDamage + ' damage')
            } else if (effectiveness == 'weak') {
              newDamage = Math.floor(newDamage / 2)
              console.log(myPokemon[0].skill[ansCharmanderMove].name + ' hits for ' + newDamage + ' damage')
            } else { //effective = normal 
              // nothing change
              console.log(myPokemon[0].skill[ansCharmanderMove].name + ' hits for ' + newDamage + ' damage')
            }
            oppPokemon[0].hp = oppPokemon[0].hp - newDamage
            console.log(defenderName + "'s health is reduced to " + oppPokemon[0].hp)

            //if skill got status effect start the count here
            if (myPokemon[0].skill[ansCharmanderMove].type == 'poison') {
              // start the count / reset the count here if stack
              oppPokemon[0].statuscount = 5
              oppPokemon[0].status = 'poison'
            } else if (myPokemon[0].skill[ansCharmanderMove].type == 'sleep') {
              oppPokemon[0].statuscount = 5
              oppPokemon[0].status = 'sleep'
            } else if (myPokemon[0].skill[ansCharmanderMove].type == 'paralyze') {
              oppPokemon[0].statuscount = 5
              oppPokemon[0].status = 'paralyze'
            }
          }
        }
      }
    } else { //opponent turn
      let pokeStatus = checkStatus(myPokemon[0])

      if (pokeStatus === 'skip') {
        // when get paralyze or sleep turn will be skip and do nothing
      } else {
        //code go here if poison or normal
        if (pokeStatus === 'poison' && myPokemon[0].hp <= 0) {
          //hp = 0 or below 0 after get poison damage
          return
        } else {
          const Num = Math.floor(Math.random() * 6) //turning opponent into bot, auto select skills
          //displayMoves(skillBulbusaur)
          //let ansBulbasaurMove = question('Please select your move\n')
          console.log(attackerName + ' uses ' + oppPokemon[0].skill[Num].name + '.')

          // if user choose buff & debuff move, run below code
          if (oppPokemon[0].skill[Num].category == 'buff') {
            if (oppPokemon[0].skill[Num].type == 'plusdef') {
              oppPokemon[0].def = oppPokemon[0].def + oppPokemon[0].skill[Num].damage
              console.log(attackerName + "'s defense has increased.")
            } else if (oppPokemon[0].skill[Num].type == 'plusatk') {
              oppPokemon[0].atk = oppPokemon[0].atk + oppPokemon[0].skill[Num].damage
              console.log(attackerName + "'s attack has increased.")
            }
          } else if (oppPokemon[0].skill[Num].category == 'debuff') {
            if (oppPokemon[0].skill[Num].type == 'minusdef') {
              myPokemon[0].def = myPokemon[0].def - oppPokemon[0].skill[Num].damage
              console.log(defenderName + "'s defense has decreased.")
            } else if (oppPokemon[0].skill[Num].type == 'minusatk') {
              myPokemon[0].atk = myPokemon[0].atk - oppPokemon[0].skill[Num].damage
              console.log(defenderName + "'s attack has decreased.")
            }
          } else { // attack move
            //calculate atk - def
            if (myPokemon[0].def > 0) {
              let dmgRate2 = oppPokemon[0].atk - myPokemon[0].def

              if (dmgRate2 <= 0) {
                newDamage = 5 //the minimum attack value in case defense is more than attack
              }
              else {
                dmgRate2 = oppPokemon[0].atk * dmgRate2 / 100
                newDamage = Math.floor(oppPokemon[0].skill[Num].damage + dmgRate2)
              }
            } else {
              newDamage = oppPokemon[0].skill[Num].damage
            }

            // check effectiveness here
            let effectiveness = checkEffective(oppPokemon[0].skill[Num].type, myPokemon[0].type)

            if (effectiveness == 'effective') {
              newDamage = newDamage * 2 //doubled damage
              console.log('Super effective ! ' + oppPokemon[0].skill[Num].name + ' hits for ' + newDamage + ' damage')
            } else if (effectiveness == 'weak') {
              newDamage = Math.floor(newDamage / 2) //half damage
              console.log('Weak effect ! ' + oppPokemon[0].skill[Num].name + ' hits for ' + newDamage + ' damage')
            } else {
              // nothing change
              console.log(oppPokemon[0].skill[Num].name + ' hits for ' + newDamage + ' damage')
            }
            myPokemon[0].hp = myPokemon[0].hp - newDamage
            console.log(defenderName + "'s health is reduced to " + myPokemon[0].hp)

            //if skill got status effect start the count here
            if (oppPokemon[0].skill[Num].type == 'poison') {
              // start the count / reset the count here if stack
              myPokemon[0].statuscount = 5
              myPokemon[0].status = 'poison'
            } else if (oppPokemon[0].skill[Num].type == 'sleep') {
              myPokemon[0].statuscount = 5
              myPokemon[0].status = 'sleep'
            } else if (oppPokemon[0].skill[Num].type == 'paralyze') {
              myPokemon[0].statuscount = 5
              myPokemon[0].status = 'paralyze'
            }

          }
        }
      }
    }
    // switch turns
    isMyTurn = !isMyTurn
  }
}

//start the battle
beginBattle()

if (oppPokemon[0].hp <= 0) {
  console.log(oppPokemon[0].name + ' faints')
  console.log(myPokemon[0].name + ' has gained 50 exp')
} else if (myPokemon[0].hp <= 0) {
  console.log(myPokemon[0].name + "'s health is reduced to 0")
  console.log('GAME OVER')
}