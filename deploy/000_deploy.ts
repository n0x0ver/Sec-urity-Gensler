import {HardhatRuntimeEnvironment} from 'hardhat/types';

async function deployment(hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {owner} = await getNamedAccounts();

  console.log();
  console.log('!@#$%^&* Sec-urity Gensler Deployment Start! *&^%$#@!');
  console.log();

  await deploy('GenslerToken', {
    contract: 'GenslerToken',
    from: owner,
    args: [],
    log: true,
  });
}

export default deployment;

deployment.tags = ['token'];
