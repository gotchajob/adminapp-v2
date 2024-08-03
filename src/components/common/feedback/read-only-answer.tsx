import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Fragment, ReactNode } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import { FlexBox } from '../box/flex-box';
import { Text } from '../text/text';
import { BookingExpertFeedbackAnswer } from 'package/api/booking-expert-feedback-controller/by-booking';

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

export const ReadOnlyAnswer = ({
  answerList,
}: {
  answerList: BookingExpertFeedbackAnswer[];
}) => {

  const RenderAnswer = (props: BookingExpertFeedbackAnswer) => {
    let input = <></>;

    switch (props.questionType) {
      case 'text':
        input = <TextField fullWidth minRows={5} multiline />;
        break;
      case 'attitude':
        input = (
          <FormControl>
            <RadioGroup>
              <FormControlLabel defaultValue={props.answer} control={<Radio />} label={renderLabel(props.question, '')} />
            </RadioGroup>
          </FormControl>
        );
        break;
      case 'number':
        input = <TextField value={props.answer} disabled
          type="number" />;
        break;
      case 'rating':
        input = <Rating defaultValue={+props.answer} readOnly />;
        break;
      case 'experience':
        input = (
          <FormControl>
            <RadioGroup>
              <FormControlLabel defaultValue={props.answer} control={<Radio />} label={renderLabel(props.question, '')} />
            </RadioGroup>
          </FormControl>
        );
        break;
    }

    return <SubCard title={props.question}>{input}</SubCard>;
  };

  return (
    <Stack spacing={3}>
      {answerList.map((questionAnswer, index) => (
        <Fragment key={index}>
          {RenderAnswer(questionAnswer)}
        </Fragment>
      ))}
    </Stack>
  );
};
