import {Button, Form, Input} from "antd";
import {useEffect, useState } from "react";
import { uint8ArrayToBase64 } from "../../../utils";

export interface SecretFormData {
    password:string;
    key:string;
}
interface HomeFormProps {
    onSubmit: (formData: SecretFormData) => void,
}

export default function HomeForm(props:HomeFormProps) {
    const [key, setKey] = useState<String>('');
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        let array = window.crypto.getRandomValues(new Uint8Array(16));
        setKey(uint8ArrayToBase64(array));
        setLoaded(true);
    }, []);
    return (
        <>
            {loaded && (
                <>
                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={props.onSubmit}
                    >
                        <Form.Item
                            label="Secret"
                            name="secret"
                            rules={[{ required: true, message: 'Don\'t miss the secret!' }]}
                        >
                            <Input.TextArea rows={6} />
                        </Form.Item>

                        <Form.Item
                            label="Key"
                            name="key"
                            initialValue={key}
                            rules={[{ required: true, message: 'Please input your key!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Expires after"
                            name="expires"
                        >
                            <Input value="60 minutes" placeholder="60 minutes" disabled={true} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </>
        )
}
