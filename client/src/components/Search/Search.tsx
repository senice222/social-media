import style from './Search.module.scss'
import {ChangeEvent, MouseEventHandler, useEffect, useState} from "react";
import {useDebounce} from "../../hooks/useDebouce";
import * as Api from '../../api/index'
import {User} from "../../interfaces/Auth";
import {useNavigate} from "react-router-dom";

const Search = () => {
    const [value, setValue] = useState<string>('')
    const [users, setUsers] = useState<User[]>([])
    const debouncedValue = useDebounce<string>(value, 300)
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const navigate = useNavigate()

    useEffect(() => {
        const searchUser = async () => {
            const data = await Api.user.searchUser(debouncedValue)
            setUsers(data)
        }
        searchUser()
    }, [debouncedValue])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

    const itemClickHandler = (e: MouseEventHandler<HTMLLIElement>) => {
        const clickedUsername = e.target.textContent
        setValue(clickedUsername)
        const choseUser = users.filter(item => item.username === clickedUsername)
        const profileUrl = `/profile/${choseUser[0]._id}`
        if (clickedUsername) {
            navigate(profileUrl, { replace: true })
        }
        setIsOpen(false)
    }

    return (
        <>
            <input
                type='text'
                placeholder={'Search for friends'}
                className={style.chatMenuInput}
                value={value}
                onChange={handleChange}
                onClick={() => setIsOpen(true)}
            />
            <div className={style.container}>
                <ul className={style.ulAutoComplete}> 
                    {
                        (users && isOpen) && users.map((item, i) => (
                            <div key={i}>
                                <li
                                    onClick={itemClickHandler}
                                    className={style.liAutoComplete}
                                >
                                    {item.username}
                                </li>
                            </div>
                        ))
                    }
                </ul>
            </div>
        </>
    );
};

export default Search;
