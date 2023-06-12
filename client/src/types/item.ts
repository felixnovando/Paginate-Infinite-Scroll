export type Item = {
    id: number,
    name: string,
    price: number
}

export type ItemPaginate = {
    currentPage: number,
    totalPage: number,
    data: Item[]
}

export type ItemInfiniteScroll = {
    hasMoreData: boolean,
    data: Item[]
}