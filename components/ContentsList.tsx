import React, { FC } from "react";
import {Content} from "../interfaces/Content";
import AgendaPreview from "./previews/AgendaPreview";
import DocumentPreview from "./previews/DocumentPreview";
import {isDocument, isAgenda} from "../functions/helpers/content"
import { Section } from "../interfaces/Section";

interface Props {
    section : Section
}

const ContentsList: FC<Props> = ({section}: Props) => {

    return <div className={"list__container"}> {
        section.contents.map((content: Content) => {

            if (!content) {
                return
            } else if (isAgenda(content)) {
                return <AgendaPreview key={content.id} content={content}/>
            } else if (isDocument(content)) {
                return <DocumentPreview key={content.id} content={content}/>
            }
        })
    }
    </div>
    
}

export default ContentsList
