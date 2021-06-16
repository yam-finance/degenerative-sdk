import { AssetMethods } from "./AssetMethods";
import Assets from "../assets.json";
import { AssetGroupModel } from "../types/assets.t";

export class Asset {

  private _options;
  private asset;
  public tvl: any;
  public apr: any;
  public gcr: any;
  private methods: AssetMethods;
  constructor(asset: any, _options: any, config?: any) {
    this._options = _options;
    this.asset = asset;
    this.methods = new AssetMethods(this._options);
    this.tvl = null; // get asset TVL
    this.apr = null; // get asset APR
    this.gcr = null; // get asset GCR
  }

  getTVL = async (combine?: boolean) => {
    return await this.methods.getTVL(this.asset, combine);
  };

  getEmpState = async () => {
    return await this.methods.getEmpState(this.asset);
  };

  getPrice = async (tokenAddress: string) => {
    return await this.methods.getPrice(tokenAddress);
  };

  getPosition = async () => {
    return await this.methods.getPosition(this.asset);
  };

  getPositions = async () => {
    return await this.methods.getPositions();
  };

  getPositionCR = async () => {
    return await this.methods.getPositionCR(this.asset);
  };

  /// @TODO Check param bug
  getUserStats = async (_startTs: number, _endTs: number) => {
    return await this.methods.getUserStats(_startTs, _endTs)
  }

  /// @TODO Check param bug
  getAPR = async () => {
    return await this.methods.getAPR("73", "1.5")
  }

  getGCR = async () => {
    return await this.methods.getGCR(this.asset);
  };

  mint = async (tokenQty: string, collateralQty: string, onTxHash?: (txHash: string) => void) => {
    return await this.methods.mint(this.asset, tokenQty, collateralQty, onTxHash);
  };

  deposit = async (collateralQty: string, onTxHash?: (txHash: string) => void) => {
    return await this.methods.deposit(this.asset, collateralQty, onTxHash);
  };

  requestWithdrawal = async (collateralQty: string, onTxHash?: (txHash: string) => void) => {
    return await this.methods.requestWithdrawal(this.asset, collateralQty, onTxHash);
  };

  withdrawRequestFinalize = async (onTxHash?: (txHash: string) => void) => {
    return await this.methods.withdrawRequestFinalize(this.asset, onTxHash);
  };

  withdraw = async (collateralQty: string, onTxHash?: (txHash: string) => void) => {
    return await this.methods.withdraw(this.asset, collateralQty, onTxHash);
  };

  redeem = async (tokenQty: string, onTxHash?: (txHash: string) => void) => {
    return await this.methods.redeem(this.asset, tokenQty, onTxHash);
  };

  settle = async (onTxHash?: (txHash: string) => void) => {
    return await this.methods.settle(this.asset, onTxHash);
  };

  getAssetTokenBalance = async (onTxHash?: (txHash: string) => void) => {
    return await this.methods.getAssetTokenBalance(this.asset, onTxHash);
  };

}
