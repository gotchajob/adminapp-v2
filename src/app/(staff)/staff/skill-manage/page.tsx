"use client";

import { ExpertToken } from "hooks/use-login";
import { CategoryControllerPage } from "./_component/category-controller";
import { SkillControllerPage } from "./_component/skill-controller";
import { SkillOptionControllerPage } from "./_component/skill-option-controller";
import { useRefresh } from "hooks/use-refresh";
import { useGetSkill } from "hooks/use-get-skill";
import { useEffect } from "react";
import { useGetSkillOptions } from "hooks/use-get-skill-option";
import { useGetCategories } from "hooks/use-get-category";

export default function SkillManagePage() {
    const { expertToken } = ExpertToken();

    const { refresh, refreshTime } = useRefresh();

    const { skills, loading: skillsLoading } = useGetSkill(refreshTime);

    const { skillOptions, loading: skillOptionsLoading } = useGetSkillOptions(refreshTime);

    const { categories, loading: categoriesLoading } = useGetCategories(refreshTime);

    useEffect(() => {
        console.log("categories:", categories);
        console.log("skills:", skills);
        console.log("skillOptions:", skillOptions);
    }, [skills, skillOptions, categories]);

    return (
        <>
            <CategoryControllerPage token={expertToken} category={categories} refresh={refresh} />
            <SkillControllerPage token={expertToken} category={categories} skills={skills} refresh={refresh} />
            <SkillOptionControllerPage token={expertToken} skills={skills} skillOptions={skillOptions} refresh={refresh} />
        </>
    );
}
