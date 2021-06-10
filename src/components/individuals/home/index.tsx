import {useCallback, useState} from "react";
import HomeForm, {SecretFormData} from "./form";
import {storeSecret, StoreSecretData} from "../../../cryptoSave";
import Loading from "./Loading";
import Result from "./Result";

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

    return (<main>
        <h1>The secret sharing app <br /> for security freaks</h1>
        {step === Step.INPUTS && <HomeForm onSubmit={v => handleFormSubmit(v)} />}
        {step === Step.PROCESSING && <Loading />}
        {step === Step.DONE && <Result  {...data} keypass={formData?.key} />}
    </main>);
}
