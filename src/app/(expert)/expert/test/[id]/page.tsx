// "use client";

// import { Feedback } from "components/common/feedback/question";
// import { ReadOnlyAnswer } from "components/common/feedback/read-only-answer";
// import { UseGetBookingExpertFeedbackQuestion } from "hooks/use-get-booking-expert-feedback-question";
// import { UseGetExpertQuestionCategoryCurrent } from "hooks/use-get-expert-question-category";
// import { ExpertToken } from "hooks/use-login";
// import { useRefresh } from "hooks/use-refresh";
// import { BookingFeedbackAnwer } from "package/api/booking-expert-feedback-controller";
// import { BookingExpertFeedbackQuestion } from "package/api/booking-expert-feedback-question-controller";
// import { useState } from "react";

// export default function TestPage({ params }: { params: { id: string } }) {

//     const { expertToken } = ExpertToken();

//     const { refresh, refreshTime } = useRefresh();

//     const [answerList, setAnswerList] = useState<BookingFeedbackAnwer[]>([]);

//     const [selectFeedbackQuestionList, setSelectAddFeedbackQuestion] = useState<
//         BookingExpertFeedbackQuestion[]
//     >([]);

//     const { expertQuestionCategoryCurrent } = UseGetExpertQuestionCategoryCurrent(
//         expertToken,
//         refreshTime
//     );

//     const { bookingExpertFeedbackQuestion } =
//         UseGetBookingExpertFeedbackQuestion(refreshTime);
//     return (
//         <>
//             <Feedback
//                 feedbackQuestionList={bookingExpertFeedbackQuestion}
//                 feedbackQuestionType={expertQuestionCategoryCurrent}
//                 selectFeedbackQuestionList={selectFeedbackQuestionList}
//                 setSelectAddFeedbackQuestion={setSelectAddFeedbackQuestion}
//             />
//             <ReadOnlyAnswer params={params} answerList={answerList} feedbackQuestionList={selectFeedbackQuestionList}></ReadOnlyAnswer>
//         </>
//     )
// }