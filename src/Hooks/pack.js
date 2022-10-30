var extendStatics = function (d, b) {
  extendStatics =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function (d, b) {
        d.__proto__ = b;
      }) ||
    function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype =
    b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
}

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (
        e.indexOf(p[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, p[i])
      )
        t[p[i]] = s[p[i]];
    }
  return t;
}

function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i]?.length || 0;

  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a?.length || 0; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

var createSplitRectangle = function (rectangle) {
  return __assign(__assign({}, rectangle), { splitFrom: rectangle.id });
};
var Splitter = (function () {
  function Splitter(kerfSize) {
    this.kerfSize = kerfSize;
  }
  Splitter.prototype.splitHorizontally = function (rectangle, item) {
    var rectangle1 = __assign(__assign({}, createSplitRectangle(rectangle)), {
      x: rectangle.x + item.width + this.kerfSize,
      width: rectangle.width - item.width - this.kerfSize,
      height: item.height,
      id: "sh-r1",
    });
    var rectangle2 = __assign(__assign({}, createSplitRectangle(rectangle)), {
      y: rectangle.y + item.height + this.kerfSize,
      height: rectangle.height - item.height - this.kerfSize,
      id: "sh-r2",
    });
    return [rectangle1, rectangle2];
  };
  Splitter.prototype.splitVertically = function (rectangle, item) {
    var rectangle1 = __assign(__assign({}, createSplitRectangle(rectangle)), {
      y: rectangle.y + item.height + this.kerfSize,
      width: item.width,
      height: rectangle.height - item.height - this.kerfSize,
      id: "sh-r1",
    });
    var rectangle2 = __assign(__assign({}, createSplitRectangle(rectangle)), {
      x: rectangle.x + item.width + this.kerfSize,
      y: rectangle.y,
      width: rectangle.width - item.width - this.kerfSize,
      id: "sh-r2",
    });
    return [rectangle1, rectangle2];
  };
  return Splitter;
})();
var ShortAxisSplit = (function (_super) {
  __extends(ShortAxisSplit, _super);
  function ShortAxisSplit() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  ShortAxisSplit.prototype.split = function (rectangle, item) {
    if (rectangle.width < rectangle.height) {
      return this.splitHorizontally(rectangle, item);
    } else {
      return this.splitVertically(rectangle, item);
    }
  };
  return ShortAxisSplit;
})(Splitter);
var LongAxisSplit = (function (_super) {
  __extends(LongAxisSplit, _super);
  function LongAxisSplit() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  LongAxisSplit.prototype.split = function (rectangle, item) {
    if (rectangle.width > rectangle.height) {
      return this.splitHorizontally(rectangle, item);
    } else {
      return this.splitVertically(rectangle, item);
    }
  };
  return LongAxisSplit;
})(Splitter);
var ShorterLeftoverAxisSplit = (function (_super) {
  __extends(ShorterLeftoverAxisSplit, _super);
  function ShorterLeftoverAxisSplit() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  ShorterLeftoverAxisSplit.prototype.split = function (rectangle, item) {
    if (rectangle.width - item.width < rectangle.height - item.height) {
      return this.splitHorizontally(rectangle, item);
    } else {
      return this.splitVertically(rectangle, item);
    }
  };
  return ShorterLeftoverAxisSplit;
})(Splitter);
var LongerLeftoverAxisSplit = (function (_super) {
  __extends(LongerLeftoverAxisSplit, _super);
  function LongerLeftoverAxisSplit() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  LongerLeftoverAxisSplit.prototype.split = function (rectangle, item) {
    if (rectangle.width - item.width >= rectangle.height - item.height) {
      return this.splitHorizontally(rectangle, item);
    } else {
      return this.splitVertically(rectangle, item);
    }
  };
  return LongerLeftoverAxisSplit;
})(Splitter);
var SplitStrategy;
(function (SplitStrategy) {
  SplitStrategy[(SplitStrategy["LongLeftoverAxisSplit"] = 0)] =
    "LongLeftoverAxisSplit";
  SplitStrategy[(SplitStrategy["ShortLeftoverAxisSplit"] = 1)] =
    "ShortLeftoverAxisSplit";
  SplitStrategy[(SplitStrategy["LongAxisSplit"] = 2)] = "LongAxisSplit";
  SplitStrategy[(SplitStrategy["ShortAxisSplit"] = 3)] = "ShortAxisSplit";
})(SplitStrategy || (SplitStrategy = {}));
function GetSplitImplementation(strategy, kerfSize) {
  switch (strategy) {
    case SplitStrategy.LongAxisSplit:
      return new LongAxisSplit(kerfSize);
    case SplitStrategy.ShortAxisSplit:
      return new ShortAxisSplit(kerfSize);
    case SplitStrategy.LongLeftoverAxisSplit:
      return new LongerLeftoverAxisSplit(kerfSize);
    case SplitStrategy.ShortLeftoverAxisSplit:
      return new ShorterLeftoverAxisSplit(kerfSize);
  }
}

var SelectionStrategy;
(function (SelectionStrategy) {
  SelectionStrategy[(SelectionStrategy["BEST_SHORT_SIDE_FIT"] = 0)] =
    "BEST_SHORT_SIDE_FIT";
  SelectionStrategy[(SelectionStrategy["BEST_LONG_SIDE_FIT"] = 1)] =
    "BEST_LONG_SIDE_FIT";
  SelectionStrategy[(SelectionStrategy["BEST_AREA_FIT"] = 2)] = "BEST_AREA_FIT";
})(SelectionStrategy || (SelectionStrategy = {}));
var SelectionImplementation = (function () {
  function SelectionImplementation() {}
  SelectionImplementation.prototype.select = function (
    freeRectangles,
    itemToPlace
  ) {
    var _this = this;
    var bestRect = freeRectangles
      .filter(function (freeRect) {
        return (
          freeRect.width - itemToPlace.width >= 0 &&
          freeRect.height - itemToPlace.height >= 0
        );
      })
      .map(function (r) {
        return {
          rectangle: r,
          sortValue: _this.generateSortValue(r, itemToPlace),
        };
      })
      .sort(function (a, b) {
        return a.sortValue > b.sortValue ? 1 : -1;
      })[0];
    return bestRect ? bestRect.rectangle : null;
  };
  return SelectionImplementation;
})();
var BestShortSideFit = (function (_super) {
  __extends(BestShortSideFit, _super);
  function BestShortSideFit() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  BestShortSideFit.prototype.generateSortValue = function (
    freeRectangle,
    itemToPlace
  ) {
    var width = itemToPlace.width,
      height = itemToPlace.height;
    return Math.min(freeRectangle.width - width, freeRectangle.height - height);
  };
  return BestShortSideFit;
})(SelectionImplementation);
var BestLongSideFit = (function (_super) {
  __extends(BestLongSideFit, _super);
  function BestLongSideFit() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  BestLongSideFit.prototype.generateSortValue = function (
    freeRectangle,
    itemToPlace
  ) {
    var width = itemToPlace.width,
      height = itemToPlace.height;
    return Math.max(freeRectangle.width - width, freeRectangle.height - height);
  };
  return BestLongSideFit;
})(SelectionImplementation);
var BestAreaFit = (function (_super) {
  __extends(BestAreaFit, _super);
  function BestAreaFit() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  BestAreaFit.prototype.generateSortValue = function (freeRectangle) {
    return freeRectangle.width * freeRectangle.height;
  };
  return BestAreaFit;
})(SelectionImplementation);
function GetSelectionImplementation(strategy) {
  switch (strategy) {
    case SelectionStrategy.BEST_AREA_FIT:
      return new BestAreaFit();
    case SelectionStrategy.BEST_LONG_SIDE_FIT:
      return new BestLongSideFit();
    case SelectionStrategy.BEST_SHORT_SIDE_FIT:
      return new BestShortSideFit();
  }
}

var area = function (item) {
  return item.height * item.width;
};
var perimeter = function (item) {
  return item.height * 2 + item.width * 2;
};
var sides = function (item) {
  return {
    short: Math.min(item.width, item.height),
    long: Math.max(item.width, item.height),
  };
};
var Sorter = (function () {
  function Sorter(direction) {
    this.direction = direction;
  }
  Sorter.prototype.sort = function (items) {
    var sortedItems = __spreadArrays(items).sort(this.comparer);
    return this.direction === SortDirection.DESC
      ? sortedItems.reverse()
      : sortedItems;
  };
  return Sorter;
})();
var Area = (function (_super) {
  __extends(Area, _super);
  function Area() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Area.prototype.comparer = function (a, b) {
    return area(a) < area(b) ? -1 : 1;
  };
  return Area;
})(Sorter);
var ShortSide = (function (_super) {
  __extends(ShortSide, _super);
  function ShortSide() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  ShortSide.prototype.comparer = function (a, b) {
    var aSides = sides(a);
    var bSides = sides(b);
    if (aSides.short === bSides.short) {
      return aSides.long < bSides.long ? -1 : 1;
    } else {
      return aSides.short < bSides.short ? -1 : 1;
    }
  };
  return ShortSide;
})(Sorter);
var LongSide = (function (_super) {
  __extends(LongSide, _super);
  function LongSide() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  LongSide.prototype.comparer = function (a, b) {
    var aSides = sides(a);
    var bSides = sides(b);
    if (aSides.long === bSides.long) {
      return aSides.short < bSides.short ? -1 : 1;
    } else {
      return aSides.long < bSides.long ? -1 : 1;
    }
  };
  return LongSide;
})(Sorter);
var Perimeter = (function (_super) {
  __extends(Perimeter, _super);
  function Perimeter() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Perimeter.prototype.comparer = function (a, b) {
    return perimeter(a) < perimeter(b) ? -1 : 1;
  };
  return Perimeter;
})(Sorter);
var Differences = (function (_super) {
  __extends(Differences, _super);
  function Differences() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Differences.prototype.comparer = function (a, b) {
    return Math.abs(a.width - a.height) < Math.abs(b.width - b.height) ? -1 : 1;
  };
  return Differences;
})(Sorter);
var Ratio = (function (_super) {
  __extends(Ratio, _super);
  function Ratio() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Ratio.prototype.comparer = function (a, b) {
    return a.width / a.height < b.width / b.height ? -1 : 1;
  };
  return Ratio;
})(Sorter);
var SortStrategy;
(function (SortStrategy) {
  SortStrategy[(SortStrategy["Area"] = 0)] = "Area";
  SortStrategy[(SortStrategy["ShortSide"] = 1)] = "ShortSide";
  SortStrategy[(SortStrategy["LongSide"] = 2)] = "LongSide";
  SortStrategy[(SortStrategy["Perimeter"] = 3)] = "Perimeter";
  SortStrategy[(SortStrategy["Differences"] = 4)] = "Differences";
  SortStrategy[(SortStrategy["Ratio"] = 5)] = "Ratio";
})(SortStrategy || (SortStrategy = {}));
var SortDirection;
(function (SortDirection) {
  SortDirection[(SortDirection["ASC"] = 0)] = "ASC";
  SortDirection[(SortDirection["DESC"] = 1)] = "DESC";
})(SortDirection || (SortDirection = {}));
function GetSortImplementation(strategy, direction) {
  var impl;
  switch (strategy) {
    case SortStrategy.Area:
      impl = Area;
      break;
    case SortStrategy.Differences:
      impl = Differences;
      break;
    case SortStrategy.LongSide:
      impl = LongSide;
      break;
    case SortStrategy.Perimeter:
      impl = Perimeter;
      break;
    case SortStrategy.Ratio:
      impl = Ratio;
      break;
    case SortStrategy.ShortSide:
      impl = ShortSide;
      break;
  }
  return new impl(direction);
}

function PackStrategy(_a) {
  var binHeight = _a.binHeight,
    binWidth = _a.binWidth,
    items = _a.items,
    selectionStrategy = _a.selectionStrategy,
    splitStrategy = _a.splitStrategy,
    sortStrategy = _a.sortStrategy,
    sortOrder = _a.sortOrder,
    kerfSize = _a.kerfSize,
    allowRotation = _a.allowRotation;

  var binCount = 0;
  var freeRectangles = [];
  var createBin = function () {
    binCount++;
    freeRectangles.push({
      width: binWidth,
      height: binHeight,
      x: 0,
      y: 0,
      bin: binCount,
      id: "root",
    });
  };
  var splitter = GetSplitImplementation(splitStrategy, kerfSize);
  var selector = GetSelectionImplementation(selectionStrategy);
  var sorter = GetSortImplementation(sortStrategy, sortOrder);
  var sortedItems = sorter.sort(items);
  var rotateItem = function (item) {
    return __assign(__assign({}, item), {
      height: item.width,
      width: item.height,
    });
  };
  var splitRectangle = function (_a) {
    var rectangle = _a.rectangle,
      item = _a.item;
    return splitter.split(rectangle, item).filter(function (r) {
      return r.width > 0 && r.height > 0;
    });
  };
  var getSelectionOption = function (item) {
    var rectangle = selector.select(freeRectangles, item);

    if (!rectangle) {
      return null;
    }
    var splitRectangles = splitRectangle({ rectangle: rectangle, item: item });
    return {
      rectangle: rectangle,
      splitRectangles: splitRectangles,
      item: item,
    };
  };
  var selectRectangleOption = function (item) {
    var originalOption = getSelectionOption(item);
    var rotatedOption = null;
    var rotatedItem;
    if (allowRotation) {
      rotatedItem = rotateItem(item);
      rotatedOption = getSelectionOption(rotatedItem);
    }
    if (originalOption === null && rotatedOption === null) {
      return null;
    } else if (originalOption === null) {
      return rotatedOption;
    } else if (rotatedOption === null) {
      return originalOption;
    } else {
      var getBiggestSplitRectangle = function (_a) {
        var splitRectangles = _a.splitRectangles;
        return Math.max.apply(
          Math,
          splitRectangles.map(function (split) {
            return split.height * split.width;
          })
        );
      };
      var originalMax = getBiggestSplitRectangle(originalOption);
      var rotatedMax = getBiggestSplitRectangle(rotatedOption);
      if (
        getBiggestSplitRectangle(originalOption) >=
        getBiggestSplitRectangle(rotatedOption)
      ) {
        return originalOption;
      } else {
        return rotatedOption;
      }
    }
  };
  var packedItems = sortedItems
    .map(function (item, idx) {
      var selectedOption = selectRectangleOption(item);
      if (!selectedOption) {
        createBin();
        selectedOption = selectRectangleOption(item);
      }
      if (!selectedOption) {
        throw new Error(
          "item at index " +
            idx +
            " with dimensions " +
            item.width +
            "x" +
            item.height +
            " exceeds bin dimensions of " +
            binWidth +
            "x" +
            binHeight
        );
      }
      var rectangle = selectedOption.rectangle,
        splitRectangles = selectedOption.splitRectangles;
      var _a = selectedOption.item,
        width = _a.width,
        height = _a.height,
        otherItemProps = __rest(_a, ["width", "height"]);
      var packedItem = {
        item: otherItemProps,
        width: width,
        height: height,
        x: rectangle.x,
        y: rectangle.y,
        bin: rectangle.bin,
      };
      var rectIndex = freeRectangles.findIndex(function (r) {
        return r === rectangle;
      });
      freeRectangles.splice.apply(
        freeRectangles,
        __spreadArrays([rectIndex, 1], splitRectangles)
      );
      return packedItem;
    })
    .reduce(function (bins, item) {
      if (bins.length >= item.bin) {
        bins[item.bin - 1].push(item);
      } else {
        bins.push([item]);
      }
      return bins;
    }, []);
  return {
    sortStrategy: sortStrategy,
    sortOrder: sortOrder,
    packedItems: packedItems,
    splitStrategy: splitStrategy,
    selectionStrategy: selectionStrategy,
  };
}

var f = function (a, b) {
  var _a;
  return (_a = []).concat.apply(
    _a,
    a.map(function (d) {
      return b.map(function (e) {
        return [].concat(d, e);
      });
    })
  );
};
var cartesian = function (a, b) {
  var c = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    c[_i - 2] = arguments[_i];
  }
  return b ? cartesian.apply(void 0, __spreadArrays([f(a, b)], c)) : a;
};

function Packer(_a, _b) {
  var binHeight = _a.binHeight,
    binWidth = _a.binWidth,
    items = _a.items;
  var _c = _b === void 0 ? {} : _b,
    selectionStrategy = _c.selectionStrategy,
    splitStrategy = _c.splitStrategy,
    sortStrategy = _c.sortStrategy,
    _d = _c.kerfSize,
    kerfSize = _d === void 0 ? 0 : _d,
    _e = _c.allowRotation,
    allowRotation = _e === void 0 ? true : _e;
  function enumToArray(enumVariable) {
    return Object.values(enumVariable)
      .filter(function (value) {
        return parseInt(value, 10) >= 0;
      })
      .map(function (value) {
        return value;
      });
  }
  var selectionStrategies =
    selectionStrategy !== undefined
      ? [selectionStrategy]
      : enumToArray(SelectionStrategy);
  var splitStrategies =
    splitStrategy !== undefined ? [splitStrategy] : enumToArray(SplitStrategy);
  var sortStrategies =
    sortStrategy !== undefined ? [sortStrategy] : enumToArray(SortStrategy);
  var allStrategies = cartesian(
    selectionStrategies,
    splitStrategies,
    sortStrategies,
    [SortDirection.ASC, SortDirection.DESC]
  );
  return allStrategies
    .map(function (_a) {
      var selectionStrategy = _a[0],
        splitStrategy = _a[1],
        sortStrategy = _a[2],
        sortOrder = _a[3];
      return PackStrategy({
        binWidth: binWidth,
        binHeight: binHeight,
        items: items,
        splitStrategy: splitStrategy,
        selectionStrategy: selectionStrategy,
        sortStrategy: sortStrategy,
        sortOrder: sortOrder,
        kerfSize: kerfSize,
        allowRotation: allowRotation,
      });
    })
    .reduce(function (bestCompressed, packResult) {
      var splitStrategy = packResult.splitStrategy,
        sortStrategy = packResult.sortStrategy,
        selectionStrategy = packResult.selectionStrategy,
        sortOrder = packResult.sortOrder,
        packedItems = packResult.packedItems;

      if (!bestCompressed || packedItems.length < bestCompressed.length) {
        return packedItems;
      } else {
        return bestCompressed;
      }
    }, null);
}

export { SelectionStrategy, SortStrategy, SplitStrategy, Packer as packer };
