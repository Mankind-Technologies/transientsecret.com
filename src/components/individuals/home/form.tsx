import {Button, Form, Input} from "antd";

export interface SecretFormData {
    password:string;
    key:string;
}
interface HomeFormProps {
    onSubmit: (formData: SecretFormData) => void,
}

export default function HomeForm(props:HomeFormProps) {
    return (<>
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
    </>)
}
