
var REFLECT = artifacts.require("Safemoon");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0x6C0Efbc4Cd363cB980E823d94339467c5d974aCB",
        "0xD88600e62cd26Fb4e632CeCaf52B557159c9b996",
        "0x69832c2Cf49139ffD9c34BBE78cb171CC98d6e57",
        "0x66a1eC57c9cE271cdAc575ee6C6b734135A10693",
        "0x2310b70Def9a14463C36dee2577E7bAceAfb5A5c",
        "0xa697C2af15b2FBf4E5225BdDD53Ce630a76c8850",
        "0x8739D59B1Ce9Db25e180F9bb45189780886104D3",
        "0x6c78255262ACE866f6B53955c6342406dD58757e",
        "0x3abB5920Bd53A4e9AB18d1AA3f86A86E44D779d1",
        "0x0211Da129827211F7C1205d87C9B5138E9221214"
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