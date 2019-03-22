var myPokemon = "Gengar"
const opponent = "Mr.Mime"
let myHP = 200
let oppHP = 200
const skill = ["Shadow Ball", "Body Slam", "Tackle"]
let dmg = 10
let isMyTurn = true
const experience = 50

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
    console.log(attackerName + ' uses ' + skill[0] + '.')
    dmg = 100
    console.log(skill[0] + ' hits for ' + dmg + ' damage')
  } else {
    console.log(attackerName + ' uses ' + skill[1] + '.')
    dmg = 50
    console.log(skill[1] + ' hits for ' + dmg + ' damage')
  }

  if (isMyTurn) {
    oppHP = oppHP - dmg
    console.log(defenderName + "'s health is reduced to " + oppHP)
  } else {
    myHP = myHP - dmg
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

