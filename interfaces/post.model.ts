import { NextPageContext } from "next";

export interface IMyPost {
    id: string | number;
    title: string;
    description: string;
    link: string;
}

export interface IPostNextPageContext extends NextPageContext {
    query: { 
        id: string;
    }
}

export interface IPostPageProps {
    post: IMyPost;
}