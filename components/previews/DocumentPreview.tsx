import React from "react";
import Link from 'next/link'

export default function DocumentPreview({content}: any) {

    console.log(content);

    return (
        <div>
            <Link
                href={{
                    pathname: `/[document]`,
                    query: {document: content.slug}
                }}
            >
                <a className={"agenda__preview__title"}>{content.title}</a>
            </Link>
        </div>
    )
    
}
