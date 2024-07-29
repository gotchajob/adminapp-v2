import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

export interface FeedbackQuestion {
  questionId: number;
  question: string;
  typeId: number;
  input: 'text' | 'number' | 'rating' | 'attitude' | 'experience';
}

export interface FeedbackQuestionType {
  typeId: number;
  description: string;
}

export interface FeedbackAnwer {
  questionId: number;
  value: string | number;
}

export const SampleFeedbackQuestion: FeedbackQuestion[] = [
  {
    input: 'rating',
    question: 'Kiến thức cơ bản',
    questionId: 1,
    typeId: 1
  },
  {
    input: 'text',
    question: 'Kiến thức nâng cao',
    questionId: 2,
    typeId: 1
  },
  {
    input: 'number',
    question: 'Project demo',
    questionId: 3,
    typeId: 1
  },
  {
    input: 'experience',
    question: 'Truy vấn SQL cơ bản',
    questionId: 4,
    typeId: 2
  },
  {
    input: 'attitude',
    question: 'Thái độ khi giải thích',
    questionId: 5,
    typeId: 1
  }
];
export const SampleFeedbackType: FeedbackQuestionType[] = [
  {
    typeId: 1,
    description: 'Reactjs'
  },
  {
    typeId: 2,
    description: 'Database Design'
  }
];

export const attitudeOption = [
  {
    value: 3,
    option: 'Không tốt',
    icon: <SentimentDissatisfiedIcon color="primary" />
  },
  {
    value: 4,
    option: 'Tốt',
    icon: <SentimentSatisfiedIcon />
  },
  {
    value: 5,
    option: 'Rất tốt',
    icon: <SentimentSatisfiedAltIcon />
  }
];

export const experienceOption = [
  {
    value: 1,
    option: 'Không hài lòng',
    icon: <SentimentDissatisfiedIcon color="primary" />
  },
  {
    value: 2,
    option: 'Hài lòng',
    icon: <SentimentSatisfiedIcon />
  },
  {
    value: 3,
    option: 'Rất hài lòng',
    icon: <SentimentSatisfiedAltIcon />
  }
];
