import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {State, AppDispatch, AsyncThunkConfig} from '@/types/state';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const createAppAsyncThunk = createAsyncThunk.withTypes<AsyncThunkConfig>();
