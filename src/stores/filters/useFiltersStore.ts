import { create } from 'zustand';

export const VALUE_RANGE_MIN = 0;
export const VALUE_RANGE_MAX = 500_000_000;

export interface FiltersState {
    categories: string[];
    regions: string[];
    valueMin: number;
    valueMax: number;
}

interface FiltersActions {
    toggleCategory: (category: string) => void;
    toggleRegion: (region: string) => void;
    setValueMin: (value: number) => void;
    setValueMax: (value: number) => void;
    clearAll: () => void;
    set: (partial: Partial<FiltersState>) => void;
}

const initialState: FiltersState = {
    categories: [],
    regions: [],
    valueMin: VALUE_RANGE_MIN,
    valueMax: VALUE_RANGE_MAX,
};

export const useFiltersStore = create<FiltersState & FiltersActions>()((set) => ({
    ...initialState,

    toggleCategory: (category) =>
        set((state) => ({
            categories: state.categories.includes(category)
                ? state.categories.filter((c) => c !== category)
                : [...state.categories, category],
        })),

    toggleRegion: (region) =>
        set((state) => ({
            regions: state.regions.includes(region)
                ? state.regions.filter((r) => r !== region)
                : [...state.regions, region],
        })),

    setValueMin: (value) =>
        set((state) => ({
            valueMin: Math.max(VALUE_RANGE_MIN, Math.min(value, state.valueMax)),
        })),

    setValueMax: (value) =>
        set((state) => ({
            valueMax: Math.min(VALUE_RANGE_MAX, Math.max(value, state.valueMin)),
        })),

    clearAll: () => set(initialState),
    set: (partial) => set(partial),
}));

export function countActiveFilters(state: FiltersState): number {
    let count = 0;
    if (state.categories.length > 0) count += 1;
    if (state.regions.length > 0) count += 1;
    if (state.valueMin > VALUE_RANGE_MIN || state.valueMax < VALUE_RANGE_MAX) count += 1;
    return count;
}
