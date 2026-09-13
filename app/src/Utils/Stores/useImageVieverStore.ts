import { create } from "zustand"

export type Image = {
    url:string,
    title:string
}

type ImageVieverState = {
    active:boolean,
    images:Image[],
    imageIndex:number,
    addIndex:(indexToAdd : number) => void,
    prepare:(images : Image[], imageIndex : number) => void,
    clear:() => void,
    getCurrentImage:() => Image,
}

const useImageVieverStore = create<ImageVieverState>((set, get) => ({
    active:false,
    images:[],
    imageIndex:0,
    prepare:(images, imageIndex) => set(() => ({images, imageIndex, active:true})),
    addIndex:(indexToAdd) => set((store) => ({imageIndex:store.imageIndex + indexToAdd})),
    clear:() => set(() => ({active:false})),
    getCurrentImage:() => get().images[get().imageIndex]
}))

export {useImageVieverStore}