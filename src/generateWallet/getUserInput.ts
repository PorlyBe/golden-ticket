import readlineSync from "../helpers/readlineSync";
import chalk from "chalk";
import { getLogger } from "log4js";
import fs from "fs-extra";
import { GenerateWalletUserInput, SectionStrings } from "../interfaces";
import { colorQuestion } from "../helpers";
import settings from "../settings.json";

const logger = getLogger("getUserInput");
/**
 * Gets input from user
 *
 * @param {SectionStrings} strings strings for localization
 * @returns {title: string; language: string;} returns project title and language
 */
const getUserInput = (strings: SectionStrings): GenerateWalletUserInput => {
  logger.debug("generateWallet::getUserInput");

  fs.ensureDirSync(settings.outDir);
  const campaigns = fs.readdirSync(settings.outDir);

  const {
    PROMPT_TITLE_DEFAULT,
    PROMPT_TITLE_DESCRIPTION,
    PROMPT_TITLE_LIMIT_MESSAGE,
    PROMPT_TITLE_OVERWRITE
  } = strings;

  const titleQuestion = colorQuestion(
    PROMPT_TITLE_DESCRIPTION,
    PROMPT_TITLE_DEFAULT
  );

  const title = readlineSync.question(titleQuestion, {
    defaultInput: PROMPT_TITLE_DEFAULT,
    hideEchoBack: true
  }); // ask user for campaign title

  if (campaigns.includes(title)) {
    logger.info(PROMPT_TITLE_LIMIT_MESSAGE);
    const overwrite = readlineSync.keyInYNStrict(PROMPT_TITLE_OVERWRITE, {
      hideEchoBack: true
    });
    if (overwrite) return { title };

    const newTitle = readlineSync.question(titleQuestion, {
      defaultInput: PROMPT_TITLE_DEFAULT,
      hideEchoBack: true,
      limit: t => !campaigns.includes(t),
      limitMessage: PROMPT_TITLE_LIMIT_MESSAGE
    }); // ask user for campaign title

    return { title: newTitle };
  }

  return { title };
};

export default getUserInput;