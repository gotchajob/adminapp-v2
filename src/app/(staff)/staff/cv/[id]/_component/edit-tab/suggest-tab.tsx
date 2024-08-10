import { EnchantInput } from "components/common/enchant-input";
import { CVTemplate } from "components/cv-component/interface";
import SubCard from "ui-component/cards/SubCard";

export const SuggestTab = ({
  cv,
  onChangeCV,
}: {
  cv: CVTemplate;
  onChangeCV: (cv: CVTemplate) => void;
}) => {
  const handleUpdateSuggest = (suggest: string) => {
    const newCV = { ...cv };
    newCV.suggest = suggest;
    onChangeCV(newCV);
  };

  return (
    <SubCard title={"Hướng dẫn viết CV"}>
      <EnchantInput initValue={cv.suggest} onChange={handleUpdateSuggest} />
    </SubCard>
  );
};
