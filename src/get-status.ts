import { JoyApi } from "./joyApi";
import { PromiseAllObj } from "./utils";

const api = new JoyApi('wss://rome-rpc-endpoint.joystream.org:9944/');

export async function getChainStatus() {
  await api.init;

  const status = await PromiseAllObj({
    totalIssuance: await api.totalIssuance(),
    system: await api.systemData(),
    finalizedBlockHeight: await api.finalizedBlockHeight(),
    validators: await api.validatorsData()
  });

  return status;
}

export async function getValidatorStatistics(address: string, blockStart: number) {
  await api.init;
  const status = await PromiseAllObj({
    status: await api.getActiveErasForBlock(address, blockStart)
  })
  return status
}
