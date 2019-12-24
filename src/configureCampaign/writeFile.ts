import fs from 'fs-extra';
import { getLogger } from 'log4js';
import displayCampaignInfo from './printGeneratedWallet';

const logger = getLogger('writeFile');

/**
 * Sets up directory and creates wallet.json file
 *
 * @param {string} filename filename/path to write to
 * @param {MnemonicObject} data the mnemonic data object
 * @param {Callback} callback callback
 */
const writeFile = async (
  filename: string,
  data: MnemonicObject,
): Promise<void> => {
  try {
    logger.debug('generateWallet::writeFile');
    fs.outputFileSync(filename, JSON.stringify(data));
    const rawFile = fs.readFileSync(filename, 'utf8');
    const jsonData = JSON.parse(rawFile);

    displayCampaignInfo({ data: jsonData, filename });
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
export default writeFile;