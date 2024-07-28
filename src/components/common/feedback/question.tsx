import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { FeedbackQuestion, FeedbackQuestionType, SampleFeedbackQuestion, SampleFeedbackType } from './interface';
import { useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Iconify from 'components/iconify/iconify';
import { PRIMARYCOLOR } from '../config';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import SubCard from 'ui-component/cards/SubCard';
import TextField from '@mui/material/TextField';
import { Text } from '../text/text';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface MappedFeedbackQuestion extends FeedbackQuestionType {
  questionList: FeedbackQuestion[];
}

export const Feedback = ({
  feedbackQuestionList,
  feedbackQuestionType,
  selectFeedbackQuestionList,
  setSelectAddFeedbackQuestion
}: {
  feedbackQuestionList: FeedbackQuestion[];
  feedbackQuestionType: FeedbackQuestionType[];
  selectFeedbackQuestionList: FeedbackQuestion[];
  setSelectAddFeedbackQuestion: (value: FeedbackQuestion[]) => void;
}) => {
  const [openAddFeedbackQuestion, setOpenAddFeedbackQuestion] = useState(false);

  const mappedFeedbackQuestion = () => {
    const data: MappedFeedbackQuestion[] = [];
    feedbackQuestionType.forEach((value) =>
      data.push({
        ...value,
        questionList: feedbackQuestionList.filter((question) => question.typeId === value.typeId)
      })
    );
    return data;
  };

  const handleSelectFeedbackQuestion = (feedbackQuestion: FeedbackQuestion) => {
    if (selectFeedbackQuestionList.find((value) => value.questionId === feedbackQuestion.questionId)) {
      setSelectAddFeedbackQuestion(selectFeedbackQuestionList.filter((value) => value.questionId !== feedbackQuestion.questionId));
    } else {
      setSelectAddFeedbackQuestion([...selectFeedbackQuestionList, feedbackQuestion]);
    }
  };

  const handleOpenAddFeedbackQuestion = () => {
    setOpenAddFeedbackQuestion(!openAddFeedbackQuestion);
  };

  const AddFeedbackButton = (
    <IconButton
      sx={{ position: 'fixed', bottom: 60, right: 60, border: `1px solid ${PRIMARYCOLOR}` }}
      size="large"
      color="primary"
      onClick={handleOpenAddFeedbackQuestion}
    >
      <Iconify icon={'ic:sharp-post-add'} width={35} color={PRIMARYCOLOR} />
    </IconButton>
  );

  const RenderFeedbackQuestion = (question: FeedbackQuestion) => {
    let isSelected = false;
    if (selectFeedbackQuestionList.find((value) => value.questionId === question.questionId)) {
      isSelected = true;
    }
    return (
      <MenuItem
        sx={{ color: isSelected ? 'red' : 'black', py: 1.5 }}
        onClick={() => {
          handleSelectFeedbackQuestion(question);
        }}
      >
        {question.question}
      </MenuItem>
    );
  };

  const DialogAddFeedbackQuestion = (
    <Dialog open={openAddFeedbackQuestion} maxWidth="md" fullWidth onClose={handleOpenAddFeedbackQuestion}>
      <DialogTitle textAlign={'center'}>Thêm câu hỏi</DialogTitle>
      <DialogContent>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{
            '& .MuiTreeItem-root': {
              margin: '4px 0'
            }
          }}
        >
          {mappedFeedbackQuestion().map((type, index) => (
            <TreeItem key={index} nodeId={type.typeId + ''} label={type.description}>
              <Grid container spacing={1} sx={{ my: 1 }}>
                {type.questionList.map((question) => (
                  <Grid item key={question.questionId} xs={12}>
                    {RenderFeedbackQuestion(question)}
                  </Grid>
                ))}
              </Grid>
            </TreeItem>
          ))}
        </TreeView>
      </DialogContent>
    </Dialog>
  );
  return (
    <>
      {AddFeedbackButton}
      {DialogAddFeedbackQuestion}
    </>
  );
};
