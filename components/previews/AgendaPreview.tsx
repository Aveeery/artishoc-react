import React from "react";
import Link from 'next/link'

export default function AgendaPreview({content}: any) {

    console.log(content);

    return (
        <div>
            <Link
                href={{
                    pathname: `/event/[agenda]`,
                    query: {agenda: content.slug}
                }}
            >
                <a className={"agenda__preview__title"}>{content.title}</a>
            </Link>
        </div>
    )
    
}
