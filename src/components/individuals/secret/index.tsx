import React, {useCallback, useState} from "react";
import SecretForm from "./form";
import { useRouter } from 'next/router'
import {retrieveSecret} from "../../../crypto";
import Loading from "../../atoms/Loading";
import Result from "./Result";
import Error from './Error';
import Link from "next/link";
import Head from "next/head";

enum Step {
    INPUTS,
    PROCESSING,
    DONE,
    ERROR,
}

export default function Secret() {
    const router = useRouter()
    const { saltId, searchKey } = router.query
    const [step, setStep] = useState<Step>(Step.INPUTS);
    const [secret, setSecret] = useState<string|undefined>(undefined);
    const handleFormSubmit = useCallback((formData) => {
        if (step === Step.INPUTS) {
            setStep(Step.PROCESSING);
            retrieveSecret(saltId as string, searchKey as string, formData.key)
                .then(secret => {
                    setSecret(secret);
                    setStep(Step.DONE);
                })
                .catch(() => {
                    setStep(Step.ERROR);
                })
        }
    },[saltId, searchKey, step]);

    const isError = step === Step.ERROR || (step === Step.DONE && secret === undefined);

    return (<>
        <Head>
            <title>A secret shared | transientsecret.com</title>
            <meta property="og:url" content="transientsecret.com/secret" />
            <meta property="og:title" content="A secret shared | transientsecret.com" />
            <meta property="og:description" content="A secret shared with transientsecret.com" />
        </Head>
        <main>
            <h1>Burn before decrypt <br/> secret sharing app</h1>
            {step === Step.INPUTS && <SecretForm onSubmit={v => handleFormSubmit(v)} />}
            {step === Step.PROCESSING && <Loading />}
            {step === Step.DONE && secret && <Result secret={secret} />}
            {isError && <Error />}
            <p><Link href="/how-it-works"><a>Want to know how it works?</a></Link></p>
        </main>
    </>);
}
