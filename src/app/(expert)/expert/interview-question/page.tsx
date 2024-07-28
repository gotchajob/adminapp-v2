"use client";

import Box from '@mui/material/Box';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, Dialog, DialogTitle, DialogContent, Grid, MenuItem, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Rating, Button, DialogActions } from '@mui/material';
import { useMemo, useState } from 'react';
import Iconify from 'components/iconify/iconify';
import SubCard from 'ui-component/cards/SubCard';
import { attitudeOption, experienceOption, FeedbackAnwer, FeedbackQuestion, SampleFeedbackQuestion, SampleFeedbackType } from 'components/common/feedback/interface';
import { PRIMARYCOLOR } from 'components/common/config';
import { Answer } from 'components/common/feedback/answer';
import { Feedback } from 'components/common/feedback/question';
import { FlexBox } from 'components/common/box/flex-box';
import { Text } from 'components/common/text/text';

const interviewQuestions = [
    {
        id: 'ITQuestion',
        name: 'Câu hỏi cho ngành Kỹ thuật phần mềm',
        questions: [
            { id: 'it-1', question: 'React là gì?', type: 'Text' },
            { id: 'it-2', question: 'Giải thích virtual DOM.', type: 'Rating' },
            { id: 'it-3', question: 'Bạn quản lý state trong React như thế nào?', type: 'Number' },
        ],
    },
    {
        id: 'MarketingQuestion',
        name: 'Câu hỏi cho ngành Marketing',
        questions: [
            { id: 'mkt-1', question: 'Hãy kể về một thử thách bạn đã đối mặt trong một chiến dịch marketing.', type: 'Rating' },
            { id: 'mkt-2', question: 'Bạn xây dựng chiến lược marketing cho một sản phẩm mới như thế nào?', type: 'Text' },
            { id: 'mkt-3', question: 'Bạn phân bổ ngân sách cho quảng cáo như thế nào?', type: 'Number' },
        ],
    },
    {
        id: 'GraphicDesignQuestion',
        name: 'Câu hỏi cho ngành Thiết kế đồ họa',
        questions: [
            { id: 'gd-1', question: 'Bạn có thể giải thích quy trình thiết kế của bạn không?', type: 'Text' },
            { id: 'gd-2', question: 'Bạn sử dụng các công cụ thiết kế nào?', type: 'Text' },
            { id: 'gd-3', question: 'Bạn đánh giá hiệu quả thiết kế của mình như thế nào?', type: 'Rating' },
        ],
    },
    {
        id: 'InternationalBusinessQuestion',
        name: 'Câu hỏi cho ngành Kinh doanh quốc tế',
        questions: [
            { id: 'ib-1', question: 'Bạn quản lý mối quan hệ quốc tế với các đối tác như thế nào?', type: 'Text' },
            { id: 'ib-2', question: 'Bạn xử lý các rủi ro trong kinh doanh quốc tế như thế nào?', type: 'Rating' },
            { id: 'ib-3', question: 'Bạn nghiên cứu thị trường quốc tế như thế nào?', type: 'Text' },
        ],
    },
];

function InterviewQuestionPage() {
    const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);

    const [openAddFeedbackQuestion, setOpenAddFeedbackQuestion] = useState(false);

    const [answerList, setAnswerList] = useState<FeedbackAnwer[]>([]);

    const questionMap = useMemo(() => {
        const map = new Map();
        interviewQuestions.forEach(category => {
            category.questions.forEach(question => {
                map.set(question.id, { ...question, category });
            });
        });
        return map;
    }, []);

    const handleEdit = (id: any) => {
        const question = questionMap.get(id);
        if (question) {
            console.log('Edit', question);
        } else {
            console.log('Question not found');
        }
    };

    const handleAdd = (id: any) => {
        const question = questionMap.get(id);
        if (question && !selectedQuestions.find(q => q.id === question.id)) {
            console.log('Add', question);
            setSelectedQuestions([...selectedQuestions, question]);
        }
    };

    const handleDelete = (id: any) => {
        const question = questionMap.get(id);
        if (question) {
            console.log('Delete', question);
            setSelectedQuestions(selectedQuestions.filter(q => q.id !== question.id));
        }
    };

    const renderTable = (questions: any) => (
        <TableContainer component={Paper} sx={{ mt: 2, boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell>Câu hỏi</TableCell>
                        <TableCell>Loại</TableCell>
                        <TableCell>Quản lý</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions.map((q: any) => {
                        const isSelected = selectedQuestions.some(selected => selected.id === q.id);
                        return (
                            <TableRow key={q.id} sx={{ backgroundColor: isSelected ? 'success.light' : 'inherit' }}>
                                <TableCell>{q.question}</TableCell>
                                <TableCell>{q.type}</TableCell>
                                <TableCell>
                                    <Tooltip title="Thêm">
                                        <IconButton onClick={() => handleAdd(q.id)} disabled={isSelected}>
                                            <AddIcon sx={{ fontSize: 16 }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Sửa">
                                        <IconButton onClick={() => handleEdit(q.id)}>
                                            <EditIcon sx={{ fontSize: 16 }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Xóa">
                                        <IconButton onClick={() => handleDelete(q.id)} disabled={!isSelected}>
                                            <DeleteIcon sx={{ fontSize: 16 }} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const handleOpenAddFeedbackQuestion = () => {
        setOpenAddFeedbackQuestion(!openAddFeedbackQuestion);
    };

    const RenderFeedbackQuestion = (question: FeedbackQuestion) => {
        let isSelected = false;
        if (selectedQuestions.find((value) => value.questionId === question.questionId)) {
            isSelected = true;
        }
        return (
            <MenuItem
                sx={{ color: isSelected ? 'red' : 'black', py: 1.5 }}
                onClick={() => {
                    const newSelectedQuestions = isSelected
                        ? selectedQuestions.filter((value) => value.questionId !== question.questionId)
                        : [...selectedQuestions, question];
                    setSelectedQuestions(newSelectedQuestions);
                }}
            >
                {question.question}
            </MenuItem>
        );
    };

    const renderLabel = (option: string, icon: any) => {
        return (
            <FlexBox>
                <Text fontWeight={'bold'} mr={1}>
                    {option}
                </Text>
                {icon}
            </FlexBox>
        );
    };

    const RenderAnswer = (props: FeedbackQuestion) => {
        let input = <></>;
        console.log("RenderAnswer", props);
        switch (props.type) {
            case 'Text':
                input = <TextField fullWidth />;
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
            case 'Number':
                input = <TextField type="number" />;
                break;
            case 'Rating':
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

        return <SubCard title={
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {props.question}
                <IconButton onClick={() => handleDelete(props.id)}>
                    <Tooltip title="Xóa câu hỏi">
                        <DeleteIcon />
                    </Tooltip>
                </IconButton>
            </Box>
        }>{input}</SubCard>;
    };

    const DialogAddFeedbackQuestion = (
        <Dialog open={openAddFeedbackQuestion} maxWidth="md" fullWidth onClose={handleOpenAddFeedbackQuestion}>
            <DialogTitle textAlign={'center'}>Các câu hỏi đã chọn để phỏng vấn</DialogTitle>
            <DialogContent>
                <Box sx={{ p: 1 }}>
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {interviewQuestions.map((category) => {
                            const filteredQuestions = selectedQuestions.filter(
                                (question) => question.category.id === category.id
                            );
                            if (filteredQuestions.length === 0) return null;
                            return (
                                <TreeItem key={category.id} nodeId={category.id} label={category.name}>
                                    {filteredQuestions.map((question, index) => (
                                        <Box sx={{ p: 1 }} key={index}>
                                            {RenderAnswer(question)}
                                        </Box>
                                    ))}
                                </TreeItem>
                            );
                        })}
                    </TreeView>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: PRIMARYCOLOR, '&:hover': { backgroundColor: '#1c54b2' } }}
                    startIcon={<Iconify icon="ic:baseline-save" />}
                >
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <Box sx={{ width: "100%", background: "#FFFFFF", p: 3, borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Quản lý câu hỏi phỏng vấn</Typography>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                defaultExpanded={["interviewQuestions"]}
                sx={{
                    '& .MuiTreeItem-root': {
                        margin: '8px 0',
                        '& .MuiTreeItem-content': {
                            borderRadius: 1,
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            },
                        },
                        '& .MuiTreeItem-label': {
                            fontSize: '1rem',
                            fontWeight: 'bold',
                        },
                    },
                }}
            >
                <TreeItem nodeId="interviewQuestions" label="Câu hỏi buổi phỏng vấn" sx={{ color: '#90caf9' }}>
                    {interviewQuestions.map((category) => (
                        <TreeItem key={category.id} nodeId={category.id} label={category.name}>
                            {renderTable(category.questions)}
                        </TreeItem>
                    ))}
                </TreeItem>
            </TreeView>
            <IconButton
                sx={{ position: 'fixed', bottom: 60, right: 60, border: `1px solid ${PRIMARYCOLOR}` }}
                size="large"
                color="primary"
                onClick={handleOpenAddFeedbackQuestion}
            >
                <Tooltip title="Câu hỏi phỏng vấn của bạn">
                    <Iconify icon={'ic:sharp-post-add'} width={35} color={PRIMARYCOLOR} />
                </Tooltip>
            </IconButton>
            {DialogAddFeedbackQuestion}
        </Box>
    );
}

export default InterviewQuestionPage;
