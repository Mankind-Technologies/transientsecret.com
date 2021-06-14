import React from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";


interface Props {
    body: string,
    slug:string,
    title: string,
    description: string,
}

const HowItWorks = (props:Props) => {
    return (
        <>
            <Head>
                <title>How it works | transientsecret.com</title>
                <meta property="og:url" content="transientsecret.com/how-it-works" />
                <meta property="og:title" content="How It Works | transientsecret.com" />
                <meta property="og:description" content="How transientsecret.com works" />
            </Head>
            <main>
                <div className="container">
                    <div>
                        <ReactMarkdown>
                            {props.body}
                        </ReactMarkdown>
                    </div>
                </div>
            </main>
        </>
    )
};

export default HowItWorks;
