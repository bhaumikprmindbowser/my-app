import {useDispatch, useSelector} from "react-redux";
import type {RootState, AppDispatch} from "@/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
