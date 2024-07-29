import SubCard from 'ui-component/cards/SubCard';
import { attitudeOption, experienceOption, FeedbackAnwer, FeedbackQuestion, FeedbackQuestionType } from './interface';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import { Fragment, ReactNode } from 'react';
import { FlexBox } from '../box/flex-box';
import { Text } from '../text/text';
import Stack from '@mui/material/Stack';
import { BookingExpertFeedbackQuestion } from 'package/api/booking-expert-feedback-question-controller';

interface QuestionAnswer extends BookingExpertFeedbackQuestion {
  answer?: FeedbackAnwer;
}

const renderLabel = (option: string, icon: ReactNode) => {
  return (
    <FlexBox>
      <Text fontWeight={'bold'} mr={1}>
        {option}
      </Text>
      {/* {icon} */}
    </FlexBox>
  );
};

export const Answer = ({
  answerList,
  setAnswerList,
  feedbackQuestionList
}: {
  answerList: FeedbackAnwer[];
  setAnswerList: (value: FeedbackAnwer[]) => void;
  feedbackQuestionList: BookingExpertFeedbackQuestion[];
}) => {
  const handleUpdateAnwser = ({ questionId, value }: { questionId: number; value: any }) => {
    const newAnswer = [...answerList];
    const index = newAnswer.findIndex((value) => value.questionId === questionId);
    if (index >= 0) {
      newAnswer[index].value = value;
    } else {
      newAnswer.push({ questionId, value });
    }
    setAnswerList(newAnswer);
  };

  const RenderAnswer = (props: QuestionAnswer) => {
    let input = <></>;
    switch (props.type) {
      case 'text':
        input = <TextField fullWidth minRows={5} multiline />;
        break;
      case 'attitude':
        input = (
          <FormControl>
            <RadioGroup>
              {attitudeOption.map((e, index) => (
                <FormControlLabel value={e.value} control={<Radio />} key={index} label={renderLabel(e.option, e.icon)} />
              ))}
            </RadioGroup>
          </FormControl>
        );
        break;
      case 'number':
        input = <TextField type="number" />;
        break;
      case 'rating':
        input = <Rating />;
        break;
      case 'experience':
        input = (
          <FormControl>
            <RadioGroup>
              {experienceOption.map((e, index) => (
                <FormControlLabel value={e.value} control={<Radio />} key={index} label={renderLabel(e.option, e.icon)} />
              ))}
            </RadioGroup>
          </FormControl>
        );
        break;
    }

    return <SubCard title={props.question}>{input}</SubCard>;
  };

  const mappedFeedbackQuestionAnswer = () => {
    const data: QuestionAnswer[] = [];

    feedbackQuestionList.forEach((value) => {
      const answer = answerList.find((e) => e.questionId === value.id);
      data.push({
        ...value,
        answer
      });
    });

    return data;
  };

  return (
    <Stack spacing={3}>
      {mappedFeedbackQuestionAnswer().map((questionAnswer, index) => (
        <Fragment key={index}>
          {RenderAnswer(questionAnswer)}
        </Fragment>
      ))}
    </Stack>
  );
};
