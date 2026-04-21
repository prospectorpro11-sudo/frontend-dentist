import ComplianceDataIntegrity from "@/components/complianceDataIntegrity/ComplianceDataIntegrity";
import styles from "./aboutMainView.module.scss";
import AboutBanner from "./views/AboutBanner";
import JoinWithUs from "./views/joinWithUs/JoinWithUs";
import OurMission from "./views/ourMission/OurMission";
import DataBeneficiaries from "@/components/dataBeneficiaries/DataBeneficiaries";
import { ABOUT_SEED_OBJECT } from "@/shared/seeds/aboutSeeds";

const AboutMainView = () => {
    return (
        <>
            <AboutBanner />
            <OurMission />
            <DataBeneficiaries {...ABOUT_SEED_OBJECT.dataBeneficiaries} bgVariant="fill" />
            <JoinWithUs />
            <ComplianceDataIntegrity />
        </>
    );
};

export default AboutMainView;