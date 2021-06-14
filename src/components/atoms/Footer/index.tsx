import Link from 'next/link';
import {GithubOutlined} from "@ant-design/icons";


export default function Footer() {
    return (<>
        <div className="container">
            <div className="grid-3">
                <div className="column">
                    <Link href="/"><a>New Secret</a></Link>
                    <Link href="/how-it-works"><a>How it works</a></Link>
                    <Link href="/other-secret-sharing-webs"><a>Other Secret sharing webs</a></Link>
                </div>
                <div className="column">
                    <a target="_blank" href="https://github.com/Mankind-Technologies/transientsecret.com"><GithubOutlined /> GitHub</a>
                    <a target="_blank" href="https://mankind.technology/insights/2021-transientsecret-com">The story</a>
                </div>
            </div>
            <div>
                Mankind Technologies SL, {new Date().getFullYear()}
            </div>
        </div>
    </>);
}
