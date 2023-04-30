// SPDX-License-Identifier: MIT
// Based on Uniswap V2 @ https://github.com/Uniswap/v2-core/releases/tag/v1.0.1

pragma solidity =0.5.16;

import "uniswap-v2-core/contracts/UniswapV2ERC20.sol";

/**
 * @title Sec-urity Gensler Meme Coin
 * @author The Security Team
 * @notice the goal of this coin is to satirize institutions in their futile war against the crypto space
 * @notice We are the army!
 * @notice We are the crypto army!!
 * @notice We are the meme crypto army!!!
 * 
 * Supply Allocation
 * - 20% team supply divided into 3 years on a weekly basis
 * - 10% marketing
 * - 10% fondo DAO
 * - 10% liquidità
 * - 50% LP farm community
 * 
 * Don't Trust, Verify.
 */
contract GenslerToken is UniswapV2ERC20 {
    string public constant name = 'Sec-urity Gensler';
    string public constant symbol = 'GENSLER';

    address public constant TEAM_SUPPLY_VAULT = 0x31a244fA299aEcca49906592C5507711e97F54f8;
    address public constant MARKETING_VAULT = 0x11D9cc102D239bBC8da8B2538A76DfE3a5352b86;
    address public constant DAO_FUND_VAULT = 0xAA2dAC35ab325CBd58b290A440685F72D677661f;
    address public constant LIQUIDITY_VAULT = 0xCe933adDc23E2502F55220de5D87f891581FE5c0;
    address public constant LP_FARM_COMMUNITY_VAULT = 0x3635D03636AA8F2eE10a9594faB47C05A87C03e2;
    
    uint256 public constant TEAM_SUPPLY_ALLOCATION = 84_000_000_000;
    uint256 public constant MARKETING_ALLOCATION = 42_000_000_000;
    uint256 public constant DAO_FUND_ALLOCATION = 42_000_000_000;
    uint256 public constant LIQUIDITY_ALLOCATION = 42_000_000_000;
    uint256 public constant LP_FARM_COMMUNITY_ALLOCATION = 210_000_000_000;
    uint256 public constant GENSLER_TOTAL_SUPPLY_ALLOCATION = 420_000_000_000;

    constructor() public {
        require(
            TEAM_SUPPLY_ALLOCATION +
            MARKETING_ALLOCATION +
            DAO_FUND_ALLOCATION +
            LIQUIDITY_ALLOCATION +
            LP_FARM_COMMUNITY_ALLOCATION ==
            GENSLER_TOTAL_SUPPLY_ALLOCATION
        );

        _mint(TEAM_SUPPLY_VAULT, TEAM_SUPPLY_ALLOCATION);
        _mint(MARKETING_VAULT, MARKETING_ALLOCATION);
        _mint(DAO_FUND_VAULT, DAO_FUND_ALLOCATION);
        _mint(LIQUIDITY_VAULT, LIQUIDITY_ALLOCATION);
        _mint(LP_FARM_COMMUNITY_VAULT, LP_FARM_COMMUNITY_ALLOCATION);
    }
}
