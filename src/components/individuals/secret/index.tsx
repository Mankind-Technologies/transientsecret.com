import {useCallback, useState} from "react";
import SecretForm from "./form";
import { useRouter } from 'next/router'
import {retrieveSecret} from "../../../cryptoSave";
import Loading from "../../atoms/Loading";
import Result from "./Result";
import Error from './Error';

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

    return (<main>
        <h1>The secret sharing app <br /> for security freaks</h1>
        {step === Step.INPUTS && <SecretForm onSubmit={v => handleFormSubmit(v)} />}
        {step === Step.PROCESSING && <Loading />}
        {step === Step.DONE && <Result secret={secret} />}
        {step === Step.ERROR && <Error />}
    </main>);
}
