import React from "react";
import {NextPage} from 'next';
import {getContent} from "../../functions/api/contents";
import { Includes } from "../../enums/Includes";
import {Content} from "../../interfaces/Content";

export async function getServerSideProps(context: any) {

    //fetch the list slug from the context
    const {agenda: agendaSlug} = context.params;
    let content = await getContent(agendaSlug);

    return {
        props: {
            content
        }
    }
}

interface Props {
    content? : Content,
    error? : boolean
}

const Agenda: NextPage<Props> = ({content}: Props) => {

    if (!content) {
        return null;
    }
    return (
        <>
            <div>
                <h1>Agenda</h1>
                <h1>{content.title}</h1>
                <div dangerouslySetInnerHTML={{__html: content.summary}}/>
                <div dangerouslySetInnerHTML={{__html: content.body}}/>
            </div>
        </>
    )
}

export default Agenda
