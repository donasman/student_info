import React, { useEffect, useRef, useState } from 'react';

function StudentArrayPage2(props) {

    const [ scoreData, setScoreData ] = useState({
        total: 0,
        avg: 0
    })

    const [ studentList, setStudentList ] = useState([]);
    const [ updateId, setUpdateId ] = useState(0);
    
    const [inputValue, setInputValue] = useState({
            id: 0,
            name: "",
            score: ""
    });

    const staticId = useRef(0);
    
    useEffect(() => {
        let totalData = 0;
        
        for(let i = 0; i < studentList.length; i++) {
            totalData += parseInt(studentList[i].score)
        }
        
        setScoreData({
            total: totalData,
            avg: (totalData/studentList.length).toFixed(2)
        })
        setInputValue({
            id: 0,
            name: "",
            score: ""
         })
        }, [studentList]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setInputValue({
            ...inputValue,
            [name] : value
        })
    };

    const handleAddClick = () => {
        const student = {
            ...inputValue,
            id: staticId.current += 1           
        }
        setStudentList([...studentList, student])
    };
    const handleDeleteClick = (id) => {
        setStudentList([...studentList.filter(student => student.id != id)])
    }

    const handleUpdateClick = (id) => {
        setUpdateId(id);
        setInputValue(studentList.filter(student => student.id === id)[0]);

    }

    const handleUpdateSubmitClick = () => {
        const findIndex = studentList.indexOf(studentList.filter(student => student.id === updateId)[0])
        const updateStudentList = [...studentList];

        updateStudentList[findIndex] = inputValue;
        setStudentList(updateStudentList);
        handleCancelSubmitClick();
    }

    const handleCancelSubmitClick = () => {
        setUpdateId(0);
        setInputValue({
            id: "",
            name: "",
            score: 0
        })
    }
    return (
        <div>
            <div>
                <input type="text" name='id' disabled={true} value={inputValue.id} placeholder='ID'/>
                <input type="text" name='name' onChange={handleInputChange} value={inputValue.name} placeholder='이름'/>
                <input type="number" name='score' onChange={handleInputChange} value={inputValue.score} placeholder='성적'/>
                <button onClick={handleAddClick}>추가</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>성적</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList.map(student => {
                        return (
                            <tr key={student.id}> 
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.score}</td>
                                <td>
                                    {
                                        updateId !== student.id ? 
                                        <>
                                            <button onClick={() => {handleUpdateClick(student.id)}}>수정</button>
                                            <button onClick={() => {handleDeleteClick(student.id)}}>삭제</button>
                                        </>
                                        :
                                        <>
                                            <button onClick={() => {handleUpdateSubmitClick()}}>확인</button>
                                            <button onClick={handleCancelSubmitClick}>취소</button>
                                        </>
                                    }
                                </td>
                            </tr>)
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <th>총점</th>
                        <th colSpan={2}>{scoreData.total}</th>
                    </tr>
                    <tr>
                        <th>평균</th>
                        <th colSpan={2}>{isNaN(scoreData.avg) ? 0 : scoreData.avg}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default StudentArrayPage2;


