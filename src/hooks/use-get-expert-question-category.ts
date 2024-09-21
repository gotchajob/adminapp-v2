import { GetExpertQuestionCategory, QuestionCategory } from "package/api/expert-question-category";
import { GetExpertQuestionCategoryCurrent, QuestionCategoryCurrent } from "package/api/expert-question-category/current";
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

export const UseGetExpertQuestionCategoryCurrent = (accessToken: string, refresh: number) => {
    const [expertQuestionCategoryCurrent, setExpertQuestionCategoryCurrent] = useState<QuestionCategoryCurrent[]>([]);

    const [loading, setLoading] = useState(true);

    const fetchGetBookingExpertFeedbackQuestionCurrent = async () => {

        try {
            const res = await GetExpertQuestionCategoryCurrent(accessToken);
            if (res.status !== "success") {
                return;
            }
            setExpertQuestionCategoryCurrent(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (accessToken) {
            fetchGetBookingExpertFeedbackQuestionCurrent();
        }
    }, [refresh, accessToken]);

    return {
        expertQuestionCategoryCurrent
    }
}

