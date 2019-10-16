export function convertToMoney(
  money
  , withCurrency = true 
  , currency = 'USD') {


  console.log('@@convertToMoney [money] == ', money)

  let money_currency = ''
  let money_decimal = money.toFixed(2)
  let money_value = money_decimal.replace(/\d(?=(\d{3})+\.)/g, '$&,')
  let money_after = ''

  if (currency === 'USD') {
    money_currency = '$'
  }

  if (withCurrency) {
    money_after = `${money_currency}${money_value}`
  } else {
    money_after = money_value
  }

  console.log('@@convertToMoney [money_after] == ', money_after)

  return money_after
}