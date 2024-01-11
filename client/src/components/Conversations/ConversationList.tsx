import ConversationItem from "./ConversationItem";
import {FC} from "react";
import {ConversationItemProps} from "../../interfaces/Conversation";

const ConversationList: FC<ConversationItemProps> = ({conversation, currentUser, setCurrentChat}) => {
    return (
        <>
            {conversation.map((conv, i: number) => (
                <div onClick={() => setCurrentChat(conv)} key={i}>
                    <ConversationItem conversation={conv} currentUser={currentUser}/>
                </div>
            ))}
        </>
    );
};

export default ConversationList;
