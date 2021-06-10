import {useCallback, useState} from "react";
import SecretForm from "./form";
import { useRouter } from 'next/router'
import {retrieveSecret} from "../../../cryptoSave";

enum Step {
    INPUTS,
    PROCESSING,
    DONE,
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
                });
        }
    },[saltId, searchKey, step]);

    return (<main>
        {step === Step.INPUTS && <SecretForm onSubmit={v => handleFormSubmit(v)} />}
        {step === Step.PROCESSING && <span>working...</span>}
        {step === Step.DONE && (
            <div>
                <span>Done!</span>
                <div>{secret}</div>
            </div>
        )}
        <span>{ step }</span>
    </main>);
}
