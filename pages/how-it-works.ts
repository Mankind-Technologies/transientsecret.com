import {join} from "path";
import fs from "fs";
import {GetStaticProps} from "next";
import HowItWorks from "../src/components/individuals/how-it-works";

const privacyBody = join(process.cwd(), 'docs/how-it-works.md')
const body = fs.readFileSync(privacyBody, 'utf8');
export default HowItWorks;
export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {body},
        revalidate: false,
    }
}
