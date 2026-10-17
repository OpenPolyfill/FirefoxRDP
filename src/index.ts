// SPDX-License-Identifier: MPL-2.0
export {
  FirefoxRDP,
  ActorFront,
  RootFront,
  TabDescriptorFront,
  WatcherFront,
  TargetFront,
  WebConsoleFront,
  LongStringFront,
  ObjectFront,
  RDPRemoteError
} from './client.js'
export type { ConnectOptions, Params, PacketListener, RDPResponse, TabInfo } from './client.js'
export { PacketDecoder, encodeJson, encodeBulk } from './codec.js'
export type { JsonPacket, BulkPacket, IncomingPacket } from './codec.js'
export { TcpTransport } from './transport.js'
export type { ActorSpec, ActorMethodSpec, ArgumentSpec } from './specs.js'
export type {
  GeneratedActorAPI,
  GeneratedActorEvents,
  GeneratedDictionaries,
  GeneratedFront
} from './generated/specs.js'
export { bundledSpecs, bundledDictTypes } from './generated/specs.js'
export { unmarshalEvent, marshalMethod, unmarshalReturn } from './specs.js'
