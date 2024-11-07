import { create } from "zustand"

interface Query {

    search?: string | undefined;
    sort?: string | undefined;
    platform?: number | undefined;
    genre?: number | undefined;
}

interface QueryStore {
    query: Query;
    setSearch: (search: string) => void;
    setSort: (sort: string) => void;
    setPlatform: (platform: number | undefined) => void;
    setGenre: (genre: number | undefined) => void;
}

const useQueryStore = create<QueryStore>((set) => ({
    query: {},
    setSearch: (search) => set((store) => ({ query: { ...store.query, search } })),
    setSort: (sort) => set((store) => ({ query: { ...store.query, sort } })),
    setPlatform: (platform) => set((store) => ({ query: { ...store.query, platform } })),
    setGenre: (genre) => set((store) => ({ query: { ...store.query, genre } })),
}))

export default useQueryStore;