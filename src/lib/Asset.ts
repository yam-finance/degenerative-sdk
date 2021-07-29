import { ethers } from "ethers";
import { AssetClassConfig } from "../types/assets.t";
import { ExpiringMultiParty } from "../types/contracts";
import EmpAbi from "../abi/emp.json";

class Asset {
    #ethersProvider!: any;
    #assetContract!: any;

    /**
     * Connects an instance of the Asset.
     * @param config - Ethers Asset configuration
     * @return The Asset instance
     */
    static async connect({
        ethersProvider,
        contracts,
        assetIdentifier,
    }: AssetClassConfig): Promise<Asset> {
        const asset = new Asset();
        await asset.init({
            ethersProvider,
            contracts,
            assetIdentifier,
        });
        return asset;
    }

    /**
     * Initializes the Asset instance.
     * @param config - Ethers Asset configuration
     */
    private async init({
        ethersProvider,
        contracts,
        assetIdentifier,
    }: AssetClassConfig): Promise<void> {
        this.#ethersProvider = ethersProvider;
        const assetIdentifierSplit = assetIdentifier.split("-");

        // @todo Throw error if assetIdentifier does not exist 
        // @todo Check EmpAbi error
        for (const assetCycle of contracts[assetIdentifierSplit[0]]) { 
            if ((assetCycle.cycle + assetCycle.year) == assetIdentifierSplit[1]) {
                this.#assetContract = new ethers.Contract(
                    assetCycle.emp.address,
                    EmpAbi,
                    this.#ethersProvider) as ExpiringMultiParty;
                break;
            }
        }
    }






// ----- Asset -----





// private options;
// private asset;
// public tvl: any;
// public apr: any;
// public gcr: any;
// private methods: AssetMethods;
// constructor(asset: any, options: any, config?: any) {
//   this.options = options;
//   this.asset = asset;
//   this.methods = new AssetMethods(this.options);
//   this.tvl = null; // get asset TVL
//   this.apr = null; // get asset APR
//   this.gcr = null; // get asset GCR
// }

// getTVL = async (combine?: boolean) => {
//   return await this.methods.getTVL(this.asset, combine);
// };

// getEmpState = async () => {
//   return await this.methods.getEmpState(this.asset);
// };

// getPrice = async (tokenAddress: string) => {
//   return await this.methods.getPrice(tokenAddress);
// };

// getPosition = async () => {
//   return await this.methods.getPosition(this.asset);
// };

// getPositions = async () => {
//   return await this.methods.getPositions();
// };

// getPositionCR = async () => {
//   return await this.methods.getPositionCR(this.asset);
// };

// getAPR = async (_aprMultiplier: string, _cr: string) => {
//   return await this.methods.getAPR(_aprMultiplier, _cr);
// }

// getGCR = async () => {
//   return await this.methods.getGCR(this.asset);
// };

// mint = async (tokenQty: string, collateralQty: string, onTxHash?: (txHash: string) => void) => {
//   return await this.methods.mint(this.asset, tokenQty, collateralQty, onTxHash);
// };

// deposit = async (collateralQty: string, onTxHash?: (txHash: string) => void) => {
//   return await this.methods.deposit(this.asset, collateralQty, onTxHash);
// };

// requestWithdrawal = async (collateralQty: string, onTxHash?: (txHash: string) => void) => {
//   return await this.methods.requestWithdrawal(this.asset, collateralQty, onTxHash);
// };

// withdrawRequestFinalize = async (onTxHash?: (txHash: string) => void) => {
//   return await this.methods.withdrawRequestFinalize(this.asset, onTxHash);
// };

// withdraw = async (collateralQty: string, onTxHash?: (txHash: string) => void) => {
//   return await this.methods.withdraw(this.asset, collateralQty, onTxHash);
// };

// redeem = async (tokenQty: string, onTxHash?: (txHash: string) => void) => {
//   return await this.methods.redeem(this.asset, tokenQty, onTxHash);
// };

// settle = async (onTxHash?: (txHash: string) => void) => {
//   return await this.methods.settle(this.asset, onTxHash);
// };

// getAssetTokenBalance = async (onTxHash?: (txHash: string) => void) => {
//   return await this.methods.getAssetTokenBalance(this.asset, onTxHash);
// };






// ----- AssetMethods -----







// import { AbiItem } from "web3-utils";
// import { AssetModel } from "../types/assets.t";
// import { approve, getUniPrice, getBalance, getPriceByContract, getWETH, waitTransaction } from "../utils/helpers";
// import EMPContract from "../../src/abi/emp.json";
// import EMPContractOld from "../../src/abi/empold.json";
// import BigNumber from "bignumber.js";
// import { USDC, WETH } from "../utils/addresses";
// import Assets from "../assets.json";

//   /**
//   * Calculate apr with aprMultiplier
//   * @param {string} aprMultiplier Amount of ETH to wrap
//   * @param {string} cr Collateral requirement
//   * @public
//   * @methods
//   */
//    getAPR = async (aprMultiplier: string, cr: string) => {
//     return ((1 / (Number(cr) + 1)) * Number(aprMultiplier)).toString();
//   }

//   /**
//   * Wrap ETH to WETH
//   * @param {string} amount Amount of ETH to wrap
//   * @public
//   * @methods
//   */
//   wrapETH = async (amount: string, onTxHash?: (txHash: string) => void) => {
//     // console.debug("sdk wrapETH", amount);
//     const weth = await getWETH(this.options.provider);
//     try {
//       const amountValue = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString();
//       const ge = await weth.methods.deposit().estimateGas(
//         {
//           from: this.options.account,
//           value: amountValue,
//           gas: 50000000,
//         },
//         async (error: any) => {
//           console.log("SimTx Failed", error);
//           return false;
//         }
//       );
//       const wrap = await weth.methods.deposit().send(
//         {
//           from: this.options.account,
//           value: amountValue,
//           gas: 70000,
//         },
//         async (error: any, txHash: string) => {
//           if (error) {
//             console.error("Could not wrap", error);
//             onTxHash && onTxHash("");
//             return false;
//           }
//           if (onTxHash) {
//             onTxHash(txHash);
//           }
//           const status = await waitTransaction(this.options.provider, txHash);
//           if (!status) {
//             console.log("Wrap transaction failed.");
//             return false;
//           }
//           return true;
//         }
//       );
//       console.log("wrap", wrap);
//       return wrap;
//     } catch (e) {
//       console.error("error", e);
//       return 0;
//     }
//   };

//   /**
//   * Unwrap WETH to ETH
//   * @param {string} amount Amount of WETH to unwrap
//   * @public
//   * @methods
//   */
//   unwrapETH = async (amount: string, onTxHash?: (txHash: string) => void) => {
//     // console.debug("sdk unwrapETH", amount);
//     const weth = await getWETH(this.options.provider);
//     try {
//       const amountValue = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString();
//       const ge = await weth.methods.withdraw(amountValue).estimateGas(
//         {
//           from: this.options.account,
//           gas: 50000000,
//         },
//         async (error: any) => {
//           console.log("SimTx Failed", error);
//           return false;
//         }
//       );
//       const unwrap = await weth.methods.withdraw(amountValue).send(
//         {
//           from: this.options.account,
//           gas: 70000,
//         },
//         async (error: any, txHash: string) => {
//           if (error) {
//             console.error("Could not unwrap", error);
//             onTxHash && onTxHash("");
//             return false;
//           }
//           if (onTxHash) {
//             onTxHash(txHash);
//           }
//           const status = await waitTransaction(this.options.provider, txHash);
//           if (!status) {
//             console.log("Wrap transaction failed.");
//             return false;
//           }
//           return true;
//         }
//       );
//       console.log("unwrap", unwrap);
//       return unwrap;
//     } catch (e) {
//       console.error("error", e);
//       return 0;
//     }
//   };

//   /**
//   * Get user WETH balance
//   * @public
//   * @methods
//   */
//   getUserBalanceWETH = async () => {
//     // console.debug("sdk getUserBalanceWETH");
//     if (!this.options.account) {
//       return false;
//     }
//     const balance = await getBalance(this.options.provider, WETH, this.options.account);
//     return balance;
//   };

//   /**
//   * Get user USDC balance
//   * @public
//   * @methods
//   */
//   getUserBalanceUSDC = async () => {
//     // console.debug("sdk getUserBalanceUSDC");
//     if (!this.options.account) {
//       return false;
//     }
//     const balance = await getBalance(this.options.provider, USDC, this.options.account);
//     return balance;
//   };

//   /**
//   * Make a contract approval
//   * @param {string} identifier Identifier for the input
//   * @param {string} spenderAddress Spender address
//   * @param {string} tokenAddress Token address
//   * @public
//   * @methods
//   */
//   makeContractApproval = async (identifier: string, spenderAddress: string, tokenAddress: string, onTxHash?: (txHash: string) => void) => {
//     // console.debug("sdk makeContractApproval", identifier, spenderAddress, tokenAddress);
//     if (!this.options.account) {
//       return false;
//     }
//     // TODO check if is already approved (fetchContractApproval) and if so return;
//     const makeApproval = await approve(this.options.account, spenderAddress, tokenAddress, this.options.provider);
//     return makeApproval;
//     // TODO handle update approvals on web
//   };

//   /**
//   * Get the total value locked (TVL) of an asset
//   * @param {AssetModel} asset Asset object
//   * @param {boolean} combine Get TVL of all assets
//   * @public
//   * @methods
//   */
//   getTVL = async (asset: AssetModel, combine?: boolean) => {
//     // console.debug("sdk getTVL", asset, combine);
//     if (!asset) {
//       return
//     };
//     try {
//       /* @ts-ignore */
//       const assetsObject = Assets[this.options.network];
//       const ethPrice = await getPriceByContract(WETH);
//       const formatter = new Intl.NumberFormat('en-US');
//       let contractEmp;
//       let contractEmpCall;
//       let empTVL: any;

//       if (combine) {
//         let assetTVL = new BigNumber(0);
//         for (const assets in assetsObject) {
//           const assetDetails = assetsObject[assets];
//           for (const asset in assetDetails) {
//             const baseAsset = new BigNumber(10).pow(assetDetails[asset].token.decimals);
//             contractEmp = new this.options.web3.eth.Contract((EMPContract.abi as unknown) as AbiItem, assetDetails[asset].emp.address);
//             contractEmpCall = await contractEmp.methods.rawTotalPositionCollateral().call();
//             let currentAssetTVL = new BigNumber(contractEmpCall).dividedBy(baseAsset);
//             currentAssetTVL = currentAssetTVL.multipliedBy(assetDetails[asset].collateral == "WETH" ? ethPrice : 1);
//             assetTVL = assetTVL.plus(currentAssetTVL);
//           }
//         }
//         empTVL = assetTVL.toNumber();
//         empTVL = formatter.format(empTVL.toFixed());
//         return empTVL;
//       } else {
//         const baseAsset = new BigNumber(10).pow(asset.token.decimals);
//         contractEmp = new this.options.web3.eth.Contract((EMPContract.abi as unknown) as AbiItem, asset.emp.address);
//         contractEmpCall = await contractEmp.methods.rawTotalPositionCollateral().call();
//         empTVL = new BigNumber(contractEmpCall).dividedBy(baseAsset);
//         empTVL = empTVL.multipliedBy(asset.collateral == "WETH" ? ethPrice : 1).toNumber();
//         empTVL = formatter.format(empTVL.toFixed()).toString();
//         return empTVL;
//       }
//     } catch (e) {
//       console.error("error", e);
//       return "0";
//     }
//   };

//   /**
//   * Get expiring multi party (EMP) contract
//   * @param {AssetModel} asset Asset object
//   * @public
//   */
//   getEmp = async (asset: AssetModel) => {
//     // console.debug("sdk getEmp", asset);
//     if (!asset) {
//       return
//     };
//     const empContract = await new this.options.web3.eth.Contract((EMPContract.abi as unknown) as AbiItem, asset.emp.address);
//     return empContract;
//   };

//   /**
//   * Get expiring multi party (EMP) data V1
//   * @param {AssetModel} asset Asset object
//   * @public
//   */
//   getEmpV1 = async (asset: AssetModel) => {
//     // console.debug("sdk getEmpV1", asset);
//     if (!asset) {
//       return
//     };
//     const empContract = await new this.options.web3.eth.Contract((EMPContractOld.abi as unknown) as AbiItem, asset.emp.address);
//     return empContract;
//   };

//   /**
//   * Get expiring multi party (EMP) state
//   * @param {AssetModel} asset Asset object
//   * @public
//   */
//   getEmpState = async (asset: AssetModel) => {
//     // console.debug("sdk getEmpState", asset);
//     if (!asset) {
//       return
//     };
//     const emp = (asset.emp.new ? await this.getEmp(asset) : await this.getEmpV1(asset));
//     if (asset.emp.new) {
//       try {
//         const res = await Promise.all([
//           emp.methods.expirationTimestamp().call(),
//           emp.methods.collateralCurrency().call(),
//           emp.methods.priceIdentifier().call(),
//           emp.methods.tokenCurrency().call(),
//           emp.methods.collateralRequirement().call(),
//           emp.methods.disputeBondPercentage().call(),
//           emp.methods.disputerDisputeRewardPercentage().call(),
//           emp.methods.sponsorDisputeRewardPercentage().call(),
//           emp.methods.minSponsorTokens().call(),
//           emp.methods.timerAddress().call(),
//           emp.methods.cumulativeFeeMultiplier().call(),
//           emp.methods.rawTotalPositionCollateral().call(),
//           emp.methods.totalTokensOutstanding().call(),
//           emp.methods.liquidationLiveness().call(),
//           emp.methods.withdrawalLiveness().call(),
//           emp.methods.getCurrentTime().call(),
//           emp.methods.contractState().call(),
//           emp.methods.finder().call(),
//           emp.methods.expiryPrice().call(),
//         ]);
//         const dat = {
//           expirationTimestamp: new BigNumber(res[0]),
//           collateralCurrency: res[1], // address
//           priceIdentifier: res[2],
//           tokenCurrency: res[3], // address
//           collateralRequirement: new BigNumber(res[4]),
//           disputeBondPercentage: new BigNumber(res[5]),
//           disputerDisputeRewardPercentage: new BigNumber(res[6]),
//           sponsorDisputeRewardPercentage: new BigNumber(res[7]),
//           minSponsorTokens: new BigNumber(res[8]),
//           timerAddress: res[9], // address
//           cumulativeFeeMultiplier: new BigNumber(res[10]),
//           rawTotalPositionCollateral: new BigNumber(res[11]),
//           totalTokensOutstanding: new BigNumber(res[12]),
//           liquidationLiveness: new BigNumber(res[13]),
//           withdrawalLiveness: new BigNumber(res[14]),
//           currentTime: new BigNumber(res[15]),
//           isExpired: Number(res[15]) >= Number(res[0]),
//           contractState: Number(res[16]),
//           finderAddress: res[17], // address
//           expiryPrice: new BigNumber(res[18]),
//         };
//         return dat;
//       } catch (e) {
//         console.error("error getting emp state", e);
//         return "bad";
//       }
//     } else {
//       try {
//         const res = await Promise.all([
//           emp.methods.expirationTimestamp().call(),
//           emp.methods.collateralCurrency().call(),
//           emp.methods.priceIdentifier().call(),
//           emp.methods.tokenCurrency().call(),
//           emp.methods.collateralRequirement().call(),
//           emp.methods.disputeBondPct().call(),
//           emp.methods.disputerDisputeRewardPct().call(),
//           emp.methods.sponsorDisputeRewardPct().call(),
//           emp.methods.minSponsorTokens().call(),
//           emp.methods.timerAddress().call(),
//           emp.methods.cumulativeFeeMultiplier().call(),
//           emp.methods.rawTotalPositionCollateral().call(),
//           emp.methods.totalTokensOutstanding().call(),
//           emp.methods.liquidationLiveness().call(),
//           emp.methods.withdrawalLiveness().call(),
//           emp.methods.getCurrentTime().call(),
//           emp.methods.contractState().call(),
//           emp.methods.finder().call(),
//           emp.methods.expiryPrice().call(),
//         ]);
//         const dat = {
//           expirationTimestamp: new BigNumber(res[0]),
//           collateralCurrency: res[1], // address
//           priceIdentifier: res[2],
//           tokenCurrency: res[3], // address
//           collateralRequirement: new BigNumber(res[4]),
//           disputeBondPct: new BigNumber(res[5]),
//           disputerDisputeRewardPct: new BigNumber(res[6]),
//           sponsorDisputeRewardPct: new BigNumber(res[7]),
//           minSponsorTokens: new BigNumber(res[8]),
//           timerAddress: res[9], // address
//           cumulativeFeeMultiplier: new BigNumber(res[10]),
//           rawTotalPositionCollateral: new BigNumber(res[11]),
//           totalTokensOutstanding: new BigNumber(res[12]),
//           liquidationLiveness: new BigNumber(res[13]),
//           withdrawalLiveness: new BigNumber(res[14]),
//           currentTime: new BigNumber(res[15]),
//           isExpired: Number(res[15]) >= Number(res[0]),
//           contractState: Number(res[16]),
//           finderAddress: res[17], // address
//           expiryPrice: new BigNumber(res[18]),
//         };
//         return dat;
//       } catch (e) {
//         console.error("error getting the old emp state", e);
//         return "bad";
//       }
//     }
//   };

//  /**
//   * Fetch the onchain token price
//   * @param {string} tokenAddress Token address
//   * @public
//   */
//      getPrice = async (tokenAddress: string) => {
//       // console.debug("sdk getPrice", tokenAddress);
//       if (!this.options.account) {
//         return;
//       }

//       const price = await getPriceByContract(tokenAddress)
//       return price
//       // TODO get onchain price of the tokenAddress
//     };

//   /**
//   * Fetch the position of an asset in relation to the connected user address
//   * @param {AssetModel} asset Asset object for the input
//   * @public
//   */
//   getPosition = async (asset: AssetModel) => {
//     // console.debug("sdk getPosition", asset);
//     if (!asset) {
//       return
//     };
//     const emp = (asset.emp.new ? await this.getEmp(asset) : await this.getEmpV1(asset));
//     try {
//       const pos = await emp.methods.positions(this.options.account).call();
//       return pos;
//     } catch (e) {
//       // console.debug(`Could not get position of ${asset.emp.address} for user ${this.options.account}`);
//     }
//   };

//   /**
//   * Fetch all the positions of an address
//   * @public
//   */
//   getPositions = async () => {
//     /* @ts-ignore */
//     const assetsObject = Assets[this.options.network];
//     let posObject = {};

//     try {
//       for (let assets in assetsObject) {
//         let assetDetails = assetsObject[assets];
//         for (let asset in assetDetails) {
//           const emp = (assetDetails[asset].emp.new ? await this.getEmp(assetDetails[asset]) : await this.getEmpV1(assetDetails[asset]));
//           const pos = await emp.methods.positions(this.options.account).call();

//           /* @ts-ignore */
//           posObject[assetDetails[asset].token.address] = pos.tokensOutstanding['rawValue'];
//         }
//       }

//       // console.log(posObject);

//       return posObject;
//     } catch (e) {
//       // console.debug(`Could not get positions of ${emp} for user ${userAddress}`);
//       return 0;
//     }
//   };

//   /**
//   * Get the current user asset position collateral ratio (CR)
//   * @param {AssetModel} asset Asset object for the input
//   * @public
//   */
//   getPositionCR = async (asset: AssetModel) => {
//     const currPos = await this.getPosition(asset);

//     try {
//       let currCollat;

//       if (asset.collateral == "WETH") {
//         const collDec = new BigNumber(10).pow(new BigNumber(18));
//         currCollat = new BigNumber(currPos.rawCollateral).div(collDec).toFixed(4).toString()
//       } else if (asset.collateral == "USDC") {
//         const collDec = new BigNumber(10).pow(new BigNumber(6));
//         currCollat = new BigNumber(currPos.rawCollateral).div(collDec).toFixed(4).toString()
//       }

//       return currCollat;
//     } catch (e) {
//       console.debug("couldnt get position for: ", asset.emp.address, " for user: ", this.options.account);// return 0;
//       return {};
//     }
//   };

//   /**
//   * Get asset global collateral ratio (GCR)
//   * @param {AssetModel} asset Asset object for the input
//   * @public
//   */
//   getGCR = async (asset: AssetModel) => {
//     const empState = await this.getEmpState(asset);

//     try {
//       if (empState != "bad" && empState != undefined) {
//         const totalTokens = empState["totalTokensOutstanding"].div(new BigNumber(10).pow(new BigNumber(asset.token.decimals))).toNumber();
//         let totalColl;
//         let price;

//         if (asset.collateral == "WETH") {
//           const collDec = new BigNumber(10).pow(new BigNumber(18));
//           price = await getUniPrice(this.options.provider, asset.token.address, WETH);
//           totalColl = empState["cumulativeFeeMultiplier"].div(10 ** 18).times(empState["rawTotalPositionCollateral"].dividedBy(collDec)).toNumber();
//         } else if (asset.collateral == "USDC") {
//           const collDec = new BigNumber(10).pow(new BigNumber(6));
//           price = await getUniPrice(this.options.provider, asset.token.address, USDC);
//           totalColl = empState["cumulativeFeeMultiplier"].div(10 ** 18).times(empState["rawTotalPositionCollateral"].dividedBy(collDec)).toNumber();
//         } else {
//           throw "Collateral not found."
//         }

//         const gcr = totalTokens > 0 ? (totalColl / totalTokens / price).toFixed(4) : 0;
//         return gcr;
//       }
//     } catch (e) {
//       console.error("error", e)
//       return {};
//     }
//   };

//   /**
//   * Mint token of an asset
//   * @param {AssetModel} asset Asset object for the input
//   * @param {string} tokenQty Token quantity to mint
//   * @param {string} collateralQty Collateral quantity to lock up for the mint
//   * @public
//   */
//   mint = async (asset: AssetModel, tokenQty: string, collateralQty: string, onTxHash?: (txHash: string) => void): Promise<any> => {
//     // console.debug("sdk mint", asset, tokenQty, collateralQty);
//     if (!asset || !this.options.account) {
//       return
//     };
//     const emp = (asset.emp.new ? await this.getEmp(asset) : await this.getEmpV1(asset));
//     try {
//       let data = emp.methods.create([collateralQty], [tokenQty]).encodeABI();
//       data = data.concat(this.options.web3.utils.toHex("0x97990b693835da58a281636296d2bf02787dea17").slice(2));
//       const estimateGas = await this.options.web3.eth.estimateGas({
//         from: this.options.account,
//         to: emp.options.address,
//         data: data,
//         gas: 50000000,
//       });
//       return this.options.web3.eth.sendTransaction({
//         from: this.options.account,
//         to: emp.options.address,
//         data: data,
//         gas: estimateGas,
//       }, async (error: any, txHash: any) => {
//         if (error) {
//           console.error("EMP could not mint tokens", error);
//           onTxHash && onTxHash("");
//           return [false, error];
//         }
//         if (onTxHash) {
//           onTxHash(txHash);
//         }
//         const status = await waitTransaction(this.options.provider, txHash);
//         if (!status) {
//           console.error("Mint transaction failed.");
//           return [false, "Mint transaction failed."];
//         }
//         return [true, ""];
//       });
//     } catch (error) {
//       console.error("error", error);
//       return [false, error];
//     }
//   };

//   /**
//   * Deposit more collateral to the position of an asset
//   * @param {AssetModel} asset Asset object for the input
//   * @param {string} collateralQty Collateral quantity to deposit
//   * @public
//   */
//   deposit = async (asset: AssetModel, collateralQty: string, onTxHash?: (txHash: string) => void): Promise<boolean> => {
//     // console.debug("sdk deposit", asset, collateralQty);
//     if (!asset || !this.options.account) {
//       return false;
//     };
//     const emp = (asset.emp.new ? await this.getEmp(asset) : await this.getEmpV1(asset));
//     try {
//       const ge = await emp.methods.deposit([collateralQty]).estimateGas(
//         {
//           from: this.options.account,
//           gas: 50000000,
//         },
//         async (error: any) => {
//           console.log("SimTx Failed", error);
//           return false;
//         }
//       );
//       return emp.methods.deposit([collateralQty]).send(
//         {
//           from: this.options.account,
//           gas: ge,
//         },
//         async (error: any, txHash: string) => {
//           if (error) {
//             console.error("EMP could not deposit collateral", error);
//             onTxHash && onTxHash("");
//             return false;
//           }
//           if (onTxHash) {
//             onTxHash(txHash);
//           }
//           const status = await waitTransaction(this.options.provider, txHash);
//           if (!status) {
//             console.log("Deposit transaction failed.");
//             return false;
//           }
//           return true;
//         }
//       );
//     } catch (e) {
//       console.error("error", e);
//       return false;
//     }
//   };

//   /**
//   * Request withdrawal for more collateral to go below the collaterization ratio (cr) of the position of an asset
//   * @param {AssetModel} asset Asset object for the input
//   * @param {string} collateralQty Collateral quantity to request for
//   * @public
//   */
//   requestWithdrawal = async (asset: AssetModel, collateralQty: string, onTxHash?: (txHash: string) => void): Promise<boolean> => {
//     // console.debug("sdk requestWithdrawal", asset, collateralQty);
//     if (!asset || !this.options.account) {
//       return false;
//     };
//     const emp = (asset.emp.new ? await this.getEmp(asset) : await this.getEmpV1(asset));
//     try {
//       const ge = await emp.methods.requestWithdrawal([collateralQty]).estimateGas(
//         {
//           from: this.options.account,
//           gas: 50000000,
//         },
//         async (error: any) => {
//           console.log("SimTx Failed", error);
//           return false;
//         }
//       );
//       return emp.methods.requestWithdrawal([collateralQty]).send(
//         {
//           from: this.options.account,
//           gas: ge,
//         },
//         async (error: any, txHash: string) => {
//           if (error) {
//             console.error("EMP could not request withdraw", error);
//             onTxHash && onTxHash("");
//             return false;
//           }
//           if (onTxHash) {
//             onTxHash(txHash);
//           }
//           const status = await waitTransaction(this.options.provider, txHash);
//           if (!status) {
//             console.log("Withdrawal request transaction failed.");
//             return false;
//           }
//           return true;
//         }
//       );
//     } catch (e) {
//       console.error("error", e);
//       return false;
//     }
//   };

//   /**
//   * Withdraw collateral up to the minimum collaterization ratio (cr) of the position of an asset
//   * @param {AssetModel} asset Asset object for the input
//   * @public
//   */
//   withdrawRequestFinalize = async (asset: AssetModel, onTxHash?: (txHash: string) => void): Promise<boolean> => {
//     // console.debug("sdk withdrawRequestFinalize", asset);
//     if (!asset || !this.options.account) {
//       return false;
//     };
//     const emp = (asset.emp.new ? await this.getEmp(asset) : await this.getEmpV1(asset));
//     try {
//       const ge = await emp.methods.withdrawPassedRequest().estimateGas(
//         {
//           from: this.options.account,
//           gas: 50000000,
//         },
//         async (error: any) => {
//           console.log("SimTx Failed", error);
//           return false;
//         }
//       );
//       return emp.methods.withdrawPassedRequest().send(
//         {
//           from: this.options.account,
//           gas: ge,
//         },
//         async (error: any, txHash: string) => {
//           if (error) {
//             console.error("EMP could not withdraw", error);
//             onTxHash && onTxHash("");
//             return false;
//           }
//           if (onTxHash) {
//             onTxHash(txHash);
//           }
//           const status = await waitTransaction(this.options.provider, txHash);
//           if (!status) {
//             console.log("Withdrawal transaction failed.");
//             return false;
//           }
//           return true;
//         }
//       );
//     } catch (e) {
//       console.error("error", e);
//       return false;
//     }
//   };

//   /**
//   * Instantly withdraw collateral up to the global collaterization ratio (gcr) of the position of an asset
//   * @param {AssetModel} asset Asset object for the input
//   * @param {string} collateralQty Collateral quantity to withdraw
//   * @public
//   */
//   withdraw = async (asset: AssetModel, collateralQty: string, onTxHash?: (txHash: string) => void): Promise<boolean> => {
//     // console.debug("sdk withdraw", asset, collateralQty);
//     if (!asset || !this.options.account) {
//       return false;
//     };
//     const emp = (asset.emp.new ? await this.getEmp(asset) : await this.getEmpV1(asset));
//     try {
//       const ge = await emp.methods.withdraw([collateralQty]).estimateGas(
//         {
//           from: this.options.account,
//           gas: 50000000,
//         },
//         async (error: any) => {
//           console.log("SimTx Failed", error);
//           return false;
//         }
//       );
//       return emp.methods.withdraw([collateralQty]).send(
//         {
//           from: this.options.account,
//           gas: ge,
//         },
//         async (error: any, txHash: string) => {
//           if (error) {
//             console.error("EMP could not instant withdraw", error);
//             onTxHash && onTxHash("");
//             return false;
//           }
//           if (onTxHash) {
//             onTxHash(txHash);
//           }
//           const status = await waitTransaction(this.options.provider, txHash);
//           if (!status) {
//             console.log("Instant withdrawal transaction failed.");
//             return false;
//           }
//           return true;
//         }
//       );
//     } catch (e) {
//       console.error("error", e);
//       return false;
//     }
//   };

//   /**
//   * Redeem asset tokens to get back the collateral amount from the position of an asset
//   * @param {AssetModel} asset Asset object for the input
//   * @param {string} tokenQty Token quantity to redeem
//   * @public
//   */
//   redeem = async (asset: AssetModel, tokenQty: string, onTxHash?: (txHash: string) => void): Promise<boolean> => {
//     // console.debug("sdk redeem", asset, tokenQty);
//     if (!asset || !this.options.account) {
//       return false;
//     };
//     const emp = (asset.emp.new ? await this.getEmp(asset) : await this.getEmpV1(asset));
//     try {
//       const ge = await emp.methods.redeem([tokenQty]).estimateGas(
//         {
//           from: this.options.account,
//           gas: 50000000,
//         },
//         async (error: any) => {
//           console.log("SimTx Failed", error);
//           return false;
//         }
//       );
//       return emp.methods.redeem([tokenQty]).send(
//         {
//           from: this.options.account,
//           gas: ge,
//         },
//         async (error: any, txHash: string) => {
//           if (error) {
//             console.error("EMP could not redeem", error);
//             onTxHash && onTxHash("");
//             return false;
//           }
//           if (onTxHash) {
//             onTxHash(txHash);
//           }
//           const status = await waitTransaction(this.options.provider, txHash);
//           if (!status) {
//             console.log("Redeem transaction failed.");
//             return false;
//           }
//           return true;
//         }
//       );
//     } catch (e) {
//       console.error("error", e);
//       return false;
//     }
//   };

//   /**
//   * Settle position exchanging the asset tokens back to the collateral amount
//   * @param {AssetModel} asset Asset object for the input
//   * @public
//   */
//   settle = async (asset: AssetModel, onTxHash?: (txHash: string) => void): Promise<any> => {
//     // console.debug("sdk settle", asset);
//     if (!asset || !this.options.account) {
//       return false;
//     };
//     const emp = (asset.emp.new ? await this.getEmp(asset) : await this.getEmpV1(asset));
//     try {
//       // TODO try going with estimations again
//       // const ge = await emp.methods.settleExpired().estimateGas(
//       //   {
//       //     from: this.options.account,
//       //     gas: 50000000,
//       //   },
//       //   async (error: any) => {
//       //     console.log("SimTx Failed", error);
//       //     return false;
//       //   }
//       // );
//       return emp.methods.settleExpired().send(
//         {
//           from: this.options.account,
//           gas: 200000,
//         },
//         async (error: any, txHash: string) => {
//           if (error) {
//             console.error("EMP could not Settle", error);
//             onTxHash && onTxHash("");
//             return false;
//           }
//           if (onTxHash) {
//             onTxHash(txHash);
//           }
//           const status = await waitTransaction(this.options.provider, txHash);
//           if (!status) {
//             console.log("Settle transaction failed.");
//             return false;
//           }
//           return true;
//         }
//       );
//     } catch (e) {
//       console.error("error", e);
//       return [false, e];
//     }
//   };

//   /**
//   * Fetch asset tokens balance of an address
//   * @param {AssetModel} asset Asset object for the input
//   * @public
//   */
//   getAssetTokenBalance = async (asset: AssetModel, onTxHash?: (txHash: string) => void) => {
//     // console.debug("sdk getAssetTokenBalance", asset);
//     if (!asset || !this.options.account) {
//       return false;
//     };
//     const emp = (asset.emp.new ? await this.getEmp(asset) : await this.getEmpV1(asset));
//     try {
//       const synth = await emp.methods.tokenCurrency().call();
//       const balance = Number(await getBalance(this.options.provider, synth, this.options.account));
//       return balance;
//     } catch (e) {
//       return 0;
//     }
//   };

}

export default Asset;