pragma solidity >=0.4.22 <0.9.0;

contract DappToken {
    //  Name
    string public name = "DApp Token";

    //  Symbol
    string public symbol = "DAPP";

    //  Standard
    string public standard = "DApp Token v1.0";

    // totalSupply
    uint256 public totalSupply = 1000000000000000;

    uint256 public decimals = 18;

    //  allowance
    mapping(address => mapping(address => uint256)) public allowance;

    mapping(address => bool) private _isExcluded;

    uint256 private constant pointMultiplier = 10 ** 18;

    struct Account {
        uint256 balance;
        uint256 lastDividendPoints;
    }

    mapping(address => Account) public accounts;

    uint256 private totalDividendPoints;

    uint256 private unclaimedDividends;

    uint256 private reflectionFee;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor () public {
        accounts[msg.sender].balance = totalSupply ;
        _isExcluded[msg.sender] = true;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    //  Transfer
    //  Exception if account doesnt have enough
    //  Return bool
    //  transfer event
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(accounts[msg.sender].balance >= _value);

        if (_isExcluded[msg.sender]) {
            reflectionFee = 0;
        } else {
            reflectionFee = 5;
        }
        uint256 rAmount = _value * reflectionFee / 100;
        uint256 amount = _value - rAmount;
        accounts[msg.sender].balance -= _value;
        accounts[_to].balance += amount;
        disburse(rAmount);

        emit Transfer(msg.sender, _to, amount);

        return true;
    }

    // approve
    function approve(address _spender, uint256 _value) public returns (bool success) {
        // allowance
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    //  transferFrom
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        //  Require _from has enough token
        require(_value <= accounts[_from].balance);
        //  Require allowance is big eough token
        require(_value <= allowance[_from][msg.sender]);

        if (_isExcluded[_from]) {
            reflectionFee = 0;
        } else {
            reflectionFee = 5;
        }
        uint256 rAmount = _value * reflectionFee / 100;
        uint256 amount = _value - rAmount;
        //  change the balance
        accounts[_from].balance -= _value;
        accounts[_to].balance += amount;
        disburse(rAmount);
        //  update allowance
        allowance[_from][msg.sender] -= _value;
        //  Transfer event
        emit Transfer(_from, _to, amount);
        //  return bool
        return true;
    }

    function dividendsOwing(address account) internal view returns (uint256) {
        uint256 newDividendPoints = totalDividendPoints - accounts[account].lastDividendPoints;
        return (accounts[account].balance * newDividendPoints) / pointMultiplier;
    }

    modifier updateAccount(address account) {
        uint256 owing = dividendsOwing(account);
        if (owing > 0) {
            unclaimedDividends -= owing;
            accounts[account].balance += owing;
            accounts[account].lastDividendPoints = totalDividendPoints;
        }
        _;
    }

    function disburse(uint256 amount) private {
        totalDividendPoints += (amount * pointMultiplier / totalSupply);
        unclaimedDividends += amount;
    }

    function balanceOf(address account) public updateAccount(account) returns (uint256){
        return accounts[account].balance;
    }

    function mint(address recipient, uint256 amount) public {
        accounts[recipient].balance += amount;
        totalSupply += amount;
    }
}