import { create } from "zustand";
import {handleOptions} from "@/utils";
import {
  booleanMap,
  genderMap,
  resideEstatePriceMap,
} from "@/constants";

export interface optionItem {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
  children?: optionItem[];
}

export interface optionsProps {
  gender?: optionItem[];
  resideEstatePrice?: optionItem[]; // 小区价格
  carBrand?: any[];
  phoneBrand?: any[];
}

// 创建状态存储
interface paramsState extends optionsProps {
  setOptions: (data: optionsProps) => void;
  carBrand?: any[];
  phoneBrand?: any[];
  // setForm: (formData: any) => void;
}

const booleanOptions = handleOptions(booleanMap);
const booleanAllOptions = ([{value: -1, label: '不限'}] as any[]).concat(booleanOptions)
const genderOptions = handleOptions(genderMap).filter(item => item.value !== -1)
const resideEstatePriceOptions = handleOptions(resideEstatePriceMap)


//
export const useCrowdPackStore = create<paramsState>((set, get) => ({
  gender: genderOptions,
  resideEstatePrice: resideEstatePriceOptions,

  setOptions: (data: optionsProps) => {
    set({...data})
  },

}))
