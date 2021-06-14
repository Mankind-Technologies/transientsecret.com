import {join} from "path";
import fs from "fs";
import {GetStaticProps} from "next";
import MarkdownPage from "../src/components/atoms/MarkdownPage";

const privacyBody = join(process.cwd(), 'docs/other-secret-sharing-webs.md')
const body = fs.readFileSync(privacyBody, 'utf8');
export default MarkdownPage;
export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            body,
            slug: '/other-secret-sharing-webs',
            title: 'Other secret sharing webs',
            description: 'Other secret sharing webs',
        },
        revalidate: false,
    }
}
