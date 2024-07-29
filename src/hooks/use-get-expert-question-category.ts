import { GetExpertQuestionCategory, QuestionCategory } from "package/api/expert-question-category";
import { useEffect, useState } from "react";

export const UseGetExpertQuestionCategory = (refresh: number) => {
    const [expertQuestionCategory, setExpertQuestionCategory] = useState<QuestionCategory[]>([]);

    const [loading, setLoading] = useState(true);

    const fetchGetBookingExpertFeedbackQuestion = async () => {
        try {
            const res = await GetExpertQuestionCategory();
            if (res.status !== "success") {
                return;
            }
            setExpertQuestionCategory(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchGetBookingExpertFeedbackQuestion(); }, [refresh]);

    return {
        expertQuestionCategory
    }
}