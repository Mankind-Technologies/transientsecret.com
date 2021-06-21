import {Button, Form, Input} from "antd";
import { useRouter } from "next/router";
import {useState} from "react";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

interface FormData {
    password:string;
}
interface HomeFormProps {
    onSubmit: (formData: FormData) => void,
    defaultKey: string,
}

export default function SecretForm(props:HomeFormProps) {
    const [inputValue, setInputValue] = useState('');
    return (<main>
        <Form
            {...layout}
            name="basic"
            initialValues={{ key: props.defaultKey }}
            onFinish={props.onSubmit}
        >
            <Form.Item
                label="key"
                name="key"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </main>)
}
