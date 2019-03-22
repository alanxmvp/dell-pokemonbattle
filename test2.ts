import { question } from 'readline-sync'

function displayOptions(array) {
  let i = 0
  while (i < 3) {
    console.log(i + '. ' + array[i].label + ', Price:' + array[i].price)

    // i += 1
    i = i + 1
  }
}

console.log('Choose your Screen Size')
const resSize = [
  {
    label: '13"',
    price: 200,
  },
  {
    label: '15"',
    price: 400,
  },
  {
    label: '17"',
    price: 600,
  },
]
displayOptions(resSize)
let ansSize = question('Select resSize index\n')

console.log('Choose your Processor')
const resProcessor = [
  {
    label: 'i3"',
    price: 300,
  },
  {
    label: 'i5"',
    price: 600,
  },
  {
    label: 'i7"',
    price: 900,
  },
  {
    label: 'i9"',
    price: 1200,
  },
]
displayOptions(resProcessor)
let ansProcessor = question('Select resProcessor index\n')

console.log('Choose your RAM')
const resRAM = [
  {
    label: '4GB"',
    price: 120,
  },
  {
    label: '8GB"',
    price: 250,
  },
  {
    label: '16GB"',
    price: 480,
  },
]
displayOptions(resRAM)
let ansRAM = question('Select resRAM index\n')

console.log('You Have Chosen the following options: ')
const prices = [
  resSize[ansSize].price,
  resProcessor[ansProcessor].price,
  resRAM[ansRAM].price,
]

let totalPrice = 0

for (let i in prices) {
  totalPrice = totalPrice + prices[parseInt(i)]
}

console.log(totalPrice)
console.log(resSize[ansSize].label)
console.log(resProcessor[ansProcessor].label)
console.log(resRAM[ansRAM].label)