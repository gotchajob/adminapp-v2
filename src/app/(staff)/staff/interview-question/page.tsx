"use client";

import Box from '@mui/material/Box';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { useMemo } from 'react';

const interviewQuestions = [
    {
        id: 'ITQuestion',
        name: 'Câu hỏi cho ngành Kỹ thuật phần mềm',
        questions: [
            { id: 'it-1', question: 'React là gì?', type: 'Text', answer: 'React là một thư viện JavaScript dùng để xây dựng giao diện người dùng.' },
            { id: 'it-2', question: 'Giải thích virtual DOM.', type: 'Rating', answer: 'Virtual DOM giúp tối ưu hóa hiệu suất bằng cách giảm số lần cập nhật trực tiếp lên DOM thật.', rating: 4 },
            { id: 'it-3', question: 'Bạn quản lý state trong React như thế nào?', type: 'Number', answer: 'Có thể sử dụng Context API, Redux, hoặc MobX.', number: 3 },
        ],
    },
    {
        id: 'MarketingQuestion',
        name: 'Câu hỏi cho ngành Marketing',
        questions: [
            { id: 'mkt-1', question: 'Hãy kể về một thử thách bạn đã đối mặt trong một chiến dịch marketing.', type: 'Rating', answer: 'Đã phải giải quyết vấn đề về ngân sách không đủ, nhưng đã tìm được giải pháp sáng tạo để vượt qua.', rating: 5 },
            { id: 'mkt-2', question: 'Bạn xây dựng chiến lược marketing cho một sản phẩm mới như thế nào?', type: 'Text', answer: 'Tôi sẽ bắt đầu bằng việc nghiên cứu thị trường, xác định đối tượng mục tiêu, và lên kế hoạch truyền thông phù hợp.' },
            { id: 'mkt-3', question: 'Bạn phân bổ ngân sách cho quảng cáo như thế nào?', type: 'Number', answer: 'Tôi sẽ phân bổ ngân sách dựa trên hiệu suất của các kênh quảng cáo và mục tiêu chiến dịch.', number: 4 },
        ],
    },
    {
        id: 'GraphicDesignQuestion',
        name: 'Câu hỏi cho ngành Thiết kế đồ họa',
        questions: [
            { id: 'gd-1', question: 'Bạn có thể giải thích quy trình thiết kế của bạn không?', type: 'Text', answer: 'Quy trình của tôi bao gồm nghiên cứu yêu cầu, tạo wireframe, thiết kế giao diện, và chỉnh sửa theo phản hồi.' },
            { id: 'gd-2', question: 'Bạn sử dụng các công cụ thiết kế nào?', type: 'Text', answer: 'Tôi sử dụng Adobe Photoshop, Illustrator, và Figma để thiết kế và chỉnh sửa đồ họa.' },
            { id: 'gd-3', question: 'Bạn đánh giá hiệu quả thiết kế của mình như thế nào?', type: 'Rating', answer: 'Tôi dựa vào phản hồi từ người dùng, tỷ lệ chuyển đổi và phân tích dữ liệu để đánh giá hiệu quả thiết kế.', rating: 4 },
        ],
    },
    {
        id: 'InternationalBusinessQuestion',
        name: 'Câu hỏi cho ngành Kinh doanh quốc tế',
        questions: [
            { id: 'ib-1', question: 'Bạn quản lý mối quan hệ quốc tế với các đối tác như thế nào?', type: 'Text', answer: 'Tôi thiết lập các cuộc họp định kỳ, duy trì liên lạc qua email và thiết lập các thỏa thuận hợp tác rõ ràng.' },
            { id: 'ib-2', question: 'Bạn xử lý các rủi ro trong kinh doanh quốc tế như thế nào?', type: 'Rating', answer: 'Tôi thực hiện phân tích rủi ro, thiết lập các biện pháp phòng ngừa và duy trì sự linh hoạt để ứng phó với các tình huống bất ngờ.', rating: 4 },
            { id: 'ib-3', question: 'Bạn nghiên cứu thị trường quốc tế như thế nào?', type: 'Text', answer: 'Tôi sử dụng các báo cáo nghiên cứu thị trường, phân tích đối thủ cạnh tranh và khảo sát người tiêu dùng để hiểu rõ về thị trường.' },
        ],
    },
];

const feedbackQuestions = [
    {
        id: 'customer',
        name: 'Feedback từ người dùng',
        questions: [
            { id: 'likedInterview', question: 'Bạn thích điều gì nhất về buổi phỏng vấn?', type: 'Rating', answer: 'Sự chuyên nghiệp và khả năng giải thích rõ ràng.', rating: 4 },
            { id: 'experienceQuestion', question: 'Bạn có trải nghiệm nào đặc biệt trong buổi phỏng vấn không?', type: 'Number', answer: 'Trải nghiệm tích cực với sự hỗ trợ nhiệt tình.', number: 5 },
            { id: 'improvementQuestion', question: 'Có điều gì bạn nghĩ chúng tôi nên cải thiện không?', type: 'Text', answer: 'Cần thêm thời gian để chuẩn bị các câu hỏi phù hợp hơn.' },
        ],
    },
    {
        id: 'expert',
        name: 'Feedback từ chuyên gia',
        questions: [
            { id: 'improvementSuggestions', question: 'Có điều gì bạn nghĩ chúng tôi nên cải thiện trong quy trình phỏng vấn?', type: 'Rating', answer: 'Cần cải thiện về thời gian tổ chức phỏng vấn.', rating: 3 },
            { id: 'futureSuggestions', question: 'Bạn có gợi ý nào cho các buổi phỏng vấn trong tương lai không?', type: 'Number', answer: 'Nên có thêm phần hỏi đáp và thời gian để thảo luận chi tiết.', number: 7 },
            { id: 'feedbackQuestion', question: 'Những điều gì bạn thấy tốt trong buổi phỏng vấn này?', type: 'Text', answer: 'Những câu hỏi được chuẩn bị kỹ lưỡng và người phỏng vấn rất nhiệt tình.' },
        ],
    },
];

const expandedNodes = [
    'interviewQuestions',
    ...interviewQuestions.map((category) => category.id),
    'feedbackQuestions',
    ...feedbackQuestions.map((category) => category.id),
];

function InterviewQuestionPage() {

    const questionMap = useMemo(() => {
        const map = new Map();
        [...interviewQuestions, ...feedbackQuestions].forEach(category => {
            category.questions.forEach(question => {
                map.set(question.id, question);
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

    const handleDelete = (id: any) => {
        const question = questionMap.get(id);
        if (question) {
            console.log('Delete', question);
        } else {
            console.log('Question not found');
        }
    };

    const renderTable = (questions: any) => (
        <TableContainer component={Paper} sx={{ mt: 2, boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell>Câu hỏi</TableCell>
                        <TableCell>Loại</TableCell>
                        <TableCell>Câu trả lời</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Quản lý</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions.map((q: any) => (
                        <TableRow key={q.id}>
                            <TableCell>{q.question}</TableCell>
                            <TableCell>{q.type}</TableCell>
                            <TableCell>
                                {q.type === 'Rating' && q.rating !== undefined ? (
                                    <Rating value={q.rating} readOnly />
                                ) : q.type === 'Number' && q.number !== undefined ? (
                                    q.number
                                ) : (
                                    q.answer
                                )}
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Tooltip title="Sửa">
                                        <IconButton onClick={() => handleEdit(q.id)} >
                                            <EditIcon sx={{ fontSize: 16 }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Xóa">
                                        <IconButton onClick={() => handleDelete(q.id)} >
                                            <DeleteIcon sx={{ fontSize: 16 }} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Box sx={{ width: "100%", background: "#FFFFFF", p: 3, borderRadius: 2, boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>Quản lý Câu hỏi phỏng vấn và feedback</Typography>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                defaultExpanded={["interviewQuestions", "feedbackQuestions"]}
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
                <TreeItem nodeId="feedbackQuestions" label="Câu hỏi feedback buổi phỏng vấn" sx={{ color: '#b39ddb' }}>
                    {feedbackQuestions.map((category) => (
                        <TreeItem key={category.id} nodeId={category.id} label={category.name}>
                            {renderTable(category.questions)}
                        </TreeItem>
                    ))}
                </TreeItem>
            </TreeView>
        </Box>
    )
}

export default InterviewQuestionPage;
