import { useRootContext } from "@/contexts/RootContext";

const BillingInfo = () => {
  const { loggedInUser } = useRootContext();
  const countryText =
    typeof loggedInUser?.country === "string"
      ? loggedInUser.country
      : (loggedInUser?.country as { label?: string } | undefined)?.label || "";

  return (
    <div>
      <p>
        {loggedInUser?.streetAddress}, <br />
        {loggedInUser?.streetAddress2 ? (
          <>
            {loggedInUser?.streetAddress2},<br />
          </>
        ) : (
          ""
        )}
        {loggedInUser?.city}, {loggedInUser?.state} {loggedInUser?.zip}, <br />
        {countryText}
        <br />
      </p>
    </div>
  );
};

export default BillingInfo;
