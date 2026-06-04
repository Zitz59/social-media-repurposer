import React from 'react';

type ResultSectionProps = {
    title: string;
    content: string;
}

const ResultSection = ({title, content}: ResultSectionProps) => {
    return (
            <section>
                <h2>{title}</h2>
                <article>{content}</article>
            </section>
    );
};

export default ResultSection;