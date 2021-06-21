import React, {useCallback, useEffect, useState} from "react";
import SecretForm from "./form";
import {retrieveSecret} from "../../../crypto";
import Loading from "../../atoms/Loading";
import Result from "./Result";
import Error from './Error';
import Link from "next/link";
import Head from "next/head";

enum Step {
    URL_PARSE,
    INPUTS,
    PROCESSING,
    DONE,
    ERROR,
}

export default function Secret() {
    const [step, setStep] = useState<Step>(Step.URL_PARSE);
    const [urlKey, setUrlKey] = useState<string>('');
    const [secret, setSecret] = useState<string|undefined>(undefined);
    useEffect(() => {
        const params = window.location.hash
            .replace('#','')
            .split('&');
        if(params.length === 3){
            const [saltId, searchKey, keypass] = window.location.hash
                .replace('#','')
                .split('&')
                .map(decodeURIComponent);
            setUrlKey(keypass);
        }
        setStep(Step.INPUTS);
    }, []);

    const handleFormSubmit = useCallback((formData) => {
        if (step === Step.INPUTS) {
            setStep(Step.PROCESSING);
            const [saltId, searchKey] = window.location.hash
                .replace('#','')
                .split('&')
                .map(decodeURIComponent);
            retrieveSecret(saltId, searchKey, formData.key)
                .then(secret => {
                    setSecret(secret);
                    setStep(Step.DONE);
                })
                .catch(() => {
                    setStep(Step.ERROR);
                })
        }
    },[step]);

    const isError = step === Step.ERROR || (step === Step.DONE && secret === undefined);

    return (<>
        <Head>
            <title>A secret shared | transientsecret.com</title>
            <meta property="og:url" content="transientsecret.com/secret" />
            <meta property="og:title" content="A secret shared | transientsecret.com" />
            <meta property="og:description" content="A secret shared with transientsecret.com" />
        </Head>
        <>
            <h1>Burn before decrypt <br/> secret sharing app</h1>
            {step === Step.INPUTS && <SecretForm defaultKey={urlKey} onSubmit={handleFormSubmit} />}
            {step === Step.PROCESSING && <Loading />}
            {step === Step.DONE && secret && <Result secret={secret} />}
            {isError && <Error />}
            <p><Link href="/how-it-works"><a>Want to know how it works?</a></Link></p>
        </>
    </>);
}
