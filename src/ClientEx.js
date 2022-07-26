import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

//After building novnc/websockify use the following cli command to start the docker:
//docker run -it --rm -p 7000:80 novnc/websockify 80 localhost:17001

export const ClientEx = () => {
    //Public API that will echo messages sent to it back to the client
    const [socketUrl, setSocketUrl] = useState('ws://localhost:7000');
    const [messageHistory, setMessageHistory] = useState([]);

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage));
        }
    }, [lastMessage, setMessageHistory]);

    //Doesn't appear to actually attempt a new connection
    //ie: this doesn't generate any additional console feedback from websockify
    const handleClickChangeSocketUrl = useCallback(
        () => setSocketUrl('ws://localhost:7000'),
        []
    );

    const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <div>
            <button onClick={handleClickChangeSocketUrl}>
                Click Me to change Socket Url
            </button>
            <button
                onClick={handleClickSendMessage}
                disabled={readyState !== ReadyState.OPEN}
            >
                Click Me to send 'Hello'
            </button>
            <span>The WebSocket is currently {connectionStatus}</span>
            {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
            <ul>
                {messageHistory.map((message, idx) => (
                    <span key={idx}>{message ? message.data : null}</span>
                ))}
            </ul>
        </div>
    );
};

export default ClientEx