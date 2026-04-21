import ComplianceDataIntegrity from "@/components/complianceDataIntegrity/ComplianceDataIntegrity";
import styles from "./aboutMainView.module.scss";
import AboutBanner from "./views/AboutBanner";
import JoinWithUs from "./views/joinWithUs/JoinWithUs";
import OurMission from "./views/ourMission/OurMission";
import DataBeneficiaries from "@/components/dataBeneficiaries/DataBeneficiaries";
import { ABOUT_SEED_OBJECT } from "@/shared/seeds/aboutSeeds";
import VerifiedContacts from "./views/VerifiedContacts";

const AboutMainView = () => {
    return (
        <>
            <AboutBanner />
            <VerifiedContacts />
            <OurMission />
            <DataBeneficiaries {...ABOUT_SEED_OBJECT.dataBeneficiaries} bgVariant="fill" />
            <JoinWithUs />
            <ComplianceDataIntegrity />
        </>
    );
};

export default AboutMainView;