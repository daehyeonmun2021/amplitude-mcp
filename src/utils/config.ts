import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { AmplitudeCredentials } from "../types/amplitude.js";

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option("amplitude-api-key", {
    type: "string",
    description: "Amplitude API key",
    demandOption: true
  })
  .option("amplitude-secret-key", {
    type: "string",
    description: "Amplitude secret key",
    demandOption: true
  })
  .help()
  .argv;

/**
 * Get Amplitude API credentials from command line arguments
 * @returns Amplitude credentials object
 */
export const getAmplitudeCredentials = (): AmplitudeCredentials => {
  const apiKey = argv["amplitude-api-key"] as string;
  const secretKey = argv["amplitude-secret-key"] as string;
  
  return { apiKey, secretKey };
};