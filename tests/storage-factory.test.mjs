// SPDX-License-Identifier: MPL-2.0
import assert from 'node:assert/strict'
import test from 'node:test'
import { extract } from '../scripts/generate-specs.mjs'
test('Firefox createStorageSpec expands common and per-type methods', () => {
  const source = `
  const {Arg,RetVal,types}=protocol;
  const childSpecs={};
  function createStorageSpec(options) {
    const methods = {
      getStoreObjects: {request:{host:Arg(0),names:Arg(1,'nullable:array:string')}, response:RetVal(options.storeObjectType)},
      getFields: {request:{},response:{value:RetVal('json')}}
    };
    Object.assign(methods,options.methods);
    childSpecs[options.typeName] = protocol.generateActorSpec({typeName:options.typeName,methods,events:{'single-store-update':{type:'storesUpdate',data:Arg(0,'json')}}});
  }
  const otherMethods={ editItem:{request:{data:Arg(0,'json')}} };
  createStorageSpec({typeName:'cookies',storeObjectType:'cookiesData',methods:Object.assign({},otherMethods,{removeAll:{request:{host:Arg(0,'string')}}})});
  createStorageSpec({typeName:'localStorage',storeObjectType:'localData',methods:otherMethods});
  `
  const specs = extract(source)
  assert.equal(specs.length, 2)
  const cookies = specs.find((x) => x.typeName === 'cookies')
  assert.equal(cookies.methods.getStoreObjects.returns.type, 'cookiesData')
  assert.equal(cookies.methods.removeAll.args.host.type, 'string')
  assert.equal(cookies.methods.editItem.args.data.type, 'json')
  assert.equal(cookies.events['single-store-update'], 'storesUpdate')
  assert.equal(
    specs.find((x) => x.typeName === 'localStorage').methods.getStoreObjects.returns.type,
    'localData'
  )
})
