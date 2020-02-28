const calculate_price = (type, weigth) => {
  if (weigth) {
    if (weigth < 0.5) {
      return type === 'EXPRESS' ? 10 : 6
    } else if (weigth < 1) {
      return type === 'EXPRESS' ? 12 : 6
    } else if (weigth < 2) {
      return type === 'EXPRESS' ? 15 : 7
    } else {
      return ((Math.ceil(weigth) - 2 ) * (type === 'EXPRESS' ? 4 : 1)) + (type === 'EXPRESS' ? 15 : 9)
    }
  }
}

module.exports = calculate_price