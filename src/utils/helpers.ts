import { ethers } from "ethers";
import { request } from "graphql-request";
import axios from "axios";
import sushiData from "@sushiswap/sushi-data";
import { Erc20 } from "../types/abi";
import ERC20Abi from "../abi/erc20.json";
import {
  UNISWAP_ENDPOINT,
  SUSHISWAP_ENDPOINT,
  UNI_SUSHI_PAIR_DATA,
} from "./queries";

/**
 * @notice Helper function to get the decimals of a erc20 token.
 * @param address Address of the erc20 contract.
 * @param ethersProvider Ethers provider instance.
 * @returns `undefined` or the erc20 token decimals.
 */
export async function getTokenDecimals(
  address: string,
  ethersProvider: ethers.providers.Web3Provider
): Promise<number | undefined> {
  try {
    const contract = new ethers.Contract(
      address,
      ERC20Abi,
      ethersProvider
    ) as Erc20;
    const decimals: number = await contract.decimals();

    return decimals;
  } catch (e) {
    console.error("error", e);
    return undefined;
  }
}

/**
 * @notice Helper function to get the current DEX token price.
 * @param poolLocation Location string of the DEX pool (e.g. "uni").
 * @param poolAddress Address of the DEX pool.
 * @param tokenAddress Address of the token.
 * @returns `undefined` or the DEX token price.
 */
export async function getCurrentDexTokenPrice(
  poolLocation: string,
  poolAddress: string,
  tokenAddress: string
): Promise<number | undefined> {
  try {
    /// @dev Get pool data from graph endpoints.
    const endpoint =
      poolLocation === "uni" ? UNISWAP_ENDPOINT : SUSHISWAP_ENDPOINT;
    const query = UNI_SUSHI_PAIR_DATA;
    // eslint-disable-next-line
    const poolData: any = await request(endpoint, query, {
      pairAddress: poolAddress,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (poolData["pair"].token0.id === tokenAddress) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return poolData["pair"].reserve0 / poolData["pair"].reserve1;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return poolData["pair"].reserve1 / poolData["pair"].reserve0;
    }
  } catch (e) {
    console.error("error", e);
    return undefined;
  }
}

/**
 * @notice Helper function to get relevant synth market data.
 * @param synthId The synth identifier.
 * @param tokenAddress The token address of the synth.
 * @returns `undefined` or an object with the relevant data.
 */
export async function getSynthData(
  synthId: string,
  tokenAddress: string
): Promise<any | undefined> {
  try {
    const tokenData = await sushiData.exchange.token24h({
      token_address: tokenAddress,
    });

    const response = await axios.get(
      `https://data.yam.finance/degenerative/apr/${synthId}`
    );

    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      apr: response.data["aprMultiplier"] as string,
      price: tokenData.priceUSD,
      priceChanged24h: tokenData.priceUSDChange,
      liquidity24h: tokenData.liquidityUSD,
      volume24h: tokenData.volumeUSDOneDay,
    };
  } catch (e) {
    console.error("error", e);
    return undefined;
  }
}

/**
 * @notice Helper function to get the YAM Synths total TVL.
 * @returns The total tvl of all yam synths.
 */
export async function getYamSynthsTotalTVL(): Promise<string> {
  const response = await axios.get(`https://api.yam.finance/tvl/degenerative`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return response.data["total"] as string;
}

/**
 * @notice Helper function to get market chart data.
 * @param tokenAddress Address of the Synth.
 * @returns An array of synth market data.
 */
export async function getSynthChartData(
  tokenAddress: string
): Promise<any | undefined> {
  const tokenData = await sushiData.charts.tokenDaily({
    token_address: tokenAddress,
  });
  return tokenData;
}
