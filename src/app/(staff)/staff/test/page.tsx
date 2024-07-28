'use client';

import Container from '@mui/material/Container';
import { Answer } from 'components/common/feedback/answer';
import {
  FeedbackQuestion,
  SampleFeedbackQuestion,
  FeedbackQuestionType,
  SampleFeedbackType,
  FeedbackAnwer
} from 'components/common/feedback/interface';
import { Feedback } from 'components/common/feedback/question';
import { useState } from 'react';

export default function Page() {

  const [feedbackQuestionList] = useState<FeedbackQuestion[]>(SampleFeedbackQuestion);

  const [feedbackQuestionType] = useState<FeedbackQuestionType[]>(SampleFeedbackType);
  
  const [selectFeedbackQuestionList, setSelectAddFeedbackQuestion] = useState<FeedbackQuestion[]>([]);

  const [answerList, setAnswerList] = useState<FeedbackAnwer[]>([]);
  return (
    <Container maxWidth={'lg'} sx={{ my: 4 }}>
      <Feedback
        feedbackQuestionList={feedbackQuestionList}
        feedbackQuestionType={feedbackQuestionType}
        selectFeedbackQuestionList={selectFeedbackQuestionList}
        setSelectAddFeedbackQuestion={setSelectAddFeedbackQuestion}
      />
      <Answer answerList={answerList} feedbackQuestionList={selectFeedbackQuestionList} setAnswerList={setAnswerList} />
    </Container>
  );
}
