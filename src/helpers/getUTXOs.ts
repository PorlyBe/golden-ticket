import { getLogger } from 'log4js';
import { Address } from 'bitbox-sdk';

/**
 * Get utxos from single address
 *
 * @param {string[]} mothershipAddress
 * @returns {(Promise<AddressUtxoResult | AddressUtxoResult[]>)}
 */
const getUTXOs = async (
  mothershipAddress: string | string[],
): Promise<AddressUtxoResult | AddressUtxoResult[]> => {
  const logger = getLogger();

  try {
    const address = new Address();
    const utxos = await address.utxo(mothershipAddress);

    return utxos;
  } catch (error) {
    throw logger.error(error);
  }
};

export default getUTXOs;
