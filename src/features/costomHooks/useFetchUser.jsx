import { useEffect, useState } from "react";
import { httpService } from "@services/http-service";

const useFetchUser = () => {
    const sessionName = localStorage.getItem('sessionName');
    const sinaToken = localStorage.getItem('sinaToken');
    const userId = localStorage.getItem('userId');
    const [currentUser, setCurrentUser] = useState([]);

    const fetchUser = async () => {
        // const response = await httpService.get('/webservice.php?operation=query&sessionName=' + sessionName + '&query=SELECT * FROM Contacts where id=' + userId + ';');
        const response = await httpService.post('/API/NetExpert/GetCRMQueries', {
            sessionName: sessionName,
            operation: `SELECT * FROM Contacts where id=` + `${userId};`,
            CrmRequestType: 1
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": sinaToken
            }
        });

        if (response) {
            setCurrentUser(response.data.result[0]);
        } else {
            return false;
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return currentUser;
}

export default useFetchUser;