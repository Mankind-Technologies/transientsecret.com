import {join} from "path";
import fs from "fs";
import {GetStaticProps} from "next";
import MarkdownPage from "../src/components/atoms/MarkdownPage";

const privacyBody = join(process.cwd(), 'docs/how-it-works.md')
const body = fs.readFileSync(privacyBody, 'utf8');
export default MarkdownPage;
export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            body,
            slug: '/how-it-works',
            title: 'How It Works',
            description: 'How transientsecret.com works',
        },
        revalidate: false,
    }
}
