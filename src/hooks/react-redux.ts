import {
  useSelector as _useSelector,
  useDispatch as _useDispatch,
  type TypedUseSelectorHook
} from 'react-redux';

import type { StoreState, StoreDispatch } from '@/store';

export const useSelector: TypedUseSelectorHook<StoreState> = _useSelector;
export const useDispatch: () => StoreDispatch = _useDispatch;
