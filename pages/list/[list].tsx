import React from "react";
import {NextPage} from 'next';
import {getSection } from '../../functions/api/sections';
import ContentsList from "../../components/ContentsList";
import {Includes} from "../../enums/Includes";

export async function getServerSideProps(context: any) {

    //fetch the list slug from the context
    const {list: sectionSlug} = context.params;

    let currentSection = await getSection(sectionSlug, [Includes.Children, Includes.Contents]);

    return {
        props: {
            currentSection
        }
    }
}

const List: NextPage = (props: any) => {

    return (
        <>
            <ContentsList section={props.currentSection}></ContentsList>
        </>
    )
}

export default List
