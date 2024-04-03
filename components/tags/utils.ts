/**
 * hexをrgbに変換
 */
export function hexToRgb(hex: string): {r: number; g: number; b: number} {
  // 16進数の文字列をRGBに変換
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return {r, g, b};
}

/**
 * rgbをhslに変換
 */
export function rgbToHsl(
  r: number,
  g: number,
  b: number
): {h: number; s: number; l: number} {
  // RGBを0～1の範囲に正規化
  const _r = r / 255;
  const _g = g / 255;
  const _b = b / 255;
  // 最大値と最小値を取得
  const max = Math.max(_r, _g, _b);
  const min = Math.min(_r, _g, _b);
  // 色相(Hue)の計算
  let h = 0;
  if (max === min) {
    // 同じ場合は何もしない
  } else if (max === _r) {
    h = 60 * ((_g - _b) / (max - min)) + 0;
  } else if (max === _g) {
    h = 60 * ((_b - _r) / (max - min)) + 120;
  } else {
    h = 60 * ((_r - _g) / (max - min)) + 240;
  }
  // 彩度(Saturation)の計算
  const s = (max - min) * 100;
  // 明度(Lightness)の計算
  const l = ((max + min) / 2) * 100;
  // 小数点以下は切り捨てて返却
  return {h: Math.floor(h), s: Math.floor(s), l: Math.floor(l)};
}

/**
 * クエリストリングから絞り込み対象のタグ名を取得
 */
export function getSearchTag(searchParams: {
  [key: string]: string | string[] | undefined;
}): string {
  const searchTag = searchParams.tag;
  if (typeof searchTag === 'string') {
    return searchTag;
  } else {
    // 今は1件の絞り込みのみなので、undefinedだけではなく配列の場合でも空文字を返す
    return '';
  }
}
