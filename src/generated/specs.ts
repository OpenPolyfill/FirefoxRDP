// SPDX-License-Identifier: MPL-2.0
// Generated from Firefox actor specs (Mozilla MPL-2.0). Do not edit.
import type { ActorSpec } from "../specs.js";
import type { ActorFront, LongStringFront } from "../client.js";
export const bundledSpecs: Record<string, ActorSpec> = {
  "accessible": {
    "typeName": "accessible",
    "methods": {
      "audit": {
        "args": {
          "options": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:json"
          }
        },
        "returns": {
          "type": "nullable:json",
          "field": "audit"
        }
      },
      "children": {
        "args": {},
        "returns": {
          "type": "array:accessible",
          "field": "children"
        }
      },
      "getRelations": {
        "args": {},
        "returns": {
          "type": "array:accessibleRelation",
          "field": "relations"
        }
      },
      "hydrate": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "properties"
        }
      },
      "snapshot": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "snapshot"
        }
      }
    },
    "events": {
      "actions-change": "actionsChange",
      "name-change": "nameChange",
      "value-change": "valueChange",
      "description-change": "descriptionChange",
      "states-change": "statesChange",
      "attributes-change": "attributesChange",
      "shortcut-change": "shortcutChange",
      "reorder": "reorder",
      "text-change": "textChange",
      "index-in-parent-change": "indexInParentChange",
      "audited": "audited"
    },
    "eventArgs": {
      "actions-change": {
        "actions": {
          "kind": "arg",
          "index": 0,
          "type": "array:string"
        }
      },
      "name-change": {
        "name": {
          "kind": "arg",
          "index": 0,
          "type": "string"
        },
        "parent": {
          "kind": "arg",
          "index": 1,
          "type": "nullable:accessible"
        }
      },
      "value-change": {
        "value": {
          "kind": "arg",
          "index": 0,
          "type": "string"
        }
      },
      "description-change": {
        "description": {
          "kind": "arg",
          "index": 0,
          "type": "string"
        }
      },
      "states-change": {
        "states": {
          "kind": "arg",
          "index": 0,
          "type": "array:string"
        }
      },
      "attributes-change": {
        "attributes": {
          "kind": "arg",
          "index": 0,
          "type": "json"
        }
      },
      "shortcut-change": {
        "shortcut": {
          "kind": "arg",
          "index": 0,
          "type": "string"
        }
      },
      "reorder": {
        "childCount": {
          "kind": "arg",
          "index": 0,
          "type": "number"
        }
      },
      "text-change": {},
      "index-in-parent-change": {
        "indexInParent": {
          "kind": "arg",
          "index": 0,
          "type": "number"
        }
      },
      "audited": {
        "audit": {
          "kind": "arg",
          "index": 0,
          "type": "nullable:json"
        }
      }
    },
    "source": "accessibility.js"
  },
  "accessiblewalker": {
    "typeName": "accessiblewalker",
    "methods": {
      "children": {
        "args": {},
        "returns": {
          "type": "array:accessible",
          "field": "children"
        }
      },
      "getAccessibleFor": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        },
        "returns": {
          "type": "nullable:accessible",
          "field": "accessible"
        }
      },
      "getAncestry": {
        "args": {
          "accessible": {
            "kind": "arg",
            "index": 0,
            "type": "accessible"
          }
        },
        "returns": {
          "type": "array:accessibleWithChildren",
          "field": "ancestry"
        }
      },
      "startAudit": {
        "args": {
          "options": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:json"
          }
        }
      },
      "highlightAccessible": {
        "args": {
          "accessible": {
            "kind": "arg",
            "index": 0,
            "type": "accessible"
          },
          "options": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:json"
          }
        },
        "returns": {
          "type": "nullable:boolean",
          "field": "value"
        }
      },
      "unhighlight": {
        "args": {}
      },
      "pick": {
        "args": {}
      },
      "pickAndFocus": {
        "args": {}
      },
      "cancelPick": {
        "args": {}
      },
      "showTabbingOrder": {
        "args": {
          "elm": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "index": {
            "kind": "arg",
            "index": 1,
            "type": "number"
          }
        },
        "returns": {
          "type": "json",
          "field": "tabbingOrderInfo"
        }
      }
    },
    "events": {
      "document-ready": "documentReady",
      "picker-accessible-picked": "pickerAccessiblePicked",
      "picker-accessible-previewed": "pickerAccessiblePreviewed",
      "picker-accessible-hovered": "pickerAccessibleHovered",
      "picker-accessible-canceled": "pickerAccessibleCanceled",
      "highlighter-event": "highlighter-event",
      "audit-event": "audit-event"
    },
    "eventArgs": {
      "document-ready": {},
      "picker-accessible-picked": {
        "accessible": {
          "kind": "arg",
          "index": 0,
          "type": "nullable:accessible"
        }
      },
      "picker-accessible-previewed": {
        "accessible": {
          "kind": "arg",
          "index": 0,
          "type": "nullable:accessible"
        }
      },
      "picker-accessible-hovered": {
        "accessible": {
          "kind": "arg",
          "index": 0,
          "type": "nullable:accessible"
        }
      },
      "picker-accessible-canceled": {},
      "highlighter-event": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "json"
        }
      },
      "audit-event": {
        "audit": {
          "kind": "arg",
          "index": 0,
          "type": "auditEventData"
        }
      }
    },
    "source": "accessibility.js"
  },
  "simulator": {
    "typeName": "simulator",
    "methods": {
      "simulate": {
        "args": {
          "options": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:json"
          }
        },
        "returns": {
          "type": "boolean",
          "field": "value"
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "accessibility.js"
  },
  "accessibility": {
    "typeName": "accessibility",
    "methods": {
      "getTraits": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "traits"
        }
      },
      "bootstrap": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "state"
        }
      },
      "getWalker": {
        "args": {},
        "returns": {
          "type": "accessiblewalker",
          "field": "walker"
        }
      },
      "getSimulator": {
        "args": {},
        "returns": {
          "type": "nullable:simulator",
          "field": "simulator"
        }
      }
    },
    "events": {
      "init": "init",
      "shutdown": "shutdown"
    },
    "eventArgs": {
      "init": {},
      "shutdown": {}
    },
    "source": "accessibility.js"
  },
  "parentaccessibility": {
    "typeName": "parentaccessibility",
    "methods": {
      "bootstrap": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "state"
        }
      },
      "enable": {
        "args": {}
      },
      "disable": {
        "args": {}
      }
    },
    "events": {
      "can-be-disabled-change": "canBeDisabledChange",
      "can-be-enabled-change": "canBeEnabledChange"
    },
    "eventArgs": {
      "can-be-disabled-change": {
        "canBeDisabled": {
          "kind": "arg",
          "index": 0,
          "type": "boolean"
        }
      },
      "can-be-enabled-change": {
        "canBeEnabled": {
          "kind": "arg",
          "index": 0,
          "type": "boolean"
        }
      }
    },
    "source": "accessibility.js"
  },
  "addons": {
    "typeName": "addons",
    "methods": {
      "installTemporaryAddon": {
        "args": {
          "addonPath": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "openDevTools": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:boolean"
          }
        },
        "returns": {
          "type": "json",
          "field": "addon"
        }
      },
      "uninstallAddon": {
        "args": {
          "addonId": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "addon/addons.js"
  },
  "webExtensionInspectedWindow": {
    "typeName": "webExtensionInspectedWindow",
    "methods": {
      "reload": {
        "args": {
          "webExtensionCallerInfo": {
            "kind": "arg",
            "index": 0,
            "type": "webExtensionCallerInfo"
          },
          "options": {
            "kind": "arg",
            "index": 1,
            "type": "webExtensionReloadOptions"
          }
        }
      },
      "eval": {
        "args": {
          "webExtensionCallerInfo": {
            "kind": "arg",
            "index": 0,
            "type": "webExtensionCallerInfo"
          },
          "expression": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          },
          "options": {
            "kind": "arg",
            "index": 2,
            "type": "webExtensionEvalOptions"
          }
        },
        "returns": {
          "type": "webExtensionEvalResult",
          "field": "evalResult"
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "addon/webextension-inspected-window.js"
  },
  "animationplayer": {
    "typeName": "animationplayer",
    "methods": {
      "release": {
        "args": {},
        "release": true
      },
      "getCurrentState": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "data"
        }
      },
      "getAnimationTypes": {
        "args": {
          "propertyNames": {
            "kind": "arg",
            "index": 0,
            "type": "array:string"
          }
        },
        "returns": {
          "type": "json",
          "field": "animationTypes"
        }
      }
    },
    "events": {
      "changed": "changed"
    },
    "eventArgs": {
      "changed": {
        "state": {
          "kind": "arg",
          "index": 0,
          "type": "json"
        }
      }
    },
    "source": "animation.js"
  },
  "animations": {
    "typeName": "animations",
    "methods": {
      "setWalkerActor": {
        "args": {
          "walker": {
            "kind": "arg",
            "index": 0,
            "type": "domwalker"
          }
        }
      },
      "getAnimationPlayersForNode": {
        "args": {
          "actorID": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        },
        "returns": {
          "type": "array:animationplayer",
          "field": "players"
        }
      },
      "pauseSome": {
        "args": {
          "players": {
            "kind": "arg",
            "index": 0,
            "type": "array:animationplayer"
          }
        }
      },
      "playSome": {
        "args": {
          "players": {
            "kind": "arg",
            "index": 0,
            "type": "array:animationplayer"
          }
        }
      },
      "setCurrentTimes": {
        "args": {
          "players": {
            "kind": "arg",
            "index": 0,
            "type": "array:animationplayer"
          },
          "time": {
            "kind": "arg",
            "index": 1,
            "type": "number"
          },
          "shouldPause": {
            "kind": "arg",
            "index": 2,
            "type": "boolean"
          }
        }
      }
    },
    "events": {
      "mutations": "mutations"
    },
    "eventArgs": {
      "mutations": {
        "changes": {
          "kind": "arg",
          "index": 0,
          "type": "array:animationMutationChange"
        }
      }
    },
    "source": "animation.js"
  },
  "arraybuffer": {
    "typeName": "arraybuffer",
    "methods": {
      "slice": {
        "args": {
          "start": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "count": {
            "kind": "arg",
            "index": 1,
            "type": "json"
          }
        },
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "release": {
        "args": {},
        "release": true
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "array-buffer.js"
  },
  "blackboxing": {
    "typeName": "blackboxing",
    "methods": {
      "blackbox": {
        "args": {
          "url": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "range": {
            "kind": "arg",
            "index": 1,
            "type": "array:blackboxing.range"
          }
        }
      },
      "unblackbox": {
        "args": {
          "url": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "range": {
            "kind": "arg",
            "index": 1,
            "type": "array:blackboxing.range"
          }
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "blackboxing.js"
  },
  "breakpoint-list": {
    "typeName": "breakpoint-list",
    "methods": {
      "setBreakpoint": {
        "args": {
          "location": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "options": {
            "kind": "arg",
            "index": 1,
            "type": "breakpoint-list.breakpoint-options"
          }
        }
      },
      "removeBreakpoint": {
        "args": {
          "location": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "setXHRBreakpoint": {
        "args": {
          "path": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "method": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      },
      "removeXHRBreakpoint": {
        "args": {
          "path": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "method": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      },
      "setActiveEventBreakpoints": {
        "args": {
          "ids": {
            "kind": "arg",
            "index": 0,
            "type": "array:string"
          }
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "breakpoint-list.js"
  },
  "compatibility": {
    "typeName": "compatibility",
    "methods": {
      "getTraits": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "traits"
        }
      },
      "getCSSDeclarationBlockIssues": {
        "args": {
          "domRulesDeclarations": {
            "kind": "arg",
            "index": 0,
            "type": "array:array:declaration"
          },
          "targetBrowsers": {
            "kind": "arg",
            "index": 1,
            "type": "array:browsertype"
          }
        },
        "returns": {
          "type": "array:array:compatibilityissues",
          "field": "compatibilityIssues"
        }
      },
      "getNodeCssIssues": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "targetBrowsers": {
            "kind": "arg",
            "index": 1,
            "type": "array:browsertype"
          }
        },
        "returns": {
          "type": "array:compatibilityissues",
          "field": "compatibilityIssues"
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "compatibility.js"
  },
  "cssProperties": {
    "typeName": "cssProperties",
    "methods": {
      "getCSSDatabase": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "css-properties.js"
  },
  "processDescriptor": {
    "typeName": "processDescriptor",
    "methods": {
      "getTarget": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "process"
        }
      },
      "getWatcher": {
        "args": {
          "enableWindowGlobalThreadActors": {
            "kind": "option",
            "index": 0,
            "type": "boolean"
          }
        },
        "returns": {
          "type": "watcher",
          "field": null
        }
      },
      "reloadDescriptor": {
        "args": {
          "bypassCache": {
            "kind": "option",
            "index": 0,
            "type": "boolean"
          }
        }
      }
    },
    "events": {
      "descriptor-destroyed": "descriptor-destroyed"
    },
    "eventArgs": {
      "descriptor-destroyed": {}
    },
    "source": "descriptors/process.js"
  },
  "tabDescriptor": {
    "typeName": "tabDescriptor",
    "methods": {
      "getTarget": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "frame"
        }
      },
      "getFavicon": {
        "args": {},
        "returns": {
          "type": "string",
          "field": "favicon"
        }
      },
      "getWatcher": {
        "args": {
          "isServerTargetSwitchingEnabled": {
            "kind": "option",
            "index": 0,
            "type": "boolean"
          },
          "isPopupDebuggingEnabled": {
            "kind": "option",
            "index": 0,
            "type": "boolean"
          }
        },
        "returns": {
          "type": "watcher",
          "field": null
        }
      },
      "navigateTo": {
        "args": {
          "url": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "waitForLoad": {
            "kind": "arg",
            "index": 1,
            "type": "boolean"
          }
        }
      },
      "goBack": {
        "args": {}
      },
      "goForward": {
        "args": {}
      },
      "reloadDescriptor": {
        "args": {
          "bypassCache": {
            "kind": "option",
            "index": 0,
            "type": "boolean"
          }
        }
      }
    },
    "events": {
      "descriptor-destroyed": "descriptor-destroyed"
    },
    "eventArgs": {
      "descriptor-destroyed": {}
    },
    "source": "descriptors/tab.js"
  },
  "webExtensionDescriptor": {
    "typeName": "webExtensionDescriptor",
    "methods": {
      "reload": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "addon"
        }
      },
      "terminateBackgroundScript": {
        "args": {}
      },
      "reloadDescriptor": {
        "args": {
          "bypassCache": {
            "kind": "option",
            "index": 0,
            "type": "boolean"
          }
        }
      },
      "getWatcher": {
        "args": {
          "isServerTargetSwitchingEnabled": {
            "kind": "option",
            "index": 0,
            "type": "boolean"
          }
        },
        "returns": {
          "type": "watcher",
          "field": null
        }
      }
    },
    "events": {
      "descriptor-destroyed": "descriptor-destroyed"
    },
    "eventArgs": {
      "descriptor-destroyed": {}
    },
    "source": "descriptors/webextension.js"
  },
  "workerDescriptor": {
    "typeName": "workerDescriptor",
    "methods": {
      "detach": {
        "args": {}
      },
      "getTarget": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      }
    },
    "events": {
      "descriptor-destroyed": "descriptor-destroyed"
    },
    "eventArgs": {
      "descriptor-destroyed": {}
    },
    "source": "descriptors/worker.js"
  },
  "device": {
    "typeName": "device",
    "methods": {
      "getDescription": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "value"
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "device.js"
  },
  "environment": {
    "typeName": "environment",
    "methods": {},
    "events": {},
    "eventArgs": {},
    "source": "environment.js"
  },
  "frame": {
    "typeName": "frame",
    "methods": {
      "getEnvironment": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "frame.js"
  },
  "heapSnapshotFile": {
    "typeName": "heapSnapshotFile",
    "methods": {
      "transferHeapSnapshot": {
        "args": {
          "snapshotId": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "heap-snapshot-file.js"
  },
  "customhighlighter": {
    "typeName": "customhighlighter",
    "methods": {
      "show": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:domnode"
          },
          "options": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:json"
          }
        },
        "returns": {
          "type": "nullable:boolean",
          "field": "value"
        }
      },
      "hide": {
        "args": {}
      },
      "finalize": {
        "args": {},
        "oneway": true,
        "release": true
      }
    },
    "events": {
      "highlighter-event": "highlighter-event"
    },
    "eventArgs": {
      "highlighter-event": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "json"
        }
      }
    },
    "source": "highlighters.js"
  },
  "inspector": {
    "typeName": "inspector",
    "methods": {
      "getWalker": {
        "args": {
          "options": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:json"
          }
        },
        "returns": {
          "type": "domwalker",
          "field": "walker"
        }
      },
      "getPageStyle": {
        "args": {},
        "returns": {
          "type": "pagestyle",
          "field": "pageStyle"
        }
      },
      "getCompatibility": {
        "args": {},
        "returns": {
          "type": "compatibility",
          "field": "compatibility"
        }
      },
      "getHighlighterByType": {
        "args": {
          "typeName": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "forceNew": {
            "kind": "arg",
            "index": 1,
            "type": "json"
          }
        },
        "returns": {
          "type": "nullable:customhighlighter",
          "field": "highlighter"
        }
      },
      "getImageDataFromURL": {
        "args": {
          "url": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "maxDim": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:number"
          }
        },
        "returns": {
          "type": "imageData",
          "field": null
        }
      },
      "resolveRelativeURL": {
        "args": {
          "url": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "node": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:domnode"
          }
        },
        "returns": {
          "type": "string",
          "field": "value"
        }
      },
      "pickColorFromPage": {
        "args": {
          "options": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:json"
          }
        }
      },
      "cancelPickColorFromPage": {
        "args": {}
      },
      "supportsHighlighters": {
        "args": {},
        "returns": {
          "type": "boolean",
          "field": "value"
        }
      }
    },
    "events": {
      "color-picked": "colorPicked",
      "color-pick-canceled": "colorPickCanceled"
    },
    "eventArgs": {
      "color-picked": {
        "color": {
          "kind": "arg",
          "index": 0,
          "type": "string"
        }
      },
      "color-pick-canceled": {}
    },
    "source": "inspector.js"
  },
  "flexbox": {
    "typeName": "flexbox",
    "methods": {
      "getFlexItems": {
        "args": {},
        "returns": {
          "type": "array:flexitem",
          "field": "flexitems"
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "layout.js"
  },
  "flexitem": {
    "typeName": "flexitem",
    "methods": {},
    "events": {},
    "eventArgs": {},
    "source": "layout.js"
  },
  "grid": {
    "typeName": "grid",
    "methods": {
      "getFragments": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "gridFragments"
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "layout.js"
  },
  "layout": {
    "typeName": "layout",
    "methods": {
      "getCurrentFlexbox": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "onlyLookAtParents": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:boolean"
          }
        },
        "returns": {
          "type": "nullable:flexbox",
          "field": "flexbox"
        }
      },
      "getCurrentGrid": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        },
        "returns": {
          "type": "nullable:grid",
          "field": "grid"
        }
      },
      "getGrids": {
        "args": {
          "rootNode": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        },
        "returns": {
          "type": "array:grid",
          "field": "grids"
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "layout.js"
  },
  "manifest": {
    "typeName": "manifest",
    "methods": {
      "fetchCanonicalManifest": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "manifest.js"
  },
  "memory": {
    "typeName": "memory",
    "methods": {
      "attach": {
        "args": {},
        "returns": {
          "type": "string",
          "field": "type"
        }
      },
      "detach": {
        "args": {},
        "returns": {
          "type": "string",
          "field": "type"
        }
      },
      "getState": {
        "args": {},
        "returns": {
          "type": "0",
          "field": "state"
        }
      },
      "takeCensus": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "startRecordingAllocations": {
        "args": {
          "options": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:AllocationsRecordingOptions"
          }
        },
        "returns": {
          "type": "0",
          "field": "value"
        }
      },
      "stopRecordingAllocations": {
        "args": {},
        "returns": {
          "type": "0",
          "field": "value"
        }
      },
      "getAllocationsSettings": {
        "args": {},
        "returns": {
          "type": "0",
          "field": "options"
        }
      },
      "getAllocations": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "forceGarbageCollection": {
        "args": {}
      },
      "forceCycleCollection": {
        "args": {}
      },
      "measure": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "residentUnique": {
        "args": {},
        "returns": {
          "type": "number",
          "field": "value"
        }
      },
      "saveHeapSnapshot": {
        "args": {
          "boundaries": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:json"
          }
        },
        "returns": {
          "type": "string",
          "field": "snapshotId"
        }
      }
    },
    "events": {
      "garbage-collection": "garbage-collection",
      "allocations": "allocations"
    },
    "eventArgs": {
      "garbage-collection": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "json"
        }
      },
      "allocations": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "json"
        }
      }
    },
    "source": "memory.js"
  },
  "networkContent": {
    "typeName": "networkContent",
    "methods": {
      "sendHTTPRequest": {
        "args": {
          "request": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        },
        "returns": {
          "type": "number",
          "field": null
        }
      },
      "getStackTrace": {
        "args": {
          "resourceId": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        },
        "returns": {
          "type": "json",
          "field": "stacktrace"
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "network-content.js"
  },
  "netEvent": {
    "typeName": "netEvent",
    "methods": {
      "release": {
        "args": {},
        "release": true
      },
      "getRequestHeaders": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "getRequestCookies": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "getRequestPostData": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "getEarlyHintsResponseHeaders": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "getResponseHeaders": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "getResponseCookies": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "getResponseCache": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "getResponseContent": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "getEventTimings": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "getSecurityInfo": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "getStackTrace": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      }
    },
    "events": {
      "network-event-update:headers": "networkEventUpdate",
      "network-event-update:cookies": "networkEventUpdate",
      "network-event-update:post-data": "networkEventUpdate",
      "network-event-update:response-start": "networkEventUpdate",
      "network-event-update:security-info": "networkEventUpdate",
      "network-event-update:response-content": "networkEventUpdate",
      "network-event-update:event-timings": "networkEventUpdate",
      "network-event-update:response-cache": "networkEventUpdate"
    },
    "eventArgs": {
      "network-event-update:headers": {
        "updateType": {
          "kind": "arg",
          "index": 0,
          "type": "string"
        },
        "headers": {
          "kind": "option",
          "index": 1,
          "type": "number"
        },
        "headersSize": {
          "kind": "option",
          "index": 1,
          "type": "number"
        }
      },
      "network-event-update:cookies": {
        "updateType": {
          "kind": "arg",
          "index": 0,
          "type": "string"
        },
        "cookies": {
          "kind": "option",
          "index": 1,
          "type": "number"
        }
      },
      "network-event-update:post-data": {
        "updateType": {
          "kind": "arg",
          "index": 0,
          "type": "string"
        },
        "dataSize": {
          "kind": "option",
          "index": 1,
          "type": "number"
        }
      },
      "network-event-update:response-start": {
        "updateType": {
          "kind": "arg",
          "index": 0,
          "type": "string"
        },
        "response": {
          "kind": "option",
          "index": 1,
          "type": "json"
        }
      },
      "network-event-update:security-info": {
        "updateType": {
          "kind": "arg",
          "index": 0,
          "type": "string"
        },
        "state": {
          "kind": "option",
          "index": 1,
          "type": "string"
        }
      },
      "network-event-update:response-content": {
        "updateType": {
          "kind": "arg",
          "index": 0,
          "type": "string"
        },
        "mimeType": {
          "kind": "option",
          "index": 1,
          "type": "string"
        },
        "contentSize": {
          "kind": "option",
          "index": 1,
          "type": "number"
        },
        "encoding": {
          "kind": "option",
          "index": 1,
          "type": "string"
        },
        "transferredSize": {
          "kind": "option",
          "index": 1,
          "type": "number"
        },
        "blockedReason": {
          "kind": "option",
          "index": 1,
          "type": "number"
        },
        "truncated": {
          "kind": "option",
          "index": 1,
          "type": "boolean"
        },
        "extension": {
          "kind": "option",
          "index": 1,
          "type": "json"
        }
      },
      "network-event-update:event-timings": {
        "updateType": {
          "kind": "arg",
          "index": 0,
          "type": "string"
        },
        "totalTime": {
          "kind": "option",
          "index": 1,
          "type": "number"
        }
      },
      "network-event-update:response-cache": {
        "updateType": {
          "kind": "arg",
          "index": 0,
          "type": "string"
        }
      }
    },
    "source": "network-event.js"
  },
  "networkParent": {
    "typeName": "networkParent",
    "methods": {
      "setPersist": {
        "args": {
          "options": {
            "kind": "arg",
            "index": 0,
            "type": "boolean"
          }
        }
      },
      "setNetworkThrottling": {
        "args": {
          "options": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "getNetworkThrottling": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "state"
        }
      },
      "clearNetworkThrottling": {
        "args": {}
      },
      "setSaveRequestAndResponseBodies": {
        "args": {
          "save": {
            "kind": "arg",
            "index": 0,
            "type": "boolean"
          }
        }
      },
      "setBlockedUrls": {
        "args": {
          "urls": {
            "kind": "arg",
            "index": 0,
            "type": "array:string"
          }
        }
      },
      "getBlockedUrls": {
        "args": {},
        "returns": {
          "type": "array:string",
          "field": "urls"
        }
      },
      "blockRequest": {
        "args": {
          "filters": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "unblockRequest": {
        "args": {
          "filters": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "override": {
        "args": {
          "url": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "path": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      },
      "removeOverride": {
        "args": {
          "url": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        }
      },
      "setLocalModeMappings": {
        "args": {
          "mappings": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "network-parent.js"
  },
  "domnodelist": {
    "typeName": "domnodelist",
    "methods": {
      "item": {
        "args": {
          "item": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        },
        "returns": {
          "type": "disconnectedNode",
          "field": null
        }
      },
      "items": {
        "args": {
          "start": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:number"
          },
          "end": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:number"
          }
        },
        "returns": {
          "type": "disconnectedNodeArray",
          "field": null
        }
      },
      "release": {
        "args": {},
        "release": true
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "node.js"
  },
  "domnode": {
    "typeName": "domnode",
    "methods": {
      "getNodeValue": {
        "args": {},
        "returns": {
          "type": "longstring",
          "field": "value"
        }
      },
      "setNodeValue": {
        "args": {
          "value": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "getUniqueSelector": {
        "args": {},
        "returns": {
          "type": "string",
          "field": "value"
        }
      },
      "getCssPath": {
        "args": {},
        "returns": {
          "type": "string",
          "field": "value"
        }
      },
      "getXPath": {
        "args": {},
        "returns": {
          "type": "string",
          "field": "value"
        }
      },
      "scrollIntoView": {
        "args": {}
      },
      "getImageData": {
        "args": {
          "maxDim": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:number"
          }
        },
        "returns": {
          "type": "imageData",
          "field": null
        }
      },
      "getEventListenerInfo": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "events"
        }
      },
      "enableEventListener": {
        "args": {
          "eventListenerInfoId": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "disableEventListener": {
        "args": {
          "eventListenerInfoId": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "modifyAttributes": {
        "args": {
          "modifications": {
            "kind": "arg",
            "index": 0,
            "type": "array:json"
          }
        }
      },
      "getFontFamilyDataURL": {
        "args": {
          "font": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "fillStyle": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:string"
          }
        },
        "returns": {
          "type": "imageData",
          "field": null
        }
      },
      "getClosestBackgroundColor": {
        "args": {},
        "returns": {
          "type": "string",
          "field": "value"
        }
      },
      "getBackgroundColor": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "getOwnerGlobalDimensions": {
        "args": {},
        "returns": {
          "type": "windowDimensions",
          "field": null
        }
      },
      "waitForFrameLoad": {
        "args": {}
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "node.js"
  },
  "obj": {
    "typeName": "obj",
    "methods": {
      "allocationStack": {
        "args": {},
        "returns": {
          "type": "array:object.originalSourceLocation",
          "field": "allocationStack"
        }
      },
      "dependentPromises": {
        "args": {},
        "returns": {
          "type": "object.dependentPromises",
          "field": null
        }
      },
      "enumEntries": {
        "args": {},
        "returns": {
          "type": "propertyIterator",
          "field": "iterator"
        }
      },
      "enumProperties": {
        "args": {
          "options": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:object.enumProperties.Options"
          }
        },
        "returns": {
          "type": "propertyIterator",
          "field": "iterator"
        }
      },
      "enumPrivateProperties": {
        "args": {},
        "returns": {
          "type": "privatePropertiesIterator",
          "field": "iterator"
        }
      },
      "enumSymbols": {
        "args": {},
        "returns": {
          "type": "symbolIterator",
          "field": "iterator"
        }
      },
      "fulfillmentStack": {
        "args": {},
        "returns": {
          "type": "array:object.originalSourceLocation",
          "field": "fulfillmentStack"
        }
      },
      "prototypeAndProperties": {
        "args": {},
        "returns": {
          "type": "object.prototypeproperties",
          "field": null
        }
      },
      "prototype": {
        "args": {},
        "returns": {
          "type": "object.prototype",
          "field": null
        }
      },
      "property": {
        "args": {
          "name": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        },
        "returns": {
          "type": "object.property",
          "field": null
        }
      },
      "propertyValue": {
        "args": {
          "name": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "receiverId": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:string"
          }
        },
        "returns": {
          "type": "object.propertyValue",
          "field": null
        }
      },
      "apply": {
        "args": {
          "context": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:json"
          },
          "arguments": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:array:json"
          }
        },
        "returns": {
          "type": "object.apply",
          "field": null
        }
      },
      "rejectionStack": {
        "args": {},
        "returns": {
          "type": "array:object.originalSourceLocation",
          "field": "rejectionStack"
        }
      },
      "promiseState": {
        "args": {},
        "returns": {
          "type": "object.promiseState",
          "field": null
        }
      },
      "proxySlots": {
        "args": {},
        "returns": {
          "type": "object.proxySlots",
          "field": null
        }
      },
      "global": {
        "args": {},
        "returns": {
          "type": "object.global",
          "field": null
        }
      },
      "customFormatterBody": {
        "args": {},
        "returns": {
          "type": "object.customFormatterBody",
          "field": null
        }
      },
      "addWatchpoint": {
        "args": {
          "property": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "label": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          },
          "watchpointType": {
            "kind": "arg",
            "index": 2,
            "type": "string"
          }
        },
        "oneway": true
      },
      "removeWatchpoint": {
        "args": {
          "property": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        },
        "oneway": true
      },
      "removeWatchpoints": {
        "args": {},
        "oneway": true
      },
      "release": {
        "args": {},
        "release": true
      },
      "threadGrip": {
        "args": {}
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "object.js"
  },
  "objects-manager": {
    "typeName": "objects-manager",
    "methods": {
      "releaseObjects": {
        "args": {
          "actorIDs": {
            "kind": "arg",
            "index": 0,
            "type": "array:string"
          }
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "objects-manager.js"
  },
  "pagestyle": {
    "typeName": "pagestyle",
    "methods": {
      "getComputed": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "markMatched": {
            "kind": "option",
            "index": 1,
            "type": "boolean"
          },
          "onlyMatched": {
            "kind": "option",
            "index": 1,
            "type": "boolean"
          },
          "clearCache": {
            "kind": "option",
            "index": 1,
            "type": "boolean"
          },
          "filter": {
            "kind": "option",
            "index": 1,
            "type": "string"
          },
          "filterProperties": {
            "kind": "option",
            "index": 1,
            "type": "nullable:array:string"
          }
        },
        "returns": {
          "type": "json",
          "field": "computed"
        }
      },
      "getAllUsedFontFaces": {
        "args": {
          "includePreviews": {
            "kind": "option",
            "index": 0,
            "type": "boolean"
          },
          "includeVariations": {
            "kind": "option",
            "index": 1,
            "type": "boolean"
          },
          "previewText": {
            "kind": "option",
            "index": 0,
            "type": "string"
          },
          "previewFontSize": {
            "kind": "option",
            "index": 0,
            "type": "string"
          },
          "previewFillStyle": {
            "kind": "option",
            "index": 0,
            "type": "string"
          }
        },
        "returns": {
          "type": "array:fontface",
          "field": "fontFaces"
        }
      },
      "getUsedFontFaces": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "includePreviews": {
            "kind": "option",
            "index": 1,
            "type": "boolean"
          },
          "includeVariations": {
            "kind": "option",
            "index": 1,
            "type": "boolean"
          },
          "previewText": {
            "kind": "option",
            "index": 1,
            "type": "string"
          },
          "previewFontSize": {
            "kind": "option",
            "index": 1,
            "type": "string"
          },
          "previewFillStyle": {
            "kind": "option",
            "index": 1,
            "type": "string"
          }
        },
        "returns": {
          "type": "array:fontface",
          "field": "fontFaces"
        }
      },
      "getMatchedSelectors": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "property": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          },
          "filter": {
            "kind": "option",
            "index": 2,
            "type": "string"
          }
        }
      },
      "getRule": {
        "args": {
          "ruleId": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        },
        "returns": {
          "type": "nullable:domstylerule",
          "field": "rule"
        }
      },
      "getApplied": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "inherited": {
            "kind": "option",
            "index": 1,
            "type": "boolean"
          },
          "matchedSelectors": {
            "kind": "option",
            "index": 1,
            "type": "boolean"
          },
          "skipPseudo": {
            "kind": "option",
            "index": 1,
            "type": "boolean"
          },
          "filter": {
            "kind": "option",
            "index": 1,
            "type": "string"
          }
        },
        "returns": {
          "type": "appliedStylesReturn",
          "field": null
        }
      },
      "isPositionEditable": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        },
        "returns": {
          "type": "boolean",
          "field": "value"
        }
      },
      "getLayout": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "autoMargins": {
            "kind": "option",
            "index": 1,
            "type": "boolean"
          }
        },
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "addNewRule": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "pseudoClasses": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:array:string"
          }
        },
        "returns": {
          "type": "appliedStylesReturn",
          "field": null
        }
      },
      "getAttributesInOwnerDocument": {
        "args": {
          "search": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "attributeType": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          },
          "node": {
            "kind": "arg",
            "index": 2,
            "type": "nullable:domnode"
          }
        },
        "returns": {
          "type": "array:string",
          "field": "attributes"
        }
      },
      "getAnchorNames": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        },
        "returns": {
          "type": "array:string",
          "field": "names"
        }
      }
    },
    "events": {
      "stylesheet-updated": "styleSheetUpdated"
    },
    "eventArgs": {
      "stylesheet-updated": {}
    },
    "source": "page-style.js"
  },
  "perf": {
    "typeName": "perf",
    "methods": {
      "startProfiler": {
        "args": {
          "entries": {
            "kind": "option",
            "index": 0,
            "type": "number"
          },
          "duration": {
            "kind": "option",
            "index": 0,
            "type": "nullable:number"
          },
          "interval": {
            "kind": "option",
            "index": 0,
            "type": "number"
          },
          "features": {
            "kind": "option",
            "index": 0,
            "type": "array:string"
          },
          "threads": {
            "kind": "option",
            "index": 0,
            "type": "array:string"
          }
        },
        "returns": {
          "type": "boolean",
          "field": "value"
        }
      },
      "startCaptureAndStopProfiler": {
        "args": {},
        "returns": {
          "type": "number",
          "field": "value"
        }
      },
      "getPreviouslyCapturedProfileDataBulk": {
        "args": {
          "handle": {
            "kind": "arg",
            "index": 0,
            "type": "number"
          }
        }
      },
      "getPreviouslyRetrievedAdditionalInformation": {
        "args": {
          "handle": {
            "kind": "arg",
            "index": 0,
            "type": "number"
          }
        },
        "returns": {
          "type": "nullable:json",
          "field": "value"
        }
      },
      "stopProfilerAndDiscardProfile": {
        "args": {}
      },
      "getSymbolTable": {
        "args": {
          "debugPath": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "breakpadId": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        },
        "returns": {
          "type": "array:array:number",
          "field": "value"
        }
      },
      "isActive": {
        "args": {},
        "returns": {
          "type": "boolean",
          "field": "value"
        }
      },
      "isSupportedPlatform": {
        "args": {},
        "returns": {
          "type": "boolean",
          "field": "value"
        }
      },
      "getSupportedFeatures": {
        "args": {},
        "returns": {
          "type": "array:string",
          "field": "value"
        }
      }
    },
    "events": {
      "profiler-started": "profiler-started",
      "profiler-stopped": "profiler-stopped"
    },
    "eventArgs": {
      "profiler-started": {
        "entries": {
          "kind": "arg",
          "index": 0,
          "type": "number"
        },
        "interval": {
          "kind": "arg",
          "index": 1,
          "type": "number"
        },
        "features": {
          "kind": "arg",
          "index": 2,
          "type": "number"
        },
        "duration": {
          "kind": "arg",
          "index": 3,
          "type": "nullable:number"
        },
        "activeTabID": {
          "kind": "arg",
          "index": 4,
          "type": "number"
        }
      },
      "profiler-stopped": {}
    },
    "source": "perf.js"
  },
  "preference": {
    "typeName": "preference",
    "methods": {
      "getTraits": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "traits"
        }
      },
      "getBoolPref": {
        "args": {
          "value": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        },
        "returns": {
          "type": "boolean",
          "field": "value"
        }
      },
      "getCharPref": {
        "args": {
          "value": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        },
        "returns": {
          "type": "string",
          "field": "value"
        }
      },
      "getIntPref": {
        "args": {
          "value": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        },
        "returns": {
          "type": "number",
          "field": "value"
        }
      },
      "getAllPrefs": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "value"
        }
      },
      "setBoolPref": {
        "args": {
          "name": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "value": {
            "kind": "arg",
            "index": 1,
            "type": "json"
          }
        }
      },
      "setCharPref": {
        "args": {
          "name": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "value": {
            "kind": "arg",
            "index": 1,
            "type": "json"
          }
        }
      },
      "setIntPref": {
        "args": {
          "name": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "value": {
            "kind": "arg",
            "index": 1,
            "type": "json"
          }
        }
      },
      "clearUserPref": {
        "args": {
          "name": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "preference.js"
  },
  "privatePropertiesIterator": {
    "typeName": "privatePropertiesIterator",
    "methods": {
      "slice": {
        "args": {
          "start": {
            "kind": "option",
            "index": 0,
            "type": "number"
          },
          "count": {
            "kind": "option",
            "index": 0,
            "type": "number"
          }
        },
        "returns": {
          "type": "privatepropertiesiterator.data",
          "field": null
        }
      },
      "all": {
        "args": {},
        "returns": {
          "type": "privatepropertiesiterator.data",
          "field": null
        }
      },
      "release": {
        "args": {},
        "release": true
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "private-properties-iterator.js"
  },
  "propertyIterator": {
    "typeName": "propertyIterator",
    "methods": {
      "names": {
        "args": {
          "indexes": {
            "kind": "option",
            "index": 0,
            "type": "array:number"
          }
        },
        "returns": {
          "type": "array:string",
          "field": "names"
        }
      },
      "slice": {
        "args": {
          "start": {
            "kind": "option",
            "index": 0,
            "type": "number"
          },
          "count": {
            "kind": "option",
            "index": 0,
            "type": "number"
          }
        },
        "returns": {
          "type": "propertyiterator.data",
          "field": null
        }
      },
      "all": {
        "args": {},
        "returns": {
          "type": "propertyiterator.data",
          "field": null
        }
      },
      "release": {
        "args": {},
        "release": true
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "property-iterator.js"
  },
  "reflow": {
    "typeName": "reflow",
    "methods": {
      "start": {
        "args": {},
        "oneway": true
      },
      "stop": {
        "args": {},
        "oneway": true
      }
    },
    "events": {
      "reflows": "reflows"
    },
    "eventArgs": {
      "reflows": {
        "reflows": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      }
    },
    "source": "reflow.js"
  },
  "responsive": {
    "typeName": "responsive",
    "methods": {
      "toggleTouchSimulator": {
        "args": {
          "options": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        },
        "returns": {
          "type": "boolean",
          "field": "valueChanged"
        }
      },
      "setElementPickerState": {
        "args": {
          "state": {
            "kind": "arg",
            "index": 0,
            "type": "boolean"
          },
          "pickerType": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "responsive.js"
  },
  "root": {
    "typeName": "root",
    "methods": {
      "connect": {
        "args": {
          "frontendVersion": {
            "kind": "option",
            "index": 0,
            "type": "string"
          }
        }
      },
      "getRoot": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "listTabs": {
        "args": {},
        "returns": {
          "type": "array:tabDescriptor",
          "field": "tabs"
        }
      },
      "getTab": {
        "args": {
          "browserId": {
            "kind": "option",
            "index": 0,
            "type": "number"
          }
        },
        "returns": {
          "type": "tabDescriptor",
          "field": "tab"
        }
      },
      "listAddons": {
        "args": {
          "iconDataURL": {
            "kind": "option",
            "index": 0,
            "type": "boolean"
          }
        },
        "returns": {
          "type": "array:webExtensionDescriptor",
          "field": "addons"
        }
      },
      "listWorkers": {
        "args": {},
        "returns": {
          "type": "root.listWorkers",
          "field": null
        }
      },
      "listServiceWorkerRegistrations": {
        "args": {},
        "returns": {
          "type": "root.listServiceWorkerRegistrations",
          "field": null
        }
      },
      "listProcesses": {
        "args": {},
        "returns": {
          "type": "array:processDescriptor",
          "field": "processes"
        }
      },
      "getProcess": {
        "args": {
          "id": {
            "kind": "arg",
            "index": 0,
            "type": "number"
          }
        },
        "returns": {
          "type": "processDescriptor",
          "field": "processDescriptor"
        }
      },
      "watchResources": {
        "args": {
          "resourceTypes": {
            "kind": "arg",
            "index": 0,
            "type": "array:string"
          }
        }
      },
      "unwatchResources": {
        "args": {
          "resourceTypes": {
            "kind": "arg",
            "index": 0,
            "type": "array:string"
          }
        },
        "oneway": true
      },
      "clearResources": {
        "args": {
          "resourceTypes": {
            "kind": "arg",
            "index": 0,
            "type": "array:string"
          }
        },
        "oneway": true
      },
      "requestTypes": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      }
    },
    "events": {
      "tabListChanged": "tabListChanged",
      "workerListChanged": "workerListChanged",
      "addonListChanged": "addonListChanged",
      "serviceWorkerRegistrationListChanged": "serviceWorkerRegistrationListChanged",
      "processListChanged": "processListChanged",
      "resources-available-array": "resources-available-array",
      "resources-destroyed-array": "resources-destroyed-array"
    },
    "eventArgs": {
      "tabListChanged": {},
      "workerListChanged": {},
      "addonListChanged": {},
      "serviceWorkerRegistrationListChanged": {},
      "processListChanged": {},
      "resources-available-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      },
      "resources-destroyed-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      }
    },
    "source": "root.js"
  },
  "screenshot-content": {
    "typeName": "screenshot-content",
    "methods": {
      "prepareCapture": {
        "args": {
          "args": {
            "kind": "arg",
            "index": 0,
            "type": "screenshot-content.args"
          }
        },
        "returns": {
          "type": "json",
          "field": "value"
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "screenshot-content.js"
  },
  "screenshot": {
    "typeName": "screenshot",
    "methods": {
      "capture": {
        "args": {
          "args": {
            "kind": "arg",
            "index": 0,
            "type": "screenshot.args"
          }
        },
        "returns": {
          "type": "json",
          "field": "value"
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "screenshot.js"
  },
  "source": {
    "typeName": "source",
    "methods": {
      "getBreakpointPositionsCompressed": {
        "args": {
          "query": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:breakpointquery"
          }
        },
        "returns": {
          "type": "json",
          "field": "positions"
        }
      },
      "getBreakableLines": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "lines"
        }
      },
      "source": {
        "args": {},
        "returns": {
          "type": "source.onsource",
          "field": null
        }
      },
      "setPausePoints": {
        "args": {
          "pausePoints": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "blackbox": {
        "args": {
          "range": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:json"
          }
        },
        "returns": {
          "type": "boolean",
          "field": "pausedInSource"
        }
      },
      "unblackbox": {
        "args": {
          "range": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:json"
          }
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "source.js"
  },
  "cookies": {
    "typeName": "cookies",
    "methods": {
      "getStoreObjects": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "names": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:array:string"
          },
          "options": {
            "kind": "arg",
            "index": 2,
            "type": "nullable:json"
          }
        },
        "returns": {
          "type": "cookiestoreobject",
          "field": null
        }
      },
      "getFields": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "value"
        }
      },
      "editItem": {
        "args": {
          "data": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        },
        "returns": {
          "type": "cookieoperationresult",
          "field": null
        }
      },
      "removeItem": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "name": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      },
      "addItem": {
        "args": {
          "guid": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "host": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:string"
          }
        },
        "returns": {
          "type": "cookieoperationresult",
          "field": null
        }
      },
      "removeAll": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "domain": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:string"
          }
        }
      },
      "removeAllSessionCookies": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "domain": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:string"
          }
        }
      }
    },
    "events": {
      "single-store-update": "storesUpdate",
      "single-store-cleared": "storesCleared"
    },
    "eventArgs": {
      "single-store-update": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "storeUpdateObject"
        }
      },
      "single-store-cleared": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "json"
        }
      }
    },
    "source": "storage.js"
  },
  "localStorage": {
    "typeName": "localStorage",
    "methods": {
      "getStoreObjects": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "names": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:array:string"
          },
          "options": {
            "kind": "arg",
            "index": 2,
            "type": "nullable:json"
          }
        },
        "returns": {
          "type": "storagestoreobject",
          "field": null
        }
      },
      "getFields": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "value"
        }
      },
      "editItem": {
        "args": {
          "data": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "removeItem": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "name": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      },
      "addItem": {
        "args": {
          "guid": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "host": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:string"
          }
        }
      },
      "removeAll": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        }
      }
    },
    "events": {
      "single-store-update": "storesUpdate",
      "single-store-cleared": "storesCleared"
    },
    "eventArgs": {
      "single-store-update": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "storeUpdateObject"
        }
      },
      "single-store-cleared": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "json"
        }
      }
    },
    "source": "storage.js"
  },
  "sessionStorage": {
    "typeName": "sessionStorage",
    "methods": {
      "getStoreObjects": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "names": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:array:string"
          },
          "options": {
            "kind": "arg",
            "index": 2,
            "type": "nullable:json"
          }
        },
        "returns": {
          "type": "storagestoreobject",
          "field": null
        }
      },
      "getFields": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "value"
        }
      },
      "editItem": {
        "args": {
          "data": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "removeItem": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "name": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      },
      "addItem": {
        "args": {
          "guid": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "host": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:string"
          }
        }
      },
      "removeAll": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        }
      }
    },
    "events": {
      "single-store-update": "storesUpdate",
      "single-store-cleared": "storesCleared"
    },
    "eventArgs": {
      "single-store-update": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "storeUpdateObject"
        }
      },
      "single-store-cleared": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "json"
        }
      }
    },
    "source": "storage.js"
  },
  "extensionStorage": {
    "typeName": "extensionStorage",
    "methods": {
      "getStoreObjects": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "names": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:array:string"
          },
          "options": {
            "kind": "arg",
            "index": 2,
            "type": "nullable:json"
          }
        },
        "returns": {
          "type": "extensionstoreobject",
          "field": null
        }
      },
      "getFields": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "value"
        }
      },
      "editItem": {
        "args": {
          "data": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "removeItem": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "name": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      },
      "removeAll": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        }
      }
    },
    "events": {
      "single-store-update": "storesUpdate",
      "single-store-cleared": "storesCleared"
    },
    "eventArgs": {
      "single-store-update": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "storeUpdateObject"
        }
      },
      "single-store-cleared": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "json"
        }
      }
    },
    "source": "storage.js"
  },
  "Cache": {
    "typeName": "Cache",
    "methods": {
      "getStoreObjects": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "names": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:array:string"
          },
          "options": {
            "kind": "arg",
            "index": 2,
            "type": "nullable:json"
          }
        },
        "returns": {
          "type": "cachestoreobject",
          "field": null
        }
      },
      "getFields": {
        "args": {
          "subType": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:string"
          }
        },
        "returns": {
          "type": "json",
          "field": "value"
        }
      },
      "removeAll": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "name": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      },
      "removeItem": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "name": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      }
    },
    "events": {
      "single-store-update": "storesUpdate",
      "single-store-cleared": "storesCleared"
    },
    "eventArgs": {
      "single-store-update": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "storeUpdateObject"
        }
      },
      "single-store-cleared": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "json"
        }
      }
    },
    "source": "storage.js"
  },
  "indexedDB": {
    "typeName": "indexedDB",
    "methods": {
      "getStoreObjects": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "names": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:array:string"
          },
          "options": {
            "kind": "arg",
            "index": 2,
            "type": "nullable:json"
          }
        },
        "returns": {
          "type": "idbstoreobject",
          "field": null
        }
      },
      "getFields": {
        "args": {
          "subType": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:string"
          }
        },
        "returns": {
          "type": "json",
          "field": "value"
        }
      },
      "removeDatabase": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "name": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        },
        "returns": {
          "type": "idbdeleteresult",
          "field": null
        }
      },
      "removeAll": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "name": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      },
      "removeItem": {
        "args": {
          "host": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "name": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      }
    },
    "events": {
      "single-store-update": "storesUpdate",
      "single-store-cleared": "storesCleared"
    },
    "eventArgs": {
      "single-store-update": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "storeUpdateObject"
        }
      },
      "single-store-cleared": {
        "data": {
          "kind": "arg",
          "index": 0,
          "type": "json"
        }
      }
    },
    "source": "storage.js"
  },
  "longstractor": {
    "typeName": "longstractor",
    "methods": {
      "substring": {
        "args": {
          "start": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "end": {
            "kind": "arg",
            "index": 1,
            "type": "json"
          }
        }
      },
      "release": {
        "args": {},
        "release": true
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "string.js"
  },
  "domstylerule": {
    "typeName": "domstylerule",
    "methods": {
      "getRuleText": {
        "args": {},
        "returns": {
          "type": "string",
          "field": "text"
        }
      },
      "setRuleText": {
        "args": {
          "newText": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "modifications": {
            "kind": "arg",
            "index": 1,
            "type": "array:json"
          }
        },
        "returns": {
          "type": "domstylerule",
          "field": "rule"
        }
      },
      "modifyProperties": {
        "args": {
          "modifications": {
            "kind": "arg",
            "index": 0,
            "type": "array:json"
          }
        },
        "returns": {
          "type": "domstylerule",
          "field": "rule"
        }
      },
      "modifySelector": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "value": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          },
          "editAuthored": {
            "kind": "arg",
            "index": 2,
            "type": "boolean"
          }
        },
        "returns": {
          "type": "modifiedStylesReturn",
          "field": null
        }
      },
      "getQueryContainerForNode": {
        "args": {
          "ancestorRuleIndex": {
            "kind": "arg",
            "index": 0,
            "type": "number"
          },
          "node": {
            "kind": "arg",
            "index": 1,
            "type": "domnode"
          },
          "conditionIndex": {
            "kind": "arg",
            "index": 2,
            "type": "number"
          }
        },
        "returns": {
          "type": "domstylerule.queryContainerForNodeReturn",
          "field": null
        }
      },
      "getCssExplainersData": {
        "args": {
          "property": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "expression": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          },
          "pseudo": {
            "kind": "arg",
            "index": 2,
            "type": "nullable:string"
          },
          "inheritedNode": {
            "kind": "arg",
            "index": 3,
            "type": "nullable:domnode"
          }
        },
        "returns": {
          "type": "array:string",
          "field": "steps"
        }
      }
    },
    "events": {
      "location-changed": "locationChanged",
      "rule-updated": "ruleUpdated"
    },
    "eventArgs": {
      "location-changed": {
        "line": {
          "kind": "arg",
          "index": 0,
          "type": "number"
        },
        "column": {
          "kind": "arg",
          "index": 1,
          "type": "number"
        }
      },
      "rule-updated": {
        "rule": {
          "kind": "arg",
          "index": 0,
          "type": "domstylerule"
        }
      }
    },
    "source": "style-rule.js"
  },
  "stylesheets": {
    "typeName": "stylesheets",
    "methods": {
      "getTraits": {
        "args": {},
        "returns": {
          "type": "json",
          "field": "traits"
        }
      },
      "addStyleSheet": {
        "args": {
          "text": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "fileName": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:string"
          }
        }
      },
      "toggleDisabled": {
        "args": {
          "resourceId": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        },
        "returns": {
          "type": "boolean",
          "field": "disabled"
        }
      },
      "getText": {
        "args": {
          "resourceId": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        },
        "returns": {
          "type": "longstring",
          "field": "text"
        }
      },
      "getStyleSheetIndentation": {
        "args": {
          "resourceId": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        },
        "returns": {
          "type": "string",
          "field": "indentation"
        }
      },
      "update": {
        "args": {
          "resourceId": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "text": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          },
          "transition": {
            "kind": "arg",
            "index": 2,
            "type": "boolean"
          },
          "cause": {
            "kind": "arg",
            "index": 3,
            "type": "nullable:string"
          }
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "style-sheets.js"
  },
  "symbolIterator": {
    "typeName": "symbolIterator",
    "methods": {
      "slice": {
        "args": {
          "start": {
            "kind": "option",
            "index": 0,
            "type": "number"
          },
          "count": {
            "kind": "option",
            "index": 0,
            "type": "number"
          }
        },
        "returns": {
          "type": "symboliterator.data",
          "field": null
        }
      },
      "all": {
        "args": {},
        "returns": {
          "type": "symboliterator.data",
          "field": null
        }
      },
      "release": {
        "args": {},
        "release": true
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "symbol-iterator.js"
  },
  "symbol": {
    "typeName": "symbol",
    "methods": {
      "release": {
        "args": {}
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "symbol.js"
  },
  "target-configuration": {
    "typeName": "target-configuration",
    "methods": {
      "updateConfiguration": {
        "args": {
          "configuration": {
            "kind": "arg",
            "index": 0,
            "type": "target-configuration.configuration"
          }
        },
        "returns": {
          "type": "target-configuration.configuration",
          "field": "configuration"
        }
      },
      "isJavascriptEnabled": {
        "args": {},
        "returns": {
          "type": "boolean",
          "field": "javascriptEnabled"
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "target-configuration.js"
  },
  "contentProcessTarget": {
    "typeName": "contentProcessTarget",
    "methods": {
      "listWorkers": {
        "args": {},
        "returns": {
          "type": "contentProcessTarget.workers",
          "field": null
        }
      },
      "pauseMatchingServiceWorkers": {
        "args": {
          "origin": {
            "kind": "option",
            "index": 0,
            "type": "string"
          }
        }
      }
    },
    "events": {
      "workerListChanged": "workerListChanged",
      "resources-available-array": "resources-available-array",
      "resources-destroyed-array": "resources-destroyed-array",
      "resources-updated-array": "resources-updated-array"
    },
    "eventArgs": {
      "workerListChanged": {},
      "resources-available-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      },
      "resources-destroyed-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      },
      "resources-updated-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      }
    },
    "source": "targets/content-process.js"
  },
  "contentScriptTarget": {
    "typeName": "contentScriptTarget",
    "methods": {},
    "events": {
      "resources-available-array": "resources-available-array",
      "resources-destroyed-array": "resources-destroyed-array",
      "resources-updated-array": "resources-updated-array"
    },
    "eventArgs": {
      "resources-available-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      },
      "resources-destroyed-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      },
      "resources-updated-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      }
    },
    "source": "targets/content-script.js"
  },
  "parentProcessTarget": {
    "typeName": "parentProcessTarget",
    "methods": {
      "detach": {
        "args": {}
      },
      "focus": {
        "args": {}
      },
      "goForward": {
        "args": {}
      },
      "goBack": {
        "args": {}
      },
      "gotoIndex": {
        "args": {
          "index": {
            "kind": "arg",
            "index": 0,
            "type": "number"
          }
        }
      },
      "reload": {
        "args": {
          "options": {
            "kind": "option",
            "index": 0,
            "type": "windowGlobalTarget.reload"
          }
        }
      },
      "navigateTo": {
        "args": {
          "url": {
            "kind": "option",
            "index": 0,
            "type": "string"
          }
        }
      },
      "reconfigure": {
        "args": {
          "options": {
            "kind": "option",
            "index": 0,
            "type": "windowGlobalTarget.reconfigure"
          }
        }
      },
      "switchToFrame": {
        "args": {
          "windowId": {
            "kind": "option",
            "index": 0,
            "type": "string"
          }
        },
        "returns": {
          "type": "windowGlobalTarget.switchtoframe",
          "field": null
        }
      },
      "listFrames": {
        "args": {},
        "returns": {
          "type": "windowGlobalTarget.listframes",
          "field": null
        }
      },
      "listWorkers": {
        "args": {},
        "returns": {
          "type": "windowGlobalTarget.workers",
          "field": null
        }
      },
      "logInPage": {
        "args": {
          "text": {
            "kind": "option",
            "index": 0,
            "type": "string"
          },
          "category": {
            "kind": "option",
            "index": 0,
            "type": "string"
          },
          "flags": {
            "kind": "option",
            "index": 0,
            "type": "string"
          }
        }
      },
      "getSourceContentForResource": {
        "args": {
          "resourceType": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "resourceId": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:string"
          }
        },
        "returns": {
          "type": "windowGlobalTarget.getSourceContentForResource",
          "field": "value"
        }
      }
    },
    "events": {
      "tabNavigated": "tabNavigated",
      "frameUpdate": "frameUpdate",
      "workerListChanged": "workerListChanged",
      "contentScrolled": "contentScrolled",
      "resources-available-array": "resources-available-array",
      "resources-destroyed-array": "resources-destroyed-array",
      "resources-updated-array": "resources-updated-array"
    },
    "eventArgs": {
      "tabNavigated": {
        "url": {
          "kind": "option",
          "index": 0,
          "type": "string"
        },
        "title": {
          "kind": "option",
          "index": 0,
          "type": "string"
        },
        "state": {
          "kind": "option",
          "index": 0,
          "type": "string"
        },
        "isFrameSwitching": {
          "kind": "option",
          "index": 0,
          "type": "boolean"
        }
      },
      "frameUpdate": {
        "frames": {
          "kind": "option",
          "index": 0,
          "type": "nullable:array:windowGlobalTarget.window"
        },
        "selected": {
          "kind": "option",
          "index": 0,
          "type": "nullable:number"
        },
        "destroyAll": {
          "kind": "option",
          "index": 0,
          "type": "nullable:boolean"
        }
      },
      "workerListChanged": {},
      "contentScrolled": {
        "deltaY": {
          "kind": "arg",
          "index": 0,
          "type": "number"
        }
      },
      "resources-available-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      },
      "resources-destroyed-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      },
      "resources-updated-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      }
    },
    "source": "targets/parent-process.js"
  },
  "windowGlobalTarget": {
    "typeName": "windowGlobalTarget",
    "methods": {
      "detach": {
        "args": {}
      },
      "focus": {
        "args": {}
      },
      "goForward": {
        "args": {}
      },
      "goBack": {
        "args": {}
      },
      "gotoIndex": {
        "args": {
          "index": {
            "kind": "arg",
            "index": 0,
            "type": "number"
          }
        }
      },
      "reload": {
        "args": {
          "options": {
            "kind": "option",
            "index": 0,
            "type": "windowGlobalTarget.reload"
          }
        }
      },
      "navigateTo": {
        "args": {
          "url": {
            "kind": "option",
            "index": 0,
            "type": "string"
          }
        }
      },
      "reconfigure": {
        "args": {
          "options": {
            "kind": "option",
            "index": 0,
            "type": "windowGlobalTarget.reconfigure"
          }
        }
      },
      "switchToFrame": {
        "args": {
          "windowId": {
            "kind": "option",
            "index": 0,
            "type": "string"
          }
        },
        "returns": {
          "type": "windowGlobalTarget.switchtoframe",
          "field": null
        }
      },
      "listFrames": {
        "args": {},
        "returns": {
          "type": "windowGlobalTarget.listframes",
          "field": null
        }
      },
      "listWorkers": {
        "args": {},
        "returns": {
          "type": "windowGlobalTarget.workers",
          "field": null
        }
      },
      "logInPage": {
        "args": {
          "text": {
            "kind": "option",
            "index": 0,
            "type": "string"
          },
          "category": {
            "kind": "option",
            "index": 0,
            "type": "string"
          },
          "flags": {
            "kind": "option",
            "index": 0,
            "type": "string"
          }
        }
      },
      "getSourceContentForResource": {
        "args": {
          "resourceType": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "resourceId": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:string"
          }
        },
        "returns": {
          "type": "windowGlobalTarget.getSourceContentForResource",
          "field": "value"
        }
      }
    },
    "events": {
      "tabNavigated": "tabNavigated",
      "frameUpdate": "frameUpdate",
      "workerListChanged": "workerListChanged",
      "contentScrolled": "contentScrolled",
      "resources-available-array": "resources-available-array",
      "resources-destroyed-array": "resources-destroyed-array",
      "resources-updated-array": "resources-updated-array"
    },
    "eventArgs": {
      "tabNavigated": {
        "url": {
          "kind": "option",
          "index": 0,
          "type": "string"
        },
        "title": {
          "kind": "option",
          "index": 0,
          "type": "string"
        },
        "state": {
          "kind": "option",
          "index": 0,
          "type": "string"
        },
        "isFrameSwitching": {
          "kind": "option",
          "index": 0,
          "type": "boolean"
        }
      },
      "frameUpdate": {
        "frames": {
          "kind": "option",
          "index": 0,
          "type": "nullable:array:windowGlobalTarget.window"
        },
        "selected": {
          "kind": "option",
          "index": 0,
          "type": "nullable:number"
        },
        "destroyAll": {
          "kind": "option",
          "index": 0,
          "type": "nullable:boolean"
        }
      },
      "workerListChanged": {},
      "contentScrolled": {
        "deltaY": {
          "kind": "arg",
          "index": 0,
          "type": "number"
        }
      },
      "resources-available-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      },
      "resources-destroyed-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      },
      "resources-updated-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      }
    },
    "source": "targets/window-global.js"
  },
  "workerTarget": {
    "typeName": "workerTarget",
    "methods": {},
    "events": {
      "resources-available-array": "resources-available-array",
      "resources-destroyed-array": "resources-destroyed-array",
      "resources-updated-array": "resources-updated-array"
    },
    "eventArgs": {
      "resources-available-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      },
      "resources-destroyed-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      },
      "resources-updated-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      }
    },
    "source": "targets/worker.js"
  },
  "thread-configuration": {
    "typeName": "thread-configuration",
    "methods": {
      "updateConfiguration": {
        "args": {
          "configuration": {
            "kind": "arg",
            "index": 0,
            "type": "thread-configuration.configuration"
          }
        }
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "thread-configuration.js"
  },
  "thread": {
    "typeName": "thread",
    "methods": {
      "attach": {
        "args": {
          "options": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "reconfigure": {
        "args": {
          "options": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "resume": {
        "args": {
          "resumeLimit": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:json"
          },
          "frameActorID": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:string"
          }
        },
        "returns": {
          "type": "nullable:json",
          "field": null
        }
      },
      "frames": {
        "args": {
          "start": {
            "kind": "arg",
            "index": 0,
            "type": "number"
          },
          "count": {
            "kind": "arg",
            "index": 1,
            "type": "number"
          }
        },
        "returns": {
          "type": "thread.frames",
          "field": null
        }
      },
      "interrupt": {
        "args": {
          "when": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "sources": {
        "args": {},
        "returns": {
          "type": "array:json",
          "field": "sources"
        }
      },
      "skipBreakpoints": {
        "args": {
          "skip": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "dumpThread": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "dumpPools": {
        "args": {},
        "returns": {
          "type": "json",
          "field": null
        }
      },
      "setBreakpoint": {
        "args": {
          "location": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "options": {
            "kind": "arg",
            "index": 1,
            "type": "thread.breakpoint-options"
          }
        }
      },
      "removeBreakpoint": {
        "args": {
          "location": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        }
      },
      "setXHRBreakpoint": {
        "args": {
          "path": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "method": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        },
        "returns": {
          "type": "boolean",
          "field": "value"
        }
      },
      "removeXHRBreakpoint": {
        "args": {
          "path": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "method": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        },
        "returns": {
          "type": "boolean",
          "field": "value"
        }
      },
      "getAvailableEventBreakpoints": {
        "args": {},
        "returns": {
          "type": "array:available-breakpoint-group",
          "field": "value"
        }
      },
      "getActiveEventBreakpoints": {
        "args": {},
        "returns": {
          "type": "array:string",
          "field": "ids"
        }
      },
      "setActiveEventBreakpoints": {
        "args": {
          "ids": {
            "kind": "arg",
            "index": 0,
            "type": "array:string"
          }
        }
      },
      "pauseOnExceptions": {
        "args": {
          "pauseOnExceptions": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "ignoreCaughtExceptions": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      },
      "toggleEventLogging": {
        "args": {
          "logEventBreakpoints": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        }
      },
      "isAttached": {
        "args": {},
        "returns": {
          "type": "boolean",
          "field": "value"
        }
      }
    },
    "events": {
      "paused": "paused",
      "resumed": "resumed",
      "newSource": "newSource"
    },
    "eventArgs": {
      "paused": {
        "actor": {
          "kind": "option",
          "index": 0,
          "type": "nullable:string"
        },
        "frame": {
          "kind": "option",
          "index": 0,
          "type": "frame"
        },
        "why": {
          "kind": "option",
          "index": 0,
          "type": "paused-reason"
        }
      },
      "resumed": {},
      "newSource": {
        "source": {
          "kind": "option",
          "index": 0,
          "type": "json"
        }
      }
    },
    "source": "thread.js"
  },
  "tracer": {
    "typeName": "tracer",
    "methods": {
      "startTracing": {
        "args": {
          "options": {
            "kind": "arg",
            "index": 0,
            "type": "tracer.start.options"
          }
        }
      },
      "stopTracing": {
        "args": {}
      }
    },
    "events": {},
    "eventArgs": {},
    "source": "tracer.js"
  },
  "domwalker": {
    "typeName": "domwalker",
    "methods": {
      "release": {
        "args": {},
        "release": true
      },
      "document": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:domnode"
          }
        },
        "returns": {
          "type": "domnode",
          "field": "node"
        }
      },
      "documentElement": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:domnode"
          }
        },
        "returns": {
          "type": "nullable:domnode",
          "field": "node"
        }
      },
      "retainNode": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        }
      },
      "unretainNode": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        }
      },
      "releaseNode": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "force": {
            "kind": "option",
            "index": 1,
            "type": "json"
          }
        }
      },
      "children": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "maxNodes": {
            "kind": "option",
            "index": 1,
            "type": "json"
          },
          "center": {
            "kind": "option",
            "index": 1,
            "type": "domnode"
          },
          "start": {
            "kind": "option",
            "index": 1,
            "type": "domnode"
          }
        }
      },
      "nextSibling": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        },
        "returns": {
          "type": "nullable:domnode",
          "field": "node"
        }
      },
      "previousSibling": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        },
        "returns": {
          "type": "nullable:domnode",
          "field": "node"
        }
      },
      "findInspectingNode": {
        "args": {},
        "returns": {
          "type": "disconnectedNode",
          "field": null
        }
      },
      "querySelector": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "selector": {
            "kind": "arg",
            "index": 1,
            "type": "json"
          }
        },
        "returns": {
          "type": "disconnectedNode",
          "field": null
        }
      },
      "getIdrefNode": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "id": {
            "kind": "arg",
            "index": 1,
            "type": "json"
          }
        },
        "returns": {
          "type": "disconnectedNode",
          "field": null
        }
      },
      "querySelectorAll": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "selector": {
            "kind": "arg",
            "index": 1,
            "type": "json"
          }
        },
        "returns": {
          "type": "domnodelist",
          "field": "list"
        }
      },
      "search": {
        "args": {
          "query": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        },
        "returns": {
          "type": "searchresult",
          "field": "list"
        }
      },
      "getSuggestionsForQuery": {
        "args": {
          "query": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          },
          "completing": {
            "kind": "arg",
            "index": 1,
            "type": "json"
          },
          "selectorState": {
            "kind": "arg",
            "index": 2,
            "type": "json"
          }
        },
        "returns": {
          "type": "array:array:string",
          "field": "list"
        }
      },
      "addPseudoClassLock": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "pseudoClass": {
            "kind": "arg",
            "index": 1,
            "type": "json"
          },
          "parents": {
            "kind": "option",
            "index": 2,
            "type": "json"
          },
          "enabled": {
            "kind": "option",
            "index": 2,
            "type": "boolean"
          }
        }
      },
      "hideNode": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        }
      },
      "unhideNode": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        }
      },
      "removePseudoClassLock": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "pseudoClass": {
            "kind": "arg",
            "index": 1,
            "type": "json"
          },
          "parents": {
            "kind": "option",
            "index": 2,
            "type": "json"
          }
        }
      },
      "clearPseudoClassLocks": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:domnode"
          }
        }
      },
      "innerHTML": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        },
        "returns": {
          "type": "longstring",
          "field": "value"
        }
      },
      "setInnerHTML": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "value": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      },
      "outerHTML": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        },
        "returns": {
          "type": "longstring",
          "field": "value"
        }
      },
      "setOuterHTML": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "value": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      },
      "insertAdjacentHTML": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "position": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          },
          "value": {
            "kind": "arg",
            "index": 2,
            "type": "string"
          }
        },
        "returns": {
          "type": "disconnectedNodeArray",
          "field": null
        }
      },
      "duplicateNode": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        }
      },
      "removeNode": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        },
        "returns": {
          "type": "nullable:domnode",
          "field": "nextSibling"
        }
      },
      "removeNodes": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "array:domnode"
          }
        }
      },
      "insertBefore": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "parent": {
            "kind": "arg",
            "index": 1,
            "type": "domnode"
          },
          "sibling": {
            "kind": "arg",
            "index": 2,
            "type": "nullable:domnode"
          }
        }
      },
      "editTagName": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          },
          "tagName": {
            "kind": "arg",
            "index": 1,
            "type": "string"
          }
        }
      },
      "getMutations": {
        "args": {
          "cleanup": {
            "kind": "option",
            "index": 0,
            "type": "json"
          }
        },
        "returns": {
          "type": "array:dommutation",
          "field": "mutations"
        }
      },
      "isInDOMTree": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        },
        "returns": {
          "type": "boolean",
          "field": "attached"
        }
      },
      "getNodeActorFromWindowID": {
        "args": {
          "windowID": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        },
        "returns": {
          "type": "nullable:disconnectedNode",
          "field": "nodeFront"
        }
      },
      "getNodeActorFromContentDomReference": {
        "args": {
          "contentDomReference": {
            "kind": "arg",
            "index": 0,
            "type": "json"
          }
        },
        "returns": {
          "type": "nullable:disconnectedNode",
          "field": "nodeFront"
        }
      },
      "getStyleSheetOwnerNode": {
        "args": {
          "styleSheetActorID": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        },
        "returns": {
          "type": "nullable:disconnectedNode",
          "field": "ownerNode"
        }
      },
      "getNodeFromActor": {
        "args": {
          "actorID": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "path": {
            "kind": "arg",
            "index": 1,
            "type": "array:string"
          }
        },
        "returns": {
          "type": "nullable:disconnectedNode",
          "field": "node"
        }
      },
      "getLayoutInspector": {
        "args": {},
        "returns": {
          "type": "layout",
          "field": "actor"
        }
      },
      "getParentGridNode": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:domnode"
          }
        },
        "returns": {
          "type": "nullable:domnode",
          "field": "node"
        }
      },
      "getOffsetParent": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:domnode"
          }
        },
        "returns": {
          "type": "nullable:domnode",
          "field": "node"
        }
      },
      "setMutationBreakpoints": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:domnode"
          },
          "subtree": {
            "kind": "option",
            "index": 1,
            "type": "nullable:boolean"
          },
          "removal": {
            "kind": "option",
            "index": 1,
            "type": "nullable:boolean"
          },
          "attribute": {
            "kind": "option",
            "index": 1,
            "type": "nullable:boolean"
          }
        }
      },
      "getEmbedderElement": {
        "args": {
          "browsingContextID": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        },
        "returns": {
          "type": "disconnectedNode",
          "field": "nodeFront"
        }
      },
      "pick": {
        "args": {
          "doFocus": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:boolean"
          },
          "isLocalTab": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:boolean"
          }
        }
      },
      "cancelPick": {
        "args": {}
      },
      "clearPicker": {
        "args": {},
        "oneway": true
      },
      "watchRootNode": {
        "args": {}
      },
      "getOverflowCausingElements": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        },
        "returns": {
          "type": "disconnectedNodeArray",
          "field": "list"
        }
      },
      "getScrollableAncestorNode": {
        "args": {
          "node": {
            "kind": "arg",
            "index": 0,
            "type": "domnode"
          }
        },
        "returns": {
          "type": "nullable:domnode",
          "field": "node"
        }
      }
    },
    "events": {
      "new-mutations": "newMutations",
      "root-available": "root-available",
      "root-destroyed": "root-destroyed",
      "picker-node-picked": "pickerNodePicked",
      "picker-node-previewed": "pickerNodePreviewed",
      "picker-node-hovered": "pickerNodeHovered",
      "picker-node-canceled": "pickerNodeCanceled",
      "display-change": "display-change",
      "scrollable-change": "scrollable-change",
      "overflow-change": "overflow-change",
      "container-type-change": "container-type-change",
      "anchor-name-change": "anchor-name-change",
      "resize": "resize"
    },
    "eventArgs": {
      "new-mutations": {},
      "root-available": {
        "node": {
          "kind": "arg",
          "index": 0,
          "type": "nullable:domnode"
        }
      },
      "root-destroyed": {
        "node": {
          "kind": "arg",
          "index": 0,
          "type": "nullable:domnode"
        }
      },
      "picker-node-picked": {
        "node": {
          "kind": "arg",
          "index": 0,
          "type": "disconnectedNode"
        }
      },
      "picker-node-previewed": {
        "node": {
          "kind": "arg",
          "index": 0,
          "type": "disconnectedNode"
        }
      },
      "picker-node-hovered": {
        "node": {
          "kind": "arg",
          "index": 0,
          "type": "disconnectedNode"
        }
      },
      "picker-node-canceled": {},
      "display-change": {
        "nodes": {
          "kind": "arg",
          "index": 0,
          "type": "array:domnode"
        }
      },
      "scrollable-change": {
        "nodes": {
          "kind": "arg",
          "index": 0,
          "type": "array:domnode"
        }
      },
      "overflow-change": {
        "nodes": {
          "kind": "arg",
          "index": 0,
          "type": "array:domnode"
        }
      },
      "container-type-change": {
        "nodes": {
          "kind": "arg",
          "index": 0,
          "type": "array:domnode"
        }
      },
      "anchor-name-change": {
        "nodes": {
          "kind": "arg",
          "index": 0,
          "type": "array:domnode"
        }
      },
      "resize": {}
    },
    "source": "walker.js"
  },
  "watcher": {
    "typeName": "watcher",
    "methods": {
      "watchTargets": {
        "args": {
          "targetType": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          }
        }
      },
      "unwatchTargets": {
        "args": {
          "targetType": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "options": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:json"
          }
        },
        "oneway": true
      },
      "getParentBrowsingContextID": {
        "args": {
          "browsingContextID": {
            "kind": "arg",
            "index": 0,
            "type": "number"
          }
        },
        "returns": {
          "type": "nullable:number",
          "field": "browsingContextID"
        }
      },
      "watchResources": {
        "args": {
          "resourceTypes": {
            "kind": "arg",
            "index": 0,
            "type": "array:string"
          }
        }
      },
      "unwatchResources": {
        "args": {
          "resourceTypes": {
            "kind": "arg",
            "index": 0,
            "type": "array:string"
          }
        },
        "oneway": true
      },
      "clearResources": {
        "args": {
          "resourceTypes": {
            "kind": "arg",
            "index": 0,
            "type": "array:string"
          }
        },
        "oneway": true
      },
      "getNetworkParentActor": {
        "args": {},
        "returns": {
          "type": "networkParent",
          "field": "network"
        }
      },
      "getBlackboxingActor": {
        "args": {},
        "returns": {
          "type": "blackboxing",
          "field": "blackboxing"
        }
      },
      "getBreakpointListActor": {
        "args": {},
        "returns": {
          "type": "breakpoint-list",
          "field": "breakpointList"
        }
      },
      "getTargetConfigurationActor": {
        "args": {},
        "returns": {
          "type": "target-configuration",
          "field": "configuration"
        }
      },
      "getThreadConfigurationActor": {
        "args": {},
        "returns": {
          "type": "thread-configuration",
          "field": "configuration"
        }
      }
    },
    "events": {
      "target-available-form": "target-available-form",
      "target-destroyed-form": "target-destroyed-form",
      "resources-available-array": "resources-available-array",
      "resources-destroyed-array": "resources-destroyed-array",
      "resources-updated-array": "resources-updated-array"
    },
    "eventArgs": {
      "target-available-form": {
        "target": {
          "kind": "arg",
          "index": 0,
          "type": "json"
        }
      },
      "target-destroyed-form": {
        "target": {
          "kind": "arg",
          "index": 0,
          "type": "json"
        },
        "options": {
          "kind": "arg",
          "index": 1,
          "type": "nullable:json"
        }
      },
      "resources-available-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      },
      "resources-destroyed-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      },
      "resources-updated-array": {
        "array": {
          "kind": "arg",
          "index": 0,
          "type": "array:json"
        }
      }
    },
    "source": "watcher.js"
  },
  "console": {
    "typeName": "console",
    "methods": {
      "startListeners": {
        "args": {
          "listeners": {
            "kind": "arg",
            "index": 0,
            "type": "array:string"
          }
        },
        "returns": {
          "type": "console.startlisteners",
          "field": null
        }
      },
      "stopListeners": {
        "args": {
          "listeners": {
            "kind": "arg",
            "index": 0,
            "type": "nullable:array:string"
          }
        },
        "returns": {
          "type": "console.stoplisteners",
          "field": null
        }
      },
      "getCachedMessages": {
        "args": {
          "messageTypes": {
            "kind": "arg",
            "index": 0,
            "type": "array:string"
          }
        },
        "returns": {
          "type": "console.cachedmessages",
          "field": null
        }
      },
      "evaluateJSAsync": {
        "args": {
          "text": {
            "kind": "option",
            "index": 0,
            "type": "string"
          },
          "frameActor": {
            "kind": "option",
            "index": 0,
            "type": "string"
          },
          "url": {
            "kind": "option",
            "index": 0,
            "type": "string"
          },
          "selectedNodeActor": {
            "kind": "option",
            "index": 0,
            "type": "string"
          },
          "selectedObjectActor": {
            "kind": "option",
            "index": 0,
            "type": "string"
          },
          "innerWindowID": {
            "kind": "option",
            "index": 0,
            "type": "number"
          },
          "mapped": {
            "kind": "option",
            "index": 0,
            "type": "nullable:json"
          },
          "eager": {
            "kind": "option",
            "index": 0,
            "type": "nullable:boolean"
          },
          "disableBreaks": {
            "kind": "option",
            "index": 0,
            "type": "nullable:boolean"
          },
          "preferConsoleCommandsOverLocalSymbols": {
            "kind": "option",
            "index": 0,
            "type": "nullable:boolean"
          },
          "evalInTracer": {
            "kind": "option",
            "index": 0,
            "type": "nullable:boolean"
          }
        },
        "returns": {
          "type": "console.evaluatejsasync",
          "field": null
        }
      },
      "autocomplete": {
        "args": {
          "text": {
            "kind": "arg",
            "index": 0,
            "type": "string"
          },
          "cursor": {
            "kind": "arg",
            "index": 1,
            "type": "nullable:number"
          },
          "frameActor": {
            "kind": "arg",
            "index": 2,
            "type": "nullable:string"
          },
          "selectedNodeActor": {
            "kind": "arg",
            "index": 3,
            "type": "nullable:string"
          },
          "authorizedEvaluations": {
            "kind": "arg",
            "index": 4,
            "type": "nullable:json"
          },
          "expressionVars": {
            "kind": "arg",
            "index": 5,
            "type": "nullable:json"
          }
        },
        "returns": {
          "type": "console.autocomplete",
          "field": null
        }
      },
      "clearMessagesCacheAsync": {
        "args": {}
      }
    },
    "events": {
      "evaluationResult": "evaluationResult",
      "fileActivity": "fileActivity",
      "pageError": "pageError",
      "logMessage": "logMessage",
      "consoleAPICall": "consoleAPICall",
      "reflowActivity": "reflowActivity",
      "serverNetworkEvent": "networkEvent",
      "inspectObject": "inspectObject",
      "documentEvent": "documentEvent"
    },
    "eventArgs": {
      "evaluationResult": {
        "resultID": {
          "kind": "option",
          "index": 0,
          "type": "string"
        },
        "awaitResult": {
          "kind": "option",
          "index": 0,
          "type": "nullable:boolean"
        },
        "errorMessageName": {
          "kind": "option",
          "index": 0,
          "type": "nullable:string"
        },
        "exception": {
          "kind": "option",
          "index": 0,
          "type": "nullable:json"
        },
        "exceptionMessage": {
          "kind": "option",
          "index": 0,
          "type": "nullable:string"
        },
        "exceptionDocURL": {
          "kind": "option",
          "index": 0,
          "type": "nullable:string"
        },
        "exceptionStack": {
          "kind": "option",
          "index": 0,
          "type": "nullable:json"
        },
        "hasException": {
          "kind": "option",
          "index": 0,
          "type": "nullable:boolean"
        },
        "frame": {
          "kind": "option",
          "index": 0,
          "type": "nullable:json"
        },
        "helperResult": {
          "kind": "option",
          "index": 0,
          "type": "nullable:json"
        },
        "input": {
          "kind": "option",
          "index": 0,
          "type": "nullable:string"
        },
        "notes": {
          "kind": "option",
          "index": 0,
          "type": "nullable:string"
        },
        "result": {
          "kind": "option",
          "index": 0,
          "type": "nullable:json"
        },
        "startTime": {
          "kind": "option",
          "index": 0,
          "type": "number"
        },
        "timestamp": {
          "kind": "option",
          "index": 0,
          "type": "number"
        },
        "topLevelAwaitRejected": {
          "kind": "option",
          "index": 0,
          "type": "nullable:boolean"
        }
      },
      "fileActivity": {
        "uri": {
          "kind": "option",
          "index": 0,
          "type": "string"
        }
      },
      "pageError": {
        "pageError": {
          "kind": "option",
          "index": 0,
          "type": "json"
        }
      },
      "logMessage": {
        "message": {
          "kind": "option",
          "index": 0,
          "type": "json"
        },
        "timeStamp": {
          "kind": "option",
          "index": 0,
          "type": "string"
        }
      },
      "consoleAPICall": {
        "message": {
          "kind": "option",
          "index": 0,
          "type": "json"
        },
        "clonedFromContentProcess": {
          "kind": "option",
          "index": 0,
          "type": "nullable:boolean"
        }
      },
      "reflowActivity": {
        "interruptible": {
          "kind": "option",
          "index": 0,
          "type": "boolean"
        },
        "start": {
          "kind": "option",
          "index": 0,
          "type": "number"
        },
        "end": {
          "kind": "option",
          "index": 0,
          "type": "number"
        },
        "sourceURL": {
          "kind": "option",
          "index": 0,
          "type": "nullable:string"
        },
        "sourceLine": {
          "kind": "option",
          "index": 0,
          "type": "nullable:number"
        },
        "functionName": {
          "kind": "option",
          "index": 0,
          "type": "nullable:string"
        }
      },
      "serverNetworkEvent": {
        "eventActor": {
          "kind": "option",
          "index": 0,
          "type": "json"
        }
      },
      "inspectObject": {
        "objectActor": {
          "kind": "option",
          "index": 0,
          "type": "json"
        }
      },
      "documentEvent": {
        "name": {
          "kind": "option",
          "index": 0,
          "type": "string"
        },
        "time": {
          "kind": "option",
          "index": 0,
          "type": "string"
        },
        "hasNativeConsoleAPI": {
          "kind": "option",
          "index": 0,
          "type": "boolean"
        }
      }
    },
    "source": "webconsole.js"
  },
  "pushSubscription": {
    "typeName": "pushSubscription",
    "methods": {},
    "events": {},
    "eventArgs": {},
    "source": "worker/push-subscription.js"
  },
  "serviceWorkerRegistration": {
    "typeName": "serviceWorkerRegistration",
    "methods": {
      "allowShutdown": {
        "args": {}
      },
      "preventShutdown": {
        "args": {}
      },
      "push": {
        "args": {}
      },
      "start": {
        "args": {}
      },
      "unregister": {
        "args": {}
      },
      "getPushSubscription": {
        "args": {},
        "returns": {
          "type": "nullable:pushSubscription",
          "field": "subscription"
        }
      }
    },
    "events": {
      "push-subscription-modified": "push-subscription-modified",
      "registration-changed": "registration-changed"
    },
    "eventArgs": {
      "push-subscription-modified": {},
      "registration-changed": {}
    },
    "source": "worker/service-worker-registration.js"
  },
  "serviceWorker": {
    "typeName": "serviceWorker",
    "methods": {},
    "events": {},
    "eventArgs": {},
    "source": "worker/service-worker.js"
  }
};
export const bundledDictTypes: Record<string, Record<string, string>> = {
  "accessibleWithChildren": {
    "accessible": "accessible",
    "children": "array:accessible"
  },
  "auditEventData": {
    "type": "string",
    "ancestries": "nullable:array:array:accessibleWithChildren",
    "progress": "nullable:json"
  },
  "accessibleRelation": {
    "type": "string",
    "targets": "array:accessible"
  },
  "webExtensionCallerInfo": {
    "url": "string",
    "lineNumber": "nullable:number",
    "addonId": "string"
  },
  "webExtensionEvalOptions": {
    "frameURL": "nullable:string",
    "contextSecurityOrigin": "nullable:string",
    "useContentScriptContext": "nullable:boolean",
    "evalResultAsGrip": "nullable:boolean",
    "toolboxSelectedNodeActorID": "nullable:string",
    "toolboxConsoleActorID": "nullable:string"
  },
  "webExtensionEvalExceptionInfo": {
    "isError": "nullable:boolean",
    "code": "nullable:string",
    "description": "nullable:string",
    "details": "nullable:array:json",
    "isException": "nullable:string",
    "value": "nullable:string"
  },
  "webExtensionEvalResult": {
    "value": "nullable:json",
    "valueGrip": "nullable:json",
    "exceptionInfo": "nullable:webExtensionEvalExceptionInfo"
  },
  "webExtensionReloadOptions": {
    "ignoreCache": "nullable:boolean",
    "userAgent": "nullable:string",
    "injectedScript": "nullable:string"
  },
  "animationMutationChange": {
    "type": "string",
    "player": "animationplayer"
  },
  "blackboxing.position": {
    "line": "number",
    "column": "number"
  },
  "blackboxing.range": {
    "start": "blackboxing.position",
    "end": "blackboxing.position"
  },
  "breakpoint-list.breakpoint-options": {
    "condition": "nullable:string",
    "logValue": "nullable:string"
  },
  "browsertype": {
    "id": "string",
    "name": "string",
    "version": "string",
    "status": "string"
  },
  "compatibilityissues": {
    "type": "string",
    "property": "string",
    "aliases": "nullable:array:string",
    "url": "nullable:string",
    "specUrl": "nullable:string",
    "deprecated": "boolean",
    "experimental": "boolean",
    "unsupportedBrowsers": "array:browsertype"
  },
  "declaration": {
    "name": "string",
    "value": "string"
  },
  "AllocationsRecordingOptions": {
    "probability": "number",
    "maxLogLength": "number"
  },
  "netevent.headers-cookies": {
    "name": "string",
    "value": "longstring"
  },
  "netevent.headers": {
    "headers": "array:netevent.headers-cookies",
    "headersSize": "number",
    "rawHeaders": "nullable:longstring"
  },
  "netevent.cookies": {
    "cookies": "array:netevent.headers-cookies"
  },
  "netevent.postdata.text": {
    "text": "longstring"
  },
  "netevent.postdata": {
    "postData": "netevent.postdata.text",
    "postDataDiscarded": "boolean"
  },
  "netevent.cache": {
    "content": "json"
  },
  "netevent.content.content": {
    "text": "longstring"
  },
  "netevent.content": {
    "content": "netevent.content.content",
    "contentDiscarded": "boolean"
  },
  "netevent.timings.data": {
    "blocked": "number",
    "dns": "number",
    "ssl": "number",
    "connect": "number",
    "send": "number",
    "wait": "number",
    "receive": "number"
  },
  "netevent.timings": {
    "timings": "netevent.timings.data",
    "totalTime": "number",
    "offsets": "netevent.timings.data",
    "serverTimings": "array:netevent.timings.serverTiming"
  },
  "netevent.timings.serverTiming": {
    "name": "string",
    "description": "string",
    "duration": "number"
  },
  "netevent.cert": {
    "subject": "json",
    "issuer": "json",
    "validity": "json",
    "fingerprint": "json"
  },
  "netevent.secinfo": {
    "state": "string",
    "weaknessReasons": "array:string",
    "cipherSuite": "string",
    "keaGroupName": "string",
    "signatureSchemeName": "string",
    "protocolVersion": "string",
    "cert": "nullable:netevent.cert",
    "certificateTransparency": "number",
    "hsts": "boolean",
    "hpkp": "boolean",
    "errorMessage": "nullable:string",
    "usedEch": "boolean",
    "usedDelegatedCredentials": "boolean",
    "usedOcsp": "boolean",
    "usedPrivateDns": "boolean"
  },
  "imageData": {
    "data": "nullable:longstring",
    "size": "json"
  },
  "windowDimensions": {
    "innerWidth": "nullable:number",
    "innerHeight": "nullable:number"
  },
  "disconnectedNode": {
    "node": "domnode",
    "newParents": "array:domnode"
  },
  "disconnectedNodeArray": {
    "nodes": "array:domnode",
    "newParents": "array:domnode"
  },
  "object.descriptor": {
    "configurable": "boolean",
    "enumerable": "boolean",
    "value": "nullable:json",
    "writable": "nullable:boolean",
    "get": "nullable:json",
    "set": "nullable:json"
  },
  "object.completion": {
    "return": "nullable:json",
    "throw": "nullable:json"
  },
  "object.prototypeproperties": {
    "prototype": "object.descriptor",
    "ownProperties": "nullable:json",
    "ownSymbols": "nullable:array:object.descriptor",
    "safeGetterValues": "nullable:json"
  },
  "object.prototype": {
    "prototype": "object.descriptor"
  },
  "object.global": {
    "global": "object.descriptor"
  },
  "object.property": {
    "descriptor": "nullable:object.descriptor"
  },
  "object.propertyValue": {
    "value": "nullable:object.completion"
  },
  "object.apply": {
    "value": "nullable:object.completion"
  },
  "object.bindings": {
    "arguments": "array:json",
    "variables": "json"
  },
  "object.enumProperties.Options": {
    "enumEntries": "nullable:boolean",
    "ignoreNonIndexedProperties": "nullable:boolean",
    "ignoreIndexedProperties": "nullable:boolean",
    "query": "nullable:string",
    "sort": "nullable:boolean"
  },
  "object.dependentPromises": {
    "promises": "array:object.descriptor"
  },
  "object.originalSourceLocation": {
    "source": "source",
    "line": "number",
    "column": "number",
    "functionDisplayName": "string"
  },
  "object.promiseState": {
    "state": "string",
    "value": "nullable:object.descriptor",
    "reason": "nullable:object.descriptor",
    "creationTimestamp": "number",
    "timeToSettle": "nullable:number"
  },
  "object.proxySlots": {
    "proxyTarget": "object.descriptor",
    "proxyHandler": "object.descriptor"
  },
  "object.customFormatterBody": {
    "customFormatterBody": "json"
  },
  "matchedselectorresponse": {
    "rules": "array:domstylerule",
    "matched": "array:matchedselector"
  },
  "privatepropertiesiterator.data": {
    "privateProperties": "array:privatepropertiesiterator.privateProperties"
  },
  "privatepropertiesiterator.privateProperties": {
    "name": "string",
    "descriptor": "nullable:object.descriptor"
  },
  "propertyiterator.data": {
    "ownProperties": "nullable:json"
  },
  "root.listWorkers": {
    "workers": "array:workerDescriptor"
  },
  "root.listServiceWorkerRegistrations": {
    "registrations": "array:serviceWorkerRegistration"
  },
  "screenshot-content.args": {
    "fullpage": "nullable:boolean",
    "selector": "nullable:string",
    "nodeActorID": "nullable:number"
  },
  "screenshot.args": {
    "fullpage": "nullable:boolean",
    "file": "nullable:boolean",
    "clipboard": "nullable:boolean",
    "selector": "nullable:string",
    "dpr": "nullable:string",
    "delay": "nullable:string"
  },
  "sourceposition": {
    "line": "number",
    "column": "number"
  },
  "nullablesourceposition": {
    "line": "nullable:number",
    "column": "nullable:number"
  },
  "breakpointquery": {
    "start": "nullable:nullablesourceposition",
    "end": "nullable:nullablesourceposition"
  },
  "source.onsource": {
    "contentType": "nullable:string",
    "source": "nullable:sourcedata"
  },
  "cookieobject": {
    "uniqueKey": "string",
    "name": "string",
    "value": "longstring",
    "path": "nullable:string",
    "host": "string",
    "hostOnly": "boolean",
    "isSecure": "boolean",
    "isHttpOnly": "boolean",
    "creationTime": "number",
    "updateTime": "number",
    "lastAccessed": "number",
    "expires": "number"
  },
  "cookiestoreobject": {
    "total": "number",
    "offset": "number",
    "data": "array:nullable:cookieobject"
  },
  "cookieoperationresult": {
    "errorString": "nullable:string"
  },
  "storageobject": {
    "name": "string",
    "value": "longstring"
  },
  "storagestoreobject": {
    "total": "number",
    "offset": "number",
    "data": "array:nullable:storageobject"
  },
  "extensionobject": {
    "uniqueKey": "string",
    "name": "nullable:string",
    "value": "nullable:longstring",
    "area": "string",
    "isValueEditable": "boolean"
  },
  "extensionstoreobject": {
    "total": "number",
    "offset": "number",
    "data": "array:nullable:extensionobject"
  },
  "cacheobject": {
    "url": "string",
    "status": "string"
  },
  "cachestoreobject": {
    "total": "number",
    "offset": "number",
    "data": "array:nullable:cacheobject"
  },
  "idbobject": {
    "uniqueKey": "string",
    "name": "nullable:string",
    "db": "nullable:string",
    "objectStore": "nullable:string",
    "origin": "nullable:string",
    "version": "nullable:number",
    "storage": "nullable:string",
    "objectStores": "nullable:number",
    "keyPath": "nullable:string",
    "autoIncrement": "nullable:boolean",
    "indexes": "nullable:string",
    "value": "nullable:longstring"
  },
  "idbstoreobject": {
    "total": "number",
    "offset": "number",
    "data": "array:nullable:idbobject"
  },
  "idbdeleteresult": {
    "blocked": "nullable:boolean",
    "error": "nullable:string"
  },
  "storeUpdateObject": {
    "changed": "nullable:json",
    "deleted": "nullable:json",
    "added": "nullable:json"
  },
  "appliedstyle": {
    "rule": "domstylerule",
    "pseudoElement": "nullable:string",
    "isSystem": "nullable:boolean",
    "inherited": "nullable:domnode#actorid",
    "darkColorScheme": "nullable:boolean",
    "matchedSelectorIndexes": "nullable:array:number",
    "keyframes": "nullable:domstylerule",
    "siblingCount": "nullable:number",
    "siblingIndex": "nullable:number"
  },
  "matchedselector": {
    "rule": "domstylerule#actorid",
    "selector": "string",
    "value": "string",
    "status": "number"
  },
  "appliedStylesReturn": {
    "entries": "array:appliedstyle"
  },
  "modifiedStylesReturn": {},
  "fontpreview": {
    "data": "nullable:longstring",
    "size": "json"
  },
  "fontvariationaxis": {
    "tag": "string",
    "name": "string",
    "minValue": "number",
    "maxValue": "number",
    "defaultValue": "number"
  },
  "fontvariationinstancevalue": {
    "axis": "string",
    "value": "number"
  },
  "fontvariationinstance": {
    "name": "string",
    "values": "array:fontvariationinstancevalue"
  },
  "fontface": {
    "name": "string",
    "CSSFamilyName": "string",
    "rule": "nullable:domstylerule",
    "srcIndex": "number",
    "URI": "string",
    "format": "string",
    "preview": "nullable:fontpreview",
    "localName": "string",
    "metadata": "string",
    "variationAxes": "array:fontvariationaxis",
    "variationInstances": "array:fontvariationinstance"
  },
  "domstylerule.queryContainerForNodeReturn": {
    "node": "nullable:domnode",
    "containerType": "nullable:string",
    "containerName": "nullable:string",
    "queryFeatures": "nullable:array:json"
  },
  "symboliterator.data": {
    "ownSymbols": "array:symboliterator.ownsymbols"
  },
  "symboliterator.ownsymbols": {
    "name": "string",
    "descriptor": "nullable:object.descriptor"
  },
  "target-configuration.configuration": {
    "cacheDisabled": "nullable:boolean",
    "colorSchemeSimulation": "nullable:string",
    "customFormatters": "nullable:boolean",
    "customUserAgent": "nullable:string",
    "javascriptEnabled": "nullable:boolean",
    "overrideDPPX": "nullable:number",
    "printSimulationEnabled": "nullable:boolean",
    "rdmPaneOrientation": "nullable:json",
    "reducedMotionEmulation": "nullable:string",
    "reloadOnTouchSimulationToggle": "nullable:boolean",
    "restoreFocus": "nullable:boolean",
    "serviceWorkersTestingEnabled": "nullable:boolean",
    "setTabOffline": "nullable:boolean",
    "touchEventsOverride": "nullable:string",
    "isTracerFeatureEnabled": "nullable:boolean"
  },
  "contentProcessTarget.workers": {
    "error": "nullable:string",
    "workers": "nullable:array:workerDescriptor"
  },
  "windowGlobalTarget.switchtoframe": {
    "message": "string"
  },
  "windowGlobalTarget.listframes": {
    "frames": "array:windowGlobalTarget.window"
  },
  "windowGlobalTarget.window": {
    "id": "string",
    "parentID": "nullable:string",
    "url": "nullable:string",
    "title": "nullable:string",
    "destroy": "nullable:boolean"
  },
  "windowGlobalTarget.workers": {
    "workers": "array:workerDescriptor"
  },
  "windowGlobalTarget.reload": {
    "force": "boolean"
  },
  "windowGlobalTarget.reconfigure": {
    "cacheDisabled": "nullable:boolean",
    "colorSchemeSimulation": "nullable:string",
    "printSimulationEnabled": "nullable:boolean",
    "restoreFocus": "nullable:boolean",
    "serviceWorkersTestingEnabled": "nullable:boolean"
  },
  "windowGlobalTarget.getSourceContentForResource": {
    "contentType": "nullable:string",
    "source": "nullable:windowGlobalTarget.sourcedata"
  },
  "thread-configuration.configuration": {
    "pauseOnExceptions": "nullable:boolean",
    "ignoreCaughtExceptions": "nullable:boolean"
  },
  "available-breakpoint-group": {
    "name": "string",
    "events": "array:available-breakpoint-event"
  },
  "available-breakpoint-event": {
    "id": "string",
    "name": "string"
  },
  "thread.frames": {
    "frames": "array:frame"
  },
  "thread.breakpoint-options": {
    "condition": "nullable:string",
    "logValue": "nullable:string",
    "showStacktrace": "nullable:boolean"
  },
  "paused-reason": {
    "type": "string",
    "message": "nullable:string",
    "frameFinished": "nullable:json",
    "exception": "nullable:json",
    "onNext": "nullable:boolean",
    "breakpoint": "nullable:json",
    "mutationType": "nullable:string"
  },
  "tracer.start.options": {
    "logMethod": "string",
    "traceValues": "boolean",
    "traceOnNextInteraction": "boolean",
    "traceOnNextLoad": "boolean",
    "traceDOMMutations": "nullable:array:string"
  },
  "dommutation": {},
  "searchresult": {
    "list": "domnodelist",
    "metadata": "array:json"
  },
  "domtraversalarray": {
    "nodes": "array:domnode"
  },
  "console.startlisteners": {
    "startedListeners": "array:string"
  },
  "console.stoplisteners": {
    "stoppedListeners": "array:string"
  },
  "console.autocomplete": {
    "matches": "array:string",
    "matchProp": "string"
  },
  "console.evaluatejsasync": {
    "resultID": "string"
  },
  "console.cachedmessages": {
    "error": "nullable:string",
    "message": "longstring",
    "_type": "nullable:string",
    "timeStamp": "nullable:string"
  }
};
export interface GeneratedActorAPI {
  /** Firefox actor `accessible`; source: accessibility.js */
  "accessible": {
    "audit": (a0: unknown | null) => Promise<unknown | null>;
    "children": () => Promise<Array<GeneratedFront<"accessible">>>;
    "getRelations": () => Promise<Array<GeneratedDictionaries["accessibleRelation"]>>;
    "hydrate": () => Promise<unknown>;
    "snapshot": () => Promise<unknown>;
  };
  /** Firefox actor `accessiblewalker`; source: accessibility.js */
  "accessiblewalker": {
    "children": () => Promise<Array<GeneratedFront<"accessible">>>;
    "getAccessibleFor": (a0: ActorFront) => Promise<GeneratedFront<"accessible"> | null>;
    "getAncestry": (a0: ActorFront) => Promise<Array<GeneratedDictionaries["accessibleWithChildren"]>>;
    "startAudit": (a0: unknown | null) => Promise<void>;
    "highlightAccessible": (a0: ActorFront, a1: unknown | null) => Promise<boolean | null>;
    "unhighlight": () => Promise<void>;
    "pick": () => Promise<void>;
    "pickAndFocus": () => Promise<void>;
    "cancelPick": () => Promise<void>;
    "showTabbingOrder": (a0: ActorFront, a1: number) => Promise<unknown>;
  };
  /** Firefox actor `simulator`; source: accessibility.js */
  "simulator": {
    "simulate": (a0: unknown | null) => Promise<boolean>;
  };
  /** Firefox actor `accessibility`; source: accessibility.js */
  "accessibility": {
    "getTraits": () => Promise<unknown>;
    "bootstrap": () => Promise<unknown>;
    "getWalker": () => Promise<GeneratedFront<"accessiblewalker">>;
    "getSimulator": () => Promise<GeneratedFront<"simulator"> | null>;
  };
  /** Firefox actor `parentaccessibility`; source: accessibility.js */
  "parentaccessibility": {
    "bootstrap": () => Promise<unknown>;
    "enable": () => Promise<void>;
    "disable": () => Promise<void>;
  };
  /** Firefox actor `addons`; source: addon/addons.js */
  "addons": {
    "installTemporaryAddon": (a0: string, a1: boolean | null) => Promise<unknown>;
    "uninstallAddon": (a0: string) => Promise<void>;
  };
  /** Firefox actor `webExtensionInspectedWindow`; source: addon/webextension-inspected-window.js */
  "webExtensionInspectedWindow": {
    "reload": (a0: GeneratedDictionaries["webExtensionCallerInfo"], a1: GeneratedDictionaries["webExtensionReloadOptions"]) => Promise<void>;
    "eval": (a0: GeneratedDictionaries["webExtensionCallerInfo"], a1: string, a2: GeneratedDictionaries["webExtensionEvalOptions"]) => Promise<GeneratedDictionaries["webExtensionEvalResult"]>;
  };
  /** Firefox actor `animationplayer`; source: animation.js */
  "animationplayer": {
    "release": () => Promise<void>;
    "getCurrentState": () => Promise<unknown>;
    "getAnimationTypes": (a0: Array<string>) => Promise<unknown>;
  };
  /** Firefox actor `animations`; source: animation.js */
  "animations": {
    "setWalkerActor": (a0: ActorFront) => Promise<void>;
    "getAnimationPlayersForNode": (a0: ActorFront) => Promise<Array<GeneratedFront<"animationplayer">>>;
    "pauseSome": (a0: Array<ActorFront>) => Promise<void>;
    "playSome": (a0: Array<ActorFront>) => Promise<void>;
    "setCurrentTimes": (a0: Array<ActorFront>, a1: number, a2: boolean) => Promise<void>;
  };
  /** Firefox actor `arraybuffer`; source: array-buffer.js */
  "arraybuffer": {
    "slice": (a0: unknown, a1: unknown) => Promise<unknown>;
    "release": () => Promise<void>;
  };
  /** Firefox actor `blackboxing`; source: blackboxing.js */
  "blackboxing": {
    "blackbox": (a0: string, a1: Array<GeneratedDictionaries["blackboxing.range"]>) => Promise<void>;
    "unblackbox": (a0: string, a1: Array<GeneratedDictionaries["blackboxing.range"]>) => Promise<void>;
  };
  /** Firefox actor `breakpoint-list`; source: breakpoint-list.js */
  "breakpoint-list": {
    "setBreakpoint": (a0: unknown, a1: GeneratedDictionaries["breakpoint-list.breakpoint-options"]) => Promise<void>;
    "removeBreakpoint": (a0: unknown) => Promise<void>;
    "setXHRBreakpoint": (a0: string, a1: string) => Promise<void>;
    "removeXHRBreakpoint": (a0: string, a1: string) => Promise<void>;
    "setActiveEventBreakpoints": (a0: Array<string>) => Promise<void>;
  };
  /** Firefox actor `compatibility`; source: compatibility.js */
  "compatibility": {
    "getTraits": () => Promise<unknown>;
    "getCSSDeclarationBlockIssues": (a0: Array<Array<GeneratedDictionaries["declaration"]>>, a1: Array<GeneratedDictionaries["browsertype"]>) => Promise<Array<Array<GeneratedDictionaries["compatibilityissues"]>>>;
    "getNodeCssIssues": (a0: ActorFront, a1: Array<GeneratedDictionaries["browsertype"]>) => Promise<Array<GeneratedDictionaries["compatibilityissues"]>>;
  };
  /** Firefox actor `cssProperties`; source: css-properties.js */
  "cssProperties": {
    "getCSSDatabase": () => Promise<unknown>;
  };
  /** Firefox actor `processDescriptor`; source: descriptors/process.js */
  "processDescriptor": {
    "getTarget": () => Promise<unknown>;
    "getWatcher": (a0?: { "enableWindowGlobalThreadActors"?: boolean }) => Promise<GeneratedFront<"watcher">>;
    "reloadDescriptor": (a0?: { "bypassCache"?: boolean }) => Promise<void>;
  };
  /** Firefox actor `tabDescriptor`; source: descriptors/tab.js */
  "tabDescriptor": {
    "getTarget": () => Promise<unknown>;
    "getFavicon": () => Promise<string>;
    "getWatcher": (a0?: { "isServerTargetSwitchingEnabled"?: boolean; "isPopupDebuggingEnabled"?: boolean }) => Promise<GeneratedFront<"watcher">>;
    "navigateTo": (a0: string, a1: boolean) => Promise<void>;
    "goBack": () => Promise<void>;
    "goForward": () => Promise<void>;
    "reloadDescriptor": (a0?: { "bypassCache"?: boolean }) => Promise<void>;
  };
  /** Firefox actor `webExtensionDescriptor`; source: descriptors/webextension.js */
  "webExtensionDescriptor": {
    "reload": () => Promise<unknown>;
    "terminateBackgroundScript": () => Promise<void>;
    "reloadDescriptor": (a0?: { "bypassCache"?: boolean }) => Promise<void>;
    "getWatcher": (a0?: { "isServerTargetSwitchingEnabled"?: boolean }) => Promise<GeneratedFront<"watcher">>;
  };
  /** Firefox actor `workerDescriptor`; source: descriptors/worker.js */
  "workerDescriptor": {
    "detach": () => Promise<void>;
    "getTarget": () => Promise<unknown>;
  };
  /** Firefox actor `device`; source: device.js */
  "device": {
    "getDescription": () => Promise<unknown>;
  };
  /** Firefox actor `environment`; source: environment.js */
  "environment": {
  };
  /** Firefox actor `frame`; source: frame.js */
  "frame": {
    "getEnvironment": () => Promise<unknown>;
  };
  /** Firefox actor `heapSnapshotFile`; source: heap-snapshot-file.js */
  "heapSnapshotFile": {
    "transferHeapSnapshot": (a0: string) => Promise<void>;
  };
  /** Firefox actor `customhighlighter`; source: highlighters.js */
  "customhighlighter": {
    "show": (a0: ActorFront | null, a1: unknown | null) => Promise<boolean | null>;
    "hide": () => Promise<void>;
    "finalize": () => Promise<void>;
  };
  /** Firefox actor `inspector`; source: inspector.js */
  "inspector": {
    "getWalker": (a0: unknown | null) => Promise<GeneratedFront<"domwalker">>;
    "getPageStyle": () => Promise<GeneratedFront<"pagestyle">>;
    "getCompatibility": () => Promise<GeneratedFront<"compatibility">>;
    "getHighlighterByType": (a0: unknown, a1: unknown) => Promise<GeneratedFront<"customhighlighter"> | null>;
    "getImageDataFromURL": (a0: unknown, a1: number | null) => Promise<GeneratedDictionaries["imageData"]>;
    "resolveRelativeURL": (a0: string, a1: ActorFront | null) => Promise<string>;
    "pickColorFromPage": (a0: unknown | null) => Promise<void>;
    "cancelPickColorFromPage": () => Promise<void>;
    "supportsHighlighters": () => Promise<boolean>;
  };
  /** Firefox actor `flexbox`; source: layout.js */
  "flexbox": {
    "getFlexItems": () => Promise<Array<GeneratedFront<"flexitem">>>;
  };
  /** Firefox actor `flexitem`; source: layout.js */
  "flexitem": {
  };
  /** Firefox actor `grid`; source: layout.js */
  "grid": {
    "getFragments": () => Promise<unknown>;
  };
  /** Firefox actor `layout`; source: layout.js */
  "layout": {
    "getCurrentFlexbox": (a0: ActorFront, a1: boolean | null) => Promise<GeneratedFront<"flexbox"> | null>;
    "getCurrentGrid": (a0: ActorFront) => Promise<GeneratedFront<"grid"> | null>;
    "getGrids": (a0: ActorFront) => Promise<Array<GeneratedFront<"grid">>>;
  };
  /** Firefox actor `manifest`; source: manifest.js */
  "manifest": {
    "fetchCanonicalManifest": () => Promise<unknown>;
  };
  /** Firefox actor `memory`; source: memory.js */
  "memory": {
    "attach": () => Promise<string>;
    "detach": () => Promise<string>;
    "getState": () => Promise<unknown>;
    "takeCensus": () => Promise<unknown>;
    "startRecordingAllocations": (a0: GeneratedDictionaries["AllocationsRecordingOptions"] | null) => Promise<unknown>;
    "stopRecordingAllocations": () => Promise<unknown>;
    "getAllocationsSettings": () => Promise<unknown>;
    "getAllocations": () => Promise<unknown>;
    "forceGarbageCollection": () => Promise<void>;
    "forceCycleCollection": () => Promise<void>;
    "measure": () => Promise<unknown>;
    "residentUnique": () => Promise<number>;
    "saveHeapSnapshot": (a0: unknown | null) => Promise<string>;
  };
  /** Firefox actor `networkContent`; source: network-content.js */
  "networkContent": {
    "sendHTTPRequest": (a0: unknown) => Promise<number>;
    "getStackTrace": (a0: unknown) => Promise<unknown>;
  };
  /** Firefox actor `netEvent`; source: network-event.js */
  "netEvent": {
    "release": () => Promise<void>;
    "getRequestHeaders": () => Promise<unknown>;
    "getRequestCookies": () => Promise<unknown>;
    "getRequestPostData": () => Promise<unknown>;
    "getEarlyHintsResponseHeaders": () => Promise<unknown>;
    "getResponseHeaders": () => Promise<unknown>;
    "getResponseCookies": () => Promise<unknown>;
    "getResponseCache": () => Promise<unknown>;
    "getResponseContent": () => Promise<unknown>;
    "getEventTimings": () => Promise<unknown>;
    "getSecurityInfo": () => Promise<unknown>;
    "getStackTrace": () => Promise<unknown>;
  };
  /** Firefox actor `networkParent`; source: network-parent.js */
  "networkParent": {
    "setPersist": (a0: boolean) => Promise<void>;
    "setNetworkThrottling": (a0: unknown) => Promise<void>;
    "getNetworkThrottling": () => Promise<unknown>;
    "clearNetworkThrottling": () => Promise<void>;
    "setSaveRequestAndResponseBodies": (a0: boolean) => Promise<void>;
    "setBlockedUrls": (a0: Array<string>) => Promise<void>;
    "getBlockedUrls": () => Promise<Array<string>>;
    "blockRequest": (a0: unknown) => Promise<void>;
    "unblockRequest": (a0: unknown) => Promise<void>;
    "override": (a0: string, a1: string) => Promise<void>;
    "removeOverride": (a0: string) => Promise<void>;
    "setLocalModeMappings": (a0: unknown) => Promise<void>;
  };
  /** Firefox actor `domnodelist`; source: node.js */
  "domnodelist": {
    "item": (a0: unknown) => Promise<GeneratedDictionaries["disconnectedNode"]>;
    "items": (a0: number | null, a1: number | null) => Promise<GeneratedDictionaries["disconnectedNodeArray"]>;
    "release": () => Promise<void>;
  };
  /** Firefox actor `domnode`; source: node.js */
  "domnode": {
    "getNodeValue": () => Promise<string | LongStringFront>;
    "setNodeValue": (a0: unknown) => Promise<void>;
    "getUniqueSelector": () => Promise<string>;
    "getCssPath": () => Promise<string>;
    "getXPath": () => Promise<string>;
    "scrollIntoView": () => Promise<void>;
    "getImageData": (a0: number | null) => Promise<GeneratedDictionaries["imageData"]>;
    "getEventListenerInfo": () => Promise<unknown>;
    "enableEventListener": (a0: unknown) => Promise<void>;
    "disableEventListener": (a0: unknown) => Promise<void>;
    "modifyAttributes": (a0: Array<unknown>) => Promise<void>;
    "getFontFamilyDataURL": (a0: string, a1: string | null) => Promise<GeneratedDictionaries["imageData"]>;
    "getClosestBackgroundColor": () => Promise<string>;
    "getBackgroundColor": () => Promise<unknown>;
    "getOwnerGlobalDimensions": () => Promise<GeneratedDictionaries["windowDimensions"]>;
    "waitForFrameLoad": () => Promise<void>;
  };
  /** Firefox actor `obj`; source: object.js */
  "obj": {
    "allocationStack": () => Promise<Array<GeneratedDictionaries["object.originalSourceLocation"]>>;
    "dependentPromises": () => Promise<GeneratedDictionaries["object.dependentPromises"]>;
    "enumEntries": () => Promise<GeneratedFront<"propertyIterator">>;
    "enumProperties": (a0: GeneratedDictionaries["object.enumProperties.Options"] | null) => Promise<GeneratedFront<"propertyIterator">>;
    "enumPrivateProperties": () => Promise<GeneratedFront<"privatePropertiesIterator">>;
    "enumSymbols": () => Promise<GeneratedFront<"symbolIterator">>;
    "fulfillmentStack": () => Promise<Array<GeneratedDictionaries["object.originalSourceLocation"]>>;
    "prototypeAndProperties": () => Promise<GeneratedDictionaries["object.prototypeproperties"]>;
    "prototype": () => Promise<GeneratedDictionaries["object.prototype"]>;
    "property": (a0: string) => Promise<GeneratedDictionaries["object.property"]>;
    "propertyValue": (a0: string, a1: string | null) => Promise<GeneratedDictionaries["object.propertyValue"]>;
    "apply": (a0: unknown | null, a1: Array<unknown> | null) => Promise<GeneratedDictionaries["object.apply"]>;
    "rejectionStack": () => Promise<Array<GeneratedDictionaries["object.originalSourceLocation"]>>;
    "promiseState": () => Promise<GeneratedDictionaries["object.promiseState"]>;
    "proxySlots": () => Promise<GeneratedDictionaries["object.proxySlots"]>;
    "global": () => Promise<GeneratedDictionaries["object.global"]>;
    "customFormatterBody": () => Promise<GeneratedDictionaries["object.customFormatterBody"]>;
    "addWatchpoint": (a0: string, a1: string, a2: string) => Promise<void>;
    "removeWatchpoint": (a0: string) => Promise<void>;
    "removeWatchpoints": () => Promise<void>;
    "release": () => Promise<void>;
    "threadGrip": () => Promise<void>;
  };
  /** Firefox actor `objects-manager`; source: objects-manager.js */
  "objects-manager": {
    "releaseObjects": (a0: Array<string>) => Promise<void>;
  };
  /** Firefox actor `pagestyle`; source: page-style.js */
  "pagestyle": {
    "getComputed": (a0: ActorFront, a1?: { "markMatched"?: boolean; "onlyMatched"?: boolean; "clearCache"?: boolean; "filter"?: string; "filterProperties"?: Array<string> | null }) => Promise<unknown>;
    "getAllUsedFontFaces": (a0?: { "includePreviews"?: boolean; "previewText"?: string; "previewFontSize"?: string; "previewFillStyle"?: string }, a1?: { "includeVariations"?: boolean }) => Promise<Array<GeneratedDictionaries["fontface"]>>;
    "getUsedFontFaces": (a0: ActorFront, a1?: { "includePreviews"?: boolean; "includeVariations"?: boolean; "previewText"?: string; "previewFontSize"?: string; "previewFillStyle"?: string }) => Promise<Array<GeneratedDictionaries["fontface"]>>;
    "getMatchedSelectors": (a0: ActorFront, a1: string, a2?: { "filter"?: string }) => Promise<void>;
    "getRule": (a0: string) => Promise<GeneratedFront<"domstylerule"> | null>;
    "getApplied": (a0: ActorFront, a1?: { "inherited"?: boolean; "matchedSelectors"?: boolean; "skipPseudo"?: boolean; "filter"?: string }) => Promise<GeneratedDictionaries["appliedStylesReturn"]>;
    "isPositionEditable": (a0: ActorFront) => Promise<boolean>;
    "getLayout": (a0: ActorFront, a1?: { "autoMargins"?: boolean }) => Promise<unknown>;
    "addNewRule": (a0: ActorFront, a1: Array<string> | null) => Promise<GeneratedDictionaries["appliedStylesReturn"]>;
    "getAttributesInOwnerDocument": (a0: string, a1: string, a2: ActorFront | null) => Promise<Array<string>>;
    "getAnchorNames": (a0: ActorFront) => Promise<Array<string>>;
  };
  /** Firefox actor `perf`; source: perf.js */
  "perf": {
    "startProfiler": (a0?: { "entries"?: number; "duration"?: number | null; "interval"?: number; "features"?: Array<string>; "threads"?: Array<string> }) => Promise<boolean>;
    "startCaptureAndStopProfiler": () => Promise<number>;
    "getPreviouslyCapturedProfileDataBulk": (a0: number) => Promise<void>;
    "getPreviouslyRetrievedAdditionalInformation": (a0: number) => Promise<unknown | null>;
    "stopProfilerAndDiscardProfile": () => Promise<void>;
    "getSymbolTable": (a0: string, a1: string) => Promise<Array<Array<number>>>;
    "isActive": () => Promise<boolean>;
    "isSupportedPlatform": () => Promise<boolean>;
    "getSupportedFeatures": () => Promise<Array<string>>;
  };
  /** Firefox actor `preference`; source: preference.js */
  "preference": {
    "getTraits": () => Promise<unknown>;
    "getBoolPref": (a0: unknown) => Promise<boolean>;
    "getCharPref": (a0: unknown) => Promise<string>;
    "getIntPref": (a0: unknown) => Promise<number>;
    "getAllPrefs": () => Promise<unknown>;
    "setBoolPref": (a0: unknown, a1: unknown) => Promise<void>;
    "setCharPref": (a0: unknown, a1: unknown) => Promise<void>;
    "setIntPref": (a0: unknown, a1: unknown) => Promise<void>;
    "clearUserPref": (a0: unknown) => Promise<void>;
  };
  /** Firefox actor `privatePropertiesIterator`; source: private-properties-iterator.js */
  "privatePropertiesIterator": {
    "slice": (a0?: { "start"?: number; "count"?: number }) => Promise<GeneratedDictionaries["privatepropertiesiterator.data"]>;
    "all": () => Promise<GeneratedDictionaries["privatepropertiesiterator.data"]>;
    "release": () => Promise<void>;
  };
  /** Firefox actor `propertyIterator`; source: property-iterator.js */
  "propertyIterator": {
    "names": (a0?: { "indexes"?: Array<number> }) => Promise<Array<string>>;
    "slice": (a0?: { "start"?: number; "count"?: number }) => Promise<GeneratedDictionaries["propertyiterator.data"]>;
    "all": () => Promise<GeneratedDictionaries["propertyiterator.data"]>;
    "release": () => Promise<void>;
  };
  /** Firefox actor `reflow`; source: reflow.js */
  "reflow": {
    "start": () => Promise<void>;
    "stop": () => Promise<void>;
  };
  /** Firefox actor `responsive`; source: responsive.js */
  "responsive": {
    "toggleTouchSimulator": (a0: unknown) => Promise<boolean>;
    "setElementPickerState": (a0: boolean, a1: string) => Promise<void>;
  };
  /** Firefox actor `root`; source: root.js */
  "root": {
    "connect": (a0?: { "frontendVersion"?: string }) => Promise<void>;
    "getRoot": () => Promise<unknown>;
    "listTabs": () => Promise<Array<GeneratedFront<"tabDescriptor">>>;
    "getTab": (a0?: { "browserId"?: number }) => Promise<GeneratedFront<"tabDescriptor">>;
    "listAddons": (a0?: { "iconDataURL"?: boolean }) => Promise<Array<GeneratedFront<"webExtensionDescriptor">>>;
    "listWorkers": () => Promise<GeneratedDictionaries["root.listWorkers"]>;
    "listServiceWorkerRegistrations": () => Promise<GeneratedDictionaries["root.listServiceWorkerRegistrations"]>;
    "listProcesses": () => Promise<Array<GeneratedFront<"processDescriptor">>>;
    "getProcess": (a0: number) => Promise<GeneratedFront<"processDescriptor">>;
    "watchResources": (a0: Array<string>) => Promise<void>;
    "unwatchResources": (a0: Array<string>) => Promise<void>;
    "clearResources": (a0: Array<string>) => Promise<void>;
    "requestTypes": () => Promise<unknown>;
  };
  /** Firefox actor `screenshot-content`; source: screenshot-content.js */
  "screenshot-content": {
    "prepareCapture": (a0: GeneratedDictionaries["screenshot-content.args"]) => Promise<unknown>;
  };
  /** Firefox actor `screenshot`; source: screenshot.js */
  "screenshot": {
    "capture": (a0: GeneratedDictionaries["screenshot.args"]) => Promise<unknown>;
  };
  /** Firefox actor `source`; source: source.js */
  "source": {
    "getBreakpointPositionsCompressed": (a0: GeneratedDictionaries["breakpointquery"] | null) => Promise<unknown>;
    "getBreakableLines": () => Promise<unknown>;
    "source": () => Promise<GeneratedDictionaries["source.onsource"]>;
    "setPausePoints": (a0: unknown) => Promise<void>;
    "blackbox": (a0: unknown | null) => Promise<boolean>;
    "unblackbox": (a0: unknown | null) => Promise<void>;
  };
  /** Firefox actor `cookies`; source: storage.js */
  "cookies": {
    "getStoreObjects": (a0: unknown, a1: Array<string> | null, a2: unknown | null) => Promise<GeneratedDictionaries["cookiestoreobject"]>;
    "getFields": () => Promise<unknown>;
    "editItem": (a0: unknown) => Promise<GeneratedDictionaries["cookieoperationresult"]>;
    "removeItem": (a0: string, a1: string) => Promise<void>;
    "addItem": (a0: string, a1: string | null) => Promise<GeneratedDictionaries["cookieoperationresult"]>;
    "removeAll": (a0: string, a1: string | null) => Promise<void>;
    "removeAllSessionCookies": (a0: string, a1: string | null) => Promise<void>;
  };
  /** Firefox actor `localStorage`; source: storage.js */
  "localStorage": {
    "getStoreObjects": (a0: unknown, a1: Array<string> | null, a2: unknown | null) => Promise<GeneratedDictionaries["storagestoreobject"]>;
    "getFields": () => Promise<unknown>;
    "editItem": (a0: unknown) => Promise<void>;
    "removeItem": (a0: string, a1: string) => Promise<void>;
    "addItem": (a0: string, a1: string | null) => Promise<void>;
    "removeAll": (a0: string) => Promise<void>;
  };
  /** Firefox actor `sessionStorage`; source: storage.js */
  "sessionStorage": {
    "getStoreObjects": (a0: unknown, a1: Array<string> | null, a2: unknown | null) => Promise<GeneratedDictionaries["storagestoreobject"]>;
    "getFields": () => Promise<unknown>;
    "editItem": (a0: unknown) => Promise<void>;
    "removeItem": (a0: string, a1: string) => Promise<void>;
    "addItem": (a0: string, a1: string | null) => Promise<void>;
    "removeAll": (a0: string) => Promise<void>;
  };
  /** Firefox actor `extensionStorage`; source: storage.js */
  "extensionStorage": {
    "getStoreObjects": (a0: unknown, a1: Array<string> | null, a2: unknown | null) => Promise<GeneratedDictionaries["extensionstoreobject"]>;
    "getFields": () => Promise<unknown>;
    "editItem": (a0: unknown) => Promise<void>;
    "removeItem": (a0: string, a1: string) => Promise<void>;
    "removeAll": (a0: string) => Promise<void>;
  };
  /** Firefox actor `Cache`; source: storage.js */
  "Cache": {
    "getStoreObjects": (a0: unknown, a1: Array<string> | null, a2: unknown | null) => Promise<GeneratedDictionaries["cachestoreobject"]>;
    "getFields": (a0: string | null) => Promise<unknown>;
    "removeAll": (a0: string, a1: string) => Promise<void>;
    "removeItem": (a0: string, a1: string) => Promise<void>;
  };
  /** Firefox actor `indexedDB`; source: storage.js */
  "indexedDB": {
    "getStoreObjects": (a0: unknown, a1: Array<string> | null, a2: unknown | null) => Promise<GeneratedDictionaries["idbstoreobject"]>;
    "getFields": (a0: string | null) => Promise<unknown>;
    "removeDatabase": (a0: string, a1: string) => Promise<GeneratedDictionaries["idbdeleteresult"]>;
    "removeAll": (a0: string, a1: string) => Promise<void>;
    "removeItem": (a0: string, a1: string) => Promise<void>;
  };
  /** Firefox actor `longstractor`; source: string.js */
  "longstractor": {
    "substring": (a0: unknown, a1: unknown) => Promise<void>;
    "release": () => Promise<void>;
  };
  /** Firefox actor `domstylerule`; source: style-rule.js */
  "domstylerule": {
    "getRuleText": () => Promise<string>;
    "setRuleText": (a0: string, a1: Array<unknown>) => Promise<GeneratedFront<"domstylerule">>;
    "modifyProperties": (a0: Array<unknown>) => Promise<GeneratedFront<"domstylerule">>;
    "modifySelector": (a0: ActorFront, a1: string, a2: boolean) => Promise<GeneratedDictionaries["modifiedStylesReturn"]>;
    "getQueryContainerForNode": (a0: number, a1: ActorFront, a2: number) => Promise<GeneratedDictionaries["domstylerule.queryContainerForNodeReturn"]>;
    "getCssExplainersData": (a0: string, a1: string, a2: string | null, a3: ActorFront | null) => Promise<Array<string>>;
  };
  /** Firefox actor `stylesheets`; source: style-sheets.js */
  "stylesheets": {
    "getTraits": () => Promise<unknown>;
    "addStyleSheet": (a0: string, a1: string | null) => Promise<void>;
    "toggleDisabled": (a0: string) => Promise<boolean>;
    "getText": (a0: string) => Promise<string | LongStringFront>;
    "getStyleSheetIndentation": (a0: string) => Promise<string>;
    "update": (a0: string, a1: string, a2: boolean, a3: string | null) => Promise<void>;
  };
  /** Firefox actor `symbolIterator`; source: symbol-iterator.js */
  "symbolIterator": {
    "slice": (a0?: { "start"?: number; "count"?: number }) => Promise<GeneratedDictionaries["symboliterator.data"]>;
    "all": () => Promise<GeneratedDictionaries["symboliterator.data"]>;
    "release": () => Promise<void>;
  };
  /** Firefox actor `symbol`; source: symbol.js */
  "symbol": {
    "release": () => Promise<void>;
  };
  /** Firefox actor `target-configuration`; source: target-configuration.js */
  "target-configuration": {
    "updateConfiguration": (a0: GeneratedDictionaries["target-configuration.configuration"]) => Promise<GeneratedDictionaries["target-configuration.configuration"]>;
    "isJavascriptEnabled": () => Promise<boolean>;
  };
  /** Firefox actor `contentProcessTarget`; source: targets/content-process.js */
  "contentProcessTarget": {
    "listWorkers": () => Promise<GeneratedDictionaries["contentProcessTarget.workers"]>;
    "pauseMatchingServiceWorkers": (a0?: { "origin"?: string }) => Promise<void>;
  };
  /** Firefox actor `contentScriptTarget`; source: targets/content-script.js */
  "contentScriptTarget": {
  };
  /** Firefox actor `parentProcessTarget`; source: targets/parent-process.js */
  "parentProcessTarget": {
    "detach": () => Promise<void>;
    "focus": () => Promise<void>;
    "goForward": () => Promise<void>;
    "goBack": () => Promise<void>;
    "gotoIndex": (a0: number) => Promise<void>;
    "reload": (a0?: { "options"?: GeneratedDictionaries["windowGlobalTarget.reload"] }) => Promise<void>;
    "navigateTo": (a0?: { "url"?: string }) => Promise<void>;
    "reconfigure": (a0?: { "options"?: GeneratedDictionaries["windowGlobalTarget.reconfigure"] }) => Promise<void>;
    "switchToFrame": (a0?: { "windowId"?: string }) => Promise<GeneratedDictionaries["windowGlobalTarget.switchtoframe"]>;
    "listFrames": () => Promise<GeneratedDictionaries["windowGlobalTarget.listframes"]>;
    "listWorkers": () => Promise<GeneratedDictionaries["windowGlobalTarget.workers"]>;
    "logInPage": (a0?: { "text"?: string; "category"?: string; "flags"?: string }) => Promise<void>;
    "getSourceContentForResource": (a0: string, a1: string | null) => Promise<GeneratedDictionaries["windowGlobalTarget.getSourceContentForResource"]>;
  };
  /** Firefox actor `windowGlobalTarget`; source: targets/window-global.js */
  "windowGlobalTarget": {
    "detach": () => Promise<void>;
    "focus": () => Promise<void>;
    "goForward": () => Promise<void>;
    "goBack": () => Promise<void>;
    "gotoIndex": (a0: number) => Promise<void>;
    "reload": (a0?: { "options"?: GeneratedDictionaries["windowGlobalTarget.reload"] }) => Promise<void>;
    "navigateTo": (a0?: { "url"?: string }) => Promise<void>;
    "reconfigure": (a0?: { "options"?: GeneratedDictionaries["windowGlobalTarget.reconfigure"] }) => Promise<void>;
    "switchToFrame": (a0?: { "windowId"?: string }) => Promise<GeneratedDictionaries["windowGlobalTarget.switchtoframe"]>;
    "listFrames": () => Promise<GeneratedDictionaries["windowGlobalTarget.listframes"]>;
    "listWorkers": () => Promise<GeneratedDictionaries["windowGlobalTarget.workers"]>;
    "logInPage": (a0?: { "text"?: string; "category"?: string; "flags"?: string }) => Promise<void>;
    "getSourceContentForResource": (a0: string, a1: string | null) => Promise<GeneratedDictionaries["windowGlobalTarget.getSourceContentForResource"]>;
  };
  /** Firefox actor `workerTarget`; source: targets/worker.js */
  "workerTarget": {
  };
  /** Firefox actor `thread-configuration`; source: thread-configuration.js */
  "thread-configuration": {
    "updateConfiguration": (a0: GeneratedDictionaries["thread-configuration.configuration"]) => Promise<void>;
  };
  /** Firefox actor `thread`; source: thread.js */
  "thread": {
    "attach": (a0: unknown) => Promise<void>;
    "reconfigure": (a0: unknown) => Promise<void>;
    "resume": (a0: unknown | null, a1: string | null) => Promise<unknown | null>;
    "frames": (a0: number, a1: number) => Promise<GeneratedDictionaries["thread.frames"]>;
    "interrupt": (a0: unknown) => Promise<void>;
    "sources": () => Promise<Array<unknown>>;
    "skipBreakpoints": (a0: unknown) => Promise<void>;
    "dumpThread": () => Promise<unknown>;
    "dumpPools": () => Promise<unknown>;
    "setBreakpoint": (a0: unknown, a1: GeneratedDictionaries["thread.breakpoint-options"]) => Promise<void>;
    "removeBreakpoint": (a0: unknown) => Promise<void>;
    "setXHRBreakpoint": (a0: string, a1: string) => Promise<boolean>;
    "removeXHRBreakpoint": (a0: string, a1: string) => Promise<boolean>;
    "getAvailableEventBreakpoints": () => Promise<Array<GeneratedDictionaries["available-breakpoint-group"]>>;
    "getActiveEventBreakpoints": () => Promise<Array<string>>;
    "setActiveEventBreakpoints": (a0: Array<string>) => Promise<void>;
    "pauseOnExceptions": (a0: string, a1: string) => Promise<void>;
    "toggleEventLogging": (a0: string) => Promise<void>;
    "isAttached": () => Promise<boolean>;
  };
  /** Firefox actor `tracer`; source: tracer.js */
  "tracer": {
    "startTracing": (a0: GeneratedDictionaries["tracer.start.options"]) => Promise<void>;
    "stopTracing": () => Promise<void>;
  };
  /** Firefox actor `domwalker`; source: walker.js */
  "domwalker": {
    "release": () => Promise<void>;
    "document": (a0: ActorFront | null) => Promise<GeneratedFront<"domnode">>;
    "documentElement": (a0: ActorFront | null) => Promise<GeneratedFront<"domnode"> | null>;
    "retainNode": (a0: ActorFront) => Promise<void>;
    "unretainNode": (a0: ActorFront) => Promise<void>;
    "releaseNode": (a0: ActorFront, a1?: { "force"?: unknown }) => Promise<void>;
    "children": (a0: ActorFront, a1?: { "maxNodes"?: unknown; "center"?: ActorFront; "start"?: ActorFront }) => Promise<void>;
    "nextSibling": (a0: ActorFront) => Promise<GeneratedFront<"domnode"> | null>;
    "previousSibling": (a0: ActorFront) => Promise<GeneratedFront<"domnode"> | null>;
    "findInspectingNode": () => Promise<GeneratedDictionaries["disconnectedNode"]>;
    "querySelector": (a0: ActorFront, a1: unknown) => Promise<GeneratedDictionaries["disconnectedNode"]>;
    "getIdrefNode": (a0: ActorFront, a1: unknown) => Promise<GeneratedDictionaries["disconnectedNode"]>;
    "querySelectorAll": (a0: ActorFront, a1: unknown) => Promise<GeneratedFront<"domnodelist">>;
    "search": (a0: unknown) => Promise<GeneratedDictionaries["searchresult"]>;
    "getSuggestionsForQuery": (a0: unknown, a1: unknown, a2: unknown) => Promise<Array<Array<string>>>;
    "addPseudoClassLock": (a0: ActorFront, a1: unknown, a2?: { "parents"?: unknown; "enabled"?: boolean }) => Promise<void>;
    "hideNode": (a0: ActorFront) => Promise<void>;
    "unhideNode": (a0: ActorFront) => Promise<void>;
    "removePseudoClassLock": (a0: ActorFront, a1: unknown, a2?: { "parents"?: unknown }) => Promise<void>;
    "clearPseudoClassLocks": (a0: ActorFront | null) => Promise<void>;
    "innerHTML": (a0: ActorFront) => Promise<string | LongStringFront>;
    "setInnerHTML": (a0: ActorFront, a1: string) => Promise<void>;
    "outerHTML": (a0: ActorFront) => Promise<string | LongStringFront>;
    "setOuterHTML": (a0: ActorFront, a1: string) => Promise<void>;
    "insertAdjacentHTML": (a0: ActorFront, a1: string, a2: string) => Promise<GeneratedDictionaries["disconnectedNodeArray"]>;
    "duplicateNode": (a0: ActorFront) => Promise<void>;
    "removeNode": (a0: ActorFront) => Promise<GeneratedFront<"domnode"> | null>;
    "removeNodes": (a0: Array<ActorFront>) => Promise<void>;
    "insertBefore": (a0: ActorFront, a1: ActorFront, a2: ActorFront | null) => Promise<void>;
    "editTagName": (a0: ActorFront, a1: string) => Promise<void>;
    "getMutations": (a0?: { "cleanup"?: unknown }) => Promise<Array<GeneratedDictionaries["dommutation"]>>;
    "isInDOMTree": (a0: ActorFront) => Promise<boolean>;
    "getNodeActorFromWindowID": (a0: string) => Promise<GeneratedDictionaries["disconnectedNode"] | null>;
    "getNodeActorFromContentDomReference": (a0: unknown) => Promise<GeneratedDictionaries["disconnectedNode"] | null>;
    "getStyleSheetOwnerNode": (a0: string) => Promise<GeneratedDictionaries["disconnectedNode"] | null>;
    "getNodeFromActor": (a0: string, a1: Array<string>) => Promise<GeneratedDictionaries["disconnectedNode"] | null>;
    "getLayoutInspector": () => Promise<GeneratedFront<"layout">>;
    "getParentGridNode": (a0: ActorFront | null) => Promise<GeneratedFront<"domnode"> | null>;
    "getOffsetParent": (a0: ActorFront | null) => Promise<GeneratedFront<"domnode"> | null>;
    "setMutationBreakpoints": (a0: ActorFront | null, a1?: { "subtree"?: boolean | null; "removal"?: boolean | null; "attribute"?: boolean | null }) => Promise<void>;
    "getEmbedderElement": (a0: string) => Promise<GeneratedDictionaries["disconnectedNode"]>;
    "pick": (a0: boolean | null, a1: boolean | null) => Promise<void>;
    "cancelPick": () => Promise<void>;
    "clearPicker": () => Promise<void>;
    "watchRootNode": () => Promise<void>;
    "getOverflowCausingElements": (a0: ActorFront) => Promise<GeneratedDictionaries["disconnectedNodeArray"]>;
    "getScrollableAncestorNode": (a0: ActorFront) => Promise<GeneratedFront<"domnode"> | null>;
  };
  /** Firefox actor `watcher`; source: watcher.js */
  "watcher": {
    "watchTargets": (a0: string) => Promise<void>;
    "unwatchTargets": (a0: string, a1: unknown | null) => Promise<void>;
    "getParentBrowsingContextID": (a0: number) => Promise<number | null>;
    "watchResources": (a0: Array<string>) => Promise<void>;
    "unwatchResources": (a0: Array<string>) => Promise<void>;
    "clearResources": (a0: Array<string>) => Promise<void>;
    "getNetworkParentActor": () => Promise<GeneratedFront<"networkParent">>;
    "getBlackboxingActor": () => Promise<GeneratedFront<"blackboxing">>;
    "getBreakpointListActor": () => Promise<GeneratedFront<"breakpoint-list">>;
    "getTargetConfigurationActor": () => Promise<GeneratedFront<"target-configuration">>;
    "getThreadConfigurationActor": () => Promise<GeneratedFront<"thread-configuration">>;
  };
  /** Firefox actor `console`; source: webconsole.js */
  "console": {
    "startListeners": (a0: Array<string>) => Promise<GeneratedDictionaries["console.startlisteners"]>;
    "stopListeners": (a0: Array<string> | null) => Promise<GeneratedDictionaries["console.stoplisteners"]>;
    "getCachedMessages": (a0: Array<string>) => Promise<GeneratedDictionaries["console.cachedmessages"]>;
    "evaluateJSAsync": (a0?: { "text"?: string; "frameActor"?: string; "url"?: string; "selectedNodeActor"?: string; "selectedObjectActor"?: string; "innerWindowID"?: number; "mapped"?: unknown | null; "eager"?: boolean | null; "disableBreaks"?: boolean | null; "preferConsoleCommandsOverLocalSymbols"?: boolean | null; "evalInTracer"?: boolean | null }) => Promise<GeneratedDictionaries["console.evaluatejsasync"]>;
    "autocomplete": (a0: string, a1: number | null, a2: string | null, a3: string | null, a4: unknown | null, a5: unknown | null) => Promise<GeneratedDictionaries["console.autocomplete"]>;
    "clearMessagesCacheAsync": () => Promise<void>;
  };
  /** Firefox actor `pushSubscription`; source: worker/push-subscription.js */
  "pushSubscription": {
  };
  /** Firefox actor `serviceWorkerRegistration`; source: worker/service-worker-registration.js */
  "serviceWorkerRegistration": {
    "allowShutdown": () => Promise<void>;
    "preventShutdown": () => Promise<void>;
    "push": () => Promise<void>;
    "start": () => Promise<void>;
    "unregister": () => Promise<void>;
    "getPushSubscription": () => Promise<GeneratedFront<"pushSubscription"> | null>;
  };
  /** Firefox actor `serviceWorker`; source: worker/service-worker.js */
  "serviceWorker": {
  };
}
export interface GeneratedActorEvents {
  "accessible": {
    "actions-change": (a0: Array<string>) => void;
    "name-change": (a0: string, a1: GeneratedFront<"accessible"> | null) => void;
    "value-change": (a0: string) => void;
    "description-change": (a0: string) => void;
    "states-change": (a0: Array<string>) => void;
    "attributes-change": (a0: unknown) => void;
    "shortcut-change": (a0: string) => void;
    "reorder": (a0: number) => void;
    "text-change": () => void;
    "index-in-parent-change": (a0: number) => void;
    "audited": (a0: unknown | null) => void;
  };
  "accessiblewalker": {
    "document-ready": () => void;
    "picker-accessible-picked": (a0: GeneratedFront<"accessible"> | null) => void;
    "picker-accessible-previewed": (a0: GeneratedFront<"accessible"> | null) => void;
    "picker-accessible-hovered": (a0: GeneratedFront<"accessible"> | null) => void;
    "picker-accessible-canceled": () => void;
    "highlighter-event": (a0: unknown) => void;
    "audit-event": (a0: GeneratedDictionaries["auditEventData"]) => void;
  };
  "simulator": {
  };
  "accessibility": {
    "init": () => void;
    "shutdown": () => void;
  };
  "parentaccessibility": {
    "can-be-disabled-change": (a0: boolean) => void;
    "can-be-enabled-change": (a0: boolean) => void;
  };
  "addons": {
  };
  "webExtensionInspectedWindow": {
  };
  "animationplayer": {
    "changed": (a0: unknown) => void;
  };
  "animations": {
    "mutations": (a0: Array<GeneratedDictionaries["animationMutationChange"]>) => void;
  };
  "arraybuffer": {
  };
  "blackboxing": {
  };
  "breakpoint-list": {
  };
  "compatibility": {
  };
  "cssProperties": {
  };
  "processDescriptor": {
    "descriptor-destroyed": () => void;
  };
  "tabDescriptor": {
    "descriptor-destroyed": () => void;
  };
  "webExtensionDescriptor": {
    "descriptor-destroyed": () => void;
  };
  "workerDescriptor": {
    "descriptor-destroyed": () => void;
  };
  "device": {
  };
  "environment": {
  };
  "frame": {
  };
  "heapSnapshotFile": {
  };
  "customhighlighter": {
    "highlighter-event": (a0: unknown) => void;
  };
  "inspector": {
    "color-picked": (a0: string) => void;
    "color-pick-canceled": () => void;
  };
  "flexbox": {
  };
  "flexitem": {
  };
  "grid": {
  };
  "layout": {
  };
  "manifest": {
  };
  "memory": {
    "garbage-collection": (a0: unknown) => void;
    "allocations": (a0: unknown) => void;
  };
  "networkContent": {
  };
  "netEvent": {
    "network-event-update:headers": (a0: string, a1: { "headers"?: number; "headersSize"?: number }) => void;
    "network-event-update:cookies": (a0: string, a1: { "cookies"?: number }) => void;
    "network-event-update:post-data": (a0: string, a1: { "dataSize"?: number }) => void;
    "network-event-update:response-start": (a0: string, a1: { "response"?: unknown }) => void;
    "network-event-update:security-info": (a0: string, a1: { "state"?: string }) => void;
    "network-event-update:response-content": (a0: string, a1: { "mimeType"?: string; "contentSize"?: number; "encoding"?: string; "transferredSize"?: number; "blockedReason"?: number; "truncated"?: boolean; "extension"?: unknown }) => void;
    "network-event-update:event-timings": (a0: string, a1: { "totalTime"?: number }) => void;
    "network-event-update:response-cache": (a0: string) => void;
  };
  "networkParent": {
  };
  "domnodelist": {
  };
  "domnode": {
  };
  "obj": {
  };
  "objects-manager": {
  };
  "pagestyle": {
    "stylesheet-updated": () => void;
  };
  "perf": {
    "profiler-started": (a0: number, a1: number, a2: number, a3: number | null, a4: number) => void;
    "profiler-stopped": () => void;
  };
  "preference": {
  };
  "privatePropertiesIterator": {
  };
  "propertyIterator": {
  };
  "reflow": {
    "reflows": (a0: Array<unknown>) => void;
  };
  "responsive": {
  };
  "root": {
    "tabListChanged": () => void;
    "workerListChanged": () => void;
    "addonListChanged": () => void;
    "serviceWorkerRegistrationListChanged": () => void;
    "processListChanged": () => void;
    "resources-available-array": (a0: Array<unknown>) => void;
    "resources-destroyed-array": (a0: Array<unknown>) => void;
  };
  "screenshot-content": {
  };
  "screenshot": {
  };
  "source": {
  };
  "cookies": {
    "single-store-update": (a0: GeneratedDictionaries["storeUpdateObject"]) => void;
    "single-store-cleared": (a0: unknown) => void;
  };
  "localStorage": {
    "single-store-update": (a0: GeneratedDictionaries["storeUpdateObject"]) => void;
    "single-store-cleared": (a0: unknown) => void;
  };
  "sessionStorage": {
    "single-store-update": (a0: GeneratedDictionaries["storeUpdateObject"]) => void;
    "single-store-cleared": (a0: unknown) => void;
  };
  "extensionStorage": {
    "single-store-update": (a0: GeneratedDictionaries["storeUpdateObject"]) => void;
    "single-store-cleared": (a0: unknown) => void;
  };
  "Cache": {
    "single-store-update": (a0: GeneratedDictionaries["storeUpdateObject"]) => void;
    "single-store-cleared": (a0: unknown) => void;
  };
  "indexedDB": {
    "single-store-update": (a0: GeneratedDictionaries["storeUpdateObject"]) => void;
    "single-store-cleared": (a0: unknown) => void;
  };
  "longstractor": {
  };
  "domstylerule": {
    "location-changed": (a0: number, a1: number) => void;
    "rule-updated": (a0: GeneratedFront<"domstylerule">) => void;
  };
  "stylesheets": {
  };
  "symbolIterator": {
  };
  "symbol": {
  };
  "target-configuration": {
  };
  "contentProcessTarget": {
    "workerListChanged": () => void;
    "resources-available-array": (a0: Array<unknown>) => void;
    "resources-destroyed-array": (a0: Array<unknown>) => void;
    "resources-updated-array": (a0: Array<unknown>) => void;
  };
  "contentScriptTarget": {
    "resources-available-array": (a0: Array<unknown>) => void;
    "resources-destroyed-array": (a0: Array<unknown>) => void;
    "resources-updated-array": (a0: Array<unknown>) => void;
  };
  "parentProcessTarget": {
    "tabNavigated": (a0: { "url"?: string; "title"?: string; "state"?: string; "isFrameSwitching"?: boolean }) => void;
    "frameUpdate": (a0: { "frames"?: Array<GeneratedDictionaries["windowGlobalTarget.window"]> | null; "selected"?: number | null; "destroyAll"?: boolean | null }) => void;
    "workerListChanged": () => void;
    "contentScrolled": (a0: number) => void;
    "resources-available-array": (a0: Array<unknown>) => void;
    "resources-destroyed-array": (a0: Array<unknown>) => void;
    "resources-updated-array": (a0: Array<unknown>) => void;
  };
  "windowGlobalTarget": {
    "tabNavigated": (a0: { "url"?: string; "title"?: string; "state"?: string; "isFrameSwitching"?: boolean }) => void;
    "frameUpdate": (a0: { "frames"?: Array<GeneratedDictionaries["windowGlobalTarget.window"]> | null; "selected"?: number | null; "destroyAll"?: boolean | null }) => void;
    "workerListChanged": () => void;
    "contentScrolled": (a0: number) => void;
    "resources-available-array": (a0: Array<unknown>) => void;
    "resources-destroyed-array": (a0: Array<unknown>) => void;
    "resources-updated-array": (a0: Array<unknown>) => void;
  };
  "workerTarget": {
    "resources-available-array": (a0: Array<unknown>) => void;
    "resources-destroyed-array": (a0: Array<unknown>) => void;
    "resources-updated-array": (a0: Array<unknown>) => void;
  };
  "thread-configuration": {
  };
  "thread": {
    "paused": (a0: { "actor"?: string | null; "frame"?: ActorFront; "why"?: GeneratedDictionaries["paused-reason"] }) => void;
    "resumed": () => void;
    "newSource": (a0: { "source"?: unknown }) => void;
  };
  "tracer": {
  };
  "domwalker": {
    "new-mutations": () => void;
    "root-available": (a0: GeneratedFront<"domnode"> | null) => void;
    "root-destroyed": (a0: GeneratedFront<"domnode"> | null) => void;
    "picker-node-picked": (a0: GeneratedDictionaries["disconnectedNode"]) => void;
    "picker-node-previewed": (a0: GeneratedDictionaries["disconnectedNode"]) => void;
    "picker-node-hovered": (a0: GeneratedDictionaries["disconnectedNode"]) => void;
    "picker-node-canceled": () => void;
    "display-change": (a0: Array<GeneratedFront<"domnode">>) => void;
    "scrollable-change": (a0: Array<GeneratedFront<"domnode">>) => void;
    "overflow-change": (a0: Array<GeneratedFront<"domnode">>) => void;
    "container-type-change": (a0: Array<GeneratedFront<"domnode">>) => void;
    "anchor-name-change": (a0: Array<GeneratedFront<"domnode">>) => void;
    "resize": () => void;
  };
  "watcher": {
    "target-available-form": (a0: unknown) => void;
    "target-destroyed-form": (a0: unknown, a1: unknown | null) => void;
    "resources-available-array": (a0: Array<unknown>) => void;
    "resources-destroyed-array": (a0: Array<unknown>) => void;
    "resources-updated-array": (a0: Array<unknown>) => void;
  };
  "console": {
    "evaluationResult": (a0: { "resultID"?: string; "awaitResult"?: boolean | null; "errorMessageName"?: string | null; "exception"?: unknown | null; "exceptionMessage"?: string | null; "exceptionDocURL"?: string | null; "exceptionStack"?: unknown | null; "hasException"?: boolean | null; "frame"?: unknown | null; "helperResult"?: unknown | null; "input"?: string | null; "notes"?: string | null; "result"?: unknown | null; "startTime"?: number; "timestamp"?: number; "topLevelAwaitRejected"?: boolean | null }) => void;
    "fileActivity": (a0: { "uri"?: string }) => void;
    "pageError": (a0: { "pageError"?: unknown }) => void;
    "logMessage": (a0: { "message"?: unknown; "timeStamp"?: string }) => void;
    "consoleAPICall": (a0: { "message"?: unknown; "clonedFromContentProcess"?: boolean | null }) => void;
    "reflowActivity": (a0: { "interruptible"?: boolean; "start"?: number; "end"?: number; "sourceURL"?: string | null; "sourceLine"?: number | null; "functionName"?: string | null }) => void;
    "serverNetworkEvent": (a0: { "eventActor"?: unknown }) => void;
    "inspectObject": (a0: { "objectActor"?: unknown }) => void;
    "documentEvent": (a0: { "name"?: string; "time"?: string; "hasNativeConsoleAPI"?: boolean }) => void;
  };
  "pushSubscription": {
  };
  "serviceWorkerRegistration": {
    "push-subscription-modified": () => void;
    "registration-changed": () => void;
  };
  "serviceWorker": {
  };
}
/** A typed actor handle returned by a generated method. */
export type GeneratedFront<K extends keyof GeneratedActorAPI & string> = Omit<ActorFront, "api" | "listen"> & {
  api: GeneratedActorAPI[K];
  listen<E extends keyof GeneratedActorEvents[K] & string>(event: E, listener: GeneratedActorEvents[K][E]): ActorFront;
};
/** Firefox dictionary types collected from addDictType(). */
export interface GeneratedDictionaries {
  "accessibleWithChildren": {
    "accessible"?: GeneratedFront<"accessible">;
    "children"?: Array<GeneratedFront<"accessible">>;
    [key: string]: unknown;
  };
  "auditEventData": {
    "type"?: string;
    "ancestries"?: Array<Array<GeneratedDictionaries["accessibleWithChildren"]>> | null;
    "progress"?: unknown | null;
    [key: string]: unknown;
  };
  "accessibleRelation": {
    "type"?: string;
    "targets"?: Array<GeneratedFront<"accessible">>;
    [key: string]: unknown;
  };
  "webExtensionCallerInfo": {
    "url"?: string;
    "lineNumber"?: number | null;
    "addonId"?: string;
    [key: string]: unknown;
  };
  "webExtensionEvalOptions": {
    "frameURL"?: string | null;
    "contextSecurityOrigin"?: string | null;
    "useContentScriptContext"?: boolean | null;
    "evalResultAsGrip"?: boolean | null;
    "toolboxSelectedNodeActorID"?: string | null;
    "toolboxConsoleActorID"?: string | null;
    [key: string]: unknown;
  };
  "webExtensionEvalExceptionInfo": {
    "isError"?: boolean | null;
    "code"?: string | null;
    "description"?: string | null;
    "details"?: Array<unknown> | null;
    "isException"?: string | null;
    "value"?: string | null;
    [key: string]: unknown;
  };
  "webExtensionEvalResult": {
    "value"?: unknown | null;
    "valueGrip"?: unknown | null;
    "exceptionInfo"?: GeneratedDictionaries["webExtensionEvalExceptionInfo"] | null;
    [key: string]: unknown;
  };
  "webExtensionReloadOptions": {
    "ignoreCache"?: boolean | null;
    "userAgent"?: string | null;
    "injectedScript"?: string | null;
    [key: string]: unknown;
  };
  "animationMutationChange": {
    "type"?: string;
    "player"?: GeneratedFront<"animationplayer">;
    [key: string]: unknown;
  };
  "blackboxing.position": {
    "line"?: number;
    "column"?: number;
    [key: string]: unknown;
  };
  "blackboxing.range": {
    "start"?: GeneratedDictionaries["blackboxing.position"];
    "end"?: GeneratedDictionaries["blackboxing.position"];
    [key: string]: unknown;
  };
  "breakpoint-list.breakpoint-options": {
    "condition"?: string | null;
    "logValue"?: string | null;
    [key: string]: unknown;
  };
  "browsertype": {
    "id"?: string;
    "name"?: string;
    "version"?: string;
    "status"?: string;
    [key: string]: unknown;
  };
  "compatibilityissues": {
    "type"?: string;
    "property"?: string;
    "aliases"?: Array<string> | null;
    "url"?: string | null;
    "specUrl"?: string | null;
    "deprecated"?: boolean;
    "experimental"?: boolean;
    "unsupportedBrowsers"?: Array<GeneratedDictionaries["browsertype"]>;
    [key: string]: unknown;
  };
  "declaration": {
    "name"?: string;
    "value"?: string;
    [key: string]: unknown;
  };
  "AllocationsRecordingOptions": {
    "probability"?: number;
    "maxLogLength"?: number;
    [key: string]: unknown;
  };
  "netevent.headers-cookies": {
    "name"?: string;
    "value"?: string | LongStringFront;
    [key: string]: unknown;
  };
  "netevent.headers": {
    "headers"?: Array<GeneratedDictionaries["netevent.headers-cookies"]>;
    "headersSize"?: number;
    "rawHeaders"?: string | LongStringFront | null;
    [key: string]: unknown;
  };
  "netevent.cookies": {
    "cookies"?: Array<GeneratedDictionaries["netevent.headers-cookies"]>;
    [key: string]: unknown;
  };
  "netevent.postdata.text": {
    "text"?: string | LongStringFront;
    [key: string]: unknown;
  };
  "netevent.postdata": {
    "postData"?: GeneratedDictionaries["netevent.postdata.text"];
    "postDataDiscarded"?: boolean;
    [key: string]: unknown;
  };
  "netevent.cache": {
    "content"?: unknown;
    [key: string]: unknown;
  };
  "netevent.content.content": {
    "text"?: string | LongStringFront;
    [key: string]: unknown;
  };
  "netevent.content": {
    "content"?: GeneratedDictionaries["netevent.content.content"];
    "contentDiscarded"?: boolean;
    [key: string]: unknown;
  };
  "netevent.timings.data": {
    "blocked"?: number;
    "dns"?: number;
    "ssl"?: number;
    "connect"?: number;
    "send"?: number;
    "wait"?: number;
    "receive"?: number;
    [key: string]: unknown;
  };
  "netevent.timings": {
    "timings"?: GeneratedDictionaries["netevent.timings.data"];
    "totalTime"?: number;
    "offsets"?: GeneratedDictionaries["netevent.timings.data"];
    "serverTimings"?: Array<GeneratedDictionaries["netevent.timings.serverTiming"]>;
    [key: string]: unknown;
  };
  "netevent.timings.serverTiming": {
    "name"?: string;
    "description"?: string;
    "duration"?: number;
    [key: string]: unknown;
  };
  "netevent.cert": {
    "subject"?: unknown;
    "issuer"?: unknown;
    "validity"?: unknown;
    "fingerprint"?: unknown;
    [key: string]: unknown;
  };
  "netevent.secinfo": {
    "state"?: string;
    "weaknessReasons"?: Array<string>;
    "cipherSuite"?: string;
    "keaGroupName"?: string;
    "signatureSchemeName"?: string;
    "protocolVersion"?: string;
    "cert"?: GeneratedDictionaries["netevent.cert"] | null;
    "certificateTransparency"?: number;
    "hsts"?: boolean;
    "hpkp"?: boolean;
    "errorMessage"?: string | null;
    "usedEch"?: boolean;
    "usedDelegatedCredentials"?: boolean;
    "usedOcsp"?: boolean;
    "usedPrivateDns"?: boolean;
    [key: string]: unknown;
  };
  "imageData": {
    "data"?: string | LongStringFront | null;
    "size"?: unknown;
    [key: string]: unknown;
  };
  "windowDimensions": {
    "innerWidth"?: number | null;
    "innerHeight"?: number | null;
    [key: string]: unknown;
  };
  "disconnectedNode": {
    "node"?: GeneratedFront<"domnode">;
    "newParents"?: Array<GeneratedFront<"domnode">>;
    [key: string]: unknown;
  };
  "disconnectedNodeArray": {
    "nodes"?: Array<GeneratedFront<"domnode">>;
    "newParents"?: Array<GeneratedFront<"domnode">>;
    [key: string]: unknown;
  };
  "object.descriptor": {
    "configurable"?: boolean;
    "enumerable"?: boolean;
    "value"?: unknown | null;
    "writable"?: boolean | null;
    "get"?: unknown | null;
    "set"?: unknown | null;
    [key: string]: unknown;
  };
  "object.completion": {
    "return"?: unknown | null;
    "throw"?: unknown | null;
    [key: string]: unknown;
  };
  "object.prototypeproperties": {
    "prototype"?: GeneratedDictionaries["object.descriptor"];
    "ownProperties"?: unknown | null;
    "ownSymbols"?: Array<GeneratedDictionaries["object.descriptor"]> | null;
    "safeGetterValues"?: unknown | null;
    [key: string]: unknown;
  };
  "object.prototype": {
    "prototype"?: GeneratedDictionaries["object.descriptor"];
    [key: string]: unknown;
  };
  "object.global": {
    "global"?: GeneratedDictionaries["object.descriptor"];
    [key: string]: unknown;
  };
  "object.property": {
    "descriptor"?: GeneratedDictionaries["object.descriptor"] | null;
    [key: string]: unknown;
  };
  "object.propertyValue": {
    "value"?: GeneratedDictionaries["object.completion"] | null;
    [key: string]: unknown;
  };
  "object.apply": {
    "value"?: GeneratedDictionaries["object.completion"] | null;
    [key: string]: unknown;
  };
  "object.bindings": {
    "arguments"?: Array<unknown>;
    "variables"?: unknown;
    [key: string]: unknown;
  };
  "object.enumProperties.Options": {
    "enumEntries"?: boolean | null;
    "ignoreNonIndexedProperties"?: boolean | null;
    "ignoreIndexedProperties"?: boolean | null;
    "query"?: string | null;
    "sort"?: boolean | null;
    [key: string]: unknown;
  };
  "object.dependentPromises": {
    "promises"?: Array<GeneratedDictionaries["object.descriptor"]>;
    [key: string]: unknown;
  };
  "object.originalSourceLocation": {
    "source"?: GeneratedFront<"source">;
    "line"?: number;
    "column"?: number;
    "functionDisplayName"?: string;
    [key: string]: unknown;
  };
  "object.promiseState": {
    "state"?: string;
    "value"?: GeneratedDictionaries["object.descriptor"] | null;
    "reason"?: GeneratedDictionaries["object.descriptor"] | null;
    "creationTimestamp"?: number;
    "timeToSettle"?: number | null;
    [key: string]: unknown;
  };
  "object.proxySlots": {
    "proxyTarget"?: GeneratedDictionaries["object.descriptor"];
    "proxyHandler"?: GeneratedDictionaries["object.descriptor"];
    [key: string]: unknown;
  };
  "object.customFormatterBody": {
    "customFormatterBody"?: unknown;
    [key: string]: unknown;
  };
  "matchedselectorresponse": {
    "rules"?: Array<GeneratedFront<"domstylerule">>;
    "matched"?: Array<GeneratedDictionaries["matchedselector"]>;
    [key: string]: unknown;
  };
  "privatepropertiesiterator.data": {
    "privateProperties"?: Array<GeneratedDictionaries["privatepropertiesiterator.privateProperties"]>;
    [key: string]: unknown;
  };
  "privatepropertiesiterator.privateProperties": {
    "name"?: string;
    "descriptor"?: GeneratedDictionaries["object.descriptor"] | null;
    [key: string]: unknown;
  };
  "propertyiterator.data": {
    "ownProperties"?: unknown | null;
    [key: string]: unknown;
  };
  "root.listWorkers": {
    "workers"?: Array<GeneratedFront<"workerDescriptor">>;
    [key: string]: unknown;
  };
  "root.listServiceWorkerRegistrations": {
    "registrations"?: Array<GeneratedFront<"serviceWorkerRegistration">>;
    [key: string]: unknown;
  };
  "screenshot-content.args": {
    "fullpage"?: boolean | null;
    "selector"?: string | null;
    "nodeActorID"?: number | null;
    [key: string]: unknown;
  };
  "screenshot.args": {
    "fullpage"?: boolean | null;
    "file"?: boolean | null;
    "clipboard"?: boolean | null;
    "selector"?: string | null;
    "dpr"?: string | null;
    "delay"?: string | null;
    [key: string]: unknown;
  };
  "sourceposition": {
    "line"?: number;
    "column"?: number;
    [key: string]: unknown;
  };
  "nullablesourceposition": {
    "line"?: number | null;
    "column"?: number | null;
    [key: string]: unknown;
  };
  "breakpointquery": {
    "start"?: GeneratedDictionaries["nullablesourceposition"] | null;
    "end"?: GeneratedDictionaries["nullablesourceposition"] | null;
    [key: string]: unknown;
  };
  "source.onsource": {
    "contentType"?: string | null;
    "source"?: unknown | null;
    [key: string]: unknown;
  };
  "cookieobject": {
    "uniqueKey"?: string;
    "name"?: string;
    "value"?: string | LongStringFront;
    "path"?: string | null;
    "host"?: string;
    "hostOnly"?: boolean;
    "isSecure"?: boolean;
    "isHttpOnly"?: boolean;
    "creationTime"?: number;
    "updateTime"?: number;
    "lastAccessed"?: number;
    "expires"?: number;
    [key: string]: unknown;
  };
  "cookiestoreobject": {
    "total"?: number;
    "offset"?: number;
    "data"?: Array<GeneratedDictionaries["cookieobject"] | null>;
    [key: string]: unknown;
  };
  "cookieoperationresult": {
    "errorString"?: string | null;
    [key: string]: unknown;
  };
  "storageobject": {
    "name"?: string;
    "value"?: string | LongStringFront;
    [key: string]: unknown;
  };
  "storagestoreobject": {
    "total"?: number;
    "offset"?: number;
    "data"?: Array<GeneratedDictionaries["storageobject"] | null>;
    [key: string]: unknown;
  };
  "extensionobject": {
    "uniqueKey"?: string;
    "name"?: string | null;
    "value"?: string | LongStringFront | null;
    "area"?: string;
    "isValueEditable"?: boolean;
    [key: string]: unknown;
  };
  "extensionstoreobject": {
    "total"?: number;
    "offset"?: number;
    "data"?: Array<GeneratedDictionaries["extensionobject"] | null>;
    [key: string]: unknown;
  };
  "cacheobject": {
    "url"?: string;
    "status"?: string;
    [key: string]: unknown;
  };
  "cachestoreobject": {
    "total"?: number;
    "offset"?: number;
    "data"?: Array<GeneratedDictionaries["cacheobject"] | null>;
    [key: string]: unknown;
  };
  "idbobject": {
    "uniqueKey"?: string;
    "name"?: string | null;
    "db"?: string | null;
    "objectStore"?: string | null;
    "origin"?: string | null;
    "version"?: number | null;
    "storage"?: string | null;
    "objectStores"?: number | null;
    "keyPath"?: string | null;
    "autoIncrement"?: boolean | null;
    "indexes"?: string | null;
    "value"?: string | LongStringFront | null;
    [key: string]: unknown;
  };
  "idbstoreobject": {
    "total"?: number;
    "offset"?: number;
    "data"?: Array<GeneratedDictionaries["idbobject"] | null>;
    [key: string]: unknown;
  };
  "idbdeleteresult": {
    "blocked"?: boolean | null;
    "error"?: string | null;
    [key: string]: unknown;
  };
  "storeUpdateObject": {
    "changed"?: unknown | null;
    "deleted"?: unknown | null;
    "added"?: unknown | null;
    [key: string]: unknown;
  };
  "appliedstyle": {
    "rule"?: GeneratedFront<"domstylerule">;
    "pseudoElement"?: string | null;
    "isSystem"?: boolean | null;
    "inherited"?: string | null;
    "darkColorScheme"?: boolean | null;
    "matchedSelectorIndexes"?: Array<number> | null;
    "keyframes"?: GeneratedFront<"domstylerule"> | null;
    "siblingCount"?: number | null;
    "siblingIndex"?: number | null;
    [key: string]: unknown;
  };
  "matchedselector": {
    "rule"?: string;
    "selector"?: string;
    "value"?: string;
    "status"?: number;
    [key: string]: unknown;
  };
  "appliedStylesReturn": {
    "entries"?: Array<GeneratedDictionaries["appliedstyle"]>;
    [key: string]: unknown;
  };
  "modifiedStylesReturn": {
    [key: string]: unknown;
  };
  "fontpreview": {
    "data"?: string | LongStringFront | null;
    "size"?: unknown;
    [key: string]: unknown;
  };
  "fontvariationaxis": {
    "tag"?: string;
    "name"?: string;
    "minValue"?: number;
    "maxValue"?: number;
    "defaultValue"?: number;
    [key: string]: unknown;
  };
  "fontvariationinstancevalue": {
    "axis"?: string;
    "value"?: number;
    [key: string]: unknown;
  };
  "fontvariationinstance": {
    "name"?: string;
    "values"?: Array<GeneratedDictionaries["fontvariationinstancevalue"]>;
    [key: string]: unknown;
  };
  "fontface": {
    "name"?: string;
    "CSSFamilyName"?: string;
    "rule"?: GeneratedFront<"domstylerule"> | null;
    "srcIndex"?: number;
    "URI"?: string;
    "format"?: string;
    "preview"?: GeneratedDictionaries["fontpreview"] | null;
    "localName"?: string;
    "metadata"?: string;
    "variationAxes"?: Array<GeneratedDictionaries["fontvariationaxis"]>;
    "variationInstances"?: Array<GeneratedDictionaries["fontvariationinstance"]>;
    [key: string]: unknown;
  };
  "domstylerule.queryContainerForNodeReturn": {
    "node"?: GeneratedFront<"domnode"> | null;
    "containerType"?: string | null;
    "containerName"?: string | null;
    "queryFeatures"?: Array<unknown> | null;
    [key: string]: unknown;
  };
  "symboliterator.data": {
    "ownSymbols"?: Array<GeneratedDictionaries["symboliterator.ownsymbols"]>;
    [key: string]: unknown;
  };
  "symboliterator.ownsymbols": {
    "name"?: string;
    "descriptor"?: GeneratedDictionaries["object.descriptor"] | null;
    [key: string]: unknown;
  };
  "target-configuration.configuration": {
    "cacheDisabled"?: boolean | null;
    "colorSchemeSimulation"?: string | null;
    "customFormatters"?: boolean | null;
    "customUserAgent"?: string | null;
    "javascriptEnabled"?: boolean | null;
    "overrideDPPX"?: number | null;
    "printSimulationEnabled"?: boolean | null;
    "rdmPaneOrientation"?: unknown | null;
    "reducedMotionEmulation"?: string | null;
    "reloadOnTouchSimulationToggle"?: boolean | null;
    "restoreFocus"?: boolean | null;
    "serviceWorkersTestingEnabled"?: boolean | null;
    "setTabOffline"?: boolean | null;
    "touchEventsOverride"?: string | null;
    "isTracerFeatureEnabled"?: boolean | null;
    [key: string]: unknown;
  };
  "contentProcessTarget.workers": {
    "error"?: string | null;
    "workers"?: Array<GeneratedFront<"workerDescriptor">> | null;
    [key: string]: unknown;
  };
  "windowGlobalTarget.switchtoframe": {
    "message"?: string;
    [key: string]: unknown;
  };
  "windowGlobalTarget.listframes": {
    "frames"?: Array<GeneratedDictionaries["windowGlobalTarget.window"]>;
    [key: string]: unknown;
  };
  "windowGlobalTarget.window": {
    "id"?: string;
    "parentID"?: string | null;
    "url"?: string | null;
    "title"?: string | null;
    "destroy"?: boolean | null;
    [key: string]: unknown;
  };
  "windowGlobalTarget.workers": {
    "workers"?: Array<GeneratedFront<"workerDescriptor">>;
    [key: string]: unknown;
  };
  "windowGlobalTarget.reload": {
    "force"?: boolean;
    [key: string]: unknown;
  };
  "windowGlobalTarget.reconfigure": {
    "cacheDisabled"?: boolean | null;
    "colorSchemeSimulation"?: string | null;
    "printSimulationEnabled"?: boolean | null;
    "restoreFocus"?: boolean | null;
    "serviceWorkersTestingEnabled"?: boolean | null;
    [key: string]: unknown;
  };
  "windowGlobalTarget.getSourceContentForResource": {
    "contentType"?: string | null;
    "source"?: unknown | null;
    [key: string]: unknown;
  };
  "thread-configuration.configuration": {
    "pauseOnExceptions"?: boolean | null;
    "ignoreCaughtExceptions"?: boolean | null;
    [key: string]: unknown;
  };
  "available-breakpoint-group": {
    "name"?: string;
    "events"?: Array<GeneratedDictionaries["available-breakpoint-event"]>;
    [key: string]: unknown;
  };
  "available-breakpoint-event": {
    "id"?: string;
    "name"?: string;
    [key: string]: unknown;
  };
  "thread.frames": {
    "frames"?: Array<GeneratedFront<"frame">>;
    [key: string]: unknown;
  };
  "thread.breakpoint-options": {
    "condition"?: string | null;
    "logValue"?: string | null;
    "showStacktrace"?: boolean | null;
    [key: string]: unknown;
  };
  "paused-reason": {
    "type"?: string;
    "message"?: string | null;
    "frameFinished"?: unknown | null;
    "exception"?: unknown | null;
    "onNext"?: boolean | null;
    "breakpoint"?: unknown | null;
    "mutationType"?: string | null;
    [key: string]: unknown;
  };
  "tracer.start.options": {
    "logMethod"?: string;
    "traceValues"?: boolean;
    "traceOnNextInteraction"?: boolean;
    "traceOnNextLoad"?: boolean;
    "traceDOMMutations"?: Array<string> | null;
    [key: string]: unknown;
  };
  "dommutation": {
    [key: string]: unknown;
  };
  "searchresult": {
    "list"?: GeneratedFront<"domnodelist">;
    "metadata"?: Array<unknown>;
    [key: string]: unknown;
  };
  "domtraversalarray": {
    "nodes"?: Array<GeneratedFront<"domnode">>;
    [key: string]: unknown;
  };
  "console.startlisteners": {
    "startedListeners"?: Array<string>;
    [key: string]: unknown;
  };
  "console.stoplisteners": {
    "stoppedListeners"?: Array<string>;
    [key: string]: unknown;
  };
  "console.autocomplete": {
    "matches"?: Array<string>;
    "matchProp"?: string;
    [key: string]: unknown;
  };
  "console.evaluatejsasync": {
    "resultID"?: string;
    [key: string]: unknown;
  };
  "console.cachedmessages": {
    "error"?: string | null;
    "message"?: string | LongStringFront;
    "_type"?: string | null;
    "timeStamp"?: string | null;
    [key: string]: unknown;
  };
}
