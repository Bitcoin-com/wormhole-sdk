class CheckBalance {
  constructor(Wormhole) {
    this.Wormhole = Wormhole
  }

  async checkBalance(cashAddress) {
    const finalBalance = {}
    const balance = await this.Wormhole.Address.details([cashAddress])
    finalBalance.bch = balance[0].balance
    finalBalance.satoshis = balance[0].balanceSat

    // get token balances
    try {
      const tokens = await this.Wormhole.DataRetrieval.balancesForAddress(
        cashAddress
      )
      finalBalance.tokens = tokens
      return finalBalance
    } catch (error) {
      if (error.message === "Address not found") console.log(`No tokens found.`)
    }
  }
}

export default CheckBalance
