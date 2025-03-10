// @flow strict
import defaultTwoColumnModuleLayout from './defaultTwoColumnModuleLayout';
import HeightsStore from './HeightsStore';
import MeasurementStore from './MeasurementStore';
import { type Position } from './types';

type Item = {
  name: string,
  height: number,
  color?: string,
};

// Tests copied from defaultLayout to ensure we don't break default cases
describe('defaultLayout test cases', () => {
  test('empty', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const items: $ReadOnlyArray<Item> = [];

    const layout = defaultTwoColumnModuleLayout({
      measurementCache: measurementStore,
      positionCache,
      justify: 'start',
      rawItemCount: items.length,
      width: 486,
    });
    expect(layout(items)).toEqual([]);
  });

  test('one row', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const items: $ReadOnlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 120, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 80, 'color': '#FAB032' },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultTwoColumnModuleLayout({
      measurementCache: measurementStore,
      positionCache,
      justify: 'start',
      rawItemCount: items.length,
      width: 736,
    });
    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 0, width: 236 },
      { top: 0, height: 120, left: 250, width: 236 },
      { top: 0, height: 80, left: 500, width: 236 },
    ]);
  });

  test('wrapping items', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const items: $ReadOnlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 80 },
      { 'name': 'Pin 3', 'height': 100 },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultTwoColumnModuleLayout({
      measurementCache: measurementStore,
      positionCache,
      justify: 'start',
      rawItemCount: items.length,
      width: 486,
    });
    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 0, width: 236 },
      { top: 0, height: 120, left: 250, width: 236 },
      { top: 114, height: 80, left: 0, width: 236 },
      { top: 134, height: 100, left: 250, width: 236 },
    ]);
  });

  test('centers grid within the viewport', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const items: $ReadOnlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 80 },
      { 'name': 'Pin 3', 'height': 100 },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultTwoColumnModuleLayout({
      measurementCache: measurementStore,
      positionCache,
      justify: 'start',
      minCols: 2,
      rawItemCount: items.length,
      width: 8000,
    });

    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 7, width: 236 },
      { top: 0, height: 120, left: 257, width: 236 },
      { top: 0, height: 80, left: 507, width: 236 },
      { top: 0, height: 100, left: 757, width: 236 },
    ]);
  });

  test('floors values when centering', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const items: $ReadOnlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 80 },
      { 'name': 'Pin 3', 'height': 100 },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });
    const layout = defaultTwoColumnModuleLayout({
      measurementCache: measurementStore,
      positionCache,
      justify: 'start',
      rawItemCount: items.length,
      width: 501,
    });

    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 7, width: 236 },
      { top: 0, height: 120, left: 257, width: 236 },
      { top: 114, height: 80, left: 7, width: 236 },
      { top: 134, height: 100, left: 257, width: 236 },
    ]);
  });

  test('only centers when theres extra space', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const items: $ReadOnlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 80 },
      { 'name': 'Pin 3', 'height': 100 },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });
    const layout = defaultTwoColumnModuleLayout({
      measurementCache: measurementStore,
      positionCache,
      justify: 'start',
      rawItemCount: items.length,
      width: 200,
    });

    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 0, width: 236 },
      { top: 0, height: 120, left: 250, width: 236 },
      { top: 114, height: 80, left: 0, width: 236 },
      { top: 134, height: 100, left: 250, width: 236 },
    ]);
  });

  test('justify', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const items: $ReadOnlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 80 },
      { 'name': 'Pin 3', 'height': 100 },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const makeLayout = (justify: 'center' | 'start') =>
      defaultTwoColumnModuleLayout({
        measurementCache: measurementStore,
        positionCache,
        columnWidth: 100,
        gutter: 0,
        justify,
        width: 1000,
        rawItemCount: items.length,
      })(items);

    const justifyStart = makeLayout('start');
    positionCache.reset();
    const justifyCenter = makeLayout('center');

    expect(justifyStart).toEqual([
      { top: 0, left: 0, width: 100, height: 100 },
      { top: 0, left: 100, width: 100, height: 120 },
      { top: 0, left: 200, width: 100, height: 80 },
      { top: 0, left: 300, width: 100, height: 100 },
    ]);

    expect(justifyCenter).toEqual([
      { top: 0, left: 300, width: 100, height: 100 },
      { top: 0, left: 400, width: 100, height: 120 },
      { top: 0, left: 500, width: 100, height: 80 },
      { top: 0, left: 600, width: 100, height: 100 },
    ]);
  });
});

describe('two column layout test cases', () => {
  test('returns positions for all items', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const heightsCache = new HeightsStore();
    const items = [
      { 'name': 'Pin 0', 'height': 200, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 201, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 202, 'color': '#FAB032' },
      { 'name': 'Pin 3', 'height': 203, 'color': '#EDF21D' },
      { 'name': 'Pin 4', 'height': 204, 'color': '#CF4509' },
      { 'name': 'Pin 5', 'height': 205, 'color': '#230BAF' },
      { 'name': 'Pin 6', 'height': 206, 'color': '#67076F' },
      { 'name': 'Pin 7', 'height': 207, 'color': '#AB032E' },
      { 'name': 'Pin 8', 'height': 208, 'color': '#DF21DC' },
      { 'name': 'Pin 9', 'height': 209, 'color': '#F45098' },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultTwoColumnModuleLayout({
      columnWidth: 240,
      measurementCache: measurementStore,
      heightsCache,
      justify: 'start',
      minCols: 3,
      positionCache,
      rawItemCount: items.length,
      width: 1200,
    });
    // perform single column layout first since we expect two column items on second page+ currently
    layout(items);

    const newItems = [
      { name: 'Pin 10', height: 210, color: '#30BAF6' },
      { name: 'Pin 11', height: 211, color: '#7076FA' },
      { name: 'Pin 12', height: 212, color: '#B032ED' },
      { name: 'Pin 13', height: 213, color: '#F21DCF', columnSpan: 2 },
      { name: 'Pin 14', height: 214, color: '#45098F' },
    ];
    newItems.forEach((item) => {
      measurementStore.set(item, item.height);
    });
    const updatedItems = items.concat(newItems);
    const positions = layout(updatedItems);
    expect(positions.length).toEqual(updatedItems.length);
    expect(positions).toEqual([
      { 'height': 210, 'left': 607, 'top': 436, 'width': 240 },
      { 'height': 212, 'left': 861, 'top': 438, 'width': 240 },
      { 'height': 214, 'left': 99, 'top': 654, 'width': 240 },
      { 'height': 213, 'left': 353, 'top': 660, 'width': 494 },
      { 'height': 200, 'left': 99, 'top': 0, 'width': 240 },
      { 'height': 201, 'left': 353, 'top': 0, 'width': 240 },
      { 'height': 202, 'left': 607, 'top': 0, 'width': 240 },
      { 'height': 203, 'left': 861, 'top': 0, 'width': 240 },
      { 'height': 204, 'left': 99, 'top': 214, 'width': 240 },
      { 'height': 205, 'left': 353, 'top': 215, 'width': 240 },
      { 'height': 206, 'left': 607, 'top': 216, 'width': 240 },
      { 'height': 207, 'left': 861, 'top': 217, 'width': 240 },
      { 'height': 208, 'left': 99, 'top': 432, 'width': 240 },
      { 'height': 209, 'left': 353, 'top': 434, 'width': 240 },
      { 'height': 211, 'left': 861, 'top': 664, 'width': 240 },
    ]);
  });

  test('returns positions for all items when two columns item is on a large batch', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const heightsCache = new HeightsStore();
    const items = [
      { 'name': 'Pin 0', 'height': 200, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 201, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 202, 'color': '#FAB032' },
      { 'name': 'Pin 3', 'height': 203, 'color': '#EDF21D' },
      { 'name': 'Pin 4', 'height': 204, 'color': '#CF4509' },
      { 'name': 'Pin 5', 'height': 205, 'color': '#230BAF' },
      { 'name': 'Pin 6', 'height': 206, 'color': '#67076F' },
      { 'name': 'Pin 7', 'height': 207, 'color': '#AB032E' },
      { 'name': 'Pin 8', 'height': 208, 'color': '#DF21DC' },
      { 'name': 'Pin 9', 'height': 209, 'color': '#F45098' },
      { 'name': 'Pin 10', 'height': 210, 'color': '#30BAF6' },
      { 'name': 'Pin 11', 'height': 211, 'color': '#7076FA' },
      { 'name': 'Pin 12', 'height': 212, 'color': '#B032ED' },
      { 'name': 'Pin 13', 'height': 213, 'color': '#F21DCF', 'columnSpan': 2 },
      { 'name': 'Pin 14', 'height': 214, 'color': '#45098F' },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultTwoColumnModuleLayout({
      columnWidth: 240,
      measurementCache: measurementStore,
      heightsCache,
      justify: 'start',
      minCols: 3,
      positionCache,
      rawItemCount: items.length,
      width: 1200,
    });

    const positions = layout(items);
    const orderedPositions = items.map((item) => positionCache.get(item));

    expect(positions.length).toEqual(items.length);
    expect(orderedPositions).toEqual([
      { height: 200, left: 99, top: 0, width: 240 },
      { height: 201, left: 353, top: 0, width: 240 },
      { height: 202, left: 607, top: 0, width: 240 },
      { height: 203, left: 861, top: 0, width: 240 },
      { height: 204, left: 99, top: 214, width: 240 },
      { height: 205, left: 353, top: 215, width: 240 },
      { height: 206, left: 607, top: 216, width: 240 },
      { height: 207, left: 861, top: 217, width: 240 },
      { height: 208, left: 99, top: 432, width: 240 },
      { height: 209, left: 353, top: 434, width: 240 },
      { height: 210, left: 607, top: 436, width: 240 },
      { height: 211, left: 861, top: 664, width: 240 },
      { height: 212, left: 861, top: 438, width: 240 },
      { height: 213, left: 353, top: 660, width: 494 },
      { height: 214, left: 99, top: 654, width: 240 },
    ]);
  });

  test('correctly position two column item when initial heights are 0', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const heightsCache = new HeightsStore();
    const items = [
      { 'name': 'Pin 0', 'height': 200, 'color': '#E230BA', 'columnSpan': 2 },
      { 'name': 'Pin 1', 'height': 201, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 202, 'color': '#FAB032' },
      { 'name': 'Pin 3', 'height': 203, 'color': '#EDF21D' },
      { 'name': 'Pin 4', 'height': 204, 'color': '#CF4509' },
      { 'name': 'Pin 5', 'height': 205, 'color': '#230BAF' },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultTwoColumnModuleLayout({
      columnWidth: 240,
      measurementCache: measurementStore,
      heightsCache,
      justify: 'start',
      minCols: 3,
      positionCache,
      rawItemCount: items.length,
      width: 1200,
    });

    const positions = layout(items);
    const orderedPositions = items.map((item) => positionCache.get(item));

    expect(positions.length).toEqual(items.length);
    expect(orderedPositions).toEqual([
      { height: 200, left: 99, top: 0, width: 494 },
      { height: 201, left: 607, top: 0, width: 240 },
      { height: 202, left: 861, top: 0, width: 240 },
      { height: 203, left: 99, top: 214, width: 240 },
      { height: 204, left: 353, top: 214, width: 240 },
      { height: 205, left: 607, top: 215, width: 240 },
    ]);
  });
});
