// Type definitions for Golden Ticket v3.0
// Project: golden-ticket
// Definitions by: Paul Bergamo <paul@bitcoin.com>

interface AddressUtxoResult {
  legacyAddress: string;
  cashAddress: string;
  scriptPubKey: string;
  utxos: Utxo[];
}

interface Utxo {
  txid: string;
  vout: number;
  amount: number;
  satoshis: number;
  height: number;
  confirmations: number;
}

interface Settings {
  debug: boolean;
  locale: string;
  outDir: string;
  templateDir: string;
  hdpath: string;
  timer: number;
  tickets: number;
}

interface Mothership {
  fullNodePath: string;
  address: string;
  mnemonic: string;
  hdpath: string;
  wif: string;
}

interface Campaign {
  title: string;
  mothership: Mothership;
  tickets: Tickets;
  template: string;
}

interface Tickets {
  count: number;
  spread: Spread;
}
type Spread = { '0': number; [number: string]: number };

interface Template {
  title: string;
  name: string;
  image: string;
  pdf: PDF;
  html: HTML;
  qrcode: QRCode;
  csv: CSV;
}

interface HTML {
  width: string;
  height: string;
  qrSize: string;
  qrLeft: string;
  qrTop: string;
}

interface QRCode {
  margin: number;
  scale: number;
  width: number;
  color: {
    dark: string;
    light: string;
  };
}

interface PDF {
  size: number[];
  qrWidth: number;
  qrTop: number;
  qrLeft: number;
}

interface CSV {
  cashAddress: string;
  wif: string;
  claimed: boolean;
  value: number;
}

type ScriptName =
  | 'CHECK_TICKETS'
  | 'CREATE_CSV'
  | 'CREATE_TICKETS'
  | 'FUND_MOTHERSHIP'
  | 'FUND_TICKETS'
  | 'GENERATE_STATE'
  | 'GENERATE_WALLETS'
  | 'RECLAIM_FUNDS';

type Locale = 'en' | 'zh' | 'ko' | 'zh' | 'zh-Hans' | 'es' | 'fr' | 'it';
