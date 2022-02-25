import React from "react";
import { NextPage } from 'next';
import { getSection } from '../functions/api/sections';
import {getContent} from "../functions/api/contents";
import { Includes } from "../enums/Includes";
import { Content } from "../interfaces/Content";

export async function getServerSideProps(context: any) {

    //fetch the list slug from the context
    const { document: slug } = context.params;
    let content = null;

    let section = await getSection(slug, [Includes.Contents]);

    //if coming from a navbar link, we should have a section slug to get its first and unique content
    //otherwise, we fetch a content from its url
    content = section ? section.contents[0] : await getContent(slug);
    
    return {
        props: {
            content
        }
    }
}

interface Props {
    content?: Content,
    error?: boolean
}

const Document: NextPage<Props> = ({ content }: Props) => {

    if (!content) {
        return null;
    }
    return (
        <>
            <div>
                <h1>DOCUMENT</h1>
                <h1>{content.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content.summary }} />
                <div dangerouslySetInnerHTML={{ __html: content.body }} />
            </div>
        </>
    )
}

export default Document
