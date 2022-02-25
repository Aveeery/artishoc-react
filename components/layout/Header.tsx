import React, {useEffect, useState, FC } from "react";
import {getSection} from '../../functions/api/sections';
import Link from 'next/link'
import {generateNavbarHref} from '../../functions/utils'
import {Includes} from "../../enums/Includes";
import { hasContents, isPublished, isUniqueContent, undisplayableSection } from "../../functions/helpers/section";
import { Section } from "../../interfaces/Section";


const Header: FC = () => {

    const [subMenuSections, setSubMenuSections] = useState<Section[]>([])

    useEffect(() => {
        (async function getMenuSections() {
            let section = await getSection("menu-principal", [Includes.Children, Includes.ChildrenChidren])

            if (section) {
                setSubMenuSections(section.children.filter( subSection => (isPublished(subSection) && subSection.identifier !== process.env.homeSectionIdentifier)));
            }
        })();
    }, [])


    if (!subMenuSections) {
        return null;
    }
    return (
        <div className="navbar">
            {subMenuSections.map((section) => {
                if (undisplayableSection(section)){
                    return null
                }
                else if (isUniqueContent(section) || section.identifier === process.env.seasonSectionIdentifier) {
                    console.log(section)
                    return (
                        <div className="navbar__item" key={`item-${section.id}`}>
                            <Link
                                href={generateNavbarHref(section)}>
                                <a className="navbar__item__link">{section.title}</a>
                            </Link>
                        </div>
                    )
                } else {
                    return (
                        <div className="navbar__item" key={`item-${section.id}`}>
                
                            <span className="navbar__item__link">{section.title}</span>

                            <div className="navbar__item__sublinks">
                                {section.children.map((subsection: Section) => {
                                    if (undisplayableSection(subsection)){
                                        return null
                                    }
                                    return (
                                        <Link
                                            key={`link-${subsection.id}`}
                                            href={generateNavbarHref(subsection)}>
                                            <a className="navbar__item__sublink">{subsection.title}</a>
                                        </Link>)
                                })}
                            </div>
                        </div>
                    )
                }
            })
            }
        </div>
    )
}

export default Header
