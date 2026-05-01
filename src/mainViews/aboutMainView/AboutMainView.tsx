import ComplianceDataIntegrity from "@/components/complianceDataIntegrity/ComplianceDataIntegrity";
import styles from "./aboutMainView.module.scss";
import AboutBanner from "./views/AboutBanner";
import JoinWithUs from "./views/joinWithUs/JoinWithUs";
import OurMission from "./views/ourMission/OurMission";
import DataBeneficiaries from "@/components/dataBeneficiaries/DataBeneficiaries";
import { ABOUT_SEED_OBJECT } from "@/seeds/aboutSeeds";
import VerifiedContacts from "./views/VerifiedContacts";
import TeamMembers from "@/components/teamMembers/TeamMembers";

const AboutMainView = () => {
    return (
        <>
            <AboutBanner />
            <VerifiedContacts />
            <OurMission />
            <DataBeneficiaries {...ABOUT_SEED_OBJECT.dataBeneficiaries} bgVariant="fill" />
            <JoinWithUs />
            <TeamMembers />
            <ComplianceDataIntegrity />
        </>
    );
};

export default AboutMainView;