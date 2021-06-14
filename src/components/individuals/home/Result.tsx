import {CopyToClipboard} from 'react-copy-to-clipboard';

import { message, Button } from 'antd';

interface ResultProps {
    saltId?:string,
    searchKey?:string,
    keypass?:string,
}

export default function Result(props:ResultProps) {
    const link = `${window.location.origin}/secret?saltId=${encodeURIComponent(props.saltId || '')}&searchKey=${encodeURIComponent(props.searchKey || '')}`;
    console.log(props);
    return (
        <>
            <p>
                Share the link and the key by different channels
                with the one you want to share the secret with.
            </p>
            <div>
                <CopyToClipboard text={link}
                                 onCopy={() => message.info("Link copied!")}>
                    <Button>Copy the link</Button>
                </CopyToClipboard>
                <CopyToClipboard text={props.keypass||''}
                                 onCopy={() => message.info('Key copied!')}>
                    <Button>Copy the key</Button>
                </CopyToClipboard>
            </div>
            <h3>Want to know how and why it works securely?</h3>

        </>
    )
}
