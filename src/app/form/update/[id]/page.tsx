import { GetExpertRegisterRequestById } from "package/api/expert-register-request/id";
import ExpertRegisterUpdateForm from "./_components/form";
import { GetExpert } from "package/api/expert/id";
import { GetExpertNation } from "package/api/expert-nation-support";
import { convertNationString } from "package/util";
import { Certificate } from "components/certificate";

export default async function Page({ params }: { params: { id: string } }) {
  const [email, id] = params.id.split("-");
  const registerRequest = await GetExpertRegisterRequestById({ id: +id });
  const expert = await GetExpert({ id: registerRequest.data.expertId });

  const nation = await GetExpertNation({ expertId: expert.data.expertId });

  const newNation = convertNationString(nation.data);

  let certification: Certificate[] = [];
  try {
    certification = [
      ...certification,
      JSON.parse(expert.data.certificate),
    ];
  } catch (error) {}
  return (
    <ExpertRegisterUpdateForm
      initValueUpdateForm={{
        ...expert.data,
        note: registerRequest.data.note,
        requestId: registerRequest.data.id,
        linkedInUrl: expert.data.linkedinUrl,
        nation: newNation,
        certification
      }}
    />
  );
}
