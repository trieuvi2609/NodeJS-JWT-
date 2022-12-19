import React, { useState, useEffect } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'antd';
import { logOut } from '../../redux/authSlice';
const SESSION_IDEL_MINUTES = 0.05;

const AutoLagoutTimer = (props) => {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()
    // Modal
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(logOut())
    navigate('/login')
  };

  
console.log('session',sessionStorage.getItem('access_token'))
    const handleOnIdle = (event) => {
        console.log('user is idle', event)
        console.log('last active', getLastActiveTime())
        if (sessionStorage.getItem('access_token')){
            setIsModalOpen(true)
            // navigate('/login')
            sessionStorage.clear()
        }

        // if (sessionStorage.getItem('access_token')){

        //     setIsModalOpen(true)
        // }
    }

    const {getLastActiveTime } = useIdleTimer({
        timeout: 1000 * 60 * SESSION_IDEL_MINUTES,
        onIdle: handleOnIdle,
        debounce: 500,
    })

    return <div>
        <>
      
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk}>
            Session Timeout
      </Modal>
    </>
    </div>
}

export default AutoLagoutTimer;