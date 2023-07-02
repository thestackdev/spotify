import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

const AWS_CERTIFICATE_ARN = process.env.AWS_CERTIFICATE_ARN;
const AWS_CERTIFICATE_IDENTIFIER = process.env.AWS_CERTIFICATE_IDENTIFIER;
const APP_NAME = process.env.APP_NAME;
const PUBLISH_DOMAIN = process.env.PUBLISH_DOMAIN;
const AWS_REGION = process.env.AWS_REGION;

export default {
  config(_input) {
    return { name: APP_NAME!, region: AWS_REGION };
  },
  stacks(app) {
    app.setDefaultRemovalPolicy("destroy");
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        customDomain: {
          domainName: PUBLISH_DOMAIN!,
          isExternalDomain: true,
          cdk: {
            certificate: Certificate.fromCertificateArn(
              stack,
              AWS_CERTIFICATE_IDENTIFIER!,
              AWS_CERTIFICATE_ARN!
            ),
          },
        },
      });
      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
