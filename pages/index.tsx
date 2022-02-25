import React from "react";
import {getSection} from "../functions/api/sections";
import {Includes} from "../enums/Includes";
import {Section} from "../interfaces/Section";
import { NextPage } from "next";
import ContentsList from "../components/ContentsList";

export async function getServerSideProps() {

    //fetch the home section
    let currentSection = await getSection("accueil", [Includes.Children, Includes.ChildrenContents]);

    return {
        props: {
            currentSection
        }
    }
}

interface Props {
    currentSection : Section
}

const Home: NextPage<Props> = ({currentSection} : Props) => {

    return (
        <>
            <div>
                {currentSection.children.map((subsection: Section) => {
                    return (
                        <div key={subsection.identifier}>
                            <h1 >
                                {subsection.title}
                            </h1>
                            <ContentsList section={subsection}/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Home
