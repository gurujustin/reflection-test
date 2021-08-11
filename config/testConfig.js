
var REFLECT = artifacts.require("DappToken");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0xFBC2196Ef01694eec63DB28f5458CCB7ef6695A7",
        "0x6bf42b06aD602D989B02a2E4c95754cA44ea902A",
        "0x8d5D7f8C85D98698ac2365A7D8179966f61b41b4",
        "0x6546d576f08BD5B71a875838EdD511D2872a854A",
        "0xB405FE8858e7B8a1C4D1A37A473180a0d47FF182",
        "0xb149eF9d205c21a092f61facAbf0D6f0AE9bc9DF",
        "0x7d5018613b6348b81D0FdBB7332A862B204c4478",
        "0x0E7314F1Cc9Ba612600dE1d5C52f5D3df5879961",
        "0x76598b77A6D43e362228A4eE984dC75b33dd407b",
        "0x9F42bcda8A0B917e07eB04f60756aE619beAd51D"
    ];


    let owner = accounts[0];

    // Throw constructor data as args in the .new() function
    let reflect = await REFLECT.new();

    return {
        owner: owner,
        reflect: reflect,
        testAddresses: testAddresses,
        // To make smaller transactions easier
        weiMultiple: (new BigNumber(10)).pow(18),
    }
}

module.exports = {
    Config: Config
};