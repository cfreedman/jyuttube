export type LanguageFields = "hanzi" | "jyutping" | "pinyin";

export type RenderSettings =  {
  [key in LanguageFields]: boolean;
}

export const defaultRenderSettings: RenderSettings = {
  hanzi: false,
  jyutping: true,
  pinyin: false,
};