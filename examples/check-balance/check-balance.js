/*
  Check the BCH and Wormhole token balance for the wallet created with the
  create-wallet example app.
*/

"use strict"

const WH = require("wormholecash/lib/Wormhole").default
//const Wormhole = new WH({restURL: `https://wormholecash-staging.herokuapp.com/v1/`})
const Wormhole = new WH({ restURL: `http://localhost:3000/v1/` })

// Open the wallet generated with create-wallet.
let walletInfo
try {
  walletInfo = require(`../create-wallet/wallet.json`)
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

async function getBalance() {
  try {
    // first get BCH balance
    const balance = await Wormhole.Address.details([walletInfo.cashAddress])

    console.log(`BCH Balance information:`)
    console.log(balance)
    console.log(``)
    console.log(`Wormhole Token information:`)

    // get token balances
    try {
      const tokens = await Wormhole.DataRetrieval.balancesForAddress(
        walletInfo.cashAddress
      )

      console.log(JSON.stringify(tokens, null, 2))
    } catch (error) {
      if (error.message === "Address not found") console.log(`No tokens found.`)
    }
  } catch (err) {
    console.error(`Error in getBalance: `, err)
    console.log(`Error message: ${err.message}`)
    throw err
  }
}
getBalance()
