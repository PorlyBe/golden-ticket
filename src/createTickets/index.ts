import fs from "fs-extra";
import generateWIFs from "./generateWIFs";
import generateHTML from "./generateHTML";
import generatePDF from "./generatePDF";
import settings from "../settings.json";
import { getLogger, promptCampaign } from "../helpers";

const logger = getLogger("createTickets");

/**
 * Starts create tickets
 *
 * @returns {Promise<any>}
 */
const main: any = async (): Promise<any> => {
  try {
    const campaignData = await promptCampaign();
    if (campaignData === "CANCELED") return;

    const { title } = campaignData;

    // create needed directory structure
    fs.ensureDirSync(`${settings.outDir}/${title}/html/`);
    fs.ensureDirSync(`${settings.outDir}/${title}/pdf/`);
    fs.ensureFileSync(`${settings.outDir}/${title}/privKeyWIFs`);

    const wifs = await generateWIFs(campaignData);

    logger.info("============================================================");
    await generateHTML(wifs, campaignData);
    logger.info("============================================================");
    await generatePDF(wifs, campaignData);
    logger.info("============================================================");
  } catch (err) {
    return err;
  }
};

export default main();
