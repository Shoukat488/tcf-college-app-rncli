import { setInstructorsSpare } from './SpareActions';
const BASE_URL = process.env.REACT_APP_BASE_URL
const InstructorAction = {

    setInstructors: (obj) => {
        console.log('action: ', obj)
        return (dispatch) => {
            return setInstructorsSpare(dispatch, obj)
        };
    },
    addInstructor: (obj) => {
        return (dispatch) => {
            console.log("token store: ", obj.token)
            const url = `${BASE_URL}/instructors`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${obj.token}`
                },
                body: JSON.stringify({
                    name: obj.name
                })
            })
                .then((resposne) => resposne.json())
                .then((data) => {
                    console.log("instructor:", data)
                    if (data.response === 1)
                        setInstructorsSpare(dispatch, obj)
                    return (data.response);
                })
                .catch((error) => {
                    return 0
                });
        };
    },
    editInstructor: (obj) => {
        return (dispatch) => {
            console.log("token store: ", obj.token)
            const url = `${BASE_URL}/instructors/${obj._id}`;
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${obj.token}`
                },
                body: JSON.stringify({
                    name: obj.name,
                })
            })
                .then((resposne) => resposne.json())
                .then(async (data) => {
                    console.log('data: ',data)
                    if (data.response === 1)
                        setInstructorsSpare(dispatch, obj)
                    return (data.response);
                })
                .catch((error) => {
                    return 0
                });
        };
    },
    deleteInstructor: (obj) => {
        return (dispatch) => {
            console.log("token store: ", obj.token)
            const url = `${BASE_URL}/instructors/${obj._id}`;
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${obj.token}`
                },
                body: JSON.stringify({
                    instructorId: obj._id
                })
            })
                .then((resposne) => resposne.json())
                .then((data) => {
                    console.log("isntructor:", data)
                    if (data.response === 1) {
                        setInstructorsSpare(dispatch, obj)
                    }
                    return (data.response);
                })
                .catch((error) => {
                    return 0
                });
        };
    },
}

export default InstructorAction;
