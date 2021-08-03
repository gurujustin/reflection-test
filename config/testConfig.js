
var REFLECT = artifacts.require("Safemoon");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0x3b969CC94655C2650D46565172787ea105ddC840",
        "0x5Ad26575AED947037222823946214546D5321b90",
        "0xd7246Da698da3AeB55D8E7Eed12A581E8fABbF23",
        "0x85f23A46E167690b8cdBC850b2EE399dEDCfcEfd",
        "0xa41046f3BA6308Fa4E9E0b187d4ED59d58C9d313",
        "0x2f0843C6966162e4013e98931E1ba50678d2786F",
        "0x83d401906Dbf677B668d627530018470810619Af",
        "0xbA030330a75B1108B263B2350b443bd65507629C",
        "0xAdbBa71e6Cd8Bd98397F924ecc79dBD10C6184C3",
        "0x1bd3f7C606dABE3DF8d775195C39E6E689d70426"
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