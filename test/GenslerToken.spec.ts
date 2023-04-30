import { expect } from 'chai'
import { BigNumber, Contract, ethers, getDefaultProvider } from 'ethers'
import { MockProvider, deployContract } from 'ethereum-waffle'
import { _TypedDataEncoder, defaultAbiCoder, formatBytes32String, keccak256, parseBytes32String, toUtf8Bytes } from 'ethers/lib/utils'

import GenslerToken from '../artifacts/contracts/GenslerToken.sol/GenslerToken.json'

const toBig = (n: number, e: number = 18) => BigNumber.from(n).mul(BigNumber.from(1).pow(e))

const TEAM_SUPPLY_VAULT = "0x31a244fA299aEcca49906592C5507711e97F54f8";
const MARKETING_VAULT = "0x11D9cc102D239bBC8da8B2538A76DfE3a5352b86";
const DAO_FUND_VAULT = "0xAA2dAC35ab325CBd58b290A440685F72D677661f";
const LIQUIDITY_VAULT = "0xCe933adDc23E2502F55220de5D87f891581FE5c0";
const LP_FARM_COMMUNITY_VAULT = "0x3635D03636AA8F2eE10a9594faB47C05A87C03e2";

const TEAM_SUPPLY_ALLOCATION = toBig(84_000_000_000);
const MARKETING_ALLOCATION = toBig(42_000_000_000);
const DAO_FUND_ALLOCATION = toBig(42_000_000_000);
const LIQUIDITY_ALLOCATION = toBig(42_000_000_000);
const LP_FARM_COMMUNITY_ALLOCATION = toBig(210_000_000_000);
const GENSLER_TOTAL_SUPPLY_ALLOCATION = toBig(420_000_000_000);

describe("GenslerToken", function () {
  const provider = new MockProvider()

  const [gensler] = provider.getWallets()

  let token: Contract

  beforeEach(async () => {
    token = await deployContract(gensler, GenslerToken)
  })

  it('name, symbol, decimals, totalSupply, balanceOf, DOMAIN_SEPARATOR, PERMIT_TYPEHASH', async () => {
    const name = await token.name()

    // token data
    expect(name).to.eq('Sec-urity Gensler')
    expect(await token.symbol()).to.eq('GENSLER')
    expect(await token.decimals()).to.eq(18)
    
    // total supply
    expect(await token.totalSupply()).to.eq(GENSLER_TOTAL_SUPPLY_ALLOCATION)

    // supply allocation
    expect(await token.balanceOf(TEAM_SUPPLY_VAULT)).to.eq(TEAM_SUPPLY_ALLOCATION)
    expect(await token.balanceOf(MARKETING_VAULT)).to.eq(MARKETING_ALLOCATION)
    expect(await token.balanceOf(DAO_FUND_VAULT)).to.eq(DAO_FUND_ALLOCATION)
    expect(await token.balanceOf(LIQUIDITY_VAULT)).to.eq(LIQUIDITY_ALLOCATION)
    expect(await token.balanceOf(LP_FARM_COMMUNITY_VAULT)).to.eq(LP_FARM_COMMUNITY_ALLOCATION)

    const network = await getDefaultProvider().getNetwork();
    console.log("Network name=", network.name);
    console.log("Network chain id=", network.chainId);
    console.log(token.interface);

    console.log('bytes', toUtf8Bytes(name));

    // Recupera il domain separator dal contratto
    const domainSeparator = await token.DOMAIN_SEPARATOR();

    // Calcola il domain separator atteso manualmente
    const chainId = await getDefaultProvider().network.chainId;
    const verifyingContract = token.address;
    const expectedDomainSeparator = ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ["bytes32", "bytes32", "bytes32", "uint256", "address"],
        [
          ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")
          ),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name)),
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes('1')),
          chainId,
          verifyingContract
        ]
      )
    );

    // Verifica che il domain separator calcolato corrisponda a quello atteso
    expect(domainSeparator).to.equal(expectedDomainSeparator);


    // Verifica che il domain separator calcolato corrisponda a quello atteso
    expect(domainSeparator).to.equal(expectedDomainSeparator);
    
    
    // domain separator
    // expect(await token.DOMAIN_SEPARATOR()).to.eq(
    //   keccak256(
    //     defaultAbiCoder.encode(
    //       ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
    //       [
    //         keccak256(
    //           toUtf8Bytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')
    //         ),
    //         keccak256(toUtf8Bytes(name)),
    //         keccak256(toUtf8Bytes('1')),
    //         token.deployTransaction.chainId,
    //         token.address
    //       ]
    //     )
    //   )
    // )

    // permit typehash
    expect(await token.PERMIT_TYPEHASH()).to.eq(
      keccak256(toUtf8Bytes('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)'))
    )
  })
})
