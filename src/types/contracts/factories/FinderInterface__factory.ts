/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  FinderInterface,
  FinderInterfaceInterface,
} from "../FinderInterface";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "interfaceName",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "implementationAddress",
        type: "address",
      },
    ],
    name: "changeImplementationAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "interfaceName",
        type: "bytes32",
      },
    ],
    name: "getImplementationAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class FinderInterface__factory {
  static readonly abi = _abi;
  static createInterface(): FinderInterfaceInterface {
    return new utils.Interface(_abi) as FinderInterfaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FinderInterface {
    return new Contract(address, _abi, signerOrProvider) as FinderInterface;
  }
}
