import {CopyToClipboard} from 'react-copy-to-clipboard';

import {message, Button, Input, Form} from 'antd';

interface ResultProps {
    secret:string,
}

export default function Result(props:ResultProps) {
    return (
        <>
            <Input.TextArea rows={6} value={props.secret} />
        </>
    )
}
