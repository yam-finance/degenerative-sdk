/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface FeePayerInterface extends ethers.utils.Interface {
  functions: {
    "collateralCurrency()": FunctionFragment;
    "cumulativeFeeMultiplier()": FunctionFragment;
    "emergencyShutdown()": FunctionFragment;
    "finder()": FunctionFragment;
    "getCurrentTime()": FunctionFragment;
    "getOutstandingRegularFees(uint256)": FunctionFragment;
    "gulp()": FunctionFragment;
    "payRegularFees()": FunctionFragment;
    "pfc()": FunctionFragment;
    "remargin()": FunctionFragment;
    "setCurrentTime(uint256)": FunctionFragment;
    "timerAddress()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "collateralCurrency",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "cumulativeFeeMultiplier",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyShutdown",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "finder", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getCurrentTime",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getOutstandingRegularFees",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "gulp", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "payRegularFees",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "pfc", values?: undefined): string;
  encodeFunctionData(functionFragment: "remargin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setCurrentTime",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "timerAddress",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "collateralCurrency",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cumulativeFeeMultiplier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "emergencyShutdown",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "finder", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCurrentTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOutstandingRegularFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "gulp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "payRegularFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pfc", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "remargin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setCurrentTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "timerAddress",
    data: BytesLike
  ): Result;

  events: {
    "FinalFeesPaid(uint256)": EventFragment;
    "RegularFeesPaid(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FinalFeesPaid"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RegularFeesPaid"): EventFragment;
}

export class FeePayer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: FeePayerInterface;

  functions: {
    collateralCurrency(overrides?: CallOverrides): Promise<[string]>;

    cumulativeFeeMultiplier(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rawValue: BigNumber }>;

    emergencyShutdown(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    finder(overrides?: CallOverrides): Promise<[string]>;

    getCurrentTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    getOutstandingRegularFees(
      time: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber] & { rawValue: BigNumber },
        [BigNumber] & { rawValue: BigNumber },
        [BigNumber] & { rawValue: BigNumber }
      ] & {
        regularFee: [BigNumber] & { rawValue: BigNumber };
        latePenalty: [BigNumber] & { rawValue: BigNumber };
        totalPaid: [BigNumber] & { rawValue: BigNumber };
      }
    >;

    gulp(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    payRegularFees(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pfc(
      overrides?: CallOverrides
    ): Promise<[[BigNumber] & { rawValue: BigNumber }]>;

    remargin(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setCurrentTime(
      time: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    timerAddress(overrides?: CallOverrides): Promise<[string]>;
  };

  collateralCurrency(overrides?: CallOverrides): Promise<string>;

  cumulativeFeeMultiplier(overrides?: CallOverrides): Promise<BigNumber>;

  emergencyShutdown(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  finder(overrides?: CallOverrides): Promise<string>;

  getCurrentTime(overrides?: CallOverrides): Promise<BigNumber>;

  getOutstandingRegularFees(
    time: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [
      [BigNumber] & { rawValue: BigNumber },
      [BigNumber] & { rawValue: BigNumber },
      [BigNumber] & { rawValue: BigNumber }
    ] & {
      regularFee: [BigNumber] & { rawValue: BigNumber };
      latePenalty: [BigNumber] & { rawValue: BigNumber };
      totalPaid: [BigNumber] & { rawValue: BigNumber };
    }
  >;

  gulp(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  payRegularFees(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pfc(
    overrides?: CallOverrides
  ): Promise<[BigNumber] & { rawValue: BigNumber }>;

  remargin(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setCurrentTime(
    time: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  timerAddress(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    collateralCurrency(overrides?: CallOverrides): Promise<string>;

    cumulativeFeeMultiplier(overrides?: CallOverrides): Promise<BigNumber>;

    emergencyShutdown(overrides?: CallOverrides): Promise<void>;

    finder(overrides?: CallOverrides): Promise<string>;

    getCurrentTime(overrides?: CallOverrides): Promise<BigNumber>;

    getOutstandingRegularFees(
      time: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber] & { rawValue: BigNumber },
        [BigNumber] & { rawValue: BigNumber },
        [BigNumber] & { rawValue: BigNumber }
      ] & {
        regularFee: [BigNumber] & { rawValue: BigNumber };
        latePenalty: [BigNumber] & { rawValue: BigNumber };
        totalPaid: [BigNumber] & { rawValue: BigNumber };
      }
    >;

    gulp(overrides?: CallOverrides): Promise<void>;

    payRegularFees(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rawValue: BigNumber }>;

    pfc(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { rawValue: BigNumber }>;

    remargin(overrides?: CallOverrides): Promise<void>;

    setCurrentTime(
      time: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    timerAddress(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    FinalFeesPaid(
      amount?: BigNumberish | null
    ): TypedEventFilter<[BigNumber], { amount: BigNumber }>;

    RegularFeesPaid(
      regularFee?: BigNumberish | null,
      lateFee?: BigNumberish | null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { regularFee: BigNumber; lateFee: BigNumber }
    >;
  };

  estimateGas: {
    collateralCurrency(overrides?: CallOverrides): Promise<BigNumber>;

    cumulativeFeeMultiplier(overrides?: CallOverrides): Promise<BigNumber>;

    emergencyShutdown(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    finder(overrides?: CallOverrides): Promise<BigNumber>;

    getCurrentTime(overrides?: CallOverrides): Promise<BigNumber>;

    getOutstandingRegularFees(
      time: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    gulp(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    payRegularFees(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pfc(overrides?: CallOverrides): Promise<BigNumber>;

    remargin(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setCurrentTime(
      time: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    timerAddress(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    collateralCurrency(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cumulativeFeeMultiplier(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    emergencyShutdown(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    finder(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCurrentTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getOutstandingRegularFees(
      time: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    gulp(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    payRegularFees(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pfc(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    remargin(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setCurrentTime(
      time: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    timerAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}