import ComplianceDataIntegrity from "@/components/complianceDataIntegrity/ComplianceDataIntegrity";
import styles from "./aboutMainView.module.scss";
import AboutBanner from "./views/AboutBanner";
import JoinWithUs from "./views/joinWithUs/JoinWithUs";
import OurMission from "./views/ourMission/OurMission";

const AboutMainView = () => {
    return (
        <>
            <AboutBanner />
            <OurMission />
            <JoinWithUs />
            <ComplianceDataIntegrity />
        </>
    );
};

export default AboutMainView;