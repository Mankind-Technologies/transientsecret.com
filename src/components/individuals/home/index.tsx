import React, {useCallback, useState} from "react";
import HomeForm, {SecretFormData} from "./form";
import {storeSecret, StoreSecretData} from "../../../crypto";
import Loading from "../../atoms/Loading";
import Result from "./Result";
import Link from 'next/link';
import Head from "next/head";

enum Step {
    INPUTS,
    PROCESSING,
    DONE
}

export default function Home() {
    const [step, setStep] = useState<Step>(Step.INPUTS);
    const [data, setData] = useState<StoreSecretData>();
    const [formData, setFormData] = useState<SecretFormData>();
    const handleFormSubmit = useCallback((formData) => {
        setFormData(formData);
        setStep(Step.PROCESSING)
        storeSecret(formData.secret, formData.key)
            .then(data => {
                setData(data);
                setStep(Step.DONE);
            })
    },[]);

    return (
        <>
            <Head>
                <title>Share secrets | transientsecret.com</title>
                <meta property="og:url" content="" />
                <meta property="og:title" content="Share secrets | transientsecret.com" />
                <meta property="og:description" content="Share secrets with transientsecret.com" />
            </Head>
            <>
                <h1>Burn before decrypt <br/> secret sharing app</h1>
                {step === Step.INPUTS && <HomeForm onSubmit={v => handleFormSubmit(v)} />}
                {step === Step.PROCESSING && <Loading />}
                {step === Step.DONE && <Result  {...data} keypass={formData?.key} />}
                <p><Link href="/how-it-works"><a>Want to know how it works?</a></Link></p>
            </>
            </>);
}
